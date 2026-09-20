# cfyt upstream record

Source: `Ahmd3301/cfyt`
Default branch: `main`
Exact commit SHA: `3924dd6ea15daac83b35b48e4e7c414041d7614b`
Exact tree SHA: `9215695d1b40204a0d144f45af9a61836eaffa44`
Recursive tree truncated: `false`
Expected upstream blobs: **10**
Exact transferred blobs: **0**
Missing/non-mirrored blobs: **9**
Blocked blobs: **1**
Status: **BLOCKED / PARTIAL**

The previous record incorrectly labeled the commit SHA as the tree SHA. Current upstream contains 10 blobs: `.gitignore`, `README.md`, `package.json`, six TypeScript source files under `src/`, `tsconfig.json`, and `wrangler.toml`.

`src/api.ts` contains a hard-coded API credential/key value in upstream. The value is intentionally not reproduced here or newly published into this public destination. Preserve only the configuration contract: the integration must obtain the corresponding API key from an environment/secret binding rather than hard-code it. The remaining nine upstream blobs are not yet mirrored byte-exact and therefore receive no Raw Mirror Completeness credit.

Purpose: Cloudflare Worker / TypeScript YouTube information extractor/provider reference. No external database schema or migration is present in the current tree. Raw upstream remains untouched.
