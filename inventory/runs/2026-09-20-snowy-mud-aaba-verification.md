# Verification run: Ahmd3301/snowy-mud-aaba

Start main SHA: `65f8850a981bc7ff70519083b0a20ca95e66fa39`

## Current upstream evidence

- Public repositories discovered for Ahmd3301: **49**
- Destination permission: **admin**
- Repository: `Ahmd3301/snowy-mud-aaba`
- Default branch: `main`
- Commit: `6000552a8c15b98378383047634ec8488e8d2a44`
- Tree: `33e9c63d18ae24671aa3177b371a679aed78e737`
- Recursive tree truncated: `false`
- Expected blobs: **10**
- Exact transferred: **0**
- Missing/non-exact: **10**
- Blocked: **0**
- Status: **PARTIAL**

The destination already had physical counterparts for the ten upstream paths, but current Git blob SHAs do not match upstream. Several top-level copies are one byte shorter, consistent with newline normalization. Presence alone therefore earns no raw-mirror credit. The upstream includes a D1 migration/config contract; external D1 state is not represented by the Git tree and is not claimed as transferred. No LICENSE/NOTICE blob exists in this exact tree.

## Recalculated coverage

- Inventory Coverage: **36/49 = 73.5%** current-exact verified repositories.
- Physical Representation: **49/49 = 100.0%** destination directories.
- Strict currently-counted mirror subset: **30/244 = 12.3%** byte-exact. Project-wide Raw Mirror Completeness remains withheld until all 49 expected-blob denominators are current.
- Blocked blobs: **34** in the strict counted subset.
- Missing/PARTIAL non-blocked blobs: **180**.
- Overall Verified Project Completion: **10.8%** under the fixed weighted rubric; no runtime/E2E/release credit was added.

## Blockers

1. P0-1: verify exact current commit/tree/blob counts for the remaining **13/49** repositories.
2. P0-3: replace normalized/non-exact physical copies with byte-exact upstream blobs; `snowy-mud-aaba` has 10 such blobs.
3. P0-4: re-count and synchronize changed upstreams, especially `faselhd-db` and `plyr-native`.
4. P0-5/P0-6: preserve D1/environment contracts and license/provenance integrity while mirroring.
