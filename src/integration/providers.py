"""Provider adapter seam for Shabawi-owned integration code.

Adapters normalize provider output into canonical models without importing raw
upstream modules into UI code. Network access is intentionally injected so
unit tests remain deterministic and secrets never enter the repository.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Iterable, Mapping

from .models import CatalogItem, Episode, MediaKind, PlaybackSource, ProviderRegistry, StreamProtocol


@dataclass(frozen=True)
class ProviderConfig:
    provider_id: str
    display_name: str
    enabled: bool = True


class ProviderAdapter:
    """Normalize a provider payload using an injected transport function."""

    def __init__(self, config: ProviderConfig, fetch: Callable[[str], Mapping[str, object]]) -> None:
        self.config = config
        self.fetch = fetch

    def fetch_item(self, item_id: str) -> CatalogItem:
        payload = self.fetch(item_id)
        title = str(payload.get("title", "")).strip()
        kind = MediaKind(str(payload.get("kind", MediaKind.MOVIE.value)))
        poster_url = payload.get("poster_url")
        episodes = tuple(self._episode(value) for value in payload.get("episodes", ()) if isinstance(value, Mapping))
        item = CatalogItem(
            id=item_id,
            title=title,
            kind=kind,
            year=int(payload["year"]) if payload.get("year") is not None else None,
            poster_url=str(poster_url) if poster_url else None,
            episodes=episodes,
        )
        item.validate()
        return item

    def _episode(self, payload: Mapping[str, object]) -> Episode:
        sources = tuple(
            PlaybackSource(
                id=str(source["id"]),
                url=str(source["url"]),
                protocol=StreamProtocol(str(source.get("protocol", StreamProtocol.FILE.value))),
                quality=str(source["quality"]) if source.get("quality") else None,
                provider=self.config.provider_id,
                playable_native=bool(source.get("playable_native", True)),
            )
            for source in payload.get("sources", ())
            if isinstance(source, Mapping)
        )
        episode = Episode(
            id=str(payload["id"]),
            season_number=int(payload.get("season_number", 1)),
            episode_number=int(payload["episode_number"]),
            title=str(payload["title"]),
            sources=sources,
        )
        episode.validate()
        return episode


def register_adapters(registry: ProviderRegistry, configs: Iterable[ProviderConfig]) -> tuple[str, ...]:
    """Register enabled provider identities and return deterministic ids."""
    for config in configs:
        if config.enabled:
            registry.register(config.provider_id, config.display_name)
    return registry.names()


__all__ = ["ProviderAdapter", "ProviderConfig", "register_adapters"]
