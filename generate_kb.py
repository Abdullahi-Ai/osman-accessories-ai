import os
import random

os.makedirs('data', exist_ok=True)

# ABOUT
with open('data/about.txt', 'w') as f:
    f.write("""Business Name: Khalid & Osman Accessories

Business Overview: We are the premier electronics retailer in Nairobi, specializing in high-quality smartphones, tablets, smart devices, and accessories.

Company History: Founded in 2020, we have grown from a small stall to a major electronics hub providing premium devices to thousands of satisfied customers.

Mission: To provide access to the latest technology with unmatched customer service and competitive prices.

Vision: To become the leading tech retailer in East Africa.

Core Values: Integrity, Customer First, Quality Assurance, Innovation, Transparency.

Business Objectives: Expand our product range, open 3 new branches by 2027, and achieve 99% customer satisfaction.

Business Strengths: Wide product variety, official brand warranties, knowledgeable staff, fast delivery.

Customer Commitment: We guarantee 100% genuine products with full after-sales support.

Products Sold: Smartphones, Tablets, Smart Watches, Laptops, Earbuds, Headphones, Chargers, Power Banks, Cases, Screen Protectors, Speakers.

Services Offered: Device Setup, Data Transfer, Screen Replacement, Battery Replacement, Device Diagnostics, Software Updates.

Target Customers: Tech enthusiasts, professionals, students, and businesses looking for reliable electronics.

Future Goals: Launch an online e-commerce platform and a dedicated B2B wholesale department.
""")

# CONTACT
with open('data/contact.txt', 'w') as f:
    f.write("""Business Name: Khalid & Osman Accessories
Phone Numbers: +254 700 000000, +254 711 111111
WhatsApp: +254 722 222222
Email: info@khalidosman.com, support@khalidosman.com
Physical Address: Tech Hub Center, Ground Floor, Moi Avenue, Nairobi, Kenya
Business Hours: Monday to Saturday: 8:00 AM - 8:00 PM, Sunday: 10:00 AM - 5:00 PM
Google Maps: https://maps.google.com/?q=Tech+Hub+Center+Nairobi
Facebook: @KhalidOsmanAccessories
Instagram: @khalidosman_tech
TikTok: @khalidosman_tech
LinkedIn: Khalid & Osman Electronics
Website: www.khalidosman.com
""")

# POLICIES
with open('data/policies.txt', 'w') as f:
    f.write("""Delivery Policy: Free delivery within Nairobi for orders above KES 5,000. Nationwide delivery via G4S takes 24-48 hours.

Warranty Policy: 1-year official manufacturer warranty on all smartphones. 6-month warranty on original accessories. Physical and water damage are not covered.

Refund Policy: Refunds are processed within 3-5 business days to the original payment method if the product is returned unopened within 7 days.

Return Policy: Products can be returned within 7 days if defective out-of-the-box. Items must be in original packaging with all accessories.

Exchange Policy: Exchanges allowed within 14 days for a product of equal or higher value. Difference must be paid.

Payment Methods: M-Pesa, Cash, Visa, Mastercard, Airtel Money, Bank Transfer.

Privacy Policy: We do not share customer data with third parties. Data is only used for processing orders and warranty claims.

Terms & Conditions: Prices are subject to change without notice. All goods remain the property of Khalid & Osman until paid in full.

Customer Service Policy: We aim to respond to all inquiries within 1 hour during business hours and resolve complaints within 48 hours.
""")

# SERVICES
with open('data/services.txt', 'w') as f:
    f.write("""Service Name: Device Setup & Data Transfer
Description: Complete setup of a new device including transferring contacts, photos, and apps from the old phone.
Estimated Duration: 30-60 minutes
Availability: Walk-in or pre-booked
Requirements: Both old and new devices, sufficient battery, passcodes.
Additional Notes: Free for devices purchased from our store.

Service Name: Screen Protector Installation
Description: Professional, bubble-free installation of tempered glass, hydrogel, or privacy screen protectors.
Estimated Duration: 10 minutes
Availability: Walk-in
Requirements: Device must be powered on to check touch response after installation.
Additional Notes: Warranty applies if it peels off within 24 hours.

Service Name: Software Updates & Troubleshooting
Description: Flashing official firmware, updating OS, and resolving software glitches.
Estimated Duration: 1-2 hours
Availability: Pre-booked preferred
Requirements: Device must be backed up before the process.
Additional Notes: We only install official OEM software.
""")

# SMARTPHONES (Samsung, Apple, Tecno, Oppo, Infinix)
def generate_phones(brand, count, models):
    text = ""
    for i in range(count):
        model = models[i % len(models)] + f" (Variant {i+1})"
        price = random.randint(15, 180) * 1000
        text += f"""Brand: {brand}
Model: {model}
Category: Smartphones
Price (KES): {price:,}
Availability: In Stock
Warranty: 24 Months Official Warranty
Display: 6.{random.randint(4,8)} inches, 120Hz AMOLED
Processor: Octa-core, latest gen
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
Description: A premium {brand} smartphone offering exceptional performance and photography.

"""
    return text

samsung_models = ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy A54', 'Galaxy A34', 'Galaxy A24', 'Galaxy A14', 'Galaxy M34']
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
    ('Chargers', 'Fast Charger Adapter'),
    ('Fast Chargers', '65W GaN Fast Charger'),
    ('Wireless Chargers', 'Magnetic Wireless Charging Pad'),
    ('Power Banks', '20000mAh Power Bank'),
    ('Phone Cases', 'Silicone Protective Case'),
    ('Screen Protectors', 'Tempered Glass Screen Protector'),
    ('Earbuds', 'True Wireless Earbuds'),
    ('Bluetooth Headphones', 'Noise Cancelling Headphones'),
    ('Bluetooth Speakers', 'Portable Wireless Speaker'),
    ('USB Cables', 'Braided Type-C Cable'),
    ('Memory Cards', '128GB MicroSD Card'),
    ('Smart Watches', 'Health Tracking Smartwatch'),
    ('Phone Holders', 'Car Dashboard Phone Holder'),
    ('Laptop Bags', 'Waterproof Laptop Backpack')
]
brands = ['Oraimo', 'Anker', 'Baseus', 'JBL', 'Sony', 'Ugreen', 'Samsung', 'Apple', 'Generic']

text = ""
for i in range(100):
    cat, name = random.choice(acc_cats)
    brand = random.choice(brands)
    price = random.randint(5, 150) * 100
    text += f"""Category: {cat}
Brand: {brand}
Model: {brand} {name} Gen {random.randint(1,4)}
Price (KES): {price:,}
Compatibility: Universal / Smartphone / Tablet
Warranty: 6 Months
Availability: In Stock
Description: High-quality {cat.lower()} designed for durability and seamless daily use.

"""
with open('data/accessories.txt', 'w') as f: f.write(text)

# Save an empty faqs.txt just in case it doesn't have content yet
with open('data/faqs.txt', 'w') as f:
    f.write("""FAQ: What is your delivery policy?
Answer: We offer free delivery within Nairobi for orders above KES 5,000. Nationwide delivery via G4S takes 24-48 hours.

FAQ: Do you accept M-Pesa?
Answer: Yes, we accept M-Pesa, Cash, Visa, Mastercard, Airtel Money, and Bank Transfers.

FAQ: Can I return a defective product?
Answer: Yes, products can be returned within 7 days if defective out-of-the-box, provided they are in original packaging.

FAQ: Do your phones come with a warranty?
Answer: All our smartphones come with a 1-year official manufacturer warranty.
""")
