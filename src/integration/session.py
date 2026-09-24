"""Provider-neutral playback session state for resume and lifecycle handling."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class PlaybackSession:
    source_id: str
    position_seconds: float = 0.0
    duration_seconds: float | None = None
    active: bool = True

    def __post_init__(self) -> None:
        if not self.source_id.strip():
            raise ValueError("source id is required")
        if self.position_seconds < 0:
            raise ValueError("position cannot be negative")
        if self.duration_seconds is not None and self.duration_seconds < 0:
            raise ValueError("duration cannot be negative")
        if self.duration_seconds is not None and self.position_seconds > self.duration_seconds:
            object.__setattr__(self, "position_seconds", self.duration_seconds)

    def checkpoint(self, position_seconds: float) -> "PlaybackSession":
        return PlaybackSession(
            source_id=self.source_id,
            position_seconds=position_seconds,
            duration_seconds=self.duration_seconds,
            active=self.active,
        )

    def pause(self) -> "PlaybackSession":
        return PlaybackSession(self.source_id, self.position_seconds, self.duration_seconds, False)

    def resume(self) -> "PlaybackSession":
        return PlaybackSession(self.source_id, self.position_seconds, self.duration_seconds, True)

    def completion_ratio(self) -> float:
        if not self.duration_seconds:
            return 0.0
        return min(1.0, self.position_seconds / self.duration_seconds)


__all__ = ["PlaybackSession"]
