# yt-info

أداة سطر أوامر لاستخراج معلومات فيديوهات يوتيوب + روابط التحميل المباشرة بجميع الجودات.

**لا تعتمد على أداة yt-dlp**. لا تحتاج إلى تثبيت yt-dlp أو Python أو أي أداة خارجية. كل شيء مكتوب في TypeScript ويعمل على Node.js فقط.

## المميزات

- استخراج البيانات الوصفية: العنوان، القناة، المشاهدات، الإعجابات، تاريخ النشر، الوصف
- روابط تحميل مباشرة لجميع الجودات (144p حتى 2160p60) + الصوت فقط
- لا يعتمد على yt-dlp, ffmpeg, أو Python
- حجم صغير، لا توجد dependencies خارجية

## التثبيت في Termux

```
pkg update
pkg install nodejs git
git clone https://github.com/Ahmd3301/yt-info
cd yt-info
npm install
npm run build
```

## طريقة الاستخدام

```
node dist/index.js <رابط الفيديو>
```

### خيارات

| الأمر | الوصف |
|-------|-------|
| `node dist/index.js <URL>` | عرض البيانات والجودات في جدول |
| `node dist/index.js <URL> --json` | إخراج JSON كامل |
| `node dist/index.js <URL> --urls` | عرض روابط التحميل فقط |
| `node dist/index.js --help` | تعليمات |

### أمثلة

```
node dist/index.js https://youtu.be/kjcxV-Vjm50
node dist/index.js https://youtu.be/kjcxV-Vjm50 --json
node dist/index.js https://youtu.be/kjcxV-Vjm50 --urls
```

### مثال للمخرجات

```
Title:     شاب كندي يسبب مشاكل أمنية للحكومة والذكاء الاصطناعي يحل المستحيل!
Channel:   UTD Saudi فيصل السيف
Video ID:  kjcxV-Vjm50
Duration:  18:11
Views:     47,329
Likes:     912
Published: 2026-05-25T11:00:27-07:00
Thumbnail: https://i.ytimg.com/vi/kjcxV-Vjm50/maxresdefault.jpg

----------------------------------------------------------------
ID    Quality   Resolution    Codec             Size     URL
----------------------------------------------------------------
18    360p      640x360       avc1.42001E,...   53.2 MB  ✓
315   2160p60   3840x2160     vp9               1.83 GB  ✓
... (30 formats, all with direct URLs)
```

## كيف يعمل

1. يجلب صفحة HTML الخاصة بالفيديو ويستخرج البيانات الوصفية
2. يستخدم InnerTube API مع عميل `ANDROID_VR` (إصدار 1.65.10) للحصول على روابط مباشرة بدون تشفير
3. إذا فشل العميل الأول، يجرب عملاء آخرين (WEB, ANDROID, IOS, TVHTML5)

## الفرق عن yt-dlp

| الخاصية | yt-dlp | yt-info |
|----------|--------|---------|
| لغة البرمجة | Python | TypeScript / Node.js |
| dependencies | yt-dlp + Python + ffmpeg | Node.js فقط |
| الحجم | ~30 MB | ~200 KB (بدون node_modules) |
| السرعة | أبطأ (يستخدم JS runtime لفك التشفير) | أسرع (يستخدم ANDROID_VR بدون تشفير) |
| التثبيت في Termux | `pkg install python ffmpeg` + pip | `pkg install nodejs` فقط |
