"""Deterministic source health scoring for Shabawi-owned integration."""
from __future__ import annotations

from dataclasses import dataclass
from time import monotonic

from .models import PlaybackSource, native_first


@dataclass
class HealthRecord:
    successes: int = 0
    failures: int = 0
    last_failure_at: float | None = None

    @property
    def score(self) -> float:
        total = self.successes + self.failures
        if total == 0:
            return 0.5
        return self.successes / total


class SourceHealth:
    """Bounded in-memory health feedback with deterministic ranking."""

    def __init__(self) -> None:
        self._records: dict[str, HealthRecord] = {}

    def mark_success(self, source_id: str) -> None:
        record = self._records.setdefault(source_id, HealthRecord())
        record.successes += 1

    def mark_failure(self, source_id: str) -> None:
        record = self._records.setdefault(source_id, HealthRecord())
        record.failures += 1
        record.last_failure_at = monotonic()

    def score(self, source_id: str) -> float:
        return max(0.0, min(1.0, self._records.get(source_id, HealthRecord()).score))

    def scores(self) -> dict[str, float]:
        return {source_id: self.score(source_id) for source_id in self._records}

    def rank(self, sources: list[PlaybackSource]) -> list[PlaybackSource]:
        """Native-first, then highest health score, then stable id."""
        return sorted(
            native_first(sources),
            key=lambda source: (-self.score(source.id), source.id),
        )
