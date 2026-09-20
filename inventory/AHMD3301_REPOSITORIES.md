# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-20.

## Verified baseline
- Public repositories discovered in the current account scan: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-`.
- Ahmd3301 originals are never modified.
- Destination permission rechecked: `admin`.
- Physical representation: **49/49** under `upstream/Ahmd3301/<repo>/`; SOURCE.md-only remains PARTIAL/BLOCKED as applicable.
- Secret values/tokens/cookies/private credentials are not committed. Configuration variable names may be retained as contracts.

## Current-run verified records
|Repository|Default branch|Current commit|Tree|Expected blobs|Transferred exact|Missing|State|
|---|---|---|---|---:|---:|---:|---|
|PlyrAndroid|main|ae5066fd6d472ed70ac24129a9a01608cf79de6b|955b034b78ac6cd9f84864eced0ea9ef2b98fcf6|3|3|0|FULL|
|TVNAI2|main|5a74aaa0a7985b8a12e68460164f9bd86e8bbb92|8588e70fe38f2c092a760479c627cf5aeb53baad|3|3|0|FULL|
|FaselHD.DB|main|fa2dc0489beb7848d03f664637fa724796671acd|1c3e6fc779f47d545861c2d5ce43a42a5175d15a|12|12|0|FULL|
|NETFLIX|main|ca734f4ebb0cfcd5732c06257b1281c9a5fd0153|510fbbfe258490917c1507ca36ec3d69fabc4b84|3|0|3|BLOCKED|
|NAI.github.io|main|917c6f5caa8b9a7d1337001d982e84b36f102515|9976d196a4b7b40d6ccd817ebde21bdb5a8669c9|26|0|26|PARTIAL|
|app|main|4a9222fba7f37af899bffdab3a84e04836615d99|69d3646b930a5afe22f84105b202fd219dba3ea1|7|0|7|BLOCKED|
|plyrio|main|EMPTY|EMPTY|0|0|0|EMPTY|
|cfyb|main|EMPTY|EMPTY|0|0|0|EMPTY|
|cfyt|main|3924dd6ea15daac83b35b48e4e7c414041d7614b|9215695d1b40204a0d144f45af9a61836eaffa44|10|0|10|BLOCKED|
|yt-extract-cli|master|b0244b3f6c4c2d4da505fa54aed42b1f197615ac|6f1bd0a789a5d5bbcb3e2b99554c2aff4be1f7e5|9|0|9|PARTIAL|
|yt-info|main|825fa28ad1a0e877e5a5123e2ba30a967586d26e|286e54f3f4020c810437908a56e608ab024a2854|11|0|11|PARTIAL|
|mediaplyr|main|59da5a8cdcc945858092874266b112d18188f165|9bafc80b13c7bd31d4e3b1f8da49cc56eb938155|4|0|4|PARTIAL|
|TVNAI3|main|f92e8cccef53df3c712ae2848b0deec9c2734265|5742b81180f172e6869096a534c2c2fab98e63f9|1|1|0|FULL|
|Netflix.github.io|main|c908d73092fc779d43afebe35a821a48a3eb7a1e|b7e51513514b8006121ada489a3fb10c7addbd0f|1|1|0|FULL|
|TV|main|3f6d22e45d1cff251166e83fc7089a9e3fb5bdf6|a0037b164c001859cd5c1436779d8369899a71db|1|1|0|FULL|
|TVnai|main|f94799737839abbd580476237d1c2192f3b3b256|a0037b164c001859cd5c1436779d8369899a71db|1|1|0|FULL|
|my-project|main|d604fb35a7d36f3dc4184d3bab29f73b6f8b000a|ce4a4c599328b4ae73498649c0706f108584085b|2|2|0|FULL|
|TVNAI1.github.io|main|dac08043fd21df27c3e9db9d12ac0048fe986e2e|98c42622e2a3c6f2e3b594effde617aa7ee8034a|2|1|1|BLOCKED|
|Omina|main|a75a1c9f9f62c5ba57a21974573a132146a2bfcc|ef93ebe632639bfa504b0fe73510335c2c4753a6|2|0|2|PARTIAL|
|plyr-pages|master|1417a44adbc444441a8b045dc22dcbc5904f2f79|963eaeeb1c5223b66f2651224200a58d6a40d130|18|0|18|PARTIAL|
|url-shortener|master|e9f48dff78674b4c3b31fcdb3b76b259c2b2319e|700d857cbbf0e006de3c67b54ad7afc3d02acc12|9|0|9|PARTIAL|
|snowy-mud-aaba|main|6000552a8c15b98378383047634ec8488e8d2a44|33e9c63d18ae24671aa3177b371a679aed78e737|9|0|9|PARTIAL|
|FaselHDBot|main|e640fac0c18ea382ec3779bf0a12018af11db0b9|c2b31a0fea507e01b6bba1f7d649041822d9a1f6|11|0|11|PARTIAL|
|speed-test|main|39de226085a733c7e4453639c71a494042de7318|2668e6b028e2386c0e88b775c99a71eb2b81649d|16|0|16|PARTIAL|
|vplyr-live-v2|main|26cec450d4bee06f1cee0d02899593fd4ed3bef7|da8fe559da4865e45c96cc1662a2d4c00b0ccdd0|14|0|14|PARTIAL|
|vplyr-live-engine|main|cb5f67e78b118593457001f89d594de59a5a2c5b|c4762cb1420744a1a2a7a70434564f61c7a7dcec|14|0|14|PARTIAL|
|qq|main|aad023f56719ac81275e6fca9124dc76ed707883|b549993689ab95496d47514af32709df1c7a0132|8|0|8|BLOCKED|
|abcd|main|a29663f564694e7b43db77e6662d83e0318a11ea|be67c6fa860a2fb2e62ae4f3589d878ee710aac0|6|0|6|BLOCKED|

## Security exceptions
- `NETFLIX`: inspected snapshot contains credential collection/exfiltration behavior plus embedded live-looking secret material; 3 blobs remain BLOCKED.
- `app`: operational source automates Cloudflare/Turnstile bypass and captures `cf_clearance`; 7 blobs remain BLOCKED.
- `cfyt`: current tree has 10 blobs, but `src/api.ts` embeds a live-looking API credential; raw publication is BLOCKED.
- `TVNAI1.github.io/main.py`: contains an embedded Telegram bot token. `player.html` is mirrored byte-exact; the token-bearing blob is not republished.
- `qq`: operational Cloudflare/Turnstile bypass and protected-session cookie reuse; 8 blobs remain BLOCKED at the public-mirror security boundary.
- `abcd`: operational browser automation explicitly bypasses Cloudflare/Turnstile and persists session cookies for reuse; 6 blobs remain BLOCKED at the public-mirror security boundary.

## Mirror evidence this run
- Start main: `3bcc49695e750526bd4dd9bc265e4e72d7a90bc0`.
- Destination permission rechecked: `admin`.
- Current Ahmd3301 discovery: **49 public repositories**; no repository-count drift detected.
- Re-verified destination baseline: all 49 upstream directories remain physically represented.
- Rechecked already mirrored small repositories against current upstream: `TVnai` is 1/1 byte-exact at commit `f94799737839abbd580476237d1c2192f3b3b256`; `TV` is 1/1 byte-exact at commit `3f6d22e45d1cff251166e83fc7089a9e3fb5bdf6`; `Netflix.github.io` is 1/1 byte-exact at commit `c908d73092fc779d43afebe35a821a48a3eb7a1e`; `TVNAI2` remains 3/3 byte-exact at commit `5a74aaa0a7985b8a12e68460164f9bd86e8bbb92`.
- Reconfirmed `plyrio` and `cfyb` return GitHub empty-repository state and therefore remain EMPTY with zero expected blobs.
- Newly closed P0-1 slice: `abcd`, default `main`, commit `a29663f564694e7b43db77e6662d83e0318a11ea`, tree `be67c6fa860a2fb2e62ae4f3589d878ee710aac0`, exactly 6 blobs in a non-truncated recursive tree. Because its operational code performs Cloudflare/Turnstile bypass and persists session cookies, raw publication is BLOCKED; provenance records the location/reason without copying operational bypass code or cookie values.

## Coverage snapshot
- Inventory Coverage: **28/49 = 57.1%** current commit/tree/blob verified in the strict table.
- Physical Representation: **49/49 = 100.0%**.
- Raw Mirror Completeness: **not yet promoted to a project-wide percentage** because a fresh expected-blob denominator for all 49 is still incomplete. In the strict verified subset, **25/204 blobs are byte-exact = 12.3%**, with **29 BLOCKED** and **150** other missing/PARTIAL. This subset ratio is evidence, not the project-wide ratio.
- Overall Verified Project Completion: **10.0%** under the fixed weighted model. No runtime/E2E/release credit was added.

## Coverage policy
Inventory Coverage is current-SHA/tree/blob verified repositories divided by the 49 repositories discovered in this run. Physical Representation counts destination upstream directories only. Raw Mirror Completeness counts only byte-identical upstream blobs; SOURCE.md is excluded unless it exists upstream. EMPTY repositories add zero to numerator and denominator. BLOCKED blobs remain in the expected denominator and are reported separately.

## P0 blockers
1. **P0-1:** finish current commit/tree/blob recount for the remaining **21 repositories**.
2. **P0-3:** byte-exact raw mirror independently safe upstream blobs; do not treat SOURCE.md as upstream content.
3. **P0-4:** resync current `faselhd-db` after upstream drift, then large `plyr-native`.
4. **P0-5/P0-6:** preserve environment/database contracts and license/provenance without secret values or external state claims.
5. **P0-7:** no Shabawi-owned integration until raw mirror/provenance reaches the allowed security boundary.

## Next-run targets
1. Recount another batch toward 49/49 current verification, prioritizing small repositories that can be closed FULL or EMPTY quickly.
2. Close safe small repositories FULL only after destination blob SHA equality is demonstrated.
3. Recount/resync `faselhd-db` current tree without treating its frequently changing generated data as static.
