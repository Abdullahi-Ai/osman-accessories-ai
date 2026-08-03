from PIL import Image
import colorsys
import os

def hue_shift(img, amount):
    # Convert to HSV, shift hue, convert back
    img = img.convert('RGBA')
    pixels = img.load()
    width, height = img.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            h = (h + amount) % 1.0
            r, g, b = colorsys.hsv_to_rgb(h, s, v)
            pixels[x, y] = (int(r*255), int(g*255), int(b*255), a)
    return img

base_path = '/home/osama/osman-accessories-ai/store/public/images/'
ipad_img = Image.open(base_path + 'ipad_pro.png')

# Variation 1: Samsung Tab
samsung = ipad_img.transpose(Image.FLIP_LEFT_RIGHT)
samsung = hue_shift(samsung, 0.4) # Shift hue to green/orange
samsung.save(base_path + 'samsung_tab.png')

# Variation 2: Pixel Tablet
pixel = ipad_img.transpose(Image.FLIP_LEFT_RIGHT)
pixel = hue_shift(pixel, 0.8) # Shift hue to purple
pixel.save(base_path + 'pixel_tablet.png')

# Variation 3: iPad Air
air = hue_shift(ipad_img, 0.6) # Shift hue to pinkish
air.save(base_path + 'ipad_air.png')

print("Tablet variations generated successfully!")
