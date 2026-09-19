# Upstream source record

- Repository: `Ahmd3301/VideoPlyrApp`
- Exact tree SHA: `ca34d1dcb86ed8dd8151de2e04c025254ee20f75`
- Imported/audited: 2026-09-19
- Status: isolated upstream reference; not production Shabawi code.

## Relevant architecture
Android/Kotlin, AndroidX Media3 ExoPlayer/UI, OkHttp native HTTP client, Packer/regex stream extraction, playlist UI and GitHub Actions debug APK build.

## Selection note
Useful pieces are the small native HTTP/extraction layer and lower minSdk 21 contract. It lacks the broader Compose/PiP/router/HLS+DASH module structure found in `videoplyrio-android`, so it is not selected as the primary Shabawi Android baseline.

## Exclusions
The committed debug APK is not imported into Shabawi source. Binary build outputs are not reusable source and would only inflate provenance/security review.
