from PIL import Image
import os

assets = r"C:\Users\Administrador\.cursor\projects\c-Users-Administrador-Documents-frontEnd\assets"
out = r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images\menu"
os.makedirs(out, exist_ok=True)
logo_dir = r"C:\Users\Administrador\Documents\xpress-leads\demos\armazem-anita\public\images"
os.makedirs(logo_dir, exist_ok=True)


def find(substr: str) -> str:
    for f in os.listdir(assets):
        if substr in f:
            return os.path.join(assets, f)
    raise FileNotFoundError(substr)


def crop_whatsapp_photo(
    src: str,
    dest: str,
    top_frac: float = 0.08,
    bottom_frac: float = 0.78,
    side_frac: float = 0.04,
) -> None:
    """Crop food photo from WhatsApp screenshot (remove chrome + caption)."""
    im = Image.open(src).convert("RGB")
    w, h = im.size
    left = int(w * side_frac)
    right = int(w * (1 - side_frac))
    top = int(h * top_frac)
    bottom = int(h * bottom_frac)
    cropped = im.crop((left, top, right, bottom))
    cw, ch = cropped.size
    target_ratio = 4 / 3
    if cw / ch > target_ratio:
        new_w = int(ch * target_ratio)
        x0 = (cw - new_w) // 2
        cropped = cropped.crop((x0, 0, x0 + new_w, ch))
    else:
        new_h = int(cw / target_ratio)
        y0 = max(0, (ch - new_h) // 3)
        cropped = cropped.crop((0, y0, cw, min(ch, y0 + new_h)))
    cropped.save(dest, "JPEG", quality=90, optimize=True)
    print(f"cropped -> {os.path.basename(dest)} {cropped.size}")


def copy_jpg(src: str, dest: str, max_side: int = 1400) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if max(w, h) > max_side:
        scale = max_side / max(w, h)
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(dest, "JPEG", quality=88, optimize=True)
    print(f"copied -> {os.path.basename(dest)} {im.size}")


crop_whatsapp_photo(
    find("161758"),
    os.path.join(out, "polenta-linguica-provolone.jpg"),
    0.06,
    0.72,
    0.05,
)
crop_whatsapp_photo(
    find("161710"),
    os.path.join(out, "raviolloni-linguicinha.jpg"),
    0.06,
    0.68,
    0.05,
)

mapping = {
    "08.00.59__1_": "iscas-empanadas.jpg",
    "08.00.59-66e5": "pasteis.jpg",
    "08.01.00-c9aa": "iscas-empanadas-mesa.jpg",
    "08.01.00__1_": "batata-frita.jpg",
    "08.01.01__1_": "mojito.jpg",
    "08.01.01__2_": "drink-sunrise.jpg",
    "08.01.01-5d89": "tabua-frios.jpg",
    "08.01.02__1_": "caipirinhas.jpg",
    "08.01.02__2_": "camarao-empanado.jpg",
    "08.01.02-e19b": "moscow-mule.jpg",
    "08.05.18-5edb": "espetinho-carne.jpg",
}

for key, name in mapping.items():
    copy_jpg(find(key), os.path.join(out, name))

logo_im = Image.open(find("08.01.03-6fa5")).convert("RGBA")
logo_im.save(os.path.join(logo_dir, "logo-anita.png"), "PNG", optimize=True)
print("logo saved", logo_im.size)

print("DONE", len(os.listdir(out)), "menu images")
for f in sorted(os.listdir(out)):
    print(" -", f)
