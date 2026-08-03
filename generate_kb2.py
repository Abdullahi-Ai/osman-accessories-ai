import os
import random

os.makedirs('data', exist_ok=True)

# Remove old files if they exist
for f in ['data/faqs.txt', 'data/products.txt']:
    if os.path.exists(f):
        os.remove(f)

# ABOUT
with open('data/about.txt', 'w') as f:
    f.write("""Business Name: Khalid & Osman Accessories

Company Overview: Khalid & Osman Accessories specializes in genuine smartphones and mobile accessories. The business believes in honesty, trustworthiness, professionalism and excellent customer service. The business never sells fake or counterfeit electronic products. Customer satisfaction always comes before profit. The business believes that trust is earned through honesty, quality products and excellent customer support. The business values integrity because we fear our Creator and believe honesty is the foundation of every successful business.

Company History: A trusted electronics retailer providing high-quality smartphones, tablets, smart devices, and accessories to our valued customers.

Mission: Provide customers with genuine smartphones and quality accessories at fair prices while delivering exceptional customer service.

Vision: Become one of Kenya's most trusted mobile phone and accessories retailers.

Core Values:
• Honesty
• Integrity
• Trustworthiness
• Professionalism
• Quality
• Customer Satisfaction
• Transparency
• Respect
• Accountability

Business Objectives: Maintain the highest standard of customer service and provide only genuine electronics.

Customer Commitment: We guarantee 100% genuine products with full after-sales support.

Why Choose Us:
• Genuine Products
• Competitive Prices
• Friendly Customer Service
• Trusted Business
• Professional Advice
• Excellent After-Sales Support

Business Strengths: Wide product variety, official brand warranties, knowledgeable staff, fast delivery.

Future Goals: Expand our reach and continue to be the most trusted electronics store in Kenya.
""")

# CONTACT
with open('data/contact.txt', 'w') as f:
    f.write("""Business Name: Khalid & Osman Accessories

Location: Luthuli Avenue, Nairobi, Kenya

Phone Number: 0781 764 187

Phone Number: 0726 228 805

WhatsApp: Both phone numbers are available on WhatsApp.

Email: osmanibrahim75200@gmail.com

Business Hours:
Monday to Saturday: 8:00 AM - 5:00 PM
Sunday: 9:00 AM - 2:00 PM

Instagram: halal_phone_accessories

Alternative Instagram: phone-DEALER
""")

# POLICIES
with open('data/policies.txt', 'w') as f:
    f.write("""Warranty Policy: Every smartphone sold comes with a verified 12-month warranty. Accessories should include warranty only when applicable.

Delivery Policy: Fast and reliable delivery across the country.

Return Policy: Products can be returned if defective out-of-the-box according to standard retail policies.

Exchange Policy: Exchanges allowed for products of equal or higher value with receipt.

Payment Policy: We accept standard secure payment methods.

Customer Service Policy: We are committed to excellent customer service and transparency.
""")

# SERVICES
with open('data/services.txt', 'w') as f:
    f.write("""Service Name: Product Consultation
Description: Professional advice to help you choose the right smartphone or accessory.

Service Name: Smartphone Recommendations
Description: Personalized smartphone recommendations based on your needs and budget.

Service Name: Screen Protector Installation
Description: Professional installation of screen protectors for all devices.

Service Name: Phone Setup
Description: Complete setup of your new smartphone to get you started.

Service Name: Data Transfer Assistance
Description: Assistance with transferring data from your old phone to your new phone.

Service Name: Accessory Recommendations
Description: Expert advice on finding the best compatible accessories for your device.

Service Name: After-Sales Support
Description: Dedicated support for all products purchased from our store.

Important Note regarding Phone Repairs: Khalid & Osman Accessories DOES NOT repair phones. If you require phone repair, we do not provide this service internally, but we can recommend trusted professional repair technicians.
""")

