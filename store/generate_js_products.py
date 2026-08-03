import json
import random

brands = ['Samsung', 'Apple', 'Tecno', 'Infinix', 'OPPO', 'Redmi', 'Xiaomi', 'Vivo', 'Google Pixel', 'Huawei', 'Nokia', 'OnePlus', 'Motorola', 'Honor', 'Realme']
categories = ['Smartphones', 'Tablets', 'Smart Watches', 'Wireless Earbuds', 'Bluetooth Speakers', 'Chargers', 'Power Banks', 'Phone Cases', 'Screen Protectors', 'USB Cables', 'Memory Cards']

products = []
id_counter = 1

# Generate 50 smartphones
for i in range(50):
    brand = random.choice(brands[:10])
    model = f"{brand} Phone {random.randint(10, 99)} Pro"
    if brand == 'Apple': model = f"iPhone {random.randint(11, 15)} Pro"
    if brand == 'Samsung': model = f"Galaxy S{random.randint(20, 24)} Ultra"
    
    products.append({
        "id": id_counter,
        "name": model,
        "brand": brand,
        "category": "Smartphones",
        "price": random.randint(15, 150) * 1000,
        "originalPrice": random.randint(16, 160) * 1000,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviews": random.randint(10, 500),
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
        "badge": random.choice(["New Arrival", "Best Seller", "10% OFF", None]),
        "stock": random.randint(0, 50),
        "description": f"A premium {brand} smartphone.",
        "specs": {
            "Display": f"6.{random.randint(1,8)} inches, 120Hz",
            "Processor": "Octa-core",
            "RAM": f"{random.choice([4, 6, 8, 12])}GB",
            "Storage": f"{random.choice([64, 128, 256, 512])}GB",
            "Battery": f"{random.choice([4000, 4500, 5000])}mAh",
            "Camera": "50MP Main"
        }
    })
    id_counter += 1

# Generate 50 accessories
for i in range(50):
    cat = random.choice(categories[1:])
    brand = random.choice(['Anker', 'JBL', 'Oraimo', 'Baseus', 'Samsung', 'Apple', 'Sony', 'Generic'])
    
    image_url = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80"
    if 'Watch' in cat: image_url = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80"
    elif 'Earbud' in cat: image_url = "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"
    
    products.append({
        "id": id_counter,
        "name": f"{brand} {cat[:-1]} Pro",
        "brand": brand,
        "category": cat,
        "price": random.randint(1, 15) * 1000,
        "originalPrice": random.randint(2, 16) * 1000,
        "rating": round(random.uniform(3.5, 5.0), 1),
        "reviews": random.randint(5, 200),
        "image": image_url,
        "badge": random.choice(["Best Seller", "Sale", None, None]),
        "stock": random.randint(10, 100),
        "description": f"High quality {cat.lower()} from {brand}.",
        "specs": {
            "Compatibility": "Universal",
            "Warranty": "6 Months"
        }
    })
    id_counter += 1

js_content = f"export const products = {json.dumps(products, indent=2)};\n"

with open('src/data/products.js', 'w') as f:
    f.write(js_content)
