# cfyb — YouTube Info API (Cloudflare Worker)

أداة استخراج بيانات يوتيوب كـ Cloudflare Worker — بدون yt-dlp، بدون Python.

## الاستخدام

```
GET /?url=<رابط_يوتيوب>
GET /?url=<رابط_يوتيوب>&fmt=urls
GET /?url=<رابط_يوتيوب>&fmt=info
```

## النشر

```bash
npm install
npx wrangler login
npx wrangler deploy
```
