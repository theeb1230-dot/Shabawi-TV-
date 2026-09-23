import unittest

from src.integration.models import (
    CatalogItem,
    Episode,
    MediaKind,
    PlaybackSource,
    ProviderRegistry,
    StreamProtocol,
    native_first,
)


class IntegrationModelTests(unittest.TestCase):
    def test_provider_registry_is_deterministic(self):
        registry = ProviderRegistry()
        registry.register(" TMDB ", "Metadata")
        registry.register("provider-b", "Provider B")
        self.assertEqual(registry.names(), ("provider-b", "tmdb"))
        self.assertTrue(registry.is_registered("TMDB"))

    def test_native_sources_are_before_webview(self):
        native = PlaybackSource("hls", "https://example.test/master.m3u8", StreamProtocol.HLS, "1080p")
        fallback = PlaybackSource("web", "https://example.test/watch", StreamProtocol.WEBVIEW, playable_native=False)
        self.assertEqual([s.id for s in native_first([fallback, native])], ["hls", "web"])

    def test_catalog_item_validates_nested_episode(self):
        source = PlaybackSource("file", "https://example.test/video.mp4", StreamProtocol.FILE)
        item = CatalogItem(
            id="movie-1",
            title="Example",
            kind=MediaKind.MOVIE,
            episodes=(Episode("ep-1", 0, 1, "Pilot", (source,)),),
        )
        item.validate()

    def test_webview_cannot_claim_native(self):
        source = PlaybackSource("web", "https://example.test/watch", StreamProtocol.WEBVIEW)
        with self.assertRaises(ValueError):
            source.validate()


if __name__ == "__main__":
    unittest.main()
