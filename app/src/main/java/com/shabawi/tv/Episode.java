package com.shabawi.tv;

import java.util.Collections;
import java.util.List;

public final class Episode {
    public final String id;
    public final int season;
    public final int number;
    public final String title;
    public final List<PlaybackSource> sources;

    public Episode(String id, int season, int number, String title, List<PlaybackSource> sources) {
        this.id = id;
        this.season = season;
        this.number = number;
        this.title = title;
        this.sources = Collections.unmodifiableList(sources);
    }
}
