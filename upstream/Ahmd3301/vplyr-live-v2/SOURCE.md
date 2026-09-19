# Upstream source record

- Repository: Ahmd3301/vplyr-live-v2
- Exact upstream tree SHA: `26cec450d4bee06f1cee0d02899593fd4ed3bef7`
- Role: selected live-engine baseline reference for Shabawi TV
- Runtime: Cloudflare Worker + D1 metadata/control plane + GitHub Actions FFmpeg runner + Telegram file transport/proxy
- Variants: 1080p / 720p / 360p, 6-second fMP4 HLS segments
- Selection: preferred over `vplyr-live-engine` because v2 changes the runner, live Worker, HTTP/HLS helpers, tests and workflow while retaining the same initial D1 schema/login worker/package baseline.

## Secret contract (names only)

The upstream runtime expects sensitive values including `ADMIN_SECRET`, `LIVE_BOT_TOKEN`/`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHANNEL`, and Worker-side `GITHUB_TOKEN` plus Telegram/proxy configuration. Values are intentionally not committed here. They must be provisioned in destination secret stores.

## Security/integration notes

Do not expose admin ingestion/job endpoints without the bearer secret. Do not hard-code source credentials in workflow defaults. Treat Telegram transport as an infrastructure adapter, not a client API contract. The Shabawi app should consume a Shabawi-owned live-provider interface.
