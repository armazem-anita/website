"""Download carousel image 2 from Instagram post DY2wtuoj0cF."""
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
CODE = "DY2wtuoj0cF"


def fetch(url: str) -> tuple[str, bytes, str]:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as r:
        return r.geturl(), r.read(), r.headers.get("Content-Type", "")


def extract_urls(html: str) -> list[str]:
    patterns = [
        r'https://[^"\'\\\s]+?(?:scontent|cdninstagram)[^"\'\\\s]+\.jpg[^"\'\\\s]*',
        r'"display_url":"(https:[^"]+)"',
        r'"display_src":"(https:[^"]+)"',
        r'"src":"(https://[^"]+?(?:scontent|cdninstagram)[^"]+)"',
    ]
    found: list[str] = []
    for pat in patterns:
        for m in re.findall(pat, html):
            url = m.replace("\\u0026", "&").replace("\\/", "/")
            found.append(url)
    # also escaped slashes in JSON blobs
    for m in re.findall(r"https:\\/\\/[^\"\\]+?\\.jpg[^\"\\]*", html):
        found.append(m.encode().decode("unicode_escape"))

    cleaned: list[str] = []
    seen: set[str] = set()
    for url in found:
        if any(x in url for x in ("s150x150", "s64x64", "s320x320", "profile")):
            continue
        key = url.split("?")[0]
        if key not in seen:
            seen.add(key)
            cleaned.append(url)
    return cleaned


def main() -> None:
    pages = [
        f"https://www.instagram.com/p/{CODE}/embed/captioned/",
        f"https://www.instagram.com/p/{CODE}/embed/",
        f"https://www.instagram.com/p/{CODE}/?img_index=2",
        f"https://www.instagram.com/graphql/query/?query_hash=9f8827793ef34641b2fb19580f2bd26e&variables=%7B%22shortcode%22%3A%22{CODE}%22%7D",
    ]
    all_urls: list[str] = []
    for url in pages:
        try:
            final, data, ctype = fetch(url)
            text = data.decode("utf-8", "ignore")
            urls = extract_urls(text)
            print(f"OK {url[:70]} -> {len(urls)} urls ctype={ctype[:40]}")
            for i, u in enumerate(urls[:10]):
                print(f"  [{i}] {u[:130]}")
            all_urls.extend(urls)
            # look for sidecar / carousel markers
            if "edge_sidecar_to_children" in text or "carousel" in text.lower():
                print("  (carousel markers found)")
                # dump nearby display urls from sidecar
                for m in re.finditer(
                    r"display_url\\?\":\\?\"(https:[^\"\\]+)", text
                ):
                    print("  sidecar?", m.group(1)[:120])
        except Exception as e:
            print(f"FAIL {url[:70]}: {type(e).__name__}: {e}")

    uniq: list[str] = []
    seen: set[str] = set()
    for u in all_urls:
        key = u.split("?")[0]
        if key not in seen:
            seen.add(key)
            uniq.append(u)
    print(f"TOTAL unique large images: {len(uniq)}")

    # Prefer 2nd image (index 2). Fallback: download several candidates.
    targets = uniq[1:4] if len(uniq) > 1 else uniq[:1]
    for i, img_url in enumerate(targets, start=2):
        try:
            _, data, ctype = fetch(img_url)
            if data[:3] != b"\xff\xd8\xff":
                print(f"SKIP not jpeg [{i}] {ctype}")
                continue
            dest = OUT / f"ig-padaria-{CODE}-slide{i}.jpg"
            dest.write_bytes(data)
            print(f"SAVED {dest.name} ({len(data)} bytes)")
        except Exception as e:
            print(f"DL FAIL [{i}]: {type(e).__name__}: {e}")


if __name__ == "__main__":
    main()
