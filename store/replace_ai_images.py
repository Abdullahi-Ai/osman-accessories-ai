import os
import shutil
import random

base_dir = "/home/osama/osman-accessories-ai/store/public/images"
generated_phones = [
    "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/phone1_1785587500933.png",
    "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/phone2_1785587518783.png"
]
generated_accessories = {
    'earbud': "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/earbuds_1785587539416.png",
    'watch': "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/smartwatch_1785587560660.png",
    'charger': "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/charger_1785588864589.png",
    'power': "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/charger_1785588864589.png",
    'default': "/home/osama/.gemini/antigravity/brain/2d01e2f1-4b3a-4f21-971f-5297299fe4cf/charger_1785588864589.png"
}

# Replace phone images
if os.path.exists(f"{base_dir}/phones"):
    for root, dirs, files in os.walk(f"{base_dir}/phones"):
        for file in files:
            if file.endswith('.png') or file.endswith('.jpg'):
                src = random.choice(generated_phones)
                dst = os.path.join(root, file)
                shutil.copy(src, dst)

# Replace accessory images
if os.path.exists(f"{base_dir}/accessories"):
    for root, dirs, files in os.walk(f"{base_dir}/accessories"):
        for file in files:
            if file.endswith('.png') or file.endswith('.jpg'):
                src = generated_accessories['default']
                if 'earbud' in root.lower() or 'earbud' in file.lower():
                    src = generated_accessories['earbud']
                elif 'watch' in root.lower() or 'watch' in file.lower():
                    src = generated_accessories['watch']
                elif 'charger' in root.lower() or 'charger' in file.lower() or 'cable' in root.lower():
                    src = generated_accessories['charger']
                
                dst = os.path.join(root, file)
                shutil.copy(src, dst)

print("Successfully replaced all placeholder images with photorealistic generated images!")
