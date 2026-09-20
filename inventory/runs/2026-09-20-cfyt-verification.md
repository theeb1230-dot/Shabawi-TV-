# Verification run: Ahmd3301/cfyt

Start main SHA: `63ae4f748855ba3f311db929f079de5441233d9b`

## Current upstream evidence

- Public repositories discovered for Ahmd3301: **49**
- Destination permission: **admin**
- Repository: `Ahmd3301/cfyt`
- Default branch: `main`
- Commit: `3924dd6ea15daac83b35b48e4e7c414041d7614b`
- Tree: `9215695d1b40204a0d144f45af9a61836eaffa44`
- Recursive tree truncated: `false`
- Expected blobs: **10**
- Exact transferred: **0**
- Missing/non-mirrored: **9**
- Blocked: **1** (`src/api.ts`, hard-coded API credential/key in upstream; value intentionally not reproduced)
- Status: **BLOCKED / PARTIAL**

The destination previously contained only `SOURCE.md`; that metadata file is not an upstream blob and receives no mirror credit. The old provenance also mislabeled the commit SHA as the tree SHA; this run corrects it. The configuration contract requires the API key to be supplied through a secret/environment binding. No DB schema/migration is present in the current upstream tree.

## Recalculated coverage

- Inventory Coverage: **35/49 = 71.4%** current-exact verified repositories.
- Physical Representation: **49/49 = 100.0%** destination directories.
- Strict currently-counted mirror subset: **30/234 = 12.8%** byte-exact. Project-wide Raw Mirror Completeness remains withheld until all 49 expected-blob denominators are current.
- Blocked blobs: **34** in the strict counted subset.
- Missing/PARTIAL non-blocked blobs: **170**.
- Overall Verified Project Completion: **10.7%** under the fixed weighted rubric; no runtime/E2E/release credit was added.

## Blockers

1. P0-1: verify exact current commit/tree/blob counts for the remaining **14/49** repositories.
2. P0-3: mirror safe upstream blobs byte-exact; `cfyt` has nine safe blobs still missing plus one blocked secret-bearing blob.
3. P0-4: re-count and synchronize changed upstreams, especially `faselhd-db` and `plyr-native`.
4. P0-5/P0-6: preserve environment/database contracts and license/provenance integrity while mirroring.
