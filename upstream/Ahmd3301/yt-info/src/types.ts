export interface Format {
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
  hasVideo: boolean;
  hasAudio: boolean;
  source: string;
}

export interface VideoInfo {
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
  formats: Format[];
  storyboard: string | null;
}

export interface ClientConfig {
  clientName: string;
  clientVersion: string;
  clientId: number;
  userAgent: string;
}

export interface PlayerResponse {
  videoDetails?: Record<string, any>;
  streamingData?: Record<string, any>;
  microformat?: Record<string, any>;
  playabilityStatus?: Record<string, any>;
  [key: string]: any;
}

export interface InnerTubeResponse {
  videoDetails?: Record<string, any>;
  streamingData?: {
    formats?: Record<string, any>[];
    adaptiveFormats?: Record<string, any>[];
    hlsManifestUrl?: string;
    dashManifestUrl?: string;
    [key: string]: any;
  };
  microformat?: Record<string, any>;
  playabilityStatus?: {
    status?: string;
    reason?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
