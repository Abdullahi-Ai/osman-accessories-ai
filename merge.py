import os
files_to_merge = ['samsung.txt', 'iphone.txt', 'tecno.txt', 'oppo.txt', 'infinix.txt', 'accessories.txt']
with open('data/products.txt', 'w') as out_f:
    for f_name in files_to_merge:
        path = f'data/{f_name}'
        if os.path.exists(path):
            with open(path, 'r') as in_f:
                out_f.write(in_f.read())
                out_f.write('\n\n')
            os.remove(path)
