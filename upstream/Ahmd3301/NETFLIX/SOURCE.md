# NETFLIX upstream record

- Source: `Ahmd3301/NETFLIX`
- Default branch: `main`
- Exact commit SHA: `ca734f4ebb0cfcd5732c06257b1281c9a5fd0153`
- Exact tree SHA: `510fbbfe258490917c1507ca36ec3d69fabc4b84`
- Recursive tree truncated: `false`
- Expected upstream blobs: `3`
- Transferred byte-exact blobs: `0`
- Missing/blocked blobs: `3`
- State: `BLOCKED`

## Safety/provenance note

The upstream contains a credential-harvesting login clone. `script.js` collects entered email/password plus IP/device metadata and sends them to Telegram using hard-coded live-looking Telegram credentials. Those operational files are not republished into this public aggregation repository. No token, chat identifier, captured credential, or secret value is recorded here.

Blocked paths:
- `index.html` — phishing/credential-harvesting UI component.
- `script.js` — credential collection/exfiltration logic and embedded secret material.
- `styles.css` — presentation component of the same credential-harvesting page.

This record preserves exact provenance and counts without treating `SOURCE.md` as an upstream blob.
