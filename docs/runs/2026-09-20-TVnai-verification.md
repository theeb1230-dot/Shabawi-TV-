# Mirror verification run — TVnai

Start main SHA: `d555060b96392a060e4fa8953d9b36d912b61cf7`
Current public Ahmd3301 repository count: `49`.
Destination permission: `admin`.

## Closed blocker slice
P0-1/P0-3/P0-6: `Ahmd3301/TVnai`

Acceptance evidence:
- default branch `main`
- commit `f94799737839abbd580476237d1c2192f3b3b256`
- tree `a0037b164c001859cd5c1436779d8369899a71db`
- recursive tree is not truncated
- expected blobs `1`
- destination byte-exact blobs `1`
- blocked `0`
- missing `0`
- state `FULL`
- upstream has no LICENSE/NOTICE, workflow, DB schema/migration, or environment contract in its current one-blob tree

## Recomputed verified counters
Inventory coverage: `39/49 = 79.6%`.
Physical representation: `49/49 = 100.0%`.
Strict currently-counted mirror set: `37/254 = 14.6%` byte-exact. This remains a verified-subset ratio until all 49 repositories have current expected-blob denominators.
Blocked blobs in the strict set: `35`; missing/non-exact safe blobs: `182`.
Overall verified completion: `11.1%` under the fixed weighted rubric; no runtime/E2E/release credit added.

## Remaining blockers
- P0-1: 10/49 repositories still require current exact commit/tree/blob verification.
- P0-3: continue byte-exact raw mirror repair/copy, prioritizing small safe gaps.
- P0-4: recount/resync changed upstreams, especially `faselhd-db` and `plyr-native`.
- P0-5/P0-6: preserve environment/database contracts, licenses and provenance without secret values.
- P0-7 remains gated on mirror/provenance completion to the allowed security boundary.

End main SHA is the commit containing this manifest; retrieve from GitHub after write.