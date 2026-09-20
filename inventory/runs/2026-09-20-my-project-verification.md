# Ahmd3301 verification run — my-project

## Run truth
- Start `main`: `5aaaf6835b6a9e083ba9601cd5df2bb7da4eab38`
- Destination permission: `admin`
- Current public repositories discovered for `Ahmd3301`: `49`
- Repository-count drift: none detected
- Physical representation: `49/49`

## Closed P0-1/P0-3 slice
`Ahmd3301/my-project`:
- Default branch: `main`
- Commit: `d604fb35a7d36f3dc4184d3bab29f73b6f8b000a`
- Tree: `ce4a4c599328b4ae73498649c0706f108584085b`
- Recursive tree truncated: `false`
- Expected blobs: `2`
- Transferred exact: `2`
- Missing/blocked: `0`
- State: `FULL`

Byte-exact evidence:
- `.devcontainer/devcontainer.json`: upstream/destination blob `5dc2229e1964ee39a7f08c41a8643a916c51669d`
- `README.md`: upstream/destination blob `03b13172d41fc1515295405469e88de0040fef85`

Environment contract present in the devcontainer names `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `ANTHROPIC_BASE_URL`, and `GH_TOKEN`; no secret values are recorded here. This repository is configuration-only and does not establish application runtime evidence.

## Coverage
- Inventory Coverage: `30/49 = 61.2%`.
- Physical Representation: `49/49 = 100.0%`.
- Raw Mirror Completeness: project-wide percentage withheld until all 49 expected-blob denominators are current. Strict verified subset: `28/208 = 13.5%` byte-exact, `30` BLOCKED, `150` other missing/PARTIAL.
- Overall Verified Project Completion: `10.2%` under the fixed weighted model; no runtime/E2E/release credit added.

## Remaining highest blockers
1. P0-1: current exact commit/tree/blob recount for remaining `19/49` repositories.
2. P0-3: byte-exact safe raw mirroring, with blocked secrets represented only by contracts/provenance.
3. P0-4: current `faselhd-db` drift resync, then `plyr-native`.
4. P0-5/P0-6: environment/database contracts and attribution without secrets/external-state claims.
5. P0-7 remains gated on mirror/provenance completion.