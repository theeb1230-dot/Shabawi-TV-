# Verification run: Ahmd3301/url-shortener

Start main SHA: `87712c48d82781a1174fc604ff508cb709e1afa4`

## Current upstream evidence

- Public repositories discovered for Ahmd3301: **49**
- Repository: `Ahmd3301/url-shortener`
- Default branch: `master`
- Commit: `e9f48dff78674b4c3b31fcdb3b76b259c2b2319e`
- Tree: `700d857cbbf0e006de3c67b54ad7afc3d02acc12`
- Recursive tree truncated: `false`
- Expected blobs: **9**
- Exact transferred: **0**
- Missing/mismatched: **9**
- Blocked: **0**
- Status: **PARTIAL**

All nine paths physically exist at the destination, but SHA comparison shows all nine are non-identical to current upstream, so none is credited toward Raw Mirror Completeness. Existing destination files are one byte shorter than upstream copies. External Upstash Redis data is not available and is not claimed as mirrored; configuration contract uses `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` only.

## Recalculated coverage

- Inventory Coverage: **34/49 = 69.4%** current-exact verified repositories.
- Physical Representation: **49/49 = 100.0%** destination directories.
- Strict currently-counted mirror subset: **30/224 = 13.4%** byte-exact. Project-wide Raw Mirror Completeness remains withheld until all 49 expected-blob denominators are current.
- Blocked blobs remain **33** in the strict counted subset; missing/PARTIAL non-blocked blobs rise to **161**.
- Overall Verified Project Completion: **10.6%** under the fixed weighted rubric; no runtime/E2E/release credit was added.

## Blockers

1. P0-1: verify exact current commit/tree/blob counts for the remaining 15/49 repositories.
2. P0-3: replace mismatched raw mirrors byte-exact, starting with small safe repositories including this 9-blob repository.
3. P0-4: re-count and synchronize changed upstreams, especially `faselhd-db` and `plyr-native`.
4. P0-5/P0-6: preserve environment/database contracts and license/provenance integrity while mirroring.
