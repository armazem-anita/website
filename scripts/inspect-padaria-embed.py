"""Inspect Instagram embed HTML for carousel image URLs."""
from __future__ import annotations

import re
import urllib.request
from pathlib import Path

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
}

OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\scripts"
)
CODE = "DY2wtuoj0cF"


def main() -> None:
    url = f"https://www.instagram.com/p/{CODE}/embed/captioned/"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        html = r.read().decode("utf-8", "ignore")

    # Write to workspace-adjacent scripts folder (already in project)
    dump = OUT / "padaria-embed.html"
    dump.write_text(html, encoding="utf-8")
    print("wrote", dump, "len", len(html))

    # Interesting substrings
    for kw in [
        "scontent",
        "cdninstagram",
        "display_url",
        "sidecar",
        "Carousel",
        "img_index",
        "708557713",
        ".jpg",
        "fbcdn",
    ]:
        print(kw, html.lower().count(kw.lower()) if kw != ".jpg" else html.count(kw))

    # Sample any http urls
    urls = re.findall(r"https?://[^\s\"'<>\\]{20,200}", html)
    print("http-ish", len(urls))
    for u in urls[:40]:
        print(" ", u[:160])

    # Look for base64 or context JSON
    for m in re.finditer(r"window\.__additionalDataLoaded\(|\"contextJSON\"|gql_data", html):
        print("marker", m.group(), "at", m.start())


if __name__ == "__main__":
    main()
