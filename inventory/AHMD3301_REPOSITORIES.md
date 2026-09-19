# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-19.

## Baseline
- Public repositories discovered this run: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-` (admin/writable).
- Ahmd3301 originals remain read-only and are never modified.
- Secret names/contracts are inventoried; secret values/tokens/cookies/signing material are not committed to this public repository.
- External Supabase/D1/Redis contents are not considered copied merely because a public config references them.
- Every reused upstream is isolated and pinned to an exact SHA.

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
|16|videoplyrio-android|51edaaf5cb4904a4109e5dfa5ddc4d3b3dbbb414|Compose/Media3 player, router, native+WebView extraction, PiP|KEEP HIGH; SELECTED ANDROID BASELINE|
|17|Play|5f592d62|static player/test HTML|REVIEW|
|18|my-website|f578c388|mirrored static web assets|DROP core|
|19|test|b65eb12d|Android WebView/Plyr/Shaka prototype|KEEP reference|
|20|ostora-edge-api|5bc7eaa0835650ecf8f157482c6b54bf3f02cae5|Cloudflare Pages Functions adapter + Arabic RTL PWA; series/rseries/moviesar/sports routes; XOR-normalized catalog/episode/live responses|KEEP HIGH; PINNED PROVIDER REFERENCE; server-side adaptation only|
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
|33|VideoPlyrApp|ca34d1dcb86ed8dd8151de2e04c025254ee20f75|Media3 player + OkHttp native Packer extractor|KEEP selected extractor reference; PINNED|
|34|NAI.github.io|917c6f5c|Jekyll Pages scaffold|DROP core|
|35|KickStream-Actions-Orchestrator|05d9ceb5|Actions stream orchestrator|OPTIONAL LIVE|
|36|TV|3f6d22e4|README-only|DROP unless docs useful|
|37|faselhd-db|bae47dfea05c41327960716af337a341413ea28e|FaselHD/TopCinma/Ostora indexer + Supabase sync|KEEP CRITICAL; PINNED|
|38|vplyr-live-v2|26cec450d4bee06f1cee0d02899593fd4ed3bef7|Worker/D1 + FFmpeg Actions + Telegram HLS transport|KEEP CRITICAL; SELECTED LIVE BASELINE; PINNED|
|39|VideoPlyr|a9227fcf4b78cf3e50f81aa90eb9eba73992201a|Media3/ExoPlayer + extractor/deep links|KEEP CRITICAL; PINNED reference|
|40|kuhel-test-one|9edfa13b|built web/TON artifacts|DROP|
|41|Netflix.github.io|c908d730|README-only|DROP|
|42|plyrio|EMPTY|empty|DROP|
|43|fasel-db|50e70b3d|Scrapy FaselHD indexer|KEEP historical|
|44|FaselHDBot|e640fac0c18ea382ec3779bf0a12018af11db0b9|FaselHD HLS extraction/farm|KEEP CRITICAL; PINNED|
|45|vplyr-live-engine|cb5f67e78b118593457001f89d594de59a5a2c5b|earlier Worker/D1/Actions live HLS baseline|KEEP HISTORY; SUPERSEDED BY v2 FOR INTEGRATION|
|46|yt-info|825fa28a|TS YouTube extraction library|OPTIONAL|
|47|cfyb|EMPTY|empty|DROP|
|48|faselhdx-db|572e477d|legacy Scrapy indexer|KEEP history only|
|49|PlyrAndroid|ae5066fd|README/LICENSE|LICENSE REVIEW|

## Integration progress

### Playback
`videoplyrio-android` remains the selected Android baseline. `VideoPlyr` and `VideoPlyrApp` remain isolated extraction/player references. Unsafe upstream WebView behavior is not promoted into production.

### Catalog/indexer
`faselhd-db` is pinned at `bae47dfea05c41327960716af337a341413ea28e`. It provides FaselHD/TopCinma/Ostora catalog snapshots and incremental synchronization contracts. `FaselHDBot` is pinned at `e640fac0c18ea382ec3779bf0a12018af11db0b9` for episode/player/HLS extraction and farm architecture.

### Ostora edge audit
`ostora-edge-api` is now pinned at `5bc7eaa0835650ecf8f157482c6b54bf3f02cae5` and recorded under `upstream/Ahmd3301/ostora-edge-api/`. Its Cloudflare Pages Functions expose `series`, `rseries`, `moviesar`, and `sports` routes. Catalog responses normalize to `id/name/thumbnail`; ID routes normalize episode/live records to `id/number/title/url/thumbnail/agent`. Catalog cache TTL is 3 hours and episode/live TTL is 1 hour. The upstream embeds source-specific endpoint/device/XOR configuration and wildcard CORS, so it is retained as a provider reference rather than promoted verbatim into production.

### Live baseline decision
`vplyr-live-v2` is selected and pinned at `26cec450d4bee06f1cee0d02899593fd4ed3bef7`. Compared with `vplyr-live-engine` (`cb5f67e78b118593457001f89d594de59a5a2c5b`), both retain the same initial D1 schema, package baseline and login worker, but v2 has changed/newer live Worker, runner, shared HLS/HTTP helpers, tests and workflow. The v2 runner performs three simultaneous FFmpeg renditions (1080p/720p/360p), six-second fMP4 HLS segments, bounded upload concurrency, stable-file checks and batched ingest. The Worker exposes master/variant playlists, D1-backed job/segment state, authenticated ingest/status endpoints and Telegram-backed segment proxying.

The D1 schema is preserved under `upstream/Ahmd3301/vplyr-live-v2/migrations/`. It defines `users`, `jobs`, `stream_variants`, and `segments`. Secret values are not copied into Git; required secret names are recorded and must be provisioned in destination GitHub/Cloudflare secret stores. Public configuration IDs do not imply access to external D1 contents.

### Shabawi-owned provider boundary
`docs/PROVIDER_CONTRACT.md` now defines stable `CatalogItem`, `Episode`, `PlaybackSource`, and `LiveChannel` models plus catalog/search/details/episodes/playback/live/health operations. This keeps Android/TV/iOS/Web clients independent of scraper HTML, Supabase service credentials, D1 internals, Telegram transport, source-specific XOR logic, and other upstream implementation details.

### Imported isolated references
- `upstream/Ahmd3301/VideoPlyr/` — pinned.
- `upstream/Ahmd3301/videoplyrio-android/` — pinned; router/native unpacker reference.
- `upstream/Ahmd3301/VideoPlyrApp/` — pinned; native extractor reference.
- `upstream/Ahmd3301/faselhd-db/` — pinned; catalog/Supabase contract reference.
- `upstream/Ahmd3301/FaselHDBot/` — pinned; extraction/farm source record.
- `upstream/Ahmd3301/vplyr-live-v2/` — pinned; selected live schema/HLS contract reference.
- `upstream/Ahmd3301/ostora-edge-api/` — pinned; provider/API contract reference.

Environment/database contracts remain in `inventory/ENVIRONMENT_AND_DATABASES.md`.

## Next integration order
1. Implement the first Shabawi-owned provider adapter outside `upstream/`, starting with repository-backed catalog snapshots so it can be tested without external credentials.
2. Add provider contract tests for normalization, failure isolation, URL validation and fallback ordering.
3. Build the Shabawi Android adapter/player layer combining direct routing + native extraction with hardened fallback.
4. Continue REVIEW/SECURITY REVIEW repositories and remove only redundant copies from the Shabawi aggregation tree, never from Ahmd3301 originals.
