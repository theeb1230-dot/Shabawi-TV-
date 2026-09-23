"""Shabawi-owned canonical content and playback contracts.

This module is intentionally provider-neutral. Raw upstream mirrors stay under
upstream/Ahmd3301 and are never imported directly by UI code.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Iterable, Optional


class MediaKind(str, Enum):
    MOVIE = "movie"
    SERIES = "series"
    ANIME = "anime"
    LIVE = "live"


class StreamProtocol(str, Enum):
    HLS = "hls"
    DASH = "dash"
    FILE = "file"
    WEBVIEW = "webview"


@dataclass(frozen=True)
class PlaybackSource:
    id: str
    url: str
    protocol: StreamProtocol
    quality: Optional[str] = None
    provider: str = "unknown"
    playable_native: bool = True

    def validate(self) -> None:
        if not self.id.strip():
            raise ValueError("playback source id is required")
        if not self.url.startswith(("https://", "http://")):
            raise ValueError("playback source url must be absolute")
        if self.protocol is StreamProtocol.WEBVIEW:
            self.playable_native = False


@dataclass(frozen=True)
class Episode:
    id: str
    season_number: int
    episode_number: int
    title: str
    sources: tuple[PlaybackSource, ...] = field(default_factory=tuple)

    def validate(self) -> None:
        if self.season_number < 0 or self.episode_number < 1:
            raise ValueError("invalid season/episode numbers")
        if not self.title.strip():
            raise ValueError("episode title is required")
        for source in self.sources:
            source.validate()


@dataclass(frozen=True)
class CatalogItem:
    id: str
    title: str
    kind: MediaKind
    year: Optional[int] = None
    poster_url: Optional[str] = None
    episodes: tuple[Episode, ...] = field(default_factory=tuple)

    def validate(self) -> None:
        if not self.id.strip() or not self.title.strip():
            raise ValueError("catalog item id and title are required")
        if self.poster_url and not self.poster_url.startswith(("https://", "http://")):
            raise ValueError("poster url must be absolute")
        for episode in self.episodes:
            episode.validate()


class ProviderRegistry:
    """Small deterministic registry used by integration code and tests."""

    def __init__(self) -> None:
        self._providers: dict[str, str] = {}

    def register(self, provider_id: str, display_name: str) -> None:
        key = provider_id.strip().lower()
        if not key or not display_name.strip():
            raise ValueError("provider id and display name are required")
        self._providers[key] = display_name.strip()

    def names(self) -> tuple[str, ...]:
        return tuple(sorted(self._providers))

    def is_registered(self, provider_id: str) -> bool:
        return provider_id.strip().lower() in self._providers


def native_first(sources: Iterable[PlaybackSource]) -> list[PlaybackSource]:
    """Return native-capable sources first and WebView fallback last."""
    return sorted(sources, key=lambda item: (not item.playable_native, item.quality or ""))
