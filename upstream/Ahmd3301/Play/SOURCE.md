# Play upstream record

- Source: `Ahmd3301/Play`
- Default branch: `main`
- Exact commit SHA: `5f592d62b079d6335f3ce0db8b60bfd02c77e2b3`
- Exact tree SHA: `df2675e4ca7f941e1fc2ac5961d1d41f1f4672eb`
- Recursive tree truncated: `false`
- Expected upstream blobs: **4**
- Transferred byte-exact blobs: **1**
- Missing upstream blobs: **3**
- Blocked blobs: **0**
- State: **PARTIAL**

## Byte-exact evidence
- `index.html` -> upstream/destination blob SHA `b37111a6bf02b3cdb02a3e50a513032d7e5e55e8`.

## Remaining paths
- `Roboto-Regular.ttf` -> missing; binary font, not yet transferred in this run.
- `index1.html` -> missing.
- `test.html` -> missing.

## Functional note
Static Arabic web-player/playlist experiments. The current tree contains a bundled font and HTML player pages; no LICENSE/NOTICE, database migration, workflow, or environment-secret contract was observed in this four-blob snapshot.

Raw upstream files are preserved under this directory only when safely transferable. Shabawi-owned integration must remain separate from the raw mirror.
