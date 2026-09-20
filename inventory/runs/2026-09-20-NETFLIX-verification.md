# Ahmd3301 verification run — NETFLIX

## Run truth
- Start `main`: `9efd22126b0a0f2a70c19ab151587959df3890d7`
- Destination permission: `admin`
- Current public repositories discovered for `Ahmd3301`: `49`
- Repository-count drift: none detected
- Physical representation: `49/49`

## Closed P0-1 slice
`Ahmd3301/NETFLIX`:
- Default branch: `main`
- Commit: `ca734f4ebb0cfcd5732c06257b1281c9a5fd0153`
- Tree: `510fbbfe258490917c1507ca36ec3d69fabc4b84`
- Recursive tree truncated: `false`
- Expected blobs: `3`
- Transferred exact: `0`
- Missing/blocked: `3`
- State: `BLOCKED`

Safety evidence: upstream `script.js` captures login credentials plus IP/device metadata and sends them to Telegram using embedded live-looking credentials. No operational phishing/exfiltration files or secret values were republished. Blocked paths are documented in the repository's `SOURCE.md`.

## Coverage
- Inventory Coverage: `31/49 = 63.3%`.
- Physical Representation: `49/49 = 100.0%`.
- Raw Mirror Completeness: project-wide percentage withheld until all 49 expected-blob denominators are current. Strict verified subset: `28/211 = 13.3%` byte-exact, `33` BLOCKED, `150` other missing/PARTIAL.
- Overall Verified Project Completion: `10.3%` under the fixed weighted model; no runtime/E2E/release credit added.

## Remaining highest blockers
1. P0-1: current exact commit/tree/blob recount for remaining `18/49` repositories.
2. P0-3: byte-exact safe raw mirroring, with unsafe or secret-bearing material represented only by provenance/block records.
3. P0-4: current `faselhd-db` drift resync, then `plyr-native`.
4. P0-5/P0-6: environment/database contracts and attribution without secrets/external-state claims.
5. P0-7 remains gated on mirror/provenance completion.
