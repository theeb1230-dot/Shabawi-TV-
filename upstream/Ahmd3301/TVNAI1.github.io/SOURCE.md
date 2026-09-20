# TVNAI1.github.io upstream record

Source: Ahmd3301/TVNAI1.github.io
Default branch: `main`
Exact commit SHA: `dac08043fd21df27c3e9db9d12ac0048fe986e2e`
Exact tree SHA: `98c42622e2a3c6f2e3b594effde617aa7ee8034a`
Recursive tree truncated: `false`
Expected upstream blobs: `2`
Transferred exact blobs: `1`
Missing/blocked blobs: `1`
State: `BLOCKED`

## Blob accounting
- `player.html` — exact destination blob SHA matches upstream `899c494ab21b14d8f136dbdcb2d5cbd476fb9b0d`.
- `main.py` — BLOCKED from public mirroring because the upstream source contains a hard-coded live credential. The credential value is intentionally not reproduced here. Preserve only the configuration contract: a Telegram bot token is required and should be supplied via a secret/environment variable rather than committed source.

The blocked file also contains Telegram bot orchestration that regenerates `player.html` and pushes it to GitHub. Its provenance remains recorded by the exact commit/tree/blob accounting above without copying the exposed credential into this public repository.
