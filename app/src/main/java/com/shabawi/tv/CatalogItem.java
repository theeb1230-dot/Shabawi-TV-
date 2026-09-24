package com.shabawi.tv;

public final class CatalogItem {
    public final String id;
    public final String title;
    public final String subtitle;
    public final String kind;

    public CatalogItem(String id, String title, String subtitle, String kind) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.kind = kind;
    }

    public boolean matches(String query) {
        if (query == null || query.trim().isEmpty()) return true;
        String needle = query.trim().toLowerCase();
        return title.toLowerCase().contains(needle)
                || subtitle.toLowerCase().contains(needle)
                || kind.toLowerCase().contains(needle);
    }
}
