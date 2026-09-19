export interface Format {
  id: string; quality: string; label: string; ext: string;
  resolution: string | null; fps: number | null; codec: string;
  sizeBytes: number | null; sizeLabel: string | null; url: string;
  hasVideo: boolean; hasAudio: boolean; source: string;
}
export interface VideoInfo {
  title: string; channel: string; channelId: string; videoId: string;
  views: number; likes: number | null; publishDate: string; duration: number;
  durationLabel: string; thumbnail: string; description: string;
  formats: Format[]; storyboard: string | null;
}
