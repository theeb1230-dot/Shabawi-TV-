# Upstream source: Ahmd3301/FaselHDBot

- Repository: https://github.com/Ahmd3301/FaselHDBot
- Default branch: `main`
- Exact upstream commit SHA: `e640fac0c18ea382ec3779bf0a12018af11db0b9`
- Exact upstream tree SHA: `c2b31a0fea507e01b6bba1f7d649041822d9a1f6`
- Recursive tree truncated: `false`
- Expected upstream blobs: `11`
- Transferred byte-exact blobs: `5`
- Missing upstream blobs: `0`
- Blocked blobs: `6`
- Gitlinks/submodules: `0`
- Raw mirror state: `PARTIAL`

## Exact transferred paths
- `docs/01-IDEA.md` — `23a81cfb2eaff46b62646a80ccb6b3880950e011`
- `docs/02-HOW-IT-WORKS.md` — `6a548303b2c695d3a3537f33623c7864c4e77406`
- `farm/redis_mini.py` — `32d2bbf3aa0ef374d7f347dfbe178e0e30f5e95c`
- `scripts/monitor.py` — `87bd1211ddc67af08e5a3cd3371c112d0cf2a9f5`
- `scripts/nm3u8_progress.py` — `f564f6358e1840022e4cc1afedf477ea36a81e9b`

## Blocked upstream blobs
The connected GitHub transport can read these objects, but the byte-preserving base64 response is truncated before the complete payload can be supplied to `create_blob`. UTF-8 decode/re-encode was tested and does not preserve the upstream Git blob SHA, so these are deliberately not written as false byte-exact mirrors. They remain in the global Raw Mirror denominator.

- `.github/workflows/faselhd-farm.yml` — `b2e38d04cf914fb2c6966334acb7488e95ea654c` — 19,859 bytes — `TOOLING_BASE64_TRUNCATION`
- `docs/03-STRUCTURE-AND-CODE.md` — `549d49cedfe44faa931c500d1d1a269d9a1790a1` — 100,625 bytes — `TOOLING_BASE64_TRUNCATION`
- `farm/main_bot.py` — `637f5cb163f481b93b7ffc58014a0d2aa1066c1f` — 22,522 bytes — `TOOLING_BASE64_TRUNCATION`
- `farm/worker.py` — `fe3163e9ef72071cd48af802d19bd9f536ccc5f2` — 8,962 bytes — `TOOLING_BASE64_TRUNCATION`
- `scripts/exFaselHD1234.js` — `83702c5852ff460f2b5a57c796aaac28f84d6085` — 16,474 bytes — `TOOLING_BASE64_TRUNCATION`
- `scripts/tg_upload.py` — `c5418149b2c7d2f9baea8ae35de230bd7eb73022` — 16,265 bytes — `TOOLING_BASE64_TRUNCATION`

## Analysis
Technologies: Node.js extraction script, Python bot/worker/farm, Redis-compatible coordination, GitHub Actions, HLS tooling. Useful Shabawi capability: parse series/seasons/episodes/player URLs, resolve working player pages, derive HLS/master m3u8 candidates, and worker/monitor patterns.

## Integration decision
KEEP CRITICAL as an isolated extraction/farm reference. Do not promote the Telegram upload/farm wholesale into the client application. Shabawi should adapt only the provider/extraction contract behind a server/provider boundary, with URL validation, timeouts and source health/fallback.

No credential values are copied into this public repository. Required runtime secret names are documented separately and must be provisioned in the destination secret store.
