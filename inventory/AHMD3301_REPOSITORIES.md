# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-20.

## Verified baseline
- Public repositories discovered in the current account scan: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-`.
- Ahmd3301 originals are never modified.
- Destination permission rechecked: `admin`.
- Physical representation: **49/49** under `upstream/Ahmd3301/<repo>/`; SOURCE.md-only remains PARTIAL.
- Secret values/tokens/cookies/private credentials are not committed. Configuration variable names may be retained as contracts.

## Current-run verified records
|Repository|Default branch|Current commit|Tree|Expected blobs|Transferred exact|Missing|State|
|---|---|---|---|---:|---:|---:|---|
|PlyrAndroid|main|ae5066fd6d472ed70ac24129a9a01608cf79de6b|verified previously|3|3|0|FULL|
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

## Security exceptions
- `NETFLIX`: inspected snapshot contains credential collection/exfiltration behavior plus embedded live-looking secret material; 3 blobs remain BLOCKED.
- `app`: operational source automates Cloudflare/Turnstile bypass and captures `cf_clearance`; 7 blobs remain BLOCKED.
- `cfyt`: current tree has 10 blobs, but `src/api.ts` embeds a live-looking API credential. Raw publication is BLOCKED until a safe provenance representation can record the location/contract without republishing the value.

## Mirror evidence this run
- Start main: `4e3bf3bdb981c549e13e00da7804eef6ccb57ae3`.
- Current Ahmd3301 discovery: **49 public repositories**; destination permission: `admin`.
- Repaired byte-exact drift in `TVNAI3/README.md`, `TV/README.md`, `TVnai/README.md`, and both upstream files in `my-project`; destination blob SHAs now equal upstream blob SHAs.
- `Netflix.github.io/README.md` was rechecked and was already byte-exact.
- Newly recounted current upstreams: cfyt 10 blobs, yt-extract-cli 9, yt-info 11, mediaplyr 4, TVNAI3 1, Netflix.github.io 1, TV 1, TVnai 1, my-project 2.
- No external database content is claimed transferred.

## Coverage snapshot
- Inventory Coverage: **17/49 = 34.7%** current commit/tree/blob verified in the current strict table.
- Physical Representation: **49/49 = 100.0%**.
- Raw Mirror Completeness: **not yet promoted to a project-wide percentage** because a fresh expected-blob denominator for all 49 is still incomplete. In the strict verified subset, **24/95 blobs are byte-exact**, with **20 BLOCKED** and 51 other missing/PARTIAL. The 24/95 subset is evidence, not the project-wide ratio.
- Overall Verified Project Completion: **9.0%**. Inventory evidence and exact mirroring improved; integration/runtime/test/release evidence remains largely absent.

## Coverage policy
Inventory Coverage is current-SHA/tree/blob verified repositories divided by the 49 repositories discovered in this run. Physical Representation counts destination upstream directories only. Raw Mirror Completeness counts only byte-identical upstream blobs; SOURCE.md is excluded unless it exists upstream. EMPTY repositories add zero to numerator and denominator. BLOCKED blobs remain in the expected denominator and are reported separately.

## P0 blockers
1. **P0-1:** finish current commit/tree/blob recount for the remaining 32 repositories.
2. **P0-3:** byte-exact raw mirror safe upstream blobs; preserve security exceptions explicitly.
3. **P0-4:** re-read/resync `faselhd-db`, then large `plyr-native`.
4. **P0-5/P0-6:** preserve environment/database contracts and license/provenance without secret values.
5. **P0-7:** no Shabawi-owned integration until raw mirror/provenance reaches the allowed security boundary.

## Next-run targets
1. Recount another large batch toward 49/49 current verification.
2. Close safe small repositories FULL using upstream blob equality, not text similarity.
3. Re-read `faselhd-db` current SHA/tree and compare destination before any FULL claim.
