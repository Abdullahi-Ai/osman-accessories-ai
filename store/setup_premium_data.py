import os
import json
import random
from PIL import Image, ImageDraw, ImageFont

brands = ['Samsung', 'Apple', 'Tecno', 'Infinix', 'OPPO', 'Redmi', 'Xiaomi', 'Vivo', 'Google Pixel', 'Huawei', 'Nokia', 'OnePlus', 'Motorola', 'Honor', 'Realme']
categories = ['Smartphones', 'Tablets', 'Smart Watches', 'Wireless Earbuds', 'Bluetooth Speakers', 'Chargers', 'Power Banks', 'Phone Cases', 'Screen Protectors', 'USB Cables', 'Memory Cards']

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Setup directories
base_dir = "public/images"
ensure_dir(f"{base_dir}/banners")
ensure_dir(f"{base_dir}/brands")

phone_brands = ['samsung', 'iphone', 'tecno', 'infinix', 'oppo', 'redmi', 'xiaomi', 'vivo', 'google_pixel', 'huawei', 'nokia', 'oneplus', 'motorola', 'honor', 'realme']
for pb in phone_brands:
    ensure_dir(f"{base_dir}/phones/{pb}")

acc_cats = ['chargers', 'cases', 'earbuds', 'powerbanks', 'smartwatch', 'speakers', 'cables', 'memory_cards', 'protectors', 'tablets']
for ac in acc_cats:
    ensure_dir(f"{base_dir}/accessories/{ac}")

def generate_placeholder_image(path, text, bg_color):
    try:
        img = Image.new('RGB', (600, 600), color=bg_color)
        d = ImageDraw.Draw(img)
        # Just simple text in center
        # Since we don't have font files guaranteed, use default
        d.text((50, 280), text, fill=(255, 255, 255))
        img.save(path)
    except Exception as e:
        print(f"Error generating image: {e}")

products = []
id_counter = 1

colors = [(30, 58, 138), (245, 158, 11), (15, 23, 42), (16, 185, 129), (239, 68, 68), (139, 92, 246)]

# Generate 50 smartphones
for i in range(50):
    brand = random.choice(brands)
    if brand == 'Apple':
        model = f"iPhone {random.randint(11, 16)} Pro"
        folder = "iphone"
    elif brand == 'Samsung':
        model = f"Galaxy S{random.randint(20, 24)} Ultra"
        folder = "samsung"
    else:
        model = f"{brand} {random.choice(['Pro', 'Max', 'Ultra', 'Lite'])} {random.randint(10, 50)}"
        folder = brand.lower().replace(" ", "_")
        
    filename = model.lower().replace(" ", "_").replace('"', '') + ".png"
    filepath = f"{base_dir}/phones/{folder}/{filename}"
    img_url = f"/images/phones/{folder}/{filename}"
    
    generate_placeholder_image(filepath, model, random.choice(colors))
    
    products.append({
        "id": id_counter,
        "name": model,
        "brand": brand,
        "category": "Smartphones",
        "price": random.randint(15, 150) * 1000,
        "originalPrice": random.randint(16, 160) * 1000,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviews": random.randint(10, 500),
        "image": img_url,
        "badge": random.choice(["New Arrival", "Best Seller", "10% OFF", None]),
        "stock": random.randint(0, 50),
        "description": f"Premium {brand} smartphone with cutting-edge technology.",
        "specs": {
            "Display": f"6.{random.randint(1,8)} inches, 120Hz OLED",
            "Processor": "Octa-core 5nm",
            "RAM": f"{random.choice([4, 6, 8, 12])}GB",
            "Storage": f"{random.choice([64, 128, 256, 512])}GB",
            "Battery": f"{random.choice([4000, 4500, 5000])}mAh",
            "Camera": "50MP Main + 12MP Ultra-wide"
        }
    })
    id_counter += 1

# Generate 50 accessories
for i in range(50):
    cat = random.choice(categories[1:])
    brand = random.choice(['Anker', 'JBL', 'Oraimo', 'Baseus', 'Samsung', 'Apple', 'Sony'])
    
    if 'Watch' in cat: folder = 'smartwatch'
    elif 'Earbud' in cat: folder = 'earbuds'
    elif 'Speaker' in cat: folder = 'speakers'
    elif 'Charger' in cat: folder = 'chargers'
    elif 'Power' in cat: folder = 'powerbanks'
    elif 'Case' in cat: folder = 'cases'
    elif 'Cable' in cat: folder = 'cables'
    elif 'Memory' in cat: folder = 'memory_cards'
    elif 'Protector' in cat: folder = 'protectors'
    else: folder = 'tablets'
    
    model = f"{brand} {cat[:-1]} Pro"
    filename = model.lower().replace(" ", "_") + ".png"
    filepath = f"{base_dir}/accessories/{folder}/{filename}"
    img_url = f"/images/accessories/{folder}/{filename}"
    
    generate_placeholder_image(filepath, model, random.choice(colors))
    
    products.append({
        "id": id_counter,
        "name": model,
        "brand": brand,
        "category": cat,
        "price": random.randint(1, 15) * 1000,
        "originalPrice": random.randint(2, 16) * 1000,
        "rating": round(random.uniform(3.5, 5.0), 1),
        "reviews": random.randint(5, 200),
        "image": img_url,
        "badge": random.choice(["Best Seller", "Sale", None, None]),
        "stock": random.randint(10, 100),
        "description": f"High quality {cat.lower()} from {brand}.",
        "specs": {
            "Compatibility": "Universal",
            "Warranty": "6 Months",
            "Material": "Premium Grade"
        }
    })
    id_counter += 1

# Generate Banners
generate_placeholder_image(f"{base_dir}/banners/banner1.png", "Samsung Galaxy Collection", (30, 58, 138))
generate_placeholder_image(f"{base_dir}/banners/banner2.png", "Latest iPhone Series", (15, 23, 42))
generate_placeholder_image(f"{base_dir}/banners/banner3.png", "Premium Accessories", (245, 158, 11))

js_content = f"export const products = {json.dumps(products, indent=2)};\n"
ensure_dir('src/data')
with open('src/data/products.js', 'w') as f:
    f.write(js_content)
