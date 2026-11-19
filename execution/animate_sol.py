"""Create Sol's greeting GIF by gently deforming the raised hand region."""
from pathlib import Path
import math
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / 'Fotos/sol-ola.png').convert('RGBA')
size = 384
source.thumbnail((size, size), Image.Resampling.LANCZOS)
w, h = source.size
frames = []
for frame in range(25):
    angle = math.sin(frame / 24 * math.pi * 6) * 0.13
    mesh = []
    def mapped(x, y):
        # Keep the face and torso still; taper movement into the wrist.
        horizontal = max(0, min(1, (x / w - .78) / .035))
        vertical = max(0, min(1, (.66 - y / h) / .13))
        weight = horizontal * vertical
        return (x + angle * (y - h * .61) * weight,
                y - angle * (x - w * .85) * weight)
    for y in range(0, h, 8):
        for x in range(0, w, 8):
            right, bottom = min(x + 8, w), min(y + 8, h)
            quad = sum((mapped(a, b) for a, b in [(x,y),(x,bottom),(right,bottom),(right,y)]), ())
            mesh.append(((x,y,right,bottom), quad))
    moved = source.transform(source.size, Image.Transform.MESH, mesh, Image.Resampling.BICUBIC)
    rgba = np.array(moved)
    # GIF supports binary transparency. Reserve palette slot 255 for it.
    rgb = Image.new('RGB', source.size, 'white')
    rgb.paste(moved, mask=moved.getchannel('A'))
    indexed = rgb.quantize(colors=255, method=Image.Quantize.MEDIANCUT)
    indices = np.array(indexed)
    indices[rgba[:,:,3] < 100] = 255
    result = Image.fromarray(indices).convert('P')
    result.putpalette(indexed.getpalette()[:765] + [255,255,255])
    result.info['transparency'] = 255
    frames.append(result)
frames[0].save(ROOT / 'Fotos/sol-acenando.gif', save_all=True,
               append_images=frames[1:], duration=[80]*24+[1800], loop=0,
               transparency=255, disposal=2, optimize=False)
preview = Image.new('RGB', (w*3,h), '#eef4f8')
for i, position in enumerate([0,2,6]):
    preview.paste(frames[position].convert('RGBA'), (w*i,0), frames[position].convert('RGBA'))
(ROOT / '.tmp').mkdir(exist_ok=True)
preview.save(ROOT / '.tmp/sol-wave-preview.png')
print('Created GIF:', len(frames), 'frames', (ROOT / 'Fotos/sol-acenando.gif').stat().st_size, 'bytes')

