import unittest

from src.integration.models import PlaybackSource, StreamProtocol
from src.integration.playback import PlaybackCoordinator
from src.integration.retry import RetryPolicy


class PlaybackRetryIntegrationTests(unittest.TestCase):
    def test_retries_same_source_before_fallback(self):
        calls = []

        def opener(source):
            calls.append(source.id)
            return len(calls) == 2

        source = PlaybackSource("native", "https://example.test/live.m3u8", StreamProtocol.HLS)
        coordinator = PlaybackCoordinator(opener, retry_policy=RetryPolicy(max_attempts=2))

        result = coordinator.play([source])

        self.assertEqual(result.source, source)
        self.assertEqual(calls, ["native", "native"])
        self.assertEqual(len(result.attempts), 2)
        self.assertFalse(result.attempts[0].success)
        self.assertTrue(result.attempts[1].success)

    def test_exhausted_retry_moves_to_next_source(self):
        calls = []

        def opener(source):
            calls.append(source.id)
            return source.id == "fallback"

        primary = PlaybackSource("primary", "https://example.test/primary.m3u8", StreamProtocol.HLS)
        fallback = PlaybackSource("fallback", "https://example.test/fallback.m3u8", StreamProtocol.DASH)
        coordinator = PlaybackCoordinator(opener, retry_policy=RetryPolicy(max_attempts=2))

        result = coordinator.play([primary, fallback])

        self.assertEqual(result.source, fallback)
        self.assertEqual(calls, ["primary", "primary", "fallback"])
        self.assertEqual(len(result.attempts), 3)


if __name__ == "__main__":
    unittest.main()
