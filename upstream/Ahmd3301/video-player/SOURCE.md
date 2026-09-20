# video-player upstream record

Source: `Ahmd3301/video-player`
Default branch: `main`
Exact commit SHA: `4b7668389372d3277ccb35f5defd5627d046c099`
Exact tree SHA: `183d86903692eb90876e4cad7086e3683b1a615f`
Recursive tree truncated: `false`
Expected upstream blobs: `6`
Transferred byte-exact: `3`
Blocked: `1`
Missing safe/non-exact: `2`
State: `BLOCKED/PARTIAL`

Byte-exact mirrored paths:
- `android/app/src/main/java/com/pro/videoplayer/MainActivity.java`
- `capacitor.config.json`
- `package.json`

Blocked path:
- `.github/workflows/build.yml` — contains embedded live-looking Telegram credentials in executable workflow content. The credential value is intentionally not republished. Configuration contract: use repository secret/environment variables for Telegram bot token and chat ID.

Still missing from the raw mirror:
- `index.html`
- `video-player.html`

Observed stack: Capacitor Android, Java WebView bridge, HTML/JavaScript media players, GitHub Actions. No external database schema or migration is present in this six-blob tree. Preserve provenance; do not treat this SOURCE.md as upstream content.
