package com.shabawi.tv;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Provider-neutral native-first playback selection seam.
 * It does not fetch or proxy media. It only validates local source metadata,
 * orders sources deterministically, and reports why a source is not eligible.
 */
public final class PlaybackCoordinator {
    public enum Decision { PLAY, SKIP }

    public static final class Candidate {
        public final PlaybackSource source;
        public final Decision decision;
        public final String reason;

        Candidate(PlaybackSource source, Decision decision, String reason) {
            this.source = source;
            this.decision = decision;
            this.reason = reason;
        }
    }

    public List<Candidate> plan(List<PlaybackSource> sources) {
        if (sources == null || sources.isEmpty()) return Collections.emptyList();
        List<PlaybackSource> ordered = new ArrayList<>(sources);
        ordered.sort(Comparator.comparingInt((PlaybackSource s) -> nativeRank(s.type))
                .thenComparingInt(s -> s.priority));
        List<Candidate> result = new ArrayList<>();
        for (PlaybackSource source : ordered) {
            if (source == null) continue;
            if (isEligible(source)) {
                result.add(new Candidate(source, Decision.PLAY, "eligible"));
            } else {
                result.add(new Candidate(source, Decision.SKIP, "missing or unsupported URI"));
            }
        }
        return result;
    }

    public Candidate firstPlayable(List<PlaybackSource> sources) {
        for (Candidate candidate : plan(sources)) {
            if (candidate.decision == Decision.PLAY) return candidate;
        }
        return null;
    }

    private boolean isEligible(PlaybackSource source) {
        if (source.uri == null || source.uri.trim().isEmpty()) return false;
        String uri = source.uri.trim().toLowerCase();
        switch (source.type) {
            case HLS: return uri.startsWith("http://") || uri.startsWith("https://") || uri.startsWith("content://");
            case DASH: return uri.startsWith("http://") || uri.startsWith("https://") || uri.startsWith("content://");
            case FILE: return uri.startsWith("file://") || uri.startsWith("content://");
            case WEBVIEW: return uri.startsWith("http://") || uri.startsWith("https://");
            default: return false;
        }
    }

    private int nativeRank(PlaybackSource.Type type) {
        switch (type) {
            case HLS: return 0;
            case DASH: return 1;
            case FILE: return 2;
            case WEBVIEW: return 3;
            default: return 4;
        }
    }
}
