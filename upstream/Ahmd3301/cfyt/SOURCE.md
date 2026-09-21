# cfyt upstream record

Source: `Ahmd3301/cfyt`
Default branch: `main`
Exact commit SHA: `3924dd6ea15daac83b35b48e4e7c414041d7614b`
Exact tree SHA: `9215695d1b40204a0d144f45af9a61836eaffa44`
Recursive tree truncated: `false`
Expected upstream blobs: **11**
Exact transferred blobs: **9**
Missing/non-mirrored blobs: **0**
Blocked blobs: **2**
Status: **BLOCKED / PARTIAL**

Current upstream contains 11 blobs. Nine safe blobs are mirrored byte-exact: `.gitignore`, `README.md`, `package.json`, `src/cipher.ts`, `src/formats.ts`, `src/types.ts`, `src/worker.ts`, `tsconfig.json`, and `wrangler.toml`.

`src/api.ts` contains a hard-coded API credential/key value in upstream. `src/extractor.ts` also contains a hard-coded fallback API credential/key value. Those two blobs are intentionally not reproduced or newly published into this public destination. Preserve only the configuration contract: integration must obtain the corresponding API key from an environment/secret binding rather than hard-code it. No safe upstream blobs remain missing.

Purpose: Cloudflare Worker / TypeScript YouTube information extractor/provider reference. No external database schema or migration is present in the current tree. Raw upstream remains untouched. `SOURCE.md` is Shabawi-owned provenance metadata and is not counted as an upstream blob.
