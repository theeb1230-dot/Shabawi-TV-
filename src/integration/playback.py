"""Native-first playback orchestration seam for Shabawi-owned code."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Iterable

from .models import PlaybackSource, StreamProtocol


@dataclass(frozen=True)
class PlaybackAttempt:
    source_id: str
    success: bool
    error: str | None = None


@dataclass(frozen=True)
class PlaybackResult:
    source: PlaybackSource | None
    attempts: tuple[PlaybackAttempt, ...]


class PlaybackCoordinator:
    """Try healthy native sources first, then an explicit WebView fallback."""

    def __init__(self, opener: Callable[[PlaybackSource], bool]) -> None:
        self._opener = opener

    def ordered_sources(self, sources: Iterable[PlaybackSource]) -> list[PlaybackSource]:
        validated = list(sources)
        for source in validated:
            source.validate()
        return sorted(
            validated,
            key=lambda source: (
                source.playable_native is False,
                source.protocol is StreamProtocol.WEBVIEW,
                source.quality or "",
                source.id,
            ),
        )

    def play(self, sources: Iterable[PlaybackSource]) -> PlaybackResult:
        attempts: list[PlaybackAttempt] = []
        for source in self.ordered_sources(sources):
            try:
                if self._opener(source):
                    attempts.append(PlaybackAttempt(source.id, True))
                    return PlaybackResult(source, tuple(attempts))
                attempts.append(PlaybackAttempt(source.id, False, "opener rejected source"))
            except Exception as exc:  # provider/player adapters must not crash the caller
                attempts.append(PlaybackAttempt(source.id, False, str(exc)))
        return PlaybackResult(None, tuple(attempts))


__all__ = ["PlaybackAttempt", "PlaybackCoordinator", "PlaybackResult"]
