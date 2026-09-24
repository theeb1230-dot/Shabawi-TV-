import unittest

from src.integration.session import PlaybackSession


class PlaybackSessionTests(unittest.TestCase):
    def test_checkpoint_preserves_source_and_clamps_to_duration(self):
        session = PlaybackSession("source-1", position_seconds=10, duration_seconds=100)
        checkpoint = session.checkpoint(150)

        self.assertEqual(checkpoint.source_id, "source-1")
        self.assertEqual(checkpoint.position_seconds, 100)
        self.assertEqual(checkpoint.completion_ratio(), 1.0)

    def test_pause_and_resume_preserve_checkpoint(self):
        session = PlaybackSession("source-1", position_seconds=42, duration_seconds=120)

        paused = session.pause()
        resumed = paused.resume()

        self.assertFalse(paused.active)
        self.assertEqual(paused.position_seconds, 42)
        self.assertTrue(resumed.active)
        self.assertEqual(resumed.position_seconds, 42)

    def test_invalid_session_values_are_rejected(self):
        with self.assertRaises(ValueError):
            PlaybackSession("", duration_seconds=10)

        with self.assertRaises(ValueError):
            PlaybackSession("source-1", position_seconds=-1, duration_seconds=10)

        with self.assertRaises(ValueError):
            PlaybackSession("source-1", duration_seconds=-1)


if __name__ == "__main__":
    unittest.main()
