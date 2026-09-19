# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-19.

## Baseline
- Public repositories discovered this run: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-` (authenticated owner permission: **admin**).
- Ahmd3301 originals are read-only and must never be modified.
- Secret **names/contracts** are inventoried, but secret values, credentials, cookies, signing material and tokens are never committed to this public repository.
- External Supabase/D1/Redis contents are not considered copied merely because a public config references them.
- Every reused upstream must be isolated and pinned to an exact SHA.

## Complete repository inventory

|#|Repository|Tree SHA/state|Role|Decision|
|---:|---|---|---|---|
|1|testplyr|0d4d693d|Android player/extraction prototype|KEEP reference|
|2|TVNAI1.github.io|dac08043|Python/player HTML experiment|REVIEW|
|3|mediaplyr|59da5a8c|Android player shell|REVIEW|
|4|qq|aad023f5|Node bypass/server experiment|SECURITY REVIEW|
|5|url-shortener|e9f48dff|Next.js + Redis URL shortener|DROP core|
|6|snowy-mud-aaba|6000552a|Cloudflare Worker + SQL comments|DROP core|
|7|plyr-pages|1417a44a|Plyr/HLS/Shaka web player|KEEP|
|8|Omina|a75a1c9f|static HTML experiment|REVIEW|
|9|speed-test|39de2260|FaselHD benchmark/extraction farm|KEEP diagnostics|
|10|abcd|a29663f5|Node bypass/server experiment|SECURITY REVIEW|
|11|TVnai|f9479973|README-only|DROP unless docs add value|
|12|faselhd|1fd2cf49|JSON data|KEEP data reference|
|13|plyr-native|cf4dbbd9|Plyr-to-native generators|KEEP generators; exclude node_modules|
|14|cfyt|3924dd6e|Cloudflare/TS YouTube extractor|OPTIONAL|
|15|my-project|d604fb35|devcontainer/README|DROP|
|16|videoplyrio-android|51edaaf5|native Android player/extractor/router/PiP|KEEP HIGH|
|17|Play|5f592d62|static player/test HTML|REVIEW|
|18|my-website|f578c388|mirrored static web assets|DROP core|
|19|test|b65eb12d|Android WebView/Plyr/Shaka prototype|KEEP reference|
|20|ostora-edge-api|5bc7eaa0|edge API + series routes + UI|KEEP HIGH|
|21|api123|8078bcef|HTML apps/player assets|UI review only|
|22|yt-telegram-bot|b0d976af|Worker + Redis + Actions media pipeline|KEEP architecture|
|23|video-player|4b766838|Capacitor/Android player|REVIEW|
|24|TVNAI3|f92e8ccc|README-only|DROP unless docs useful|
|25|yt-extract-cli|b0244b3f|YouTube extraction CLI|OPTIONAL|
|26|video.plyr.io|c6f2220f|Android WebView HLS/Plyr/Shaka|KEEP reference|
|27|TVNAI2|5a74aaa0|small static UI|REVIEW|
|28|Plyr.io|81432335|Android Plyr shell|REVIEW|
|29|FaselHD.DB|fa2dc048|legacy scraper + JSON + Action|KEEP history/data|
|30|app|4a9222fb|Node Docker bypass/server|SECURITY REVIEW|
|31|plyr|27765233|Android player shell|REVIEW|
|32|NETFLIX|ca734f4e|Netflix-style static UI|UI review|
|33|VideoPlyrApp|ca34d1dc|native HTTP/extractor/player/playlist|KEEP HIGH|
|34|NAI.github.io|917c6f5c|Jekyll Pages scaffold|DROP core|
|35|KickStream-Actions-Orchestrator|05d9ceb5|Actions stream orchestrator|OPTIONAL LIVE|
|36|TV|3f6d22e4|README-only|DROP unless docs useful|
|37|faselhd-db|bae47dfe|FaselHD/TopCinma/Ostora indexer + Supabase sync|KEEP CRITICAL|
|38|vplyr-live-v2|26cec450|Worker/D1 HLS live engine|KEEP HIGH|
|39|VideoPlyr|a9227fcf4b78cf3e50f81aa90eb9eba73992201a|Media3/ExoPlayer + extractor/deep links|KEEP CRITICAL; **PINNED SUBSET IMPORTED**|
|40|kuhel-test-one|9edfa13b|built web/TON artifacts|DROP|
|41|Netflix.github.io|c908d730|README-only|DROP|
|42|plyrio|EMPTY|empty|DROP|
|43|fasel-db|50e70b3d|Scrapy FaselHD indexer|KEEP historical|
|44|FaselHDBot|e640fac0|FaselHD HLS extraction/farm|KEEP CRITICAL|
|45|vplyr-live-engine|cb5f67e7|Worker/D1/Actions live HLS|KEEP CRITICAL|
|46|yt-info|825fa28a|TS YouTube extraction library|OPTIONAL|
|47|cfyb|EMPTY|empty|DROP|
|48|faselhdx-db|572e477d|legacy Scrapy indexer|KEEP history only|
|49|PlyrAndroid|ae5066fd|README/LICENSE|LICENSE REVIEW|

## This run: concrete integration progress

Pinned `Ahmd3301/VideoPlyr` at tree SHA `a9227fcf4b78cf3e50f81aa90eb9eba73992201a` under `upstream/Ahmd3301/VideoPlyr/`. Imported its Media3 dependency contract, native `PlayerController`, and `ExtractorEngine`. This is deliberately isolated upstream source, not yet Shabawi production code.

Deep audit findings: the player is Kotlin/Android using AndroidX Media3 ExoPlayer with HLS and DASH modules, tracks subtitles and video qualities, supports speed/seek/playlist behavior, and the extractor uses a hidden WebView/JavaScript bridge to discover `.m3u8` URLs. The extractor enables JavaScript, mixed content, and universal file URL access, so it **must not** be promoted unchanged into the Shabawi production layer. Treat it as a compatibility reference until origin allowlisting, network policy and bridge hardening are added.

Environment/database contracts are tracked separately in `inventory/ENVIRONMENT_AND_DATABASES.md`.

## Next integration order
1. Deep-audit and pin `videoplyrio-android` and `VideoPlyrApp`, then select one native playback baseline rather than carrying three competing players.
2. Deep-audit `faselhd-db` and `FaselHDBot`; import schemas/indexer logic and repository-hosted datasets that pass provenance/security review.
3. Compare `vplyr-live-engine` vs `vplyr-live-v2`; keep the superior implementation and preserve D1 migrations separately.
4. Build a Shabawi-owned adapter layer outside `upstream/`; never edit imported upstream copies during integration.
