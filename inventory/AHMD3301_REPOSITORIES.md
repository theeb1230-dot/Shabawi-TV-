# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-20.

## Verified baseline
- Public repositories discovered in the current account scan: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-`.
- Ahmd3301 originals are never modified.
- Secret names/configuration contracts may be recorded, but secret values/tokens/cookies/private credentials are not committed to this public repository.
- External Supabase/D1/Redis data is not considered transferred without authorized access.

## Current-run verified records

|Repository|Default branch|Current commit|Tree|Expected blobs|Transferred exact|Missing|State|
|---|---|---|---|---:|---:|---:|---|
|PlyrAndroid|main|ae5066fd6d472ed70ac24129a9a01608cf79de6b|verified previously|3|3|0|FULL|
|TVNAI2|main|5a74aaa0a7985b8a12e68460164f9bd86e8bbb92|8588e70fe38f2c092a760479c627cf5aeb53baad|3|3|0|FULL|
|FaselHD.DB|main|fa2dc0489beb7848d03f664637fa724796671acd|1c3e6fc779f47d545861c2d5ce43a42a5175d15a|12|12|0|FULL|
|NETFLIX|main|ca734f4ebb0cfcd5732c06257b1281c9a5fd0153|510fbbfe258490917c1507ca36ec3d69fabc4b84|3|0|3|BLOCKED|
|NAI.github.io|main|917c6f5caa8b9a7d1337001d982e84b36f102515|9976d196a4b7b40d6ccd817ebde21bdb5a8669c9|26|0|26|PARTIAL|
|plyrio|main|EMPTY|EMPTY|0|0|0|EMPTY|
|cfyb|main|EMPTY|EMPTY|0|0|0|EMPTY|

## Security exception
`NETFLIX/script.js` was inspected and contains credential collection/exfiltration behavior plus embedded live-looking secret material. It is intentionally **not copied** into this public destination. The repository remains BLOCKED rather than being falsely called FULL. The blocked paths are `NETFLIX/index.html`, `NETFLIX/script.js`, and `NETFLIX/styles.css` as one inseparable unsafe application snapshot; no secret values are reproduced here.

## Mirror evidence this run
- Start main: `566f198c2dd0c886882d0e35ef9618689ca83072`.
- Destination permission rechecked: `admin`.
- Current Ahmd3301 public-repository discovery rechecked: **49**.
- `FaselHD.DB` was re-read at current commit/tree and all **12/12** upstream blobs were installed at their original paths using byte-exact blob identities. Its workflow preserves only the secret variable name `PAT_TOKEN`, never a value.
- `FaselHD.DB` current exact tree contains workflow, README, eight JSON category files, requirements, and scraper; missing = 0.
- `NETFLIX` was newly security-audited and moved to BLOCKED instead of being mirrored blindly.
- `NAI.github.io` was re-read at current commit/tree; it has **26 blobs plus one gitlink/submodule entry**. It remains PARTIAL pending raw transfer and explicit submodule provenance handling.

## Coverage policy
Inventory Coverage is only current-SHA verified repositories divided by the 49 repositories discovered in the same run. Physical Representation counts destination upstream directories only. Raw Mirror Completeness counts only byte-identical upstream blobs; SOURCE.md is excluded unless it exists upstream. EMPTY repositories add zero to numerator and denominator. BLOCKED blobs remain in the expected denominator and are reported separately.

## P0 blockers
1. **P0-1:** finish current commit/tree/blob recount for all 49 repositories; historical rows are not accepted as current verification.
2. **P0-2:** create physical representation for every remaining unrepresented repository without using SOURCE.md as a completeness claim.
3. **P0-3:** byte-exact raw mirror all safe upstream blobs; preserve BLOCKED security exceptions explicitly.
4. **P0-4:** re-read and resync `faselhd-db`, then large `plyr-native`.
5. **P0-5/P0-6:** preserve environment/database contracts and license/provenance without secret values.
6. **P0-7:** no Shabawi-owned integration until raw mirror/provenance is complete to the allowed security boundary.
