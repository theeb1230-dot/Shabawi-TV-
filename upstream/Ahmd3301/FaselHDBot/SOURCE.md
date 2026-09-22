# Upstream source: Ahmd3301/FaselHDBot

- Repository: https://github.com/Ahmd3301/FaselHDBot
- Default branch: `main`
- Exact upstream commit SHA: `e640fac0c18ea382ec3779bf0a12018af11db0b9`
- Exact upstream tree SHA: `c2b31a0fea507e01b6bba1f7d649041822d9a1f6`
- Recursive tree truncated: `false`
- Expected upstream blobs: `11`
- Transferred byte-exact blobs: `1`
- Missing upstream blobs: `10`
- Blocked blobs: `0`
- Gitlinks/submodules: `0`
- Raw mirror state: `PARTIAL`
- Exact transferred path: `docs/01-IDEA.md` (`23a81cfb2eaff46b62646a80ccb6b3880950e011`)
- Technologies: Node.js extraction script, Python bot/worker/farm, Redis-compatible coordination, GitHub Actions, HLS tooling.
- Useful Shabawi capability: parse series/seasons/episodes/player URLs, resolve working player pages, derive HLS/master m3u8 candidates, and worker/monitor patterns.
- Upstream workflow/source files: `.github/workflows/faselhd-farm.yml`, `farm/main_bot.py`, `farm/redis_mini.py`, `farm/worker.py`, `scripts/exFaselHD1234.js`, `scripts/monitor.py`, `scripts/nm3u8_progress.py`, `scripts/tg_upload.py`.

## Integration decision
KEEP CRITICAL as an isolated extraction/farm reference. Do not promote the Telegram upload/farm wholesale into the client application. Shabawi should adapt only the provider/extraction contract behind a server/provider boundary, with URL validation, timeouts and source health/fallback.

No credential values are copied into this public repository. Required runtime secret names are documented separately and must be provisioned in the destination secret store.
