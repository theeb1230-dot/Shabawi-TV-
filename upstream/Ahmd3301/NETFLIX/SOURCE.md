# Upstream provenance — Ahmd3301/NETFLIX

- Source: Ahmd3301/NETFLIX
- Default branch: `main`
- Exact commit: `ca734f4ebb0cfcd5732c06257b1281c9a5fd0153`
- Exact tree: `510fbbfe258490917c1507ca36ec3d69fabc4b84`
- Recursive tree truncated: `false`
- Expected upstream blobs: **3**
- Byte-exact transferred blobs: **1**
- Missing upstream blobs: **0**
- Blocked upstream blobs: **2**
- Gitlinks/submodules: **0**
- Mirror state: **BLOCKED**

## Blob accounting

- `styles.css` — transferred byte-exact; destination blob SHA `9a2aa0a7209ad249a94581476135e99576ca89e1` matches upstream.
- `index.html` — BLOCKED_SECURITY: deceptive credential-collection/login interface; not linked into the mirror tree.
- `script.js` — BLOCKED_SECURITY: captures credentials/device/IP data, transmits them externally, and contains embedded credential material; neither code nor secret values are mirrored.

## Security/provenance note

Blocked blobs remain in the raw-mirror denominator. No credential values, tokens, cookies, or credential-harvesting implementation are copied into the Shabawi TV tree. The upstream tree at this exact commit contains no LICENSE/NOTICE, gitlinks, database schema/migration, or safe environment contract to preserve.
