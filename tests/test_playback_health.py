from src.integration.models import PlaybackSource, StreamProtocol
from src.integration.playback import PlaybackCoordinator


def test_health_score_breaks_ties_between_native_sources():
    coordinator = PlaybackCoordinator(
        lambda source: True,
        health_scores={"hls": 0.25, "dash": 0.90},
    )
    sources = [
        PlaybackSource("hls", "https://example.test/index.m3u8", StreamProtocol.HLS),
        PlaybackSource("dash", "https://example.test/manifest.mpd", StreamProtocol.DASH),
    ]

    ordered = coordinator.ordered_sources(sources)

    assert [source.id for source in ordered] == ["dash", "hls"]
