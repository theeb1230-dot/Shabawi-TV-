import pytest

from src.integration.session import PlaybackSession


def test_checkpoint_preserves_source_and_clamps_to_duration():
    session = PlaybackSession("source-1", position_seconds=10, duration_seconds=100)
    checkpoint = session.checkpoint(150)

    assert checkpoint.source_id == "source-1"
    assert checkpoint.position_seconds == 100
    assert checkpoint.completion_ratio() == 1.0


def test_pause_and_resume_preserve_checkpoint():
    session = PlaybackSession("source-1", position_seconds=42, duration_seconds=120)

    paused = session.pause()
    resumed = paused.resume()

    assert paused.active is False
    assert paused.position_seconds == 42
    assert resumed.active is True
    assert resumed.position_seconds == 42


def test_invalid_session_values_are_rejected():
    with pytest.raises(ValueError):
        PlaybackSession("", duration_seconds=10)

    with pytest.raises(ValueError):
        PlaybackSession("source-1", position_seconds=-1, duration_seconds=10)

    with pytest.raises(ValueError):
        PlaybackSession("source-1", duration_seconds=-1)
