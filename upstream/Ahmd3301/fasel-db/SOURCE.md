# fasel-db upstream record
Source: Ahmd3301/fasel-db
Default branch: master
Exact commit SHA: 50e70b3d5cd06c25b6bfd4ab1c5075a09966c07d
Exact tree SHA: 53f337393a83ef99351d609a6279c4fac70c6cb0
Expected upstream blobs: 27
Transferred byte-exact upstream blobs: 27
Missing upstream blobs: 0
Blocked upstream blobs: 0
Mirror state: FULL
Machine-readable counts: expected=27 transferred=27 missing=0 blocked=0 state=FULL
Tree enumeration: recursive, truncated=false

Decision: KEEP historical/reference.
Observed: Scrapy project with per-category spiders, pipelines/settings, eight JSON datasets and a scrape workflow.
Useful for Shabawi: scraper architecture and regression comparison. New Shabawi code should prefer normalized provider contracts rather than couple clients to spiders.

Verified transferred paths: all 27 upstream blobs at exact tree 53f337393a83ef99351d609a6279c4fac70c6cb0. Destination Git blob SHAs were matched to upstream, including workflow, README, gitignore, eight data JSON files, Scrapy package/configuration, all nine spider modules, and requirements.txt.

Security/provenance note: no secret values were introduced. Upstream .gitignore references .env but the exact upstream tree contains no .env blob. SOURCE.md and FUNCTIONAL_CONTRACT.md are Shabawi metadata and are not counted as transferred upstream blobs because neither exists in the upstream tree.
