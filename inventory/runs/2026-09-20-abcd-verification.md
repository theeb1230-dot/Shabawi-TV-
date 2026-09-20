# Ahmd3301 verification run — abcd

## Run truth
- Start `main`: `3bcc49695e750526bd4dd9bc265e4e72d7a90bc0`
- Destination permission: `admin`
- Current public repositories discovered for `Ahmd3301`: `49`
- Repository-count drift: none detected
- Physical representation: `49/49`

## Closed P0-1 slice
`Ahmd3301/abcd`:
- Default branch: `main`
- Commit: `a29663f564694e7b43db77e6662d83e0318a11ea`
- Tree: `be67c6fa860a2fb2e62ae4f3589d878ee710aac0`
- Recursive tree truncated: `false`
- Expected blobs: `6`
- Transferred exact: `0`
- Missing/blocked: `6`
- State: `BLOCKED`

Security review found operational browser automation explicitly designed to bypass Cloudflare/Turnstile and persist session cookies for reuse. Those operational blobs are not republished into this public mirror. The provenance record preserves exact commit/tree/count and the blocked reason without storing cookie, credential, token, or secret values.

## Revalidation performed
- `TVnai`: current upstream 1 blob; destination SHA matches exactly.
- `TV`: current upstream 1 blob; destination SHA matches exactly.
- `Netflix.github.io`: current upstream 1 blob; destination SHA matches exactly.
- `TVNAI2`: current upstream 3 blobs; all destination SHAs match exactly.
- `plyrio` and `cfyb`: GitHub reports empty repositories; zero expected blobs.

## Coverage
- Inventory Coverage: `28/49 = 57.1%`.
- Physical Representation: `49/49 = 100.0%`.
- Raw Mirror Completeness: project-wide percentage withheld until all 49 expected-blob denominators are current. Strict verified subset: `25/204 = 12.3%` byte-exact, `29` BLOCKED, `150` other missing/PARTIAL.
- Overall Verified Project Completion: `10.0%` under the fixed weighted model; no runtime/E2E/release credit added.

## Remaining highest blockers
1. P0-1: current exact commit/tree/blob recount for remaining `21/49` repositories.
2. P0-3: byte-exact safe raw mirroring.
3. P0-4: current `faselhd-db` drift resync, then `plyr-native`.
4. P0-5/P0-6: environment/database contracts and attribution without secrets/external state claims.
5. P0-7 remains gated on mirror/provenance completion.
