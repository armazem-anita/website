"""Fetch recent images from @armazemanitaoficial Instagram (best-effort)."""
from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
}

OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\instagram"
)
OUT.mkdir(parents=True, exist_ok=True)

# Known post shortcodes from previous conversation / public profile
POSTS = [
    "DbO6g9ND0d9",  # crowd / fachada noite (already used as happy-hour-ig)
]

PROFILE_URLS = [
    "https://www.instagram.com/armazemanitaoficial/",
    "https://www.instagram.com/armazemanitaoficial/?__a=1&__d=dis",
    "https://www.ddinstagram.com/armazemanitaoficial/",
]


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


def download_post_image(shortcode: str, dest: Path) -> bool:
    media = f"https://www.instagram.com/p/{shortcode}/media/?size=l"
    try:
        final, data, ctype = fetch(media)
        if ctype.startswith("image/") or data[:3] == b"\xff\xd8\xff":
            dest.write_bytes(data)
            print(f"OK post {shortcode} -> {dest.name} ({len(data)} bytes) {final[:80]}")
            return True
        print(f"SKIP {shortcode}: not image ({ctype})")
    except Exception as e:
        print(f"FAIL post {shortcode}: {type(e).__name__}: {e}")
    return False


def extract_shortcodes_from_html(html: str) -> list[str]:
    codes = re.findall(r'"shortcode":"([A-Za-z0-9_-]+)"', html)
    codes += re.findall(r"/p/([A-Za-z0-9_-]+)/", html)
    # preserve order, unique
    seen: set[str] = set()
    out: list[str] = []
    for c in codes:
        if c not in seen:
            seen.add(c)
            out.append(c)
    return out


def main() -> None:
    shortcodes = list(POSTS)

    for url in PROFILE_URLS:
        try:
            final, data, ctype = fetch(url)
            text = data.decode("utf-8", "ignore")
            found = extract_shortcodes_from_html(text)
            print(f"PROFILE {url} -> {final} found {len(found)} shortcodes")
            for c in found:
                if c not in shortcodes:
                    shortcodes.append(c)
            # also try og images / cdn urls directly
            for m in re.finditer(
                r'https://scontent[^"\\\s]+?\.(?:jpg|webp)[^"\\\s]*', text
            ):
                print("CDN hint", m.group(0)[:120])
        except Exception as e:
            print(f"FAIL profile {url}: {type(e).__name__}: {e}")

    print(f"Total shortcodes to try: {len(shortcodes[:12])}")
    saved = 0
    for i, code in enumerate(shortcodes[:12], start=1):
        dest = OUT / f"ig-{i:02d}-{code}.jpg"
        if download_post_image(code, dest):
            saved += 1
    print(f"Saved {saved} images to {OUT}")


if __name__ == "__main__":
    main()
