"""Download Instagram media for gallery updates."""
from __future__ import annotations

import urllib.request
from pathlib import Path

from PIL import Image

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
}

OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\instagram"
)
OUT.mkdir(parents=True, exist_ok=True)

POSTS = {
    "copa": "DZOKtnvjzij",
    "churrasco": "DXkHcadjh5x",
    "rua": "Daa45Yyke0E",  # may need index 4; media endpoint returns first
}


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


def download_media(code: str, dest: Path) -> bool:
    url = f"https://www.instagram.com/p/{code}/media/?size=l"
    try:
        final, data, ctype = fetch(url)
        if data[:3] == b"\xff\xd8\xff" or ctype.startswith("image/"):
            dest.write_bytes(data)
            print(f"OK {code} -> {dest.name} ({len(data)}) {final[:90]}")
            return True
        print(f"SKIP {code}: {ctype}")
    except Exception as e:
        print(f"FAIL {code}: {type(e).__name__}: {e}")
    return False


def to_43(src: Path, dest: Path, focus_y: float = 0.45) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    crop_h = int(w * 3 / 4)
    if crop_h <= h:
        cy = int(h * focus_y)
        y0 = max(0, min(h - crop_h, cy - crop_h // 2))
        im = im.crop((0, y0, w, y0 + crop_h))
    else:
        crop_w = int(h * 4 / 3)
        x0 = max(0, (w - crop_w) // 2)
        im = im.crop((x0, 0, x0 + crop_w, h))
    im.save(dest, "JPEG", quality=92, optimize=True)
    print(f"crop {src.name} -> {dest.name} {im.size}")


def main() -> None:
    for key, code in POSTS.items():
        raw = OUT / f"ig-{key}-raw-{code}.jpg"
        gallery = OUT / f"ig-{key}-gallery.jpg"
        if download_media(code, raw):
            to_43(raw, gallery)


if __name__ == "__main__":
    main()
