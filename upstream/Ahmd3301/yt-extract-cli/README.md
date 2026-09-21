# yt-extract-cli

A lightweight CLI tool to extract YouTube video metadata and direct streaming links using **yt-dlp**.

## Features

- Extract video title, channel, views, likes, duration, description
- List all available formats (video + audio) with direct download URLs
- Works on **Windows** and **Termux** (Android)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) installed and in PATH (or download the binary manually)

### Install via npm (recommended)

```bash
npm install -g yt-extract-cli
```

### Manual install (Termux)

```bash
# 1. Install prerequisites in Termux
pkg update && pkg upgrade
pkg install nodejs python ffmpeg
pip install yt-dlp

# 2. Clone the repo
git clone https://github.com/Ahmd3301/yt-extract-cli.git
cd yt-extract-cli

# 3. Install dependencies and build
npm install
npm run build

# 4. Make executable globally
npm link
```

## Usage

```bash
yt-extract "https://www.youtube.com/watch?v=VIDEO_ID"
```

Or with a shorter URL:

```bash
yt-extract "https://youtu.be/VIDEO_ID"
```

### Output

The tool outputs structured JSON with all video metadata and available formats:

```json
{
  "id": "VIDEO_ID",
  "title": "Video Title",
  "channel": "Channel Name",
  "views": 12345,
  "likes": 678,
  "duration": 300,
  "durationLabel": "5:00",
  "thumbnail": "https://i.ytimg.com/vi/...",
  "formats": [
    {
      "formatId": "137",
      "quality": "1080p",
      "ext": "mp4",
      "width": 1920,
      "height": 1080,
      "fps": 30,
      "url": "https://rr1---sn-...googlevideo.com/..."
    }
  ]
}
```

Each format includes a **direct download URL** that can be used with `curl`, `wget`, or `ffmpeg`.

### Download a specific format

Pipe the output to filter the format you want:

```bash
yt-extract "URL" | jq '.formats[] | select(.quality == "1080p") | .url' -r | xargs curl -o video.mp4
```

Or use `ffmpeg` to download best video + best audio:

```bash
yt-extract "URL" | jq -r '.formats[] | select(.hasVideo and .hasAudio and .url != "") | .url' | head -1 | xargs curl -o video.mp4
```

## License

MIT
