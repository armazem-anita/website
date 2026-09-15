import urllib.request
import re
from pathlib import Path

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}
out = Path(
    r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\happy-hour-ig.jpg"
)

candidates = [
    "https://www.instagram.com/p/DbO6g9ND0d9/media/?size=l",
    "https://www.ddinstagram.com/p/DbO6g9ND0d9/",
    "https://www.instagram.com/p/DbO6g9ND0d9/embed/captioned/",
    "https://www.instagram.com/p/DbO6g9ND0d9/?img_index=1",
    "https://www.instagram.com/p/DbO6g9ND0d9/embed/",
]


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


image_url = None
for u in candidates:
    try:
        final, data, ctype = fetch(u)
        print(f"OK {u} -> {final} ({ctype}, {len(data)} bytes)")
        if ctype.startswith("image/"):
            out.write_bytes(data)
            print(f"SAVED direct image to {out}")
            raise SystemExit(0)
        text = data.decode("utf-8", "ignore")
        patterns = [
            r'property="og:image" content="([^"]+)"',
            r'content="(https://[^"]*cdninstagram[^"]+)"',
            r'content="(https://scontent[^"]+)"',
            r'(https://scontent[^"\\\s]+\.jpg[^"\\\s]*)',
            r'(https://[^"\\\s]*cdninstagram\.com[^"\\\s]+)',
        ]
        for pat in patterns:
            m = re.search(pat, text)
            if m:
                image_url = m.group(1).replace("&amp;", "&")
                print("FOUND", image_url[:200])
                break
        if image_url:
            break
    except SystemExit:
        raise
    except Exception as e:
        print(f"FAIL {u}: {type(e).__name__}: {e}")

if not image_url:
    raise SystemExit("Could not find Instagram image URL")

final, data, ctype = fetch(image_url)
print(f"DOWNLOAD {final} ({ctype}, {len(data)} bytes)")
if not ctype.startswith("image/") and not data[:3] in (b"\xff\xd8\xff", b"\x89PN"):
    raise SystemExit(f"Not an image: {ctype}")
out.write_bytes(data)
print(f"SAVED {out} ({out.stat().st_size} bytes)")
