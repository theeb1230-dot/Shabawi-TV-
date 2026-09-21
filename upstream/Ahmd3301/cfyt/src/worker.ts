import { extractInfo, isYouTubeUrl } from "./extractor.js";

const HTML_HELP = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>cfyb — YouTube Info API</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;background:#0f0f0f;color:#e0e0e0}
    h1{color:#ff4444;font-size:1.6rem}
    code{background:#1e1e1e;padding:2px 8px;border-radius:4px;font-family:monospace;color:#f8c555}
    pre{background:#1e1e1e;padding:16px;border-radius:8px;overflow-x:auto;font-size:.85rem;line-height:1.6}
    .ep{color:#888;font-size:.9rem}
    a{color:#ff6666}
    hr{border-color:#333}
  </style>
</head>
<body>
  <h1>cfyb — YouTube Info API</h1>
  <p class="ep">Cloudflare Worker · لا يعتمد على yt-dlp</p>
  <hr>
  <h2>Endpoints</h2>
  <pre>GET /?url=&lt;youtube_url&gt;           → JSON كامل
GET /?url=&lt;youtube_url&gt;&amp;fmt=urls  → روابط مباشرة فقط
GET /?url=&lt;youtube_url&gt;&amp;fmt=info  → معلومات بدون روابط</pre>

  <h2>مثال</h2>
  <pre>curl "https://cfyb.workers.dev/?url=https://youtu.be/dQw4w9WgXcQ"</pre>

  <h2>الاستجابة</h2>
  <pre>{
  "title": "...",
  "channel": "...",
  "videoId": "...",
  "views": 123456,
  "likes": 1234,
  "duration": 212,
  "durationLabel": "3:32",
  "publishDate": "2009-10-25",
  "thumbnail": "https://...",
  "description": "...",
  "formats": [
    {
      "id": "18",
      "quality": "360p",
      "ext": "mp4",
      "codec": "avc1.42001E, mp4a.40.2",
      "resolution": "640x360",
      "sizeLabel": "15.2 MB",
      "url": "https://...",
      "hasVideo": true,
      "hasAudio": true
    }
    ...
  ]
}</pre>
</body>
</html>`;

export default {
  async fetch(request: Request): Promise<Response> {
    const url    = new URL(request.url);
    const ytUrl  = url.searchParams.get("url");
    const fmt    = url.searchParams.get("fmt") ?? "full";

    const cors = {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS")
      return new Response(null, { status: 204, headers: cors });

    if (!ytUrl)
      return new Response(HTML_HELP, {
        headers: { "Content-Type": "text/html;charset=UTF-8", ...cors }
      });

    if (!isYouTubeUrl(ytUrl))
      return Response.json(
        { error: "رابط يوتيوب غير صالح", url: ytUrl },
        { status: 400, headers: cors }
      );

    try {
      const info = await extractInfo(ytUrl);

      if (fmt === "urls") {
        const urls = info.formats
          .filter(f => f.url)
          .map(f => ({ id: f.id, quality: f.quality, ext: f.ext, url: f.url }));
        return Response.json({ videoId: info.videoId, title: info.title, urls }, { headers: cors });
      }

      if (fmt === "info") {
        const { formats: _f, ...meta } = info;
        return Response.json(meta, { headers: cors });
      }

      return Response.json(info, { headers: cors });

    } catch (err) {
      return Response.json(
        { error: err instanceof Error ? err.message : String(err) },
        { status: 500, headers: cors }
      );
    }
  },
};
