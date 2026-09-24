package com.shabawi.tv;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public final class ProviderRegistry {
    private final List<PlaybackSource> sources;

    public ProviderRegistry() {
        sources = Arrays.asList(
                new PlaybackSource("demo-hls", PlaybackSource.Type.HLS, "تجريبي HLS", "https://example.invalid/shabawi/demo.m3u8", 1),
                new PlaybackSource("demo-file", PlaybackSource.Type.FILE, "تجريبي ملف", "https://example.invalid/shabawi/demo.mp4", 2)
        );
    }

    public List<PlaybackSource> sourcesFor(CatalogItem item) {
        return Collections.unmodifiableList(new ArrayList<>(sources));
    }

    public List<Episode> episodesFor(CatalogItem item) {
        if (!"series".equals(item.kind)) return Collections.emptyList();
        List<Episode> episodes = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            episodes.add(new Episode(item.id + "-s1e" + i, 1, i, "الحلقة " + i, sourcesFor(item)));
        }
        return episodes;
    }

    public List<LiveChannel> liveChannels() {
        return Arrays.asList(
                new LiveChannel("news", "شبوي الأخبار", "أخبار", sources),
                new LiveChannel("sports", "شبوي الرياضة", "رياضة", sources)
        );
    }
}