# SMARTPHONES (Samsung, Apple, Tecno, Oppo, Infinix)
def generate_phones(brand, count, models):
    text = ""
    for i in range(count):
        model = models[i % len(models)] + (f" (Variant {i+1})" if i >= len(models) else "")
        price = random.randint(15, 180) * 1000
        text += f"""Brand: {brand}
Model: {model}
Category: Smartphones
Price (KES): {price:,}
Availability: In Stock
Warranty: 12-month warranty
Display: 6.{random.randint(4,8)} inches, 120Hz AMOLED
Processor: Octa-core processor
RAM: {random.choice(['4GB','6GB','8GB','12GB','16GB'])}
Storage: {random.choice(['64GB','128GB','256GB','512GB','1TB'])}
Rear Camera: {random.choice(['50MP+12MP+10MP', '200MP+50MP+12MP', '64MP+2MP', '108MP+8MP+2MP'])}
Front Camera: {random.choice(['12MP', '32MP', '16MP', '50MP'])}
Battery: {random.choice(['4500mAh', '5000mAh', '5500mAh'])}
Charging: {random.choice(['25W', '45W', '67W', '120W'])} Fast Charging
Operating System: Android 14 / Custom UI
Network: 5G / 4G LTE
Bluetooth: v5.3
Wi-Fi: Wi-Fi 6 / 6E
Available Colours: Black, White, Blue, Silver
Compatible Accessories: {brand} Original Cases, Type-C Cables, Wireless Earbuds
Description: A genuine {brand} smartphone offering exceptional performance.

"""
    return text

samsung_models = ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy A54', 'Galaxy A34', 'Galaxy A24', 'Galaxy A14', 'Galaxy A04']
with open('data/samsung.txt', 'w') as f: f.write(generate_phones('Samsung', 20, samsung_models))

iphone_models = ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13']
with open('data/iphone.txt', 'w') as f:
    text = generate_phones('Apple (iPhone)', 15, iphone_models)
    text = text.replace('Android 14 / Custom UI', 'iOS 17')
    f.write(text)

tecno_models = ['Phantom V Fold', 'Phantom X2 Pro', 'Camon 20 Premier', 'Camon 20 Pro', 'Camon 20', 'Spark 10 Pro', 'Spark 10C', 'Pop 7 Pro']
with open('data/tecno.txt', 'w') as f: f.write(generate_phones('Tecno', 15, tecno_models))

oppo_models = ['Find X6 Pro', 'Find N3', 'Reno 10 Pro+', 'Reno 10 Pro', 'Reno 10', 'A78', 'A58', 'A38', 'A17k']
with open('data/oppo.txt', 'w') as f: f.write(generate_phones('OPPO', 15, oppo_models))

infinix_models = ['Zero Ultra', 'Zero 30 5G', 'Note 30 VIP', 'Note 30 Pro', 'Note 30', 'Hot 40 Pro', 'Hot 40i', 'Smart 8']
with open('data/infinix.txt', 'w') as f: f.write(generate_phones('Infinix', 15, infinix_models))

# ACCESSORIES
acc_cats = [
    'Phone Cases', 'Screen Protectors', 'Chargers', 'Fast Chargers', 'USB Cables', 
    'Type-C Cables', 'Lightning Cables', 'Wireless Chargers', 'Power Banks', 
    'Bluetooth Earbuds', 'Bluetooth Headphones', 'Bluetooth Speakers', 'Smart Watches', 
    'Smart Watch Straps', 'Camera Protectors', 'Memory Cards', 'SIM Accessories'
]
brands = ['Oraimo', 'Anker', 'Baseus', 'JBL', 'Sony', 'Ugreen', 'Samsung', 'Apple', 'Generic']

text = ""
for i in range(100):
    cat = random.choice(acc_cats)
    brand = random.choice(brands)
    price = random.randint(5, 150) * 100
    text += f"""Category: {cat}
Brand: {brand}
Model: {brand} {cat} Pro
Price (KES): {price:,}
Compatibility: Universal / Smartphone
Warranty: Applicable Warranty Provided
Availability: In Stock
Description: High-quality {cat.lower()} designed for durability and seamless daily use.

"""
with open('data/accessories.txt', 'w') as f: f.write(text)
