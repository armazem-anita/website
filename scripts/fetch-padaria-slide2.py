"""Try alternate mirrors to get carousel slide 2 of DY2wtuoj0cF."""
from __future__ import annotations

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
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\instagram"
)
CODE = "DY2wtuoj0cF"
DEST = OUT / "ig-padaria-gallery.jpg"
COVER = OUT / f"ig-padaria-{CODE}.jpg"


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


def extract_urls(text: str) -> list[str]:
    text = (
        text.replace("\\u0026", "&")
        .replace("\\/", "/")
        .replace("&amp;", "&")
    )
    pats = [
        r"https://[^\"'\\s<>]+scontent[^\"'\\s<>]+\.(?:jpg|webp)[^\"'\\s<>]*",
        r"https://[^\"'\\s<>]+cdninstagram[^\"'\\s<>]+\.(?:jpg|webp)[^\"'\\s<>]*",
        r"https://[^\"'\\s<>]+fbcdn\.net[^\"'\\s<>]+\.(?:jpg|webp)[^\"'\\s<>]*",
        r'"display_url"\s*:\s*"(https:[^"]+)"',
        r'"display_uri"\s*:\s*"(https:[^"]+)"',
    ]
    found: list[str] = []
    for p in pats:
        for m in re.findall(p, text):
            u = m if m.startswith("http") else m
            u = u.encode("utf-8").decode("unicode_escape") if "\\u" in u else u
            if u not in found:
                found.append(u)
    return found


def main() -> None:
    mirrors = [
        f"https://www.ddinstagram.com/p/{CODE}/?img_index=2",
        f"https://ddinstagram.com/p/{CODE}/?img_index=2",
        f"https://www.instagrice.com/p/{CODE}/?img_index=2",
        f"https://images.weserv.nl/?url=https://www.instagram.com/p/{CODE}/media/?size=l",
        f"https://www.instagram.com/p/{CODE}/?img_index=2&__a=1&__d=dis",
    ]

    all_urls: list[str] = []
    for url in mirrors:
        try:
            final, data, ctype = fetch(url)
            print(f"OK {url[:70]}")
            print(f"  -> {final[:90]} ctype={ctype} len={len(data)}")
            if data[:3] == b"\xff\xd8\xff":
                DEST.write_bytes(data)
                print("  direct JPEG saved")
                continue
            text = data.decode("utf-8", "ignore")
            urls = extract_urls(text)
            print(f"  urls={len(urls)}")
            for i, u in enumerate(urls[:10]):
                print(f"   {i}: {u[:130]}")
            for u in urls:
                if u not in all_urls:
                    all_urls.append(u)
            # og:image
            og = re.search(
                r'property="og:image"\s+content="([^"]+)"', text
            ) or re.search(r'content="([^"]+)"\s+property="og:image"', text)
            if og:
                print("  og:image", og.group(1)[:130])
                if og.group(1) not in all_urls:
                    all_urls.insert(0, og.group(1))
        except Exception as e:
            print(f"FAIL {url[:70]}: {type(e).__name__}: {e}")

    # Download candidates; skip ones identical to cover
    cover_bytes = COVER.read_bytes() if COVER.exists() else b""
    for i, u in enumerate(all_urls[:15]):
        try:
            _, data, ctype = fetch(u)
            if data[:3] != b"\xff\xd8\xff":
                continue
            if data == cover_bytes:
                print(f"cand {i}: same as cover, skip")
                continue
            dest = OUT / f"ig-padaria-slide-{i}.jpg"
            dest.write_bytes(data)
            im = Image.open(dest)
            print(f"cand {i}: {im.size} {len(data)} -> {dest.name}")
            DEST.write_bytes(data)
            print(f"SELECTED slide {i}")
            break
        except Exception as e:
            print(f"cand fail {i}: {e}")

    if not DEST.exists() and COVER.exists():
        print("Using cover as fallback")
        DEST.write_bytes(COVER.read_bytes())

    if DEST.exists():
        im = Image.open(DEST).convert("RGB")
        w, h = im.size
        crop_h = int(w * 3 / 4)
        if crop_h <= h:
            y0 = max(0, (h - crop_h) // 3)  # bias slightly up for display cases
            im = im.crop((0, y0, w, min(h, y0 + crop_h)))
        im.save(DEST, "JPEG", quality=92, optimize=True)
        print("final", DEST.name, im.size)


if __name__ == "__main__":
    main()
