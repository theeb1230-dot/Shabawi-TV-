// Source: Ahmd3301/vplyr-live-v2 @ 26cec450d4bee06f1cee0d02899593fd4ed3bef7
export const VARIANTS = {
  "1080p": { bandwidth: 5800000, resolution: "1920x1080" },
  "720p": { bandwidth: 3200000, resolution: "1280x720" },
  "360p": { bandwidth: 900000, resolution: "640x360" }
};

export function normalizeVariant(value) {
  const variant = String(value || "").replace(/\.m3u8$/i, "");
  return Object.hasOwn(VARIANTS, variant) ? variant : null;
}

export function proxySegmentUrl(baseUrl, messageId) {
  const root = String(baseUrl).replace(/\/$/, "");
  return `${root}/proxy/${messageId}`;
}

export function renderMaster(baseUrl, streamKey = "default") {
  const root = String(baseUrl).replace(/\/$/, "");
  const lines = ["#EXTM3U", "#EXT-X-VERSION:7"];
  for (const [name, info] of Object.entries(VARIANTS)) {
    lines.push(`#EXT-X-STREAM-INF:BANDWIDTH=${info.bandwidth},RESOLUTION=${info.resolution}`, `${root}/${name}.m3u8?stream=${encodeURIComponent(streamKey)}`);
  }
  return `${lines.join("\n")}\n`;
}

export function renderVariantPlaylist({ baseUrl, initMessageId, segments, mediaSequence }) {
  if (!initMessageId || segments.length === 0) return ["#EXTM3U", "#EXT-X-VERSION:7", "#EXT-X-TARGETDURATION:6", "#EXT-X-MEDIA-SEQUENCE:0", "#EXT-X-PLAYLIST-TYPE:EVENT"].join("\n") + "\n";
  const lines = ["#EXTM3U", "#EXT-X-VERSION:7", "#EXT-X-TARGETDURATION:6", `#EXT-X-MEDIA-SEQUENCE:${mediaSequence}`, "#EXT-X-INDEPENDENT-SEGMENTS", `#EXT-X-MAP:URI="${proxySegmentUrl(baseUrl, initMessageId)}"`];
  for (const segment of segments) lines.push(`#EXTINF:${Number(segment.duration).toFixed(3)},`, proxySegmentUrl(baseUrl, segment.message_id));
  return `${lines.join("\n")}\n`;
}
