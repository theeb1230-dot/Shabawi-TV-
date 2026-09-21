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
- Repository mirror state: `PARTIAL` pending gitlink provenance/materialization

## Verified transfer
All 26 upstream blobs are present byte-exact. The final two blobs were transferred with exact Git blob identity:
- `_config.yml` (`c99b42f9cdf0ea71b9f3ff8be04c9252aea348f5`)
- `tools/test.sh` (`331de1c3462f57cc66eeeb8f746420f15b0f7d0e`)

## Remaining provenance work
`assets/lib` is a gitlink rather than a blob and therefore is not included in the 26-blob Raw Mirror denominator. It points at `b9e18a1510e3be5de250ed34205da318b76474e0` and still requires explicit submodule provenance/materialization handling before the repository-level mirror can be considered fully complete.

## Environment / security
The current upstream is a Jekyll/GitHub Pages-style site. No secret value was copied or introduced. `SOURCE.md` is Shabawi-owned provenance metadata and is not counted as an upstream blob.
