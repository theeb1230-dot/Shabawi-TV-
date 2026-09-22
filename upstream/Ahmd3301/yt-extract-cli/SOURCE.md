# yt-extract-cli upstream record

Source: Ahmd3301/yt-extract-cli
Default branch: `master`
Exact commit SHA: `b0244b3f6c4c2d4da505fa54aed42b1f197615ac`
Exact tree SHA: `6f1bd0a789a5d5bbcb3e2b99554c2aff4be1f7e5`
Recursive tree truncated: `false`
Expected upstream blobs: `10`
Transferred exact blobs: `10`
Missing blobs: `0`
Blocked blobs: `0`
Gitlinks/submodules: `0`
State: `FULL`

## Blob accounting
All 10 upstream blobs are present byte-exact at their original paths: `.gitignore`, `README.md`, `bin/yt-extract.js`, `package-lock.json`, `package.json`, `src/extractor.ts`, `src/formatter.ts`, `src/index.ts`, `src/logger.ts`, and `tsconfig.json`.

## Verification
Current upstream branch `master` remains at commit `b0244b3f6c4c2d4da505fa54aed42b1f197615ac`, tree `6f1bd0a789a5d5bbcb3e2b99554c2aff4be1f7e5`. The previously missing `src/extractor.ts` was transferred with Git blob SHA `9e3a16cb4f71a1b789aedfa4def855919bddb068`, matching upstream exactly. Existing destination blobs were rechecked by Git blob SHA during this closure pass.

## Analysis
TypeScript/Node.js CLI wrapper around yt-dlp. It extracts video metadata and direct format URLs and is useful as Shabawi diagnostics/tooling rather than a mandatory mobile runtime dependency. No database schema, migration, workflow, or committed secret was observed in the current tree. README states MIT, but the current upstream tree does not contain a standalone LICENSE file, so no absent license file is fabricated here.
