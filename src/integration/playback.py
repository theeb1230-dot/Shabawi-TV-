"""Native-first playback orchestration seam for Shabawi-owned code."""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Callable, Iterable, Mapping

from .models import PlaybackSource, StreamProtocol
from .session import PlaybackSession

if TYPE_CHECKING:
    from .health import SourceHealth


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
    """Try healthy native sources first, then explicit WebView fallback.

    A provider-neutral ``PlaybackSession`` can be supplied so successful source
    selection is connected to resumable lifecycle state without coupling UI or
    provider implementations to this coordinator.
    """

    _PROTOCOL_PRIORITY = {
        StreamProtocol.HLS: 0,
        StreamProtocol.DASH: 1,
        StreamProtocol.FILE: 2,
        StreamProtocol.WEBVIEW: 3,
    }

    def __init__(
        self,
        opener: Callable[[PlaybackSource], bool],
        health_scores: Mapping[str, float] | None = None,
        health: "SourceHealth | None" = None,
        session: PlaybackSession | None = None,
    ) -> None:
        self._opener = opener
        self._health = health
        self._health_scores = dict(health_scores or {})
        self._session = session

    @property
    def session(self) -> PlaybackSession | None:
        return self._session

    def checkpoint(self, position_seconds: float) -> PlaybackSession | None:
        """Persist a lifecycle checkpoint for the active session, if any."""
        if self._session is None:
            return None
        self._session = self._session.checkpoint(position_seconds)
        return self._session

    def _bind_session_to_source(self, source: PlaybackSource) -> None:
        if self._session is None:
            return
        self._session = PlaybackSession(
            source_id=source.id,
            position_seconds=self._session.position_seconds,
            duration_seconds=self._session.duration_seconds,
            active=True,
        )

    def _score(self, source_id: str) -> float:
        if self._health is not None:
            return self._health.score(source_id)
        return float(self._health_scores.get(source_id, 0.0))

    def ordered_sources(self, sources: Iterable[PlaybackSource]) -> list[PlaybackSource]:
        validated = list(sources)
        for source in validated:
            source.validate()
        return sorted(
            validated,
            key=lambda source: (
                source.protocol is StreamProtocol.WEBVIEW,
                not source.playable_native,
                -self._score(source.id),
                self._PROTOCOL_PRIORITY[source.protocol],
                source.quality or "",
                source.id,
            ),
        )

    def play(self, sources: Iterable[PlaybackSource]) -> PlaybackResult:
        attempts: list[PlaybackAttempt] = []
        for source in self.ordered_sources(sources):
            try:
                if self._opener(source):
                    if self._health is not None:
                        self._health.mark_success(source.id)
                    self._bind_session_to_source(source)
                    attempts.append(PlaybackAttempt(source.id, True))
                    return PlaybackResult(source, tuple(attempts))
                if self._health is not None:
                    self._health.mark_failure(source.id)
                attempts.append(PlaybackAttempt(source.id, False, "opener rejected source"))
            except Exception as exc:
                if self._health is not None:
                    self._health.mark_failure(source.id)
                attempts.append(PlaybackAttempt(source.id, False, str(exc)))
        return PlaybackResult(None, tuple(attempts))


__all__ = ["PlaybackAttempt", "PlaybackCoordinator", "PlaybackResult"]
