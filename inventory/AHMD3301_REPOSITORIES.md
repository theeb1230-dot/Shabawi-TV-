# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-19.

## Verified baseline
- Public repositories discovered this run: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-`.
- Ahmd3301 originals are never modified.
- Important distinction: **49 inventoried does not mean 49 copied**.
- Upstreams physically represented under `upstream/Ahmd3301/`: **20**.
- Secret names/configuration contracts may be recorded, but secret values/tokens/cookies/private credentials are not committed to this public repository.
- External Supabase/D1/Redis data is not considered transferred without authorized access to that external service.

## Complete inventory verified from current repository trees

|#|Repository|Exact tree SHA/state|Observed code/assets|Shabawi decision|Physical upstream copy|
|---:|---|---|---|---|---|
|1|testplyr|0d4d693ddb342d453e04603107052a343ff2b1b8|Android/Compose; player assets; extraction rules; env example; tests; debug APK|KEEP HIGH reference|Yes|
|2|TVNAI1.github.io|dac08043fd21df27c3e9db9d12ac0048fe986e2e|Python + player HTML|REVIEW|No|
|3|mediaplyr|59da5a8cdcc945858092874266b112d18188f165|Android Kotlin shell + build workflow|REVIEW|No|
|4|qq|aad023f56719ac81275e6fca9124dc76ed707883|Node/Docker bypass server|SECURITY REVIEW|No|
|5|url-shortener|e9f48dff78674b4c3b31fcdb3b76b259c2b2319e|Next.js API + Redis|DROP core|No|
|6|snowy-mud-aaba|6000552a8c15b98378383047634ec8488e8d2a44|Cloudflare Worker/TS + SQL comments migration|DROP core|No|
|7|plyr-pages|1417a44adbc444441a8b045dc22dcbc5904f2f79|Plyr/HLS/Shaka web player assets|KEEP web-player reference|Yes|
|8|Omina|a75a1c9f9f62c5ba57a21974573a132146a2bfcc|Static HTML|REVIEW UI|No|
|9|speed-test|39de226085a733c7e4453639c71a494042de7318|FaselHD workflows; Python farm/Redis mini; benchmarks; Telegram upload|KEEP diagnostics/architecture|Yes|
|10|abcd|a29663f564694e7b43db77e6662d83e0318a11ea|Node/Docker bypass server|SECURITY REVIEW|No|
|11|TVnai|f94799737839abbd580476237d1c2192f3b3b256|README only|DROP code|No|
|12|faselhd|1fd2cf4992eb616647188f564f64b0dee7a9da54|JSON datasets|KEEP data reference|Yes|
|13|plyr-native|cf4dbbd9dd87d64f5fa1a1d36c4bc7d933c55bcc|JS generators converting Plyr assets toward Compose; workflow; vendored node_modules|KEEP generators, exclude node_modules|Yes|
|14|cfyt|3924dd6ea15daac83b35b48e4e7c414041d7614b|Cloudflare/TypeScript extractor library/worker|OPTIONAL provider|Yes|
|15|my-project|d604fb35a7d36f3dc4184d3bab29f73b6f8b000a|Devcontainer + README|DROP|No|
|16|videoplyrio-android|51edaaf5cb4904a4109e5dfa5ddc4d3b3dbbb414|Compose/Media3 player, router, extraction, PiP|KEEP CRITICAL; Android baseline|Yes|
|17|Play|5f592d62b079d6335f3ce0db8b60bfd02c77e2b3|Static player/test HTML|REVIEW|No|
|18|my-website|f578c3883737035a5b8f84d1c7fa5a2798a62638|Mirrored static web/analytics assets|DROP core|No|
|19|test|b65eb12d0cd228f1e0acd043d9f645a6e300c0c4|Android WebView/Plyr/Shaka + workflow|KEEP reference|Yes|
|20|ostora-edge-api|5bc7eaa0835650ecf8f157482c6b54bf3f02cae5|Cloudflare Pages Functions provider + RTL PWA|KEEP HIGH provider reference|Yes|
|21|api123|8078bcefecd146ac76faffb603a90d2363b069f8|HTML apps, Quran audio JSON, media UI SVGs|UI/content review|No|
|22|yt-telegram-bot|b0d976afd447dbfdc85f29afb933864954df9d50|Worker/TS + Redis + Telegram + GitHub Actions pipeline|KEEP architecture|Yes|
|23|video-player|4b7668389372d3277ccb35f5defd5627d046c099|Capacitor/Android + HTML player + workflow|REVIEW|No|
|24|TVNAI3|f92e8cccef53df3c712ae2848b0deec9c2734265|README only|DROP code|No|
|25|yt-extract-cli|b0244b3f6c4c2d4da505fa54aed42b1f197615ac|TypeScript extraction CLI|OPTIONAL tooling|Yes|
|26|video.plyr.io|c6f2220f2549c7f213065c9561e1bd8af3e9d35d|Android WebView HLS/Plyr/Shaka + workflow|KEEP reference|No|
|27|TVNAI2|5a74aaa0a7985b8a12e68460164f9bd86e8bbb92|Small HTML/CSS/JS UI|REVIEW UI|No|
|28|Plyr.io|81432335b1b53fa0d6677f25be89c04623507a5a|Android Kotlin Plyr shell + workflow|REVIEW|No|
|29|FaselHD.DB|fa2dc0489beb7848d03f664637fa724796671acd|Python scraper + category JSON + scheduled workflow|KEEP history/data|Yes|
|30|app|4a9222fba7f37af899bffdab3a84e04836615d99|Node/Docker bypass server|SECURITY REVIEW|No|
|31|plyr|27765233549c82c86ae82a08e48664cec373c704|Android Kotlin player shell + workflow|REVIEW|No|
|32|NETFLIX|ca734f4ebb0cfcd5732c06257b1281c9a5fd0153|Static Netflix-style UI|UI reference|No|
|33|VideoPlyrApp|ca34d1dcb86ed8dd8151de2e04c025254ee20f75|Media3 player + native extractor|KEEP HIGH extractor reference|Yes|
|34|NAI.github.io|917c6f5caa8b9a7d1337001d982e84b36f102515|Jekyll/Pages scaffold + workflow|DROP core|No|
|35|KickStream-Actions-Orchestrator|05d9ceb500279fe82723aed6e2a3a95d6f0fd7ba|GitHub Actions stream orchestrator|OPTIONAL live|No|
|36|TV|3f6d22e45d1cff251166e83fc7089a9e3fb5bdf6|README only|DROP code|No|
|37|faselhd-db|bae47dfea05c41327960716af337a341413ea28e|FaselHD/TopCinma/Ostora indexer, snapshots, Supabase sync, tests/workflow|KEEP CRITICAL|Yes|
|38|vplyr-live-v2|26cec450d4bee06f1cee0d02899593fd4ed3bef7|Worker/D1 + FFmpeg Actions + Telegram HLS transport|KEEP CRITICAL; live baseline|Yes|
|39|VideoPlyr|a9227fcf4b78cf3e50f81aa90eb9eba73992201a|Media3/ExoPlayer + extraction/deep links|KEEP CRITICAL reference|Yes|
|40|kuhel-test-one|9edfa13be71def772a6b397b25a8fa7c87b43c87|Built web/TON artifacts|DROP core|No|
|41|Netflix.github.io|c908d73092fc779d43afebe35a821a48a3eb7a1e|README only|DROP code|No|
|42|plyrio|EMPTY|Empty repository|DROP|No|
|43|fasel-db|50e70b3d5cd06c25b6bfd4ab1c5075a09966c07d|Scrapy FaselHD spiders + JSON + workflow|KEEP historical/reference|Yes|
|44|FaselHDBot|e640fac0c18ea382ec3779bf0a12018af11db0b9|FaselHD HLS extraction/farm|KEEP CRITICAL|Yes|
|45|vplyr-live-engine|cb5f67e78b118593457001f89d594de59a5a2c5b|Earlier Worker/D1/Actions HLS engine|KEEP history; superseded by v2|Yes|
|46|yt-info|825fa28ad1a0e877e5a5123e2ba30a967586d26e|TypeScript extraction library|OPTIONAL|Yes|
|47|cfyb|EMPTY|Empty repository|DROP|No|
|48|faselhdx-db|572e477d0532608f574ea41f1d160aac500f52d0|Legacy Scrapy indexer + JSON + workflow|KEEP history|No|
|49|PlyrAndroid|ae5066fd6d472ed70ac24129a9a01608cf79de6b|README/LICENSE only|LICENSE/reference review|No|

## Physical integration status
There are now **20** physically represented upstream directories under `upstream/Ahmd3301/`. Representation ranges from pinned provenance/contracts to selected source, migrations and workflows; it does not imply a byte-for-byte mirror.

Physically represented: `FaselHDBot`, `FaselHD.DB`, `VideoPlyr`, `VideoPlyrApp`, `cfyt`, `fasel-db`, `faselhd`, `faselhd-db`, `ostora-edge-api`, `plyr-native`, `plyr-pages`, `speed-test`, `test`, `testplyr`, `videoplyrio-android`, `vplyr-live-engine`, `vplyr-live-v2`, `yt-extract-cli`, `yt-info`, `yt-telegram-bot`.

Repositories marked DROP remain inventory evidence rather than being copied just to inflate the directory count. KEEP/REVIEW repositories not represented remain integration work.

## Environment/database policy
Copy public schemas, migrations, example environment files, variable names, and configuration contracts when useful. Never commit live secret values, private tokens, cookies, signing material, or credentials into this public repository. External Supabase/D1/Redis contents require separately authorized access before they can truthfully be recorded as transferred.

## Next integration batch
1. Import the useful, non-redundant source from `testplyr`, `plyr-pages`, `speed-test`, `faselhd`, `plyr-native`, `test`, `yt-telegram-bot`, `video.plyr.io`, `FaselHD.DB`, and `fasel-db`, each isolated and pinned.
2. Keep generated binaries, vendored `node_modules`, duplicated player libraries, and credential material out of the aggregation tree.
3. Continue security review of `qq`, `abcd`, and `app` before any reuse.
4. Promote only proven components from upstream isolation into Shabawi-owned provider/player code.