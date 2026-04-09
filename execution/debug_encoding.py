import os

def debug_chars(filepath):
    print(f"Debugging {filepath}")
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # Find indices of 0xc3 (which is 'Ã' in UTF-8 start byte)
    indices = [i for i, b in enumerate(content) if b == 0xc3]
    for idx in indices:
        around = content[max(0, idx-5):min(len(content), idx+5)]
        print(f"Index {idx}: {around.hex()} | {around}")

if __name__ == "__main__":
    debug_chars('./index.html')
