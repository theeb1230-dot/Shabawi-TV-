import { VideoInfo, ClientConfig } from "./types.js";
import { CLIENTS, callPlayerApi, fetchPageHtml, extractApiKey, extractVisitorData, extractSignatureTimestamp } from "./api.js";
import { findDecipherFunc, extractCipherSpec, CipherSpec } from "./cipher.js";
import { parseFormatEntry, buildVideoInfo, deduplicateFormats } from "./formats.js";

const YOUTUBE_RE = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\//;
const YT_PLAYER_RE = /ytInitialPlayerResponse\s*=\s*/;

function getVideoId(raw: string): string {
  try {
    const u = new URL(raw.trim());
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("/")[0];
    return u.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

function extractPlayerJson(html: string): Record<string, any> | null {
  const match = html.match(YT_PLAYER_RE);
  if (!match) return null;
  let start = match.index! + match[0].length;
  if (html[start] !== "{") return null;
  let depth = 0, inStr = false, escape = false, end = -1;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\" && inStr) { escape = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) return null;
  try { return JSON.parse(html.slice(start, end + 1)); } catch { return null; }
}

// Use a desktop UA for HTML metadata extraction
const METADATA_CLIENT: ClientConfig = {
  clientName: "WEB",
  clientVersion: "2.20250526.00.00",
  clientId: 1,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
};

async function loadPlayerJs(ua: string): Promise<{ js: string; spec: CipherSpec | null; sts: number } | null> {
  try {
    const html = await fetchPageHtml(
      `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      ua,
    );
    if (!html) return null;
    const ytcfgMatch = html.match(/ytcfg\.set\s*\(\s*({.+?})\s*\)\s*;/);
    if (!ytcfgMatch) return null;
    let ytcfg: Record<string, any> = {};
    try { ytcfg = JSON.parse(ytcfgMatch[1]); } catch { return null; }
    const playerUrl: string | undefined = ytcfg?.PLAYER_JS_URL ?? ytcfg?.playerJsUrl;
    if (!playerUrl) return null;
    const fullUrl = playerUrl.startsWith("http") ? playerUrl : `https://www.youtube.com${playerUrl}`;
    const jsResp = await fetch(fullUrl, {
      headers: { "User-Agent": ua, "Accept": "*/*" },
    });
    const jsCode = await jsResp.text();
    const func = findDecipherFunc(jsCode);
    if (!func) return null;
    const spec = extractCipherSpec(func.code);
    return { js: jsCode, spec, sts: func.sts };
  } catch {
    return null;
  }
}

export async function extractInfo(rawUrl: string): Promise<VideoInfo> {
  const trimmed = rawUrl.trim();
  if (!YOUTUBE_RE.test(trimmed)) throw new Error(`Invalid YouTube URL: ${trimmed}`);

  const videoId = getVideoId(trimmed);
  if (!videoId) throw new Error("Could not extract video ID from URL");

  // Step 1: Fetch desktop HTML for metadata (videoDetails + microformat)
  const html = await fetchPageHtml(
    `https://www.youtube.com/watch?v=${videoId}&bpctr=9999999999&has_verified=1`,
    METADATA_CLIENT.userAgent,
  );
  if (!html) throw new Error("Failed to fetch YouTube page");

  // Extract API key and visitor data from HTML
  const apiKey = await extractApiKey(html) || "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
  const visitorData = await extractVisitorData(html) || undefined;
  const sts = await extractSignatureTimestamp(html) || undefined;

  // Try to extract player JS for signature deciphering (if needed)
  let sigSpec: CipherSpec | null = null;
  let playerJs: string | undefined;
  try {
    const pi = await loadPlayerJs(METADATA_CLIENT.userAgent);
    if (pi) { sigSpec = pi.spec; playerJs = pi.js; }
  } catch {}

  // Extract metadata from HTML player response
  const initialPr = extractPlayerJson(html);
  const metadataPr: Record<string, any> = {
    videoDetails: initialPr?.videoDetails ?? {},
    microformat: initialPr?.microformat ?? {},
  };

  // Collect formats
  let htmlFormatCount = 0;
  const allFormats: Map<string, Record<string, any>> = new Map();

  // Step 2: Try InnerTube API with multiple clients for best formats (with URLs)
  let gotApiFormats = false;
  for (const client of CLIENTS) {
    const data = await callPlayerApi({
      videoId,
      client,
      visitorData,
      signatureTimestamp: sts,
      apiKey,
    });
    if (!data) continue;

    // Merge any missing metadata from API responses
    if (data.videoDetails && !metadataPr.videoDetails?.title) {
      metadataPr.videoDetails = data.videoDetails as Record<string, any>;
    }
    if (data.microformat && !metadataPr.microformat?.playerMicroformatRenderer?.publishDate) {
      metadataPr.microformat = data.microformat as Record<string, any>;
    }

    const rawFormats = [
      ...((data.streamingData as Record<string, any>)?.formats ?? []),
      ...((data.streamingData as Record<string, any>)?.adaptiveFormats ?? []),
    ];

    if (rawFormats.length > 0) {
      for (const f of rawFormats) {
        const fmt = f as Record<string, any>;
        // Only add if it has a URL or ciphered URL that we might solve
        if (!fmt.url && !fmt.signatureCipher && !fmt.cipher) continue;
        const key = `${fmt.itag}-${fmt.mimeType}`;
        if (!allFormats.has(key)) {
          allFormats.set(key, fmt);
        } else {
          // Prefer the one with a URL
          const existing = allFormats.get(key)!;
          if ((!existing.url && fmt.url) || (existing.signatureCipher && fmt.url)) {
            allFormats.set(key, fmt);
          }
        }
      }
      gotApiFormats = true;
    }
  }

  // Step 3: Fall back to HTML formats if API returned nothing
  if (!gotApiFormats && initialPr?.streamingData) {
    const htmlFormats = [
      ...((initialPr.streamingData as Record<string, any>)?.formats ?? []),
      ...((initialPr.streamingData as Record<string, any>)?.adaptiveFormats ?? []),
    ];
    for (const f of htmlFormats) {
      const key = `${(f as Record<string, any>).itag}-${(f as Record<string, any>).mimeType}`;
      if (!allFormats.has(key)) allFormats.set(key, f as Record<string, any>);
    }
  }

  if (allFormats.size === 0) {
    throw new Error("Could not extract video data. YouTube may be blocking this request.");
  }

  const formats = [...allFormats.values()]
    .map((f: Record<string, any>) => parseFormatEntry(f, "api", sigSpec, playerJs))
    .filter((f): f is NonNullable<typeof f> => f !== null);

  return buildVideoInfo(metadataPr, videoId, deduplicateFormats(formats));
}

export function isYouTubeUrl(url: string): boolean {
  return YOUTUBE_RE.test(url.trim());
}
