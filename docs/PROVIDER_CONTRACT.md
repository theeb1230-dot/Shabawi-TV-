# Shabawi TV Provider Contract

This is the Shabawi-owned boundary between clients and upstream-specific adapters. Android/TV/iOS/Web clients must not depend directly on scraper HTML, source-specific encryption, Cloudflare/D1 internals, or Supabase service credentials.

## Canonical models

```text
CatalogItem
  id: string              # stable Shabawi provider-qualified id
  provider: string
  kind: movie|series|anime|live|sport|other
  title: string
  posterUrl?: https-url
  metadata?: object

Episode
  id: string
  provider: string
  parentId: string
  number?: string
  title: string
  thumbnailUrl?: https-url

PlaybackSource
  id: string
  provider: string
  mediaId: string
  type: hls|dash|file|resolver
  url?: https-url
  headers?: map<string,string>
  quality?: string
  priority: integer
  expiresAt?: timestamp

LiveChannel
  id: string
  provider: string
  title: string
  logoUrl?: https-url
  playback: PlaybackSource[]
```

## Operations

```text
catalog(provider, section, cursor?) -> CatalogPage
search(query, filters?) -> CatalogPage
details(provider, id) -> CatalogItem
episodes(provider, id) -> Episode[]
playbackSources(provider, mediaId) -> PlaybackSource[]
liveChannels(provider?, section?) -> LiveChannel[]
health(provider?) -> ProviderHealth[]
```

## Adapter mapping discovered so far

### faselhd-db
Repository snapshots and Supabase contract provide catalog/search material. Canonical source fields include `section_key`, `slug`, `name`, `img`, `link`, `ord`, `added_at`. Service-role credentials remain server-side only.

### FaselHDBot
Provides episode/player/HLS extraction reference. Extraction output must be converted to `PlaybackSource[]`; clients do not execute upstream extraction scripts directly.

### ostora-edge-api
Catalog routes normalize source entries to `id/name/thumbnail`. ID routes normalize episode/live records to `id/number/title/url/thumbnail/agent`. Shabawi adapters must convert `url` and optional agent/header data to `PlaybackSource`, with URL validation and provider-specific configuration isolated server-side.

### vplyr-live-v2
Selected live-engine baseline. D1 job/segment internals and Telegram transport stay behind the provider/service boundary. Clients consume only stable HLS playback sources/live channels.

## Mandatory safety and resilience

- Never expose service-role, GitHub, Telegram, Redis, Cloudflare or other write credentials to clients.
- Provider HTTP requests require bounded connect/read timeouts and cancellation.
- Validate schemes/hosts before server-side fetches to prevent arbitrary SSRF.
- Do not disable TLS verification.
- Normalize errors into `UNAVAILABLE`, `TIMEOUT`, `NOT_FOUND`, `INVALID_RESPONSE`, `RATE_LIMITED`, and `BLOCKED`.
- Cache catalog responses independently from short-lived playback sources.
- A provider failure must not crash search/details UI; return provider health/failure metadata and allow fallback.
- Playback selection prefers direct native HLS/DASH/file sources; resolver/WebView fallback is last and sandboxed.

## Provenance

Every adapter must record the upstream repository and exact SHA used to derive its behavior. Imported source remains under `upstream/`; Shabawi-owned implementations live outside that tree.