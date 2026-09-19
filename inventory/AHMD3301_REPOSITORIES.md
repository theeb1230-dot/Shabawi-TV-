# Shabawi TV — Ahmd3301 upstream inventory

Refreshed from the public GitHub account Ahmd3301 on 2026-09-20.

## Verified baseline
- Public repositories discovered in the current account scan: **49**.
- Destination: `theeb1230-dot/Shabawi-TV-`.
- Ahmd3301 originals are never modified.
- Destination permission rechecked: `admin`.
- Physical representation is now **49/49**: every discovered upstream has a durable directory under `upstream/Ahmd3301/<repo>/`. A SOURCE.md-only directory remains PARTIAL and is never counted as a raw upstream blob.
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
|app|main|4a9222fba7f37af899bffdab3a84e04836615d99|69d3646b930a5afe22f84105b202fd219dba3ea1|7|0|7|BLOCKED|
|plyrio|main|EMPTY|EMPTY|0|0|0|EMPTY|
|cfyb|main|EMPTY|EMPTY|0|0|0|EMPTY|

## Security exceptions
- `NETFLIX`: the inspected application snapshot contains credential collection/exfiltration behavior plus embedded live-looking secret material. Its three application blobs remain BLOCKED; no secret value is reproduced.
- `app`: current tree has 7 blobs. Its operational source automates Cloudflare/Turnstile bypass and captures `cf_clearance` cookies to disk. The operational snapshot is therefore not republished. No cookie value, credential, token, or secret is recorded.

## Mirror evidence this run
- Start main: `dadaac40856ac6d63753c68fc42f99628abc8ee8`.
- Destination permission: `admin`.
- Current Ahmd3301 public-repository discovery: **49**.
- Added physical provenance directories for the eight previously unrepresented upstreams: `qq`, `abcd`, `app`, `my-website`, `api123`, `NAI.github.io`, `plyrio`, and `cfyb`.
- `plyrio` and `cfyb` remain EMPTY with zero upstream blobs; their SOURCE.md files are destination metadata only.
- `app` was re-read at current commit `4a9222fba7f37af899bffdab3a84e04836615d99`, tree `69d3646b930a5afe22f84105b202fd219dba3ea1`, expected blobs 7. It is BLOCKED 0/7 rather than falsely mirrored.
- `qq`, `abcd`, `my-website`, `api123`, and `NAI.github.io` are physically represented but remain PARTIAL until exact current raw comparison/transfer is completed.

## Coverage snapshot
- Inventory Coverage (strict current commit/tree/blob verification): **8/49 = 16.3%**. This deliberately does not inherit historical SHA-only rows.
- Physical Representation: **49/49 = 100.0%**.
- Raw Mirror Completeness: **not promoted to a final percentage in this run** because a fresh all-49 expected-blob denominator has not yet been completed. Verified exact FULL blobs in the current strict table: **18**; verified expected blobs represented by this strict table: **54**, of which **10 are BLOCKED** and 26 remain PARTIAL. This 18/54 subset is not the project-wide mirror percentage.
- Overall Verified Project Completion: **8.0%**. Inventory and physical representation improved, but product/runtime/test/release evidence remains largely absent and raw mirror is nowhere near complete.

## Coverage policy
Inventory Coverage is only current-SHA/tree/blob verified repositories divided by the 49 repositories discovered in the same run. Physical Representation counts destination upstream directories only. Raw Mirror Completeness counts only byte-identical upstream blobs; SOURCE.md is excluded unless it exists upstream. EMPTY repositories add zero to numerator and denominator. BLOCKED blobs remain in the expected denominator and are reported separately.

## P0 blockers
1. **P0-1:** finish current commit/tree/blob recount for all 49 repositories; historical rows are not accepted as current verification.
2. **P0-3:** byte-exact raw mirror all safe upstream blobs; preserve BLOCKED security exceptions explicitly.
3. **P0-4:** re-read and resync `faselhd-db`, then large `plyr-native`.
4. **P0-5/P0-6:** preserve environment/database contracts and license/provenance without secret values.
5. **P0-7:** no Shabawi-owned integration until raw mirror/provenance is complete to the allowed security boundary.

## Next-run targets
1. Recount a large batch of current upstream commit/tree/blob totals to drive Inventory Coverage toward 49/49.
2. Close safe small repositories FULL using byte-exact Git blobs.
3. Re-read `faselhd-db` current SHA/tree and compare its destination mirror before any FULL claim.
