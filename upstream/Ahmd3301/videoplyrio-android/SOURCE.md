# Upstream source record

- Repository: `Ahmd3301/videoplyrio-android`
- Exact tree SHA: `51edaaf5cb4904a4109e5dfa5ddc4d3b3dbbb414`
- Imported/audited: 2026-09-19
- Status: isolated upstream reference; not production Shabawi code.

## Relevant architecture
Android/Kotlin, Jetpack Compose, AndroidX Media3 (ExoPlayer/HLS/DASH/UI/session), hidden WebView extraction fallback, native Packer unpacker, stream router, PiP overlay, Arabic resources, and GitHub Actions APK builds.

## Security gate
Do not promote `ExtractorEngine` unchanged: upstream proceeds through TLS errors and enables mixed content. Shabawi integration must fail closed on TLS errors, use origin allowlists, restrict WebView fallback, and prefer native extraction/direct playback.

## Selection note
This repository is a stronger Android baseline than `VideoPlyrApp` for modern UI/routing/PiP and explicit HLS/DASH support. `VideoPlyrApp` remains useful for its simpler OkHttp native extractor and minSdk 21 compatibility.
