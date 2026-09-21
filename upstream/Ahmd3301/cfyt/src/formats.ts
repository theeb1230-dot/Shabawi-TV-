import { Format, VideoInfo } from "./types.js";
import { CipherSpec, applyCipherSpec, decodeUrl, solveNTransform } from "./cipher.js";

const COMBINED_CODEC_RE = /mp4a\.|opus|vorbis|aac\b|ac-3|ec-3|flac/;

function formatSize(bytes: number | null): string | null {
  if (!bytes) return null;
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1073741824).toFixed(2)} GB`;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

export function parseFormatEntry(
  f: Record<string, any>,
  source: string,
  sigSpec?: CipherSpec | null,
  playerJs?: string
): Format | null {
  const mimeType = (f.mimeType as string) ?? "";
  const isVideo  = mimeType.startsWith("video/");
  const isAudio  = mimeType.startsWith("audio/");
  if (!isVideo && !isAudio) return null;

  let url    = (f.url as string) ?? "";
  const cipher = (f.signatureCipher as string) ?? (f.cipher as string) ?? "";

  if (!url && cipher) {
    const decoded = decodeUrl(cipher);
    if (decoded) {
      let sig = decoded.s;
      if (sig && sigSpec) sig = applyCipherSpec(sig, sigSpec);
      try {
        const u = new URL(decoded.url);
        if (sig) u.searchParams.set(decoded.sp, sig);
        url = u.toString();
      } catch { url = decoded.url; }
    }
  }

  if (url) {
    try {
      const u = new URL(url);
      const n = u.searchParams.get("n");
      if (n) {
        const transformed = solveNTransform(n, playerJs);
        if (transformed !== n) { u.searchParams.set("n", transformed); url = u.toString(); }
      }
    } catch {}
  }

  const codecs = mimeType.match(/codecs="([^"]+)"/)?.[1] ?? "";
  const ext    = mimeType.match(/\/(\w+)/)?.[1] ?? "unknown";
  const w      = (f.width  as number) ?? null;
  const h      = (f.height as number) ?? null;
  const fps    = (f.fps    as number) ?? null;
  const qLabel = (f.qualityLabel as string) ?? "";
  const quality = qLabel || (f.quality as string) || (h ? `${h}p` : isAudio ? "audio" : "unknown");

  let label = quality;
  if (w && h) label += ` (${w}x${h})`;
  if (fps && fps > 30) label += ` ${fps}fps`;
  if (ext !== "unknown") label += ` [${ext}]`;

  const size = parseInt((f.contentLength as string) ?? "0", 10) || null;

  return {
    id: String(f.itag ?? ""),
    quality, label, ext,
    resolution: w && h ? `${w}x${h}` : null,
    fps, codec: codecs,
    sizeBytes: size, sizeLabel: formatSize(size),
    url,
    hasVideo: isVideo,
    hasAudio: isAudio || (isVideo && COMBINED_CODEC_RE.test(codecs)),
    source,
  };
}

export function buildVideoInfo(pr: Record<string, any>, videoId: string, formats: Format[]): VideoInfo {
  const vd = (pr.videoDetails ?? {}) as Record<string, any>;
  const mf = ((pr.microformat as Record<string, any>)?.playerMicroformatRenderer ?? {}) as Record<string, any>;
  const duration = parseInt((vd.lengthSeconds as string) ?? "0", 10) || 0;
  const thumbs   = ((vd.thumbnail as Record<string, any>)?.thumbnails as Record<string, any>[] ?? [])
                     .sort((a, b) => (b.width as number) - (a.width as number));

  return {
    title:        (vd.title    as string) ?? "",
    channel:      (vd.author   as string) ?? (mf.ownerChannelName  as string) ?? "",
    channelId:    (vd.channelId as string) ?? (mf.externalChannelId as string) ?? "",
    videoId,
    views:        parseInt(String(vd.viewCount ?? "0"), 10) || 0,
    likes:        mf.likeCount ? Number(mf.likeCount) : null,
    publishDate:  (mf.publishDate as string) ?? (mf.uploadDate as string) ?? "",
    duration,
    durationLabel: formatDuration(duration),
    thumbnail:    (thumbs[0]?.url as string) ?? "",
    description:  ((vd.shortDescription as string) ?? "").slice(0, 500),
    formats,
    storyboard:   null,
  };
}

export function deduplicateFormats(formats: Format[]): Format[] {
  const seen = new Map<string, Format>();
  for (const f of formats) {
    const key = `${f.id}-${f.resolution ?? "audio"}-${f.codec.toLowerCase()}-${f.ext}`;
    if (!seen.has(key)) seen.set(key, f);
    else if (!seen.get(key)!.url && f.url) seen.set(key, f);
  }
  return [...seen.values()];
}
