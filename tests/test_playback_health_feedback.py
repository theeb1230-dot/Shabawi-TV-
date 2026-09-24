from src.integration.health import SourceHealth
from src.integration.models import PlaybackSource, StreamProtocol
from src.integration.playback import PlaybackCoordinator


def test_playback_updates_health_and_reorders_next_attempt():
    health = SourceHealth()
    sources = [
        PlaybackSource("a", "https://example.test/a.m3u8", StreamProtocol.HLS),
        PlaybackSource("b", "https://example.test/b.m3u8", StreamProtocol.HLS),
    ]

    first_seen = []

    def first_opener(source):
        first_seen.append(source.id)
        return source.id == "b"

    first = PlaybackCoordinator(first_opener, health=health)
    result = first.play(sources)

    assert result.source is not None
    assert result.source.id == "b"
    assert first_seen == ["a", "b"]
    assert health.score("a") == 0.0
    assert health.score("b") == 1.0

    second_seen = []
    second = PlaybackCoordinator(lambda source: second_seen.append(source.id) or True, health=health)
    second.play(sources)

    assert second_seen == ["b", "a"]
