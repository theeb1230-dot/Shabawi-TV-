from src.integration.models import PlaybackSource, StreamProtocol
from src.integration.playback import PlaybackCoordinator


def test_native_source_is_tried_before_webview_and_falls_back_on_failure():
    seen = []

    def opener(source):
        seen.append(source.id)
        return source.id == "web"

    coordinator = PlaybackCoordinator(opener)
    sources = [
        PlaybackSource("web", "https://example.test/player", StreamProtocol.WEBVIEW, playable_native=False),
        PlaybackSource("hls", "https://example.test/index.m3u8", StreamProtocol.HLS),
    ]

    result = coordinator.play(sources)

    assert result.source is not None
    assert result.source.id == "web"
    assert seen == ["hls", "web"]


def test_dash_and_file_are_native_before_webview_even_when_input_order_is_reversed():
    coordinator = PlaybackCoordinator(lambda source: True)
    sources = [
        PlaybackSource("web", "https://example.test/player", StreamProtocol.WEBVIEW, playable_native=False),
        PlaybackSource("file", "https://example.test/video.mp4", StreamProtocol.FILE),
        PlaybackSource("dash", "https://example.test/manifest.mpd", StreamProtocol.DASH),
    ]

    ordered = coordinator.ordered_sources(sources)

    assert [source.id for source in ordered] == ["dash", "file", "web"]
