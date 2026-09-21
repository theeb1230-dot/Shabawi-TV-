import type { YouTubeVideoInfo } from "./extractor.js";

export interface OutputFormat {
  id: string;
  quality: string;
  label: string;
  ext: string;
  resolution: string | null;
  fps: number | null;
  codec: string;
  sizeBytes: number | null;
  sizeLabel: string | null;
  url: string;
  hasAudio: boolean;
  hasVideo: boolean;
}

export interface OutputJson {
  success: boolean;
  data?: {
    title: string;
    channel: string;
    channelId: string;
    videoId: string;
    views: number;
    likes: number | null;
    publishDate: string;
    duration: number;
    durationLabel: string;
    thumbnail: string;
    description: string;
    formats: OutputFormat[];
  };
  error?: string;
}

export function formatSuccess(info: YouTubeVideoInfo): OutputJson {
  const formats: OutputFormat[] = info.formats.map((f) => ({
    id: f.formatId,
    quality: f.quality,
    label: f.label,
    ext: f.ext,
    resolution: f.width && f.height ? `${f.width}x${f.height}` : null,
    fps: f.fps,
    codec: f.hasVideo ? f.vcodec : f.acodec,
    sizeBytes: f.filesizeBytes,
    sizeLabel: f.filesizeLabel,
    url: f.url,
    hasAudio: f.hasAudio,
    hasVideo: f.hasVideo,
  }));

  return {
    success: true,
    data: {
      title: info.title,
      channel: info.channel,
      channelId: info.channelId,
      videoId: info.id,
      views: info.views,
      likes: info.likes,
      publishDate: info.publishDate,
      duration: info.duration,
      durationLabel: info.durationLabel,
      thumbnail: info.thumbnail,
      description: info.description,
      formats,
    },
  };
}

export function formatError(msg: string): OutputJson {
  return { success: false, error: msg };
}
