# faselhdx-db upstream record
Source: Ahmd3301/faselhdx-db
Exact tree SHA: 572e477d0532608f574ea41f1d160aac500f52d0
Observed: Scrapy indexer + category JSON + scheduled workflow.
Decision: KEEP historical indexer reference.
Policy: preserve provenance and useful source/configuration contracts; do not copy live credentials, generated binaries, or redundant vendored dependencies into the public aggregation repository.
