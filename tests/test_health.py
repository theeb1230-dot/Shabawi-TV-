from src.integration.health import SourceHealth
from src.integration.models import PlaybackSource, StreamProtocol


def test_health_ranks_native_and_successful_sources_first():
    native = PlaybackSource("native", "https://example.com/a.m3u8", StreamProtocol.HLS)
    fallback = PlaybackSource(
        "fallback", "https://example.com/watch", StreamProtocol.WEBVIEW,
        playable_native=False,
    )
    health = SourceHealth()
    health.mark_failure("native")
    health.mark_success("fallback")

    ranked = health.rank([fallback, native])
    assert [item.id for item in ranked] == ["native", "fallback"]


def test_unknown_sources_are_neutral():
    health = SourceHealth()
    assert health.score("missing") == 0.5
