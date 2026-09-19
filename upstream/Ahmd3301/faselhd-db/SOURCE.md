# Upstream source: Ahmd3301/faselhd-db

- Repository: https://github.com/Ahmd3301/faselhd-db
- Exact upstream tree SHA: `bae47dfea05c41327960716af337a341413ea28e`
- Imported for: catalog/indexer architecture, public data contract, Supabase synchronization reference.
- Technologies: Python 3, Scrapy/Parsel, JSON snapshots, Supabase/Postgres, GitHub Actions.
- Providers represented by the pinned tree: FaselHD, TopCinma, Ostora.
- Security boundary: runtime secret **names/contracts** may be documented, but credential values/service-role keys are not committed into Shabawi-TV. External Supabase contents are not claimed as copied without authorized database access.

## Selected source
`update.py` is preserved as an upstream reference for incremental catalog refresh. `supabase_push.py` is preserved for its batching/order/upsert contract. Public JSON snapshots remain attributable to this upstream and should only be imported when needed by the Shabawi catalog migration.
