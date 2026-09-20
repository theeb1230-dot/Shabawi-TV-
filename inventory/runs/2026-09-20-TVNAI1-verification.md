# Ahmd3301 verification run — TVNAI1.github.io

## Run truth
- Start `main`: `e3b955de6256a86b902d50cf8c2f0199a01b51d2`
- Destination permission: `admin`
- Current public repositories discovered for `Ahmd3301`: `49`
- Repository-count drift: none detected
- Physical representation: `49/49`

## Closed P0-1 slice
`Ahmd3301/TVNAI1.github.io`:
- Default branch: `main`
- Commit: `dac08043fd21df27c3e9db9d12ac0048fe986e2e`
- Tree: `98c42622e2a3c6f2e3b594effde617aa7ee8034a`
- Recursive tree truncated: `false`
- Expected blobs: `2`
- Transferred exact: `1`
- Missing/blocked: `1`
- State: `BLOCKED`

`player.html` is byte-exact in the destination. `main.py` is intentionally not republished because upstream contains a hard-coded live credential. The value is not recorded here. The retained environment contract is: Telegram bot token required via secret/environment variable.

## Coverage
- Inventory Coverage: `29/49 = 59.2%`.
- Physical Representation: `49/49 = 100.0%`.
- Raw Mirror Completeness: project-wide percentage withheld until all 49 expected-blob denominators are current. Strict verified subset: `26/206 = 12.6%` byte-exact, `30` BLOCKED, `150` other missing/PARTIAL.
- Overall Verified Project Completion: `10.1%` under the fixed weighted model; no runtime/E2E/release credit added.

## Remaining highest blockers
1. P0-1: current exact commit/tree/blob recount for remaining `20/49` repositories.
2. P0-3: byte-exact safe raw mirroring, with blocked secrets represented only by contracts/provenance.
3. P0-4: current `faselhd-db` drift resync, then `plyr-native`.
4. P0-5/P0-6: environment/database contracts and attribution without secrets/external-state claims.
5. P0-7 remains gated on mirror/provenance completion.
