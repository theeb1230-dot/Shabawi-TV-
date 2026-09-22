import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { logger } from "./logger.js";

const execFileAsync = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUNDLED = resolve(__dirname, "..", "bin", process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp");

function resolveYtDlp(): string {
  if (existsSync(BUNDLED)) return BUNDLED;
  return "yt-dlp";
}

const YOUTUBE_RE = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\//;

export function isYouTubeUrl(url: string): boolean {
  return YOUTUBE_RE.test(url.trim());
}

export interface YouTubeFormat {
  formatId: string;
  quality: string;
  label: string;
  ext: string;
  width: number | null;
  height: number | null;
  fps: number | null;
  vcodec: string;
  acodec: string;
  tbr: number | null;
  filesizeBytes: number | null;
  filesizeLabel: string | null;
  url: string;
  hasVideo: boolean;
  hasAudio: boolean;
}

export interface YouTubeVideoInfo {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  views: number;
  likes: number | null;
  publishDate: string;
  duration: number;
  durationLabel: string;
  thumbnail: string;
  description: string;
  formats: YouTubeFormat[];
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatSize(bytes: number | null): string | null {
  if (bytes === null || bytes === undefined) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function parseYtDlpOutput(raw: unknown): YouTubeVideoInfo {
  const d = raw as Record<string, unknown>;
  const rawFormats = (d.formats ?? []) as Record<string, unknown>[];

  const formats: YouTubeFormat[] = rawFormats
    .filter((f) => {
      const v = f.vcodec as string;
      const a = f.acodec as string;
      return (v && v !== "none") || (a && a !== "none");
    })
    .map((f) => {
      const height = (f.height as number) ?? null;
      const width = (f.width as number) ?? null;
      const fps = (f.fps as number) ?? null;
      const vcodec = (f.vcodec as string) ?? "none";
      const acodec = (f.acodec as string) ?? "none";
      const tbr = (f.tbr as number) ?? null;
      const filesizeBytes = (f.filesize as number) ?? (f.filesize_approx as number) ?? null;
      const formatNote = (f.format_note as string) ?? "";
      const ext = (f.ext as string) ?? "unknown";

      let quality = formatNote || `${height || "?"}p`;
      let label = `${quality}`;
      if (width && height) label += ` (${width}x${height})`;
      if (fps && fps > 30) label += ` ${fps}fps`;
      if (ext) label += ` [${ext}]`;

      return {
        formatId: (f.format_id as string) ?? "",
        quality,
        label,
        ext,
        width,
        height,
        fps,
        vcodec,
        acodec,
        tbr,
        filesizeBytes,
        filesizeLabel: formatSize(filesizeBytes),
        url: (f.url as string) ?? "",
        hasVideo: vcodec !== "none",
        hasAudio: acodec !== "none",
      };
    });

  const duration = (d.duration as number) ?? 0;

  return {
    id: (d.id as string) ?? "",
    title: (d.title as string) ?? "",
    channel: (d.channel as string) ?? (d.uploader as string) ?? "",
    channelId: (d.channel_id as string) ?? (d.uploader_id as string) ?? "",
    views: (d.view_count as number) ?? 0,
    likes: (d.like_count as number) ?? null,
    publishDate: (d.upload_date as string) ?? "",
    duration,
    durationLabel: formatDuration(Math.round(duration)),
    thumbnail: (d.thumbnail as string) ?? "",
    description: ((d.description as string) ?? "").slice(0, 500),
    formats,
  };
}

export async function extractInfo(url: string): Promise<YouTubeVideoInfo> {
  const trimmed = url.trim();
  if (!isYouTubeUrl(trimmed)) {
    throw new Error(`Not a YouTube URL: ${trimmed}`);
  }

  logger.info("Extracting info", { url: trimmed });
  const ytDlpPath = resolveYtDlp();
  const { stdout } = await execFileAsync(ytDlpPath, [
    "--dump-json",
    "--no-download",
    "--youtube-skip-dash-manifest",
    "--no-warnings",
    trimmed,
  ], {
    timeout: 60000,
    maxBuffer: 10 * 1024 * 1024,
  });

  const parsed = JSON.parse(stdout);
  logger.info("Extraction complete", { title: parsed.title });
  return parseYtDlpOutput(parsed);
}
