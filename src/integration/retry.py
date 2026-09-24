"""Provider-neutral bounded retry policy for playback attempts."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class RetryDecision:
    attempt_number: int
    should_retry: bool


class RetryPolicy:
    """Keep retry behavior deterministic and bounded for playback adapters."""

    def __init__(self, max_attempts: int = 1) -> None:
        if max_attempts < 1:
            raise ValueError("max_attempts must be at least 1")
        self._max_attempts = max_attempts

    @property
    def max_attempts(self) -> int:
        return self._max_attempts

    def decide(self, attempt_number: int) -> RetryDecision:
        if attempt_number < 1:
            raise ValueError("attempt_number must be at least 1")
        return RetryDecision(
            attempt_number=attempt_number,
            should_retry=attempt_number < self._max_attempts,
        )


__all__ = ["RetryDecision", "RetryPolicy"]
