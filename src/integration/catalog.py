"""Provider-neutral catalog and playback orchestration for Shabawi-owned code."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Optional

from .models import CatalogItem, Episode, LiveChannel, PlaybackSource, ProviderRegistry, native_first


@dataclass(frozen=True)
class LiveChannel:
    id: str
    name: str
    logo_url: Optional[str] = None
    sources: tuple[PlaybackSource, ...] = ()

    def validate(self) -> None:
        if not self.id.strip() or not self.name.strip():
            raise ValueError("live channel id and name are required")
        if self.logo_url and not self.logo_url.startswith(("https://", "http://")):
            raise ValueError("logo url must be absolute")
        for source in self.sources:
            source.validate()


class CatalogService:
    """Deterministic in-memory service used as the seam for provider adapters and UI."""

    def __init__(self, items: Iterable[CatalogItem] = (), live_channels: Iterable[LiveChannel] = ()) -> None:
        self._items: dict[str, CatalogItem] = {}
        self._live: dict[str, LiveChannel] = {}
        for item in items:
            self.add_item(item)
        for channel in live_channels:
            self.add_live_channel(channel)

    def add_item(self, item: CatalogItem) -> None:
        item.validate()
        self._items[item.id] = item

    def add_live_channel(self, channel: LiveChannel) -> None:
        channel.validate()
        self._live[channel.id] = channel

    def search(self, query: str) -> list[CatalogItem]:
        needle = query.strip().casefold()
        if not needle:
            return []
        return sorted(
            (item for item in self._items.values() if needle in item.title.casefold()),
            key=lambda item: (item.title.casefold(), item.id),
        )

    def details(self, item_id: str) -> CatalogItem:
        try:
            return self._items[item_id]
        except KeyError as exc:
            raise KeyError(f"catalog item not found: {item_id}") from exc

    def episodes(self, item_id: str, season_number: Optional[int] = None) -> list[Episode]:
        item = self.details(item_id)
        episodes = [episode for episode in item.episodes if season_number is None or episode.season_number == season_number]
        return sorted(episodes, key=lambda episode: (episode.season_number, episode.episode_number, episode.id))

    def live(self) -> list[LiveChannel]:
        return sorted(self._live.values(), key=lambda channel: (channel.name.casefold(), channel.id))

    def playback(self, sources: Iterable[PlaybackSource]) -> list[PlaybackSource]:
        validated = list(sources)
        for source in validated:
            source.validate()
        return native_first(validated)

    def health_candidates(self, sources: Iterable[PlaybackSource], failed_ids: set[str] | None = None) -> list[PlaybackSource]:
        failed = failed_ids or set()
        return [source for source in self.playback(sources) if source.id not in failed]


__all__ = ["CatalogService", "LiveChannel", "ProviderRegistry"]
