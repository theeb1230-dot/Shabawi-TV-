# Ahmd3301/url-shortener provenance

- Upstream: https://github.com/Ahmd3301/url-shortener
- Default branch: `master`
- Exact commit SHA: `e9f48dff78674b4c3b31fcdb3b76b259c2b2319e`
- Exact tree SHA: `700d857cbbf0e006de3c67b54ad7afc3d02acc12`
- Expected upstream blobs: **9**
- Byte-exact transferred blobs: **0**
- Missing/mismatched blobs: **9**
- Blocked blobs: **0**
- Status: **PARTIAL**

## Verification

The current destination already contains all nine upstream paths, but every destination blob SHA differs from the current upstream SHA (the existing copies are each one byte shorter, consistent with a missing final newline). Presence is therefore not counted as transfer completeness. `SOURCE.md` is provenance metadata and is not counted as an upstream blob.

## Environment contract

The code expects `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. No secret values are stored here. Redis contents are external state and are not claimed as mirrored.
