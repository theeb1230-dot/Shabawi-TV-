# yt-extract-cli upstream record

Source: Ahmd3301/yt-extract-cli
Default branch: `master`
Exact commit SHA: `b0244b3f6c4c2d4da505fa54aed42b1f197615ac`
Exact tree SHA: `6f1bd0a789a5d5bbcb3e2b99554c2aff4be1f7e5`
Recursive tree truncated: `false`
Expected upstream blobs: `9`
Transferred exact blobs: `1`
Missing blobs: `8`
Blocked blobs: `0`
State: `PARTIAL`

## Blob accounting
- `package.json` — transferred byte-exact; upstream blob SHA `0c5bcb82cb7deaec2919b1c9f540605c1d279b81`.
- Remaining upstream blobs: `.gitignore`, `README.md`, `bin/yt-extract.js`, `package-lock.json`, `src/extractor.ts`, `src/formatter.ts`, `src/index.ts`, `src/logger.ts`, `tsconfig.json`.

## Analysis
TypeScript/Node.js CLI wrapper around yt-dlp. It extracts video metadata and direct format URLs and is useful as Shabawi diagnostics/tooling rather than a mandatory mobile runtime dependency. No database schema, migration, workflow, or committed secret was observed in the current tree. README states MIT, but the current upstream tree does not contain a standalone LICENSE file, so no absent license file is fabricated here.
