#!/usr/bin/env python3
"""Pinned Shabawi reference to Ahmd3301/faselhd-db incremental catalog updater.

Exact upstream tree: bae47dfea05c41327960716af337a341413ea28e
This integration copy intentionally records the operational contract rather than
embedding credentials. See SOURCE.md and inventory/ENVIRONMENT_AND_DATABASES.md.
"""

SECTIONS = [
    "fd-movies", "fd-series", "fd-anime", "fd-asian-series",
    "fd-asian-movies", "fd-hindi", "fd-anime-movies", "fd-tvshows",
]
SOURCE_TAG = "faselhd"

# Upstream behavior retained for integration design:
# - HTTP catalog pages parsed with Parsel/Scrapy.
# - slug is the stable per-section identity.
# - new items are prepended and assigned rank 1..N.
# - per-section .delta JSON files carry only newly discovered items.
# - GitHub Actions subsequently syncs deltas to Supabase.
#
# Full executable upstream remains available at the pinned source SHA. Shabawi's
# owned provider layer will implement this contract with explicit provider
# boundaries, timeouts, health checks and tests rather than silently forking it.
