# Upstream provenance: Ahmd3301/snowy-mud-aaba

- Source: `Ahmd3301/snowy-mud-aaba`
- Default branch: `main`
- Exact commit: `6000552a8c15b98378383047634ec8488e8d2a44`
- Exact tree: `33e9c63d18ae24671aa3177b371a679aed78e737`
- Recursive tree truncated: `false`
- Expected upstream blobs: **10**
- Exact byte-matched transferred blobs: **0**
- Missing/non-exact blobs: **10**
- Blocked blobs: **0**
- Status: **PARTIAL**

## Verification note

All ten upstream paths have physical counterparts in this destination directory, but the destination blobs are not byte-exact. Top-level examples differ by one byte because the destination copies were normalized; therefore none receive raw-mirror credit until their Git blob SHA matches upstream exactly. `SOURCE.md` is destination metadata and is not counted as an upstream blob.

## Environment / database contract

This repository is a Cloudflare Worker + D1 template. The upstream tree includes `migrations/0001_create_comments_table.sql`, `wrangler.json`, and `worker-configuration.d.ts`. The repository files are mirrorable, but any external D1 database state is outside the Git tree and is not claimed as transferred.

No LICENSE or NOTICE blob is present in this exact upstream tree; no license attribution is invented.
