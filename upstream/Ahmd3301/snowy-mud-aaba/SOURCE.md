# Upstream provenance: Ahmd3301/snowy-mud-aaba

- Source: `Ahmd3301/snowy-mud-aaba`
- Default branch: `main`
- Exact commit: `6000552a8c15b98378383047634ec8488e8d2a44`
- Exact tree: `33e9c63d18ae24671aa3177b371a679aed78e737`
- Recursive tree truncated: `false`
- Expected upstream blobs: **10**
- Exact byte-matched transferred blobs: **9**
- Missing/non-exact blobs: **1**
- Blocked blobs: **0**
- Status: **PARTIAL**

## Verification note

Nine of the ten upstream blobs now match the upstream Git blob SHA byte-for-byte. The sole remaining non-exact path is `package-lock.json`, whose upstream blob SHA is `e6ff17507b0358697afbc0a7cd9af87a584342a1`. The upstream blob is readable, but the current connector path does not preserve a reusable raw/base64 byte representation for this large text blob; therefore it is not credited until the destination Git blob SHA matches exactly. `SOURCE.md` is destination metadata and is not counted as an upstream blob.

## Environment / database contract

This repository is a Cloudflare Worker + D1 template. The upstream tree includes `migrations/0001_create_comments_table.sql`, `wrangler.json`, and `worker-configuration.d.ts`. The repository files are mirrorable, but any external D1 database state is outside the Git tree and is not claimed as transferred.

No LICENSE or NOTICE blob is present in this exact upstream tree; no license attribution is invented.
