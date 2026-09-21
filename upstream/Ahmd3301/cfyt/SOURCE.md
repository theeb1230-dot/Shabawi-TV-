# cfyt upstream record

Source: `Ahmd3301/cfyt`
Default branch: `main`
Exact commit SHA: `3924dd6ea15daac83b35b48e4e7c414041d7614b`
Exact tree SHA: `9215695d1b40204a0d144f45af9a61836eaffa44`
Recursive tree truncated: `false`
Expected upstream blobs: **10**
Exact transferred blobs: **4**
Missing/non-mirrored blobs: **5**
Blocked blobs: **1**
Status: **BLOCKED / PARTIAL**

Current upstream contains 10 blobs. Four safe blobs are now mirrored byte-exact: `.gitignore`, `README.md`, `package.json`, and `src/cipher.ts`.

`src/api.ts` contains a hard-coded API credential/key value in upstream. The value is intentionally not reproduced here or newly published into this public destination. Preserve only the configuration contract: the integration must obtain the corresponding API key from an environment/secret binding rather than hard-code it. Five additional safe upstream blobs remain to be mirrored byte-exact.

Purpose: Cloudflare Worker / TypeScript YouTube information extractor/provider reference. No external database schema or migration is present in the current tree. Raw upstream remains untouched. `SOURCE.md` is Shabawi-owned provenance metadata and is not counted as an upstream blob.
