# Upstream provenance

- Upstream: `Ahmd3301/qq`
- Default branch: `main`
- Exact commit: `aad023f56719ac81275e6fca9124dc76ed707883`
- Exact tree: `b549993689ab95496d47514af32709df1c7a0132`
- Expected upstream blobs: `8`
- Transferred byte-exact upstream blobs: `0`
- Missing upstream blobs: `8`
- Status: `BLOCKED`
- Raw mirror: incomplete

## Security / transfer boundary
The current upstream tree was recounted from the non-truncated recursive Git tree. It contains `.gitignore`, `Dockerfile`, `IMG-20260506-WA0008.jpg`, `README.md`, `bypass.js`, `package-lock.json`, `package.json`, and `server.js`.

`bypass.js` automates Cloudflare/Turnstile challenge interaction and captures `cf_clearance` cookies into local session material. `server.js` consumes those captured cookies to retry protected requests. Those operational bypass/session-capture blobs are not republished into this public mirror. The JPEG is a binary blob and is not silently treated as transferred. No cookie value, token, credential, or other secret is recorded here.

`SOURCE.md` is Shabawi provenance metadata and is not counted as an upstream blob. A future safe mirror pass may transfer independently reviewed benign blobs byte-exact while leaving prohibited/secret-bearing paths explicitly BLOCKED; FULL must not be claimed unless every expected upstream blob is either transferred under the project policy or the completion policy is explicitly revised.
