import unittest

from src.integration.catalog import CatalogService, LiveChannel
from src.integration.models import CatalogItem, Episode, MediaKind, PlaybackSource, StreamProtocol


class CatalogServiceTests(unittest.TestCase):
    def setUp(self):
        self.native = PlaybackSource("native", "https://cdn.example/stream.m3u8", StreamProtocol.HLS, quality="1080p", playable_native=True)
        self.webview = PlaybackSource("web", "https://example.com/watch", StreamProtocol.WEBVIEW, playable_native=False)
        self.item = CatalogItem(
            id="series-1",
            title="Shabawi Originals",
            kind=MediaKind.SERIES,
            episodes=(
                Episode("e2", 1, 2, "Second", (self.native,)),
                Episode("e1", 1, 1, "First", (self.native,)),
            ),
        )

    def test_search_details_and_episode_order(self):
        service = CatalogService([self.item])
        self.assertEqual([self.item], service.search("originals"))
        self.assertEqual("series-1", service.details("series-1").id)
        self.assertEqual(["e1", "e2"], [episode.id for episode in service.episodes("series-1", 1)])

    def test_playback_native_first_and_failed_filter(self):
        service = CatalogService()
        ordered = service.playback([self.webview, self.native])
        self.assertEqual(["native", "web"], [source.id for source in ordered])
        self.assertEqual(["web"], [source.id for source in service.health_candidates([self.native, self.webview], {"native"})])

    def test_live_channels_are_sorted_and_validated(self):
        service = CatalogService(live_channels=[
            LiveChannel("z", "Zed", sources=(self.native,)),
            LiveChannel("a", "Alpha", sources=(self.native,)),
        ])
        self.assertEqual(["Alpha", "Zed"], [channel.name for channel in service.live()])


if __name__ == "__main__":
    unittest.main()
