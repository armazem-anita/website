"""Try to get carousel slide 4 of Daa45Yyke0E via embed JSON patterns."""
from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

from PIL import Image

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "pt-BR,pt;q=0.9",
}
OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\instagram"
)
CODE = "Daa45Yyke0E"


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        return r.read()


def main() -> None:
    html = fetch(f"https://www.instagram.com/p/{CODE}/embed/captioned/").decode(
        "utf-8", "ignore"
    )
    html = html.replace("\\u0026", "&").replace("\\/", "/")
    # Look for sidecar / carousel image lists
    for pat in [
        r'"display_url":"(https:[^"]+)"',
        r'"display_src":"(https:[^"]+)"',
        r'"src":"(https:[^"]+scontent[^"]+\.jpg[^"]*)"',
        r"(https://[^\"'\\s]+scontent[^\"'\\s]+\.jpg[^\"'\\s]*)",
    ]:
        found = re.findall(pat, html)
        print(pat[:40], "->", len(found))
        for i, u in enumerate(found[:12]):
            print(" ", i, u[:120])

    # Also try thrid party: worker proxies sometimes used
    proxies = [
        f"https://www.instagram.com/p/{CODE}/media/?size=l",
    ]
    # Save whatever we get as candidates numbered
    urls = re.findall(r'"display_url":"(https:[^"]+)"', html)
    urls = [u.encode().decode("unicode_escape") if "\\u" in u else u for u in urls]
    uniq = []
    for u in urls:
        u = u.replace("\\/", "/")
        if u not in uniq:
            uniq.append(u)
    print("display_url uniq", len(uniq))
    for i, u in enumerate(uniq):
        try:
            data = fetch(u)
            if data[:3] != b"\xff\xd8\xff":
                continue
            p = OUT / f"ig-rua-slide-{i+1}.jpg"
            p.write_bytes(data)
            im = Image.open(p)
            print("saved", p.name, im.size, len(data))
        except Exception as e:
            print("fail", i, e)

    # If we have 4+, use 4th; else keep existing
    slide4 = OUT / "ig-rua-slide-4.jpg"
    dest = OUT / "ig-rua-gallery.jpg"
    if slide4.exists():
        im = Image.open(slide4).convert("RGB")
        w, h = im.size
        crop_h = int(w * 3 / 4)
        if crop_h <= h:
            y0 = max(0, (h - crop_h) // 2)
            im = im.crop((0, y0, w, y0 + crop_h))
        im = im.resize((1080, 810), Image.Resampling.LANCZOS)
        im.save(dest, "JPEG", quality=93, optimize=True)
        print("UPDATED gallery from slide 4")
    else:
        print("No slide 4 found; keeping existing rua gallery")


if __name__ == "__main__":
    main()
