package com.shabawi.tv;

import java.util.Collections;
import java.util.List;

public final class LiveChannel {
    public final String id;
    public final String name;
    public final String category;
    public final List<PlaybackSource> sources;

    public LiveChannel(String id, String name, String category, List<PlaybackSource> sources) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.sources = Collections.unmodifiableList(sources);
    }
}
