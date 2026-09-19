# Environment & Database Inventory

Baseline: 2026-09-19. Source account: `Ahmd3301`.

This file records **names/contracts only** for credentials. Secret values are never committed to this public integration repository. Runtime values must be re-provisioned in the destination account's secret store.

## faselhd-db
### GitHub Actions secret names
- `GIT_USER_EMAIL`
- `GIT_USER_NAME`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Supabase contract
Source code writes table `items` using fields:
`section_key, slug, name, img, link, ord, added_at`.
Uniqueness contract: `(section_key, slug)`.
The migration design also specifies `sections` and `items`, indexes/search/RLS. JSON snapshots under `output/FaselHD`, `output/TopCinma`, and `output/Ostora` are repository data and can be treated as source snapshots.

## vplyr-live-engine / vplyr-live-v2
Both currently carry the same D1 schema migration:
- `users`
- `jobs`
- `stream_variants`
- `segments`
with indexes for job and segment lookup.

Wrangler binds D1 as `DB`. Configuration also declares non-secret runtime variables for public URLs/repository/workflow/channel. Exact upstream config should remain isolated until security review; operational credentials must be re-provisioned rather than copied into Git.

## yt-telegram-bot
### GitHub Actions secret names
- `TELEGRAM_API_ID`
- `TELEGRAM_API_HASH`
- `YOUTUBE_COOKIES_B64`
- `TELEGRAM_BOT_TOKEN`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Non-secret worker vars
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `WORKFLOW_FILE`
- `GITHUB_REF`

## url-shortener
Runtime Redis contract:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## testplyr
`.env.example` contains a placeholder `GEMINI_API_KEY`, not a usable secret.

## Migration rule
1. Copy schemas/migrations and public repository datasets.
2. Recreate destination databases under accounts controlled by the Shabawi TV operator.
3. Populate from public snapshots when appropriate.
4. Add required values to GitHub/Cloudflare/Supabase secret stores.
5. Never commit tokens, service-role keys, cookies, passwords, signing keys, or private credentials.
6. External database contents are not assumed accessible merely because their IDs/URLs appear in public configuration.
