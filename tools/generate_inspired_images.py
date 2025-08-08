import os
import random
from pathlib import Path
from typing import List, Tuple

from PIL import Image, ImageDraw, ImageFilter


def list_images(root_dirs: List[Path]) -> List[Path]:
    image_paths: List[Path] = []
    exts = {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff", ".bmp", ".gif"}
    for root in root_dirs:
        if not root.exists():
            continue
        for p in root.rglob("*"):
            if p.suffix.lower() in exts:
                image_paths.append(p)
    return image_paths


def extract_palette(img: Image.Image, num_colors: int = 6) -> List[Tuple[int, int, int]]:
    """Extract a small dominant palette using Pillow's quantize (median-cut/kmeans).
    Returns RGB tuples. Ensures contrast by shuffling and deduping similar colors.
    """
    # Convert to RGB and downscale for speed
    work = img.convert("RGB")
    max_side = 256
    if max(img.size) > max_side:
        work = work.copy()
        work.thumbnail((max_side, max_side), Image.LANCZOS)

    # Quantize to get a palette image
    quantized = work.quantize(colors=max(8, num_colors * 2), method=Image.MEDIANCUT)
    palette = quantized.getpalette()
    color_counts = quantized.getcolors()
    if not color_counts or not palette:
        return [(30, 30, 30), (220, 220, 220)]

    # Build full palette list from the palette entries actually used
    # getpalette() returns a flat list [r0,g0,b0, r1,g1,b1, ...]
    used_indices = [idx for _count, idx in sorted(color_counts, reverse=True)]
    colors: List[Tuple[int, int, int]] = []
    for idx in used_indices:
        r = palette[3 * idx]
        g = palette[3 * idx + 1]
        b = palette[3 * idx + 2]
        colors.append((r, g, b))

    # Deduplicate similar colors by simple distance threshold
    deduped: List[Tuple[int, int, int]] = []
    def dist2(c1, c2):
        return (c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2

    for c in colors:
        if all(dist2(c, d) > 35**2 for d in deduped):
            deduped.append(c)
        if len(deduped) >= num_colors * 2:
            break

    # Ensure at least num_colors
    if len(deduped) < num_colors:
        while len(deduped) < num_colors:
            deduped.append(tuple(int(x) for x in (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))))

    # Prioritize contrast: pick extremes in luminance and hue-ish spread
    def luminance(c):
        r, g, b = c
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    # Sort by luminance and interleave from dark/light
    deduped_sorted = sorted(deduped, key=luminance)
    interleaved: List[Tuple[int, int, int]] = []
    i, j = 0, len(deduped_sorted) - 1
    while i <= j and len(interleaved) < num_colors:
        if i == j:
            interleaved.append(deduped_sorted[i])
        else:
            interleaved.append(deduped_sorted[i])
            if len(interleaved) < num_colors:
                interleaved.append(deduped_sorted[j])
        i += 1
        j -= 1

    return interleaved[:num_colors]


def make_background(size: Tuple[int, int], colors: List[Tuple[int, int, int]]) -> Image.Image:
    w, h = size
    bg = Image.new("RGB", (w, h), colors[0])

    # Create a soft radial vignette using two colors
    overlay = Image.new("RGB", (w, h), colors[-1])
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    cx, cy = w // 2, h // 2
    max_r = int((w**2 + h**2) ** 0.5)
    for r in range(max_r, 0, -max(1, max_r // 60)):
        alpha = int(255 * (1 - r / max_r) ** 1.8)
        bbox = [cx - r, cy - r, cx + r, cy + r]
        draw.ellipse(bbox, fill=alpha)
    bg = Image.composite(overlay, bg, mask)

    # Subtle noise for texture
    noise = Image.effect_noise((w, h), 8).convert("L")
    noise = noise.point(lambda p: int(p * 0.2))
    bg = Image.composite(bg, Image.merge("RGB", (noise, noise, noise)), Image.new("L", (w, h), 20))
    return bg


def draw_random_shapes(canvas: Image.Image, colors: List[Tuple[int, int, int]], seed: int) -> None:
    random.seed(seed)
    w, h = canvas.size
    draw = ImageDraw.Draw(canvas, "RGBA")

    num_layers = random.randint(4, 8)
    palette = colors[:]
    random.shuffle(palette)

    for i in range(num_layers):
        col = palette[i % len(palette)] + (random.randint(90, 170),)  # add alpha
        shape_type = random.choice(["circle", "rect", "poly", "stripe"])  # could grow
        if shape_type == "circle":
            r = random.randint(min(w, h)//10, min(w, h)//3)
            x = random.randint(-r, w + r)
            y = random.randint(-r, h + r)
            draw.ellipse((x - r, y - r, x + r, y + r), fill=col)
        elif shape_type == "rect":
            ww = random.randint(w//8, w//2)
            hh = random.randint(h//8, h//2)
            x = random.randint(-ww//2, w - ww//2)
            y = random.randint(-hh//2, h - hh//2)
            max_radius = max(1, min(40, ww//4, hh//4))
            draw.rounded_rectangle((x, y, x + ww, y + hh), radius=random.randint(1, max_radius), fill=col)
        elif shape_type == "poly":
            points = []
            cx = random.randint(int(w*0.2), int(w*0.8))
            cy = random.randint(int(h*0.2), int(h*0.8))
            spokes = random.randint(5, 9)
            base_r = random.randint(min(w, h)//8, min(w, h)//3)
            for k in range(spokes):
                ang = (2 * 3.14159 * k) / spokes + random.uniform(-0.2, 0.2)
                r = base_r * random.uniform(0.5, 1.1)
                px = int(cx + r * math_cos(ang))
                py = int(cy + r * math_sin(ang))
                points.append((px, py))
            draw.polygon(points, fill=col)
        else:  # stripe
            orientation = random.choice(["h", "v", "d"])  # horizontal, vertical, diagonal
            thickness = random.randint(8, 24)
            stripe_color = col
            if orientation == "h":
                y = random.randint(0, h - 1)
                draw.rectangle((0, y, w, min(h, y + thickness)), fill=stripe_color)
            elif orientation == "v":
                x = random.randint(0, w - 1)
                draw.rectangle((x, 0, min(w, x + thickness), h), fill=stripe_color)
            else:
                # diagonal stripe via polygon
                x0 = random.randint(-w//4, w)
                y0 = random.randint(-h//4, h)
                x1 = x0 + w
                y1 = y0 + h
                t = thickness
                poly = [(x0, y0), (x0 + t, y0), (x1 + t, y1), (x1, y1)]
                draw.polygon(poly, fill=stripe_color)

    # Soft blur to blend layers slightly
    canvas_blur = canvas.filter(ImageFilter.GaussianBlur(radius=0.8))
    canvas.paste(canvas_blur)


def math_sin(x: float) -> float:
    # lightweight sin to avoid importing math globally in draw loop
    import math
    return math.sin(x)


def math_cos(x: float) -> float:
    import math
    return math.cos(x)


def generate_one(original_path: Path, out_dir: Path, variants: int = 2) -> List[Path]:
    with Image.open(original_path) as im:
        palette = extract_palette(im, num_colors=6)
        w, h = im.size

    outputs: List[Path] = []
    stem = original_path.stem
    for idx in range(variants):
        seed = (hash(stem) + idx * 7919) & 0xFFFFFFFF
        canvas = make_background((w, h), palette)
        draw_random_shapes(canvas, palette, seed)
        # Slight vignette
        vignette = Image.new("L", (w, h), 0)
        dv = ImageDraw.Draw(vignette)
        dv.ellipse((-int(w*0.1), -int(h*0.1), int(w*1.1), int(h*1.1)), fill=220)
        canvas.putalpha(vignette)
        # Composite over solid to ensure no transparency by default
        final = Image.new("RGB", (w, h), (0, 0, 0))
        final.paste(canvas, mask=canvas.split()[-1])

        out_path = out_dir / f"{stem}__gen{idx+1}.png"
        out_path.parent.mkdir(parents=True, exist_ok=True)
        final.save(out_path, format="PNG", optimize=True)
        outputs.append(out_path)
    return outputs


def main():
    # Source directories
    source_dirs = [
        Path("/workspace/public/images/pets/icons"),
        Path("/workspace/public/images/pets/cards"),
    ]
    out_root = Path("/workspace/public/images/pets/generated")

    inputs = list_images(source_dirs)
    if not inputs:
        print("No input images found.")
        return

    print(f"Found {len(inputs)} source images.")
    total_outputs = 0
    for p in inputs:
        rel_subdir = p.parent.name  # 'icons' or 'cards'
        out_dir = out_root / rel_subdir
        outs = generate_one(p, out_dir, variants=2)
        total_outputs += len(outs)
        print(f"Generated {len(outs)} -> {out_dir}")

    print(f"Done. Created {total_outputs} new images in {out_root}.")


if __name__ == "__main__":
    main()