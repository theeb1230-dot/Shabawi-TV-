# ostora-edge-api upstream record

- Source: https://github.com/Ahmd3301/ostora-edge-api
- Exact tree SHA: `5bc7eaa0835650ecf8f157482c6b54bf3f02cae5`
- Upstream originals: read-only; never modified by Shabawi TV.
- Role: Cloudflare Pages Functions edge adapter plus Arabic RTL PWA/player experiments.

## Audited API contract

The catch-all edge function supports:
- `GET /series`
- `GET /series/:id`
- `GET /rseries`
- `GET /rseries/:id`
- `GET /moviesar`
- `GET /moviesar/:id`
- `GET /sports/:id`

It POSTs form-encoded requests to the upstream Ostora-style API, applies a timestamp-dependent XOR decoder, normalizes catalog entries to `{id,name,thumbnail}`, and episode/live entries to `{id,number,title,url,thumbnail,agent}`. Cloudflare edge cache TTL is 3 hours for catalogs and 1 hour for episode/live responses. CORS is currently wildcard.

## Shabawi decision

**KEEP HIGH as an isolated provider reference, not as a production dependency.**

Useful pieces:
- normalized catalog/episode response shapes;
- category routing and IDs;
- edge caching strategy;
- Arabic RTL/PWA UI reference.

Do not promote verbatim:
- hard-coded upstream endpoint/device/static-key configuration;
- wildcard CORS;
- raw upstream `url`/`agent` exposure as the final Shabawi playback contract;
- source-specific XOR logic in the app client.

The Shabawi-owned provider layer must hide source-specific details behind stable catalog/details/episodes/playback-source interfaces, validate upstream URLs, apply timeouts/error taxonomy, and keep provider configuration server-side.