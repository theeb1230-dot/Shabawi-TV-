package com.shabawi.tv;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class CatalogRepository {
    private CatalogRepository() {}

    public static List<CatalogItem> seed() {
        List<CatalogItem> items = new ArrayList<>();
        items.add(new CatalogItem("demo-1", "المدخل", "مسلسل درامي", "مسلسلات"));
        items.add(new CatalogItem("demo-2", "رحلة صيف", "فيلم عائلي", "أفلام"));
        items.add(new CatalogItem("demo-3", "ليلة الرياض", "مباشر", "مباشر"));
        items.add(new CatalogItem("demo-4", "أنمي الجيل الجديد", "أنمي", "أنمي"));
        return Collections.unmodifiableList(items);
    }

    public static List<CatalogItem> search(List<CatalogItem> source, String query) {
        List<CatalogItem> result = new ArrayList<>();
        for (CatalogItem item : source) {
            if (item.matches(query)) result.add(item);
        }
        return result;
    }
}
