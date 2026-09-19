# Upstream source: Ahmd3301/FaselHDBot

- Repository: https://github.com/Ahmd3301/FaselHDBot
- Exact upstream tree SHA: `e640fac0c18ea382ec3779bf0a12018af11db0b9`
- Technologies: Node.js extraction script, Python bot/worker/farm, Redis-compatible coordination, GitHub Actions, HLS tooling.
- Useful Shabawi capability: parse series/seasons/episodes/player URLs, resolve working player pages, derive HLS/master m3u8 candidates, and worker/monitor patterns.
- Upstream workflow/source files: `.github/workflows/faselhd-farm.yml`, `farm/main_bot.py`, `farm/redis_mini.py`, `farm/worker.py`, `scripts/exFaselHD1234.js`, `scripts/monitor.py`, `scripts/nm3u8_progress.py`, `scripts/tg_upload.py`.

## Integration decision
KEEP CRITICAL as an isolated extraction/farm reference. Do not promote the Telegram upload/farm wholesale into the client application. Shabawi should adapt only the provider/extraction contract behind a server/provider boundary, with URL validation, timeouts and source health/fallback.

No credential values are copied into this public repository. Required runtime secret names are documented separately and must be provisioned in the destination secret store.
