package com.shabawi.tv;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import java.util.List;

public final class MainActivity extends Activity {
    private final List<CatalogItem> catalog = CatalogRepository.seed();
    private LinearLayout content;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        Window window = getWindow();
        window.setStatusBarColor(Color.rgb(17, 17, 17));
        showHome();
    }

    private void showHome() {
        LinearLayout root = baseLayout();
        TextView brand = text("شبوي TV", 28, Color.rgb(212, 175, 55));
        brand.setGravity(Gravity.RIGHT);
        root.addView(brand, fullWidth());

        EditText search = new EditText(this);
        search.setHint("ابحث عن فيلم أو مسلسل أو قناة");
        search.setSingleLine(true);
        search.setTextColor(Color.WHITE);
        search.setHintTextColor(Color.LTGRAY);
        search.setOnEditorActionListener((v, actionId, event) -> {
            showSearch(search.getText().toString());
            return true;
        });
        root.addView(search, fullWidth());

        TextView section = text("اختيارات الشبوي", 20, Color.WHITE);
        section.setPadding(0, 24, 0, 12);
        root.addView(section, fullWidth());
        for (CatalogItem item : catalog) addCard(root, item);

        Button searchButton = new Button(this);
        searchButton.setText("عرض نتائج البحث");
        searchButton.setOnClickListener(v -> showSearch(search.getText().toString()));
        root.addView(searchButton, fullWidth());
        setContentView(wrap(root));
    }

    private void showSearch(String query) {
        LinearLayout root = baseLayout();
        Button back = new Button(this);
        back.setText("رجوع");
        back.setOnClickListener(v -> showHome());
        root.addView(back, fullWidth());
        root.addView(text("نتائج البحث", 24, Color.WHITE), fullWidth());
        List<CatalogItem> results = CatalogRepository.search(catalog, query);
        if (results.isEmpty()) {
            root.addView(text("لا توجد نتائج مطابقة", 18, Color.LTGRAY), fullWidth());
        } else {
            for (CatalogItem item : results) addCard(root, item);
        }
        setContentView(wrap(root));
    }

    private void showDetails(CatalogItem item) {
        LinearLayout root = baseLayout();
        Button back = new Button(this);
        back.setText("رجوع");
        back.setOnClickListener(v -> showHome());
        root.addView(back, fullWidth());
        root.addView(text(item.title, 28, Color.rgb(212, 175, 55)), fullWidth());
        root.addView(text(item.subtitle + "\nالتصنيف: " + item.kind, 18, Color.WHITE), fullWidth());
        Button play = new Button(this);
        play.setText("تشغيل تجريبي");
        play.setOnClickListener(v -> showMessage(root, "مسار التشغيل سيُربط بعد إضافة PlaybackSource وHealth/Fallback."));
        root.addView(play, fullWidth());
        setContentView(wrap(root));
    }

    private void addCard(LinearLayout root, CatalogItem item) {
        Button card = new Button(this);
        card.setAllCaps(false);
        card.setText(item.title + "\n" + item.subtitle);
        card.setGravity(Gravity.RIGHT | Gravity.CENTER_VERTICAL);
        card.setMinHeight(88);
        card.setOnClickListener(v -> showDetails(item));
        root.addView(card, fullWidth());
    }

    private LinearLayout baseLayout() {
        content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(24, 24, 24, 24);
        content.setBackgroundColor(Color.rgb(17, 17, 17));
        content.setLayoutDirection(View.LAYOUT_DIRECTION_RTL);
        return content;
    }

    private ScrollView wrap(View view) {
        ScrollView scroll = new ScrollView(this);
        scroll.setFillViewport(true);
        scroll.addView(view);
        return scroll;
    }

    private LinearLayout.LayoutParams fullWidth() {
        return new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private TextView text(String value, int size, int color) {
        TextView v = new TextView(this);
        v.setText(value);
        v.setTextSize(size);
        v.setTextColor(color);
        v.setPadding(0, 8, 0, 8);
        return v;
    }

    private void showMessage(LinearLayout root, String message) {
        root.addView(text(message, 16, Color.LTGRAY), fullWidth());
    }
}
