package com.shabawi.tv;

public final class PlaybackSource {
    public enum Type { HLS, DASH, FILE, WEBVIEW }

    public final String id;
    public final Type type;
    public final String label;
    public final String uri;
    public final int priority;

    public PlaybackSource(String id, Type type, String label, String uri, int priority) {
        this.id = id;
        this.type = type;
        this.label = label;
        this.uri = uri;
        this.priority = priority;
    }
}
