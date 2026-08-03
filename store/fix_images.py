import os
import shutil
import urllib.request
import random

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

base_dir = "public/images"
ensure_dir("temp_dl")

# 5 distinct real phone images from Unsplash
phone_urls = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?w=500&q=80",
    "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=500&q=80"
]

# 5 distinct real accessory images from Unsplash
acc_urls = [
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", # watch
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80", # earbuds
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", # headphones
    "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80", # accessories
    "https://images.unsplash.com/photo-1628283422591-6679549f2257?w=500&q=80"  # charger
]

def download_with_ua(url, filename):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)

print("Downloading real electronics images from Unsplash...")
for i, url in enumerate(phone_urls):
    download_with_ua(url, f"temp_dl/phone_{i}.jpg")
for i, url in enumerate(acc_urls):
    download_with_ua(url, f"temp_dl/acc_{i}.jpg")

print("Replacing old placeholder images with real photos...")
# Walk through public/images/phones
for root, dirs, files in os.walk(f"{base_dir}/phones"):
    for file in files:
        if file.endswith('.png') or file.endswith('.jpg'):
            src = f"temp_dl/phone_{random.randint(0, len(phone_urls)-1)}.jpg"
            dst = os.path.join(root, file)
            shutil.copy(src, dst)

# Walk through public/images/accessories
for root, dirs, files in os.walk(f"{base_dir}/accessories"):
    for file in files:
        if file.endswith('.png') or file.endswith('.jpg'):
            # Try to match accessory type if possible
            src = f"temp_dl/acc_{random.randint(0, len(acc_urls)-1)}.jpg"
            if 'watch' in root: src = f"temp_dl/acc_0.jpg"
            elif 'earbud' in root: src = f"temp_dl/acc_1.jpg"
            elif 'headphone' in root: src = f"temp_dl/acc_2.jpg"
            elif 'power' in root: src = f"temp_dl/acc_3.jpg"
            elif 'charger' in root: src = f"temp_dl/acc_4.jpg"
            
            dst = os.path.join(root, file)
            shutil.copy(src, dst)

print("Done! Real photos are now in place at local paths.")
