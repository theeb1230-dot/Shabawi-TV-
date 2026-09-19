# Shabawi TV — Ahmd3301 upstream inventory

Generated from the public GitHub account Ahmd3301 on 2026-09-19.

## Baseline
- Public repositories discovered: **49**
- Destination: `theeb1230-dot/Shabawi-TV-`
- Destination was empty at baseline.
- Rule: never modify Ahmd3301 originals; never copy credentials/tokens/secrets.
- External Supabase/D1/Redis contents are not considered copied merely because source code references them.
- Keep exact upstream source and tree SHA before reuse.

## Repositories

| # | Repository | Tree SHA / state | Preliminary role | Shabawi TV decision |
|---|---|---|---|---|
|1|testplyr|0d4d693d|Android player prototype, extraction rules, Plyr/Shaka assets|KEEP: player reference; exclude debug APK/keystore material|
|2|TVNAI1.github.io|dac08043|Python/player HTML experiment|REVIEW|
|3|mediaplyr|59da5a8c|minimal Android MediaPlyr shell|REVIEW|
|4|qq|aad023f5|Node server/bypass experiment|REVIEW SECURITY before reuse|
|5|url-shortener|e9f48dff|Next.js URL shortener + Redis|DROP from core; unrelated|
|6|snowy-mud-aaba|6000552a|Cloudflare Worker + SQL comments table|DROP from core unless Worker patterns needed|
|7|plyr-pages|1417a44a|web Plyr/HLS/Shaka player assets|KEEP: web-player reference|
|8|Omina|a75a1c9f|static HTML experiment|REVIEW|
|9|speed-test|39de2260|FaselHD extraction/download/Telegram benchmarks|KEEP: diagnostics/reference|
|10|abcd|a29663f5|Node server/bypass experiment|REVIEW SECURITY|
|11|TVnai|f9479973|README-only|DROP unless documentation proves relevance|
|12|faselhd|1fd2cf49|JSON data (mf/sf)|KEEP DATA REFERENCE|
|13|plyr-native|cf4dbbd9|Plyr-to-native/Compose generators; vendor node_modules committed|KEEP source/generators, DROP vendored node_modules|
|14|cfyt|3924dd6e|Cloudflare/TypeScript YouTube extraction worker|OPTIONAL: authorized YouTube provider reference|
|15|my-project|d604fb35|devcontainer + README only|DROP|
|16|videoplyrio-android|51edaaf5|Android native player/extractor/router/PiP/UI|KEEP HIGH VALUE|
|17|Play|5f592d62|static player/test HTML|REVIEW|
|18|my-website|f578c388|static mirrored web assets|DROP from core|
|19|test|b65eb12d|Android WebView/Plyr/Shaka prototype|KEEP reference, likely superseded|
|20|ostora-edge-api|5bc7eaa0|edge API + series routes + Arabic PWA/player|KEEP HIGH VALUE|
|21|api123|8078bcef|HTML apps/player icons/Quran data|DROP from TV core; review player UI assets only|
|22|yt-telegram-bot|b0d976af|Telegram + Cloudflare Worker + Redis + GitHub Actions media pipeline|KEEP architecture reference|
|23|video-player|4b766838|Capacitor/Android video player|REVIEW; likely superseded|
|24|TVNAI3|f92e8ccc|README-only|DROP unless relevant docs|
|25|yt-extract-cli|b0244b3f|yt-dlp based YouTube metadata/direct-format CLI|OPTIONAL provider tooling|
|26|video.plyr.io|c6f2220f|Android WebView player with HLS/Plyr/Shaka assets|KEEP reference; likely superseded|
|27|TVNAI2|5a74aaa0|small static web UI|REVIEW|
|28|Plyr.io|81432335|Android Plyr WebView shell|REVIEW; likely superseded|
|29|FaselHD.DB|fa2dc048|legacy FaselHD scraper + category JSON + Action|KEEP DATA/INDEXER history|
|30|app|4a9222fb|Node Docker bypass/server experiment|REVIEW SECURITY|
|31|plyr|27765233|Android player shell|REVIEW; likely superseded|
|32|NETFLIX|ca734f4e|static Netflix-style UI|REVIEW UI only|
|33|VideoPlyrApp|ca34d1dc|Android native HTTP/extractor/player/playlist app|KEEP HIGH VALUE|
|34|NAI.github.io|917c6f5c|Jekyll/GitHub Pages site scaffold|DROP from core; hosting reference only|
|35|KickStream-Actions-Orchestrator|05d9ceb5|GitHub Actions stream orchestrator|OPTIONAL LIVE reference|
|36|TV|3f6d22e4|README-only|DROP unless docs relevant|
|37|faselhd-db|bae47dfe|multi-source FaselHD/TopCinma/Ostora indexer + JSON + Supabase sync|KEEP CRITICAL|
|38|vplyr-live-v2|26cec450|FFmpeg/GitHub Actions + Cloudflare Worker/D1 HLS live engine|KEEP HIGH VALUE|
|39|VideoPlyr|a9227fcf|Media3/ExoPlayer Android player + extractor + deep links|KEEP CRITICAL|
|40|kuhel-test-one|9edfa13b|built static web/TON connect artifacts|DROP|
|41|Netflix.github.io|c908d730|README-only|DROP|
|42|plyrio|EMPTY|empty repository|DROP|
|43|fasel-db|50e70b3d|Scrapy FaselHD indexer + category JSON|KEEP historical/reference; superseded by faselhd-db|
|44|FaselHDBot|e640fac0|FaselHD episode/player/HLS extraction + worker farm/Telegram|KEEP CRITICAL|
|45|vplyr-live-engine|cb5f67e7|live HLS engine + Worker/D1/Actions|KEEP CRITICAL; compare with v2 before dedupe|
|46|yt-info|825fa28a|TypeScript YouTube metadata/extraction library|OPTIONAL provider reference|
|47|cfyb|EMPTY|empty repository|DROP|
|48|faselhdx-db|572e477d|legacy Scrapy FaselHD database/indexer|KEEP history only; superseded|
|49|PlyrAndroid|ae5066fd|README/LICENSE only|REVIEW LICENSE/reference|

## Current component map

### Critical content/discovery
- faselhd-db
- FaselHDBot
- ostora-edge-api

### Critical playback
- VideoPlyr
- VideoPlyrApp
- videoplyrio-android
- plyr-pages (web reference)

### Live
- vplyr-live-engine
- vplyr-live-v2
- KickStream-Actions-Orchestrator

### Historical indexers/data
- FaselHD.DB
- fasel-db
- faselhdx-db
- faselhd

### Optional YouTube
- cfyt
- yt-info
- yt-extract-cli
- yt-telegram-bot

## Next audit
1. Deep-read high-value repositories and compare duplicate implementations.
2. Record APIs/data contracts/database schemas.
3. Scan source for secrets before any upstream import.
4. Import only reviewed reusable source into isolated `upstream/Ahmd3301/<repo>/` directories.
5. Build the Shabawi TV product from selected components rather than mixing upstream roots.
