import asyncio
import httpx
import json
import os
from selectolax.parser import HTMLParser

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ar,en;q=0.8",
}

BASE_URL = "https://web52312x.faselhdx.bid"

CATEGORIES = [
    "movies", "hindi", "asian-movies", "anime-movies",
    "series", "asian-series", "tvshows", "anime",
]


def load_existing(category: str) -> tuple[list, set]:
    filename = f"{category}.json"
    if os.path.exists(filename):
        try:
            with open(filename, encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, list):
                return data, {item["link"] for item in data if "link" in item}
        except Exception as e:
            print(f"⚠️ {filename} تالف: {e}")
    return [], set()


def parse_page(html: str) -> list[dict]:
    tree = HTMLParser(html)
    items = []
    for post in tree.css("#postList .postDiv"):
        anchor = post.css_first("a")
        if not anchor:
            continue
        img = anchor.css_first("img")
        if not img:
            continue
        name = (img.attributes.get("alt") or "").strip()
        if not name:
            h1 = anchor.css_first(".h1")
            name = h1.text(strip=True) if h1 else ""
        src = img.attributes.get("data-src") or img.attributes.get("src") or ""
        link = anchor.attributes.get("href") or ""
        if name and src.startswith("http") and link:
            items.append({"name": name, "img": src, "link": link})
    return items


async def scrape_category(client: httpx.AsyncClient, category: str) -> None:
    old_items, existing_links = load_existing(category)
    new_items = []
    page = 1

    while True:
        url = f"{BASE_URL}/{category}/page/{page}"
        try:
            r = await client.get(url, timeout=30)
            if r.status_code != 200:
                print(f"⚠️ {category} page/{page} → {r.status_code}")
                break
        except Exception as e:
            print(f"⚠️ {category} page/{page} خطأ: {e}")
            break

        items = parse_page(r.text)
        if not items:
            break

        page_links = {i["link"] for i in items}

        # إيقاف مبكر
        if page_links and all(link in existing_links for link in page_links):
            print(f"⏹️ {category} توقف عند page/{page} — لا جديد")
            break

        for item in items:
            if item["link"] not in existing_links:
                new_items.append(item)
                existing_links.add(item["link"])

        print(f"✅ {category} page/{page} → {len(items)} عنصر")
        page += 1
        await asyncio.sleep(1)

    final = new_items + old_items
    filename = f"{category}.json"
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(final, f, ensure_ascii=False, indent=2)
    print(f"💾 {filename}: {len(new_items)} جديد + {len(old_items)} قديم = {len(final)} إجمالي")


async def main():
    async with httpx.AsyncClient(headers=HEADERS, follow_redirects=False) as client:
        tasks = [scrape_category(client, cat) for cat in CATEGORIES]
        await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
