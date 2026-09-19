# Scraper contract
Source: Ahmd3301/fasel-db @ 50e70b3d5cd06c25b6bfd4ab1c5075a09966c07d

Scrapy categories maintain JSON datasets. The base spider:
1. loads existing category JSON when present;
2. builds a set of previously seen links;
3. crawls paginated post cards;
4. emits name/image/link/category records;
5. stops incremental crawling when a page produces no new records.

Shabawi should reuse this incremental-crawl behavior behind its provider boundary rather than expose scraper-specific records directly to clients.
