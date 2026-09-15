"""Search IG mirrors for churrasco / copa posts and download candidates."""
from __future__ import annotations

import re
import urllib.request
from pathlib import Path

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
OUT.mkdir(parents=True, exist_ok=True)

MIRRORS = [
    "https://www.picuki.com/profile/armazemanitaoficial",
    "https://imginn.com/armazemanitaoficial/",
    "https://www.ddinstagram.com/armazemanitaoficial/",
    "https://dumpor.com/v/armazemanitaoficial",
]


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


def download_post(code: str, dest: Path) -> bool:
    media = f"https://www.instagram.com/p/{code}/media/?size=l"
    try:
        final, data, ctype = fetch(media)
        if data[:3] == b"\xff\xd8\xff" or ctype.startswith("image/"):
            dest.write_bytes(data)
            print(f"OK {code} -> {dest.name} ({len(data)})")
            return True
        print(f"SKIP {code}: {ctype} {final[:80]}")
    except Exception as e:
        print(f"FAIL {code}: {type(e).__name__}: {e}")
    return False


def main() -> None:
    codes: list[str] = []
    keywords = ("copa", "mundo", "brasil", "churrasco", "telão", "telao", "fifa")

    for url in MIRRORS:
        try:
            final, data, _ = fetch(url)
            text = data.decode("utf-8", "ignore")
            found = re.findall(r"/p/([A-Za-z0-9_-]{5,})", text)
            found += re.findall(r'"shortcode":"([A-Za-z0-9_-]+)"', text)
            print(f"\n=== {url}\nfinal={final[:90]} codes={len(found)}")
            low = text.lower()
            for kw in keywords:
                idx = 0
                hits = 0
                while hits < 3:
                    i = low.find(kw, idx)
                    if i < 0:
                        break
                    snippet = re.sub(r"\s+", " ", text[max(0, i - 100) : i + 140])
                    print(f"  [{kw}] {snippet[:220]}")
                    hits += 1
                    idx = i + len(kw)
            for c in found:
                if c not in codes:
                    codes.append(c)
        except Exception as e:
            print(f"FAIL mirror {url}: {type(e).__name__}: {e}")

    # Known posts we already care about + newly found
    priority = [
        "Dcn3FT5OU2l",  # churrasco
        "Dcd6Jl3Okdu",  # transmissão gre-nal
        "DccCeDvvL1E",
    ]
    for c in priority:
        if c not in codes:
            codes.insert(0, c)

    print(f"\nDownloading up to 20 of {len(codes)} codes...")
    saved = 0
    for i, code in enumerate(codes[:20], start=11):
        dest = OUT / f"ig-{i:02d}-{code}.jpg"
        if dest.exists() or any(OUT.glob(f"*-{code}.jpg")):
            print(f"EXISTS {code}")
            continue
        if download_post(code, dest):
            saved += 1
    print(f"Saved {saved} new images")


if __name__ == "__main__":
    main()
