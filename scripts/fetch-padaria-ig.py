"""Download carousel image index 2 from Instagram post DY2wtuoj0cF."""
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
}

OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\instagram"
)
CODE = "DY2wtuoj0cF"
DEST = OUT / "ig-padaria-gallery.jpg"


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


def main() -> None:
    # Cover was saved as index 1; try embed / html for carousel display_urls
    pages = [
        f"https://www.instagram.com/p/{CODE}/embed/",
        f"https://www.instagram.com/p/{CODE}/embed/captioned/",
        f"https://www.instagram.com/p/{CODE}/?img_index=2",
    ]
    cdn: list[str] = []
    for url in pages:
        try:
            final, data, _ = fetch(url)
            text = data.decode("utf-8", "ignore")
            text = text.replace("\\u0026", "&").replace("\\/", "/")
            found = re.findall(
                r"https://(?:scontent|instagram)[^\"'\\s<>]+?\.(?:jpg|webp)[^\"'\\s<>]*",
                text,
            )
            found += re.findall(
                r"https://[^\"'\\s<>]*cdninstagram[^\"'\\s<>]+\.(?:jpg|webp)[^\"'\\s<>]*",
                text,
            )
            found += re.findall(
                r"https://[^\"'\\s<>]*fbcdn[^\"'\\s<>]+\.(?:jpg|webp)[^\"'\\s<>]*",
                text,
            )
            print(f"{url} -> {final[:70]} found {len(found)}")
            for u in found:
                if "s150x150" in u or "s240x240" in u or "s320x320" in u:
                    continue
                if u not in cdn:
                    cdn.append(u)
        except Exception as e:
            print(f"FAIL {url}: {type(e).__name__}: {e}")

    print(f"Unique CDN urls: {len(cdn)}")
    for i, u in enumerate(cdn[:12]):
        print(i, u[:140])

    # Prefer larger images; try downloading candidates after the first (cover)
    candidates = cdn[1:] if len(cdn) > 1 else cdn
    # Also try media with different approaches - sometimes index=2 works via graphql
    # Save each candidate temporarily and pick best non-cover
    saved = False
    for i, u in enumerate(candidates[:6]):
        try:
            _, data, ctype = fetch(u)
            if data[:3] != b"\xff\xd8\xff" and b"image" not in ctype.encode():
                if data[:3] != b"\xff\xd8\xff":
                    continue
            dest = OUT / f"ig-padaria-cand-{i}.jpg"
            dest.write_bytes(data)
            im = Image.open(dest)
            print(f"cand {i}: {dest.name} {im.size} {len(data)}")
            # Prefer landscape bakery photo without needing cover
            if im.size[0] >= 800:
                DEST.write_bytes(data)
                print(f"SELECTED {dest.name} -> {DEST.name}")
                saved = True
                # keep going to prefer later carousel slides if larger
        except Exception as e:
            print(f"cand fail {i}: {e}")

    if not saved and cdn:
        _, data, _ = fetch(cdn[0])
        DEST.write_bytes(data)
        print("fallback to first CDN")

    # Crop to 4:3 for gallery consistency
    if DEST.exists():
        im = Image.open(DEST).convert("RGB")
        w, h = im.size
        crop_h = int(w * 3 / 4)
        if crop_h <= h:
            y0 = max(0, (h - crop_h) // 2 - int(h * 0.05))
            im = im.crop((0, y0, w, y0 + crop_h))
        else:
            crop_w = int(h * 4 / 3)
            x0 = max(0, (w - crop_w) // 2)
            im = im.crop((x0, 0, x0 + crop_w, h))
        im.save(DEST, "JPEG", quality=92, optimize=True)
        print("final", DEST, im.size)


if __name__ == "__main__":
    main()
