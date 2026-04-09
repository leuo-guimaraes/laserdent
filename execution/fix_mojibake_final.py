import os
import re

def fix_content(content):
    # Mapping of common mojibake patterns to correct characters
    # These are common when UTF-8 is read as ISO-8859-1 or similar
    replacements = {
        'Ã\x81': 'Á',
        'Ã\x80': 'À',
        'Ã\x82': 'Â',
        'Ã\x83': 'Ã',
        'Ã\x89': 'É',
        'Ã\x8a': 'Ê',
        'Ã\xad': 'í', # This is actually \xed in latin1
        'Ã\x8d': 'Í',
        'Ã\x93': 'Ó',
        'Ã\x94': 'Ô',
        'Ã\x95': 'Õ',
        'Ã\x9a': 'Ú',
        'Ã\x87': 'Ç',
        'Ã¡': 'á',
        'Ã\xa0': 'à',
        'Ã¢': 'â',
        'Ã£': 'ã',
        'Ã©': 'é',
        'Ãª': 'ê',
        'Ã\xad': 'í',
        'Ã³': 'ó',
        'Ã´': 'ô',
        'Ãµ': 'õ',
        'Ãº': 'ú',
        'Ã§': 'ç',
        'Ã ': 'Á', # Special case found in index.html
    }
    
    for broken, fixed in replacements.items():
        content = content.replace(broken, fixed)
        
    # Remove the decorative Unicode dividers that often cause issues
    # Matches strings of box-drawing characters like â• â• â•
    content = re.sub(r'â•[â•\s]*', '==============================================', content)
    
    return content

def main():
    files = ['index.html', 'tratamentos.html', 'tecnologia.html', 'admin.html']
    for filename in files:
        if not os.path.exists(filename):
            continue
            
        print(f"Processing {filename}...")
        try:
            # Read as bytes first to handle any encoding safely
            with open(filename, 'rb') as f:
                raw = f.read()
            
            # Try decoding as utf-8 but handle it as a string to find patterns
            content = raw.decode('utf-8', errors='ignore')
            fixed = fix_content(content)
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(fixed)
            print(f"Done fixing {filename}")
        except Exception as e:
            print(f"Failed to fix {filename}: {e}")

if __name__ == "__main__":
    main()
