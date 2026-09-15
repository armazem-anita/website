import re
import urllib.request
from pathlib import Path

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
}
OUT = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\instagram"
)
OUT.mkdir(parents=True, exist_ok=True)

MIRRORS = [
    "https://www.imginn.com/armazemanitaoficial/",
    "https://imginn.com/armazemanitaoficial/",
    "https://www.picuki.com/profile/armazemanitaoficial",
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def download(url: str, dest: Path) -> bool:
    try:
        data = fetch(url)
        if data[:3] in (b"\xff\xd8\xff", b"\x89PN") or len(data) > 5000:
            dest.write_bytes(data)
            print(f"SAVED {dest.name} ({len(data)}) from {url[:100]}")
            return True
    except Exception as e:
        print(f"DL FAIL {url[:80]}: {e}")
    return False


shortcodes: list[str] = []
cdn_urls: list[str] = []

for mirror in MIRRORS:
    try:
        html = fetch(mirror).decode("utf-8", "ignore")
        print(f"MIRROR OK {mirror} len={len(html)}")
        for c in re.findall(r"/p/([A-Za-z0-9_-]{5,})/", html):
            if c not in shortcodes:
                shortcodes.append(c)
        for u in re.findall(r"https://[^\"'\s]+(?:cdninstagram|scontent)[^\"'\s]+", html):
            u = u.replace("&amp;", "&")
            if u not in cdn_urls:
                cdn_urls.append(u)
        print(f"  shortcodes={len(shortcodes)} cdn={len(cdn_urls)}")
    except Exception as e:
        print(f"MIRROR FAIL {mirror}: {type(e).__name__}: {e}")

print("SHORTCODES", shortcodes[:15])

saved = 0
# Prefer media endpoint by shortcode
for i, code in enumerate(shortcodes[:10], start=1):
    media = f"https://www.instagram.com/p/{code}/media/?size=l"
    dest = OUT / f"ig-{i:02d}-{code}.jpg"
    if dest.exists() and dest.stat().st_size > 10000:
        print(f"EXISTS {dest.name}")
        saved += 1
        continue
    try:
        data = fetch(media)
        if data[:3] == b"\xff\xd8\xff" or b"JFIF" in data[:20]:
            dest.write_bytes(data)
            print(f"OK {dest.name} ({len(data)})")
            saved += 1
        else:
            print(f"NOT JPEG {code} ({len(data)})")
    except Exception as e:
        print(f"FAIL {code}: {e}")

# Also copy known good happy-hour image as ig gallery item if missing
known = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\happy-hour-ig.jpg"
)
if known.exists():
    target = OUT / "ig-happy-hour.jpg"
    target.write_bytes(known.read_bytes())
    print(f"COPIED happy-hour -> {target.name}")

print(f"Done. Saved/kept ~{saved} in {OUT}")
print("Files:", [p.name for p in sorted(OUT.glob('*'))])
