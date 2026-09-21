# NAI.github.io upstream record

- Source: `Ahmd3301/NAI.github.io`
- Default branch: `main`
- Exact commit SHA: `917c6f5caa8b9a7d1337001d982e84b36f102515`
- Exact tree SHA: `9976d196a4b7b40d6ccd817ebde21bdb5a8669c9`
- Recursive tree truncated: `false`
- Expected upstream blobs: `26`
- Expected gitlinks/submodules: `1` (`assets/lib` at `b9e18a1510e3be5de250ed34205da318b76474e0`)
- Transferred byte-exact blobs: `26`
- Missing upstream blobs: `0`
- Blocked blobs: `0`
- Raw blob state: `FULL`
- Repository mirror state: `BLOCKED` only at gitlink materialization boundary; all upstream blobs are FULL

## Verified transfer
All 26 upstream blobs are present byte-exact. The final two blobs were transferred with exact Git blob identity:
- `_config.yml` (`c99b42f9cdf0ea71b9f3ff8be04c9252aea348f5`)
- `tools/test.sh` (`331de1c3462f57cc66eeeb8f746420f15b0f7d0e`)

## Gitlink provenance
The upstream `.gitmodules` file resolves `assets/lib` to the public repository `cotes2020/chirpy-static-assets`. The exact gitlink target `b9e18a1510e3be5de250ed34205da318b76474e0` was independently resolved in that repository and exists as a valid signed commit; its tree is `d30f0be7df596d6e0f82c216df016f014414cc6b`.

The gitlink is not an upstream blob and is therefore excluded from the 26-blob Raw Mirror denominator. Materializing the external repository inside this raw mirror would change the semantics from a gitlink to copied files, while the current GitHub connector cannot create a cross-repository gitlink object in the destination repository. The boundary is therefore explicitly recorded as BLOCKED rather than silently omitted or falsely marked FULL.

## Environment / security
The current upstream is a Jekyll/GitHub Pages-style site. No secret value was copied or introduced. `SOURCE.md` is Shabawi-owned provenance metadata and is not counted as an upstream blob.
