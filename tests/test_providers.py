import unittest

from src.integration.models import MediaKind, ProviderRegistry, StreamProtocol
from src.integration.providers import ProviderAdapter, ProviderConfig, register_adapters


class ProviderAdapterTests(unittest.TestCase):
    def test_normalizes_item_and_episode_sources(self):
        payload = {
            "title": "Shabawi Series",
            "kind": "series",
            "year": 2026,
            "poster_url": "https://cdn.example/poster.jpg",
            "episodes": [
                {
                    "id": "s1e1",
                    "season_number": 1,
                    "episode_number": 1,
                    "title": "Pilot",
                    "sources": [
                        {
                            "id": "hls-1080",
                            "url": "https://cdn.example/s1e1.m3u8",
                            "protocol": "hls",
                            "quality": "1080p",
                            "playable_native": True,
                        }
                    ],
                }
            ],
        }
        adapter = ProviderAdapter(
            ProviderConfig("demo", "Demo Provider"),
            lambda _item_id: payload,
        )

        item = adapter.fetch_item("series-1")

        self.assertEqual(MediaKind.SERIES, item.kind)
        self.assertEqual("s1e1", item.episodes[0].id)
        self.assertEqual(StreamProtocol.HLS, item.episodes[0].sources[0].protocol)
        self.assertEqual("demo", item.episodes[0].sources[0].provider)
        self.assertTrue(item.episodes[0].sources[0].playable_native)

    def test_register_adapters_skips_disabled_configs(self):
        registry = ProviderRegistry()
        names = register_adapters(
            registry,
            [
                ProviderConfig("enabled", "Enabled"),
                ProviderConfig("disabled", "Disabled", enabled=False),
            ],
        )

        self.assertEqual(("enabled",), names)
        self.assertEqual("Enabled", registry.display_name("enabled"))


if __name__ == "__main__":
    unittest.main()
