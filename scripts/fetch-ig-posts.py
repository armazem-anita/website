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

# Shortcodes from public profile https://www.instagram.com/armazemanitaoficial/
SHORTCODES = [
    "DbO6g9ND0d9",  # noite / movimento
    "DYhn6u5jjmU",
    "DdFL1Ejj3Rv",
    "DcuFK5WPfEZ",
    "DctRHVjO2Wy",  # padaria/torta
    "Dcn3FT5OU2l",
    "Dcgx5i4OChQ",  # cerveja
    "Dcd6Jl3Okdu",
    "Dcb0rGzD9_J",
]


def download(code: str, dest: Path) -> bool:
    url = f"https://www.instagram.com/p/{code}/media/?size=l"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
            ctype = r.headers.get("Content-Type", "")
        if data[:3] == b"\xff\xd8\xff" or ctype.startswith("image/"):
            dest.write_bytes(data)
            print(f"OK {code} -> {dest.name} ({len(data)} bytes)")
            return True
        print(f"SKIP {code}: not jpeg ({ctype}, {len(data)})")
    except Exception as e:
        print(f"FAIL {code}: {type(e).__name__}: {e}")
    return False


saved = 0
for i, code in enumerate(SHORTCODES, start=1):
    dest = OUT / f"ig-{i:02d}-{code}.jpg"
    if download(code, dest):
        saved += 1

print(f"Saved {saved}/{len(SHORTCODES)}")
print([p.name for p in sorted(OUT.glob('*.jpg'))])
