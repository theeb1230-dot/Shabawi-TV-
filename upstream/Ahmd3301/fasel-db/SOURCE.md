# fasel-db upstream record
Source: Ahmd3301/fasel-db
Default branch: master
Exact commit SHA: 50e70b3d5cd06c25b6bfd4ab1c5075a09966c07d
Exact tree SHA: 53f337393a83ef99351d609a6279c4fac70c6cb0
Expected upstream blobs: 27
Transferred byte-exact upstream blobs: 15
Missing upstream blobs: 12
Blocked upstream blobs: 0
Mirror state: PARTIAL
Tree enumeration: recursive, truncated=false

Decision: KEEP historical/reference.
Observed: Scrapy project with per-category spiders, pipelines/settings, eight JSON datasets and a scrape workflow.
Useful for Shabawi: scraper architecture and regression comparison. New Shabawi code should prefer normalized provider contracts rather than couple clients to spiders.

Verified transferred paths include the eight data/*.json datasets plus fasel/fasel/__init__.py, fasel/fasel/items.py, fasel/fasel/pipelines.py, fasel/fasel/settings.py, fasel/fasel/spiders/__init__.py, fasel/scrapy.cfg, and requirements.txt. All were recreated from upstream blob contents and their destination Git blob SHAs matched upstream exactly.

Security/provenance note: this record contains no secret values. SOURCE.md and FUNCTIONAL_CONTRACT.md are Shabawi metadata and are not counted as transferred upstream blobs because neither exists in the upstream tree.
