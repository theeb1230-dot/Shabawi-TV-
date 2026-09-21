import { ClientConfig, InnerTubeResponse } from "./types.js";

const API_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";

export const CLIENTS: ClientConfig[] = [
  { clientName: "ANDROID_VR", clientVersion: "1.65.10", clientId: 28, userAgent: "Mozilla/5.0 (Linux; Android 14; VR) AppleWebKit/537.36" },
  { clientName: "WEB", clientVersion: "2.20250526.00.00", clientId: 1, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0" },
  { clientName: "ANDROID", clientVersion: "21.02.35", clientId: 3, userAgent: "com.google.android.youtube/21.02.35 (Linux; U; Android 14; en_US)" },
  { clientName: "WEB_EMBEDDED_PLAYER", clientVersion: "1.20250526.00.00", clientId: 56, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0" },
  { clientName: "TVHTML5", clientVersion: "7.20250526.00.00", clientId: 7, userAgent: "Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/537.36" },
  { clientName: "IOS", clientVersion: "21.02.3", clientId: 5, userAgent: "com.google.ios.youtube/21.02.3 (iPhone; iOS 17.5; en_US)" },
  { clientName: "TVHTML5_SIMPLY", clientVersion: "1.0", clientId: 75, userAgent: "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36" },
];

interface ApiOptions {
  videoId: string;
  client: ClientConfig;
  visitorData?: string;
  poToken?: string;
  signatureTimestamp?: number;
  apiKey?: string;
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const resp = await fetch(url, options);
    if (resp.status !== 429 && resp.status !== 403) return resp;
    if (attempt < retries - 1) await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
  }
  throw new Error(`HTTP ${options.method === "GET" ? "GET" : "POST"} failed after retries`);
}

export async function callPlayerApi(opts: ApiOptions): Promise<InnerTubeResponse | null> {
  const { videoId, client, visitorData, poToken, signatureTimestamp, apiKey } = opts;

  const body: Record<string, any> = {
    videoId,
    context: {
      client: {
        clientName: client.clientName,
        clientVersion: client.clientVersion,
        hl: "en",
        gl: "US",
        timeZone: "UTC",
        utcOffsetMinutes: 0,
      },
    },
    contentCheckOk: true,
    racyCheckOk: true,
  };

  if (visitorData) {
    body.context.client.visitorData = visitorData;
  }

  if (signatureTimestamp) {
    body.playbackContext = {
      contentPlaybackContext: { signatureTimestamp },
    };
  }

  if (poToken) {
    body.serviceIntegrityDimensions = { poToken };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": client.userAgent,
    "X-YouTube-Client-Name": String(client.clientId),
    "X-YouTube-Client-Version": client.clientVersion,
    "Origin": "https://www.youtube.com",
    "Referer": "https://www.youtube.com/",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
  };

  if (visitorData) {
    headers["X-Goog-Visitor-Id"] = visitorData;
  }

  try {
    const resp = await fetchWithRetry(
      `https://www.youtube.com/youtubei/v1/player?key=${apiKey || API_KEY}&prettyPrint=false`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
    );
    const data: InnerTubeResponse = await resp.json();

    const ps = data.playabilityStatus;
    if (ps?.status === "OK" || data.streamingData || data.videoDetails) {
      return data;
    }

    if (ps?.status === "UNPLAYABLE" && data.videoDetails) {
      return data;
    }

    return null;
  } catch {
    return null;
  }
}

export async function extractApiKey(html: string): Promise<string | null> {
  const match = html.match(/"INNERTUBE_API_KEY"\s*:\s*"([^"]+)"/);
  return match?.[1] ?? null;
}

export async function extractVisitorData(html: string): Promise<string | null> {
  const match = html.match(/"VISITOR_DATA"\s*:\s*"([^"]+)"/);
  return match?.[1] ?? null;
}

export async function extractClientVersion(html: string): Promise<string | null> {
  const match = html.match(/"INNERTUBE_CLIENT_VERSION"\s*:\s*"([^"]+)"/);
  return match?.[1] ?? null;
}

export async function extractSignatureTimestamp(html: string): Promise<number | null> {
  const match = html.match(/"STS"\s*:\s*(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export async function fetchPageHtml(url: string, ua: string): Promise<string | null> {
  try {
    const resp = await fetchWithRetry(
      url,
      {
        headers: {
          "User-Agent": ua,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );
    return await resp.text();
  } catch {
    return null;
  }
}
