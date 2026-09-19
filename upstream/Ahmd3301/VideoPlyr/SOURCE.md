# Upstream: Ahmd3301/VideoPlyr

- Source: https://github.com/Ahmd3301/VideoPlyr
- Pinned tree SHA: `a9227fcf4b78cf3e50f81aa90eb9eba73992201a`
- Imported for: Android native playback and extractor evaluation.
- Technology: Kotlin/Android, AndroidX Media3 ExoPlayer, HLS/DASH, AppCompat/RecyclerView.
- Status: KEEP / high-value playback candidate.
- Security note: runtime credentials and secrets are not stored here. Any required secret must be provisioned through the destination secret store.

## Imported subset in this pass
- `app/src/main/java/io/videoplyr/app/ExtractorEngine.kt`
- `app/src/main/java/io/videoplyr/app/PlayerController.kt`
- `app/build.gradle.kts`

The upstream remains isolated here until the Shabawi TV integration layer is ready. No Ahmd3301 repository was modified.