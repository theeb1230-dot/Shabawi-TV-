from src.integration.models import PlaybackSource, StreamProtocol
from src.integration.playback import PlaybackCoordinator
from src.integration.session import PlaybackSession


def test_successful_source_binds_session_and_checkpoint_is_preserved():
    session = PlaybackSession("old", position_seconds=42.0, duration_seconds=120.0)
    source = PlaybackSource("native", "https://example.test/live.m3u8", StreamProtocol.HLS)

    coordinator = PlaybackCoordinator(lambda _: True, session=session)
    result = coordinator.play([source])

    assert result.source == source
    assert coordinator.session is not None
    assert coordinator.session.source_id == "native"
    assert coordinator.session.position_seconds == 42.0
    assert coordinator.session.active is True

    checkpoint = coordinator.checkpoint(77.0)
    assert checkpoint is not None
    assert checkpoint.position_seconds == 77.0
    assert coordinator.session.position_seconds == 77.0
