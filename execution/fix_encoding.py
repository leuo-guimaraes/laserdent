import os
import re

def fix_mojibake(content):
    replacements = {
        'Ã reas': 'Áreas',
        'CirurgiÃ£o': 'Cirurgião',
        'CirurgiÃ£': 'Cirurgiã',
        'Ã¡': 'á',
        'Ã£': 'ã',
        'Ã§': 'ç',
        'Ã©': 'é',
        'Ãª': 'ê',
        'Ã³': 'ó',
        'Ãº': 'ú',
        'Ã ': 'À',
        'â• ': '-',
        'â•—': '-',
        'â• ': '-',
        'â•š': '-',
        'â•': '-',
        'â• ': '-',
        # Add more if needed
    }
    
    for broken, fixed in replacements.items():
        content = content.replace(broken, fixed)
    
    # Also clean up the long decorative lines if they are still broken
    content = re.sub(r'<!-- [-]+ -->', '<!-- ============================================== -->', content)
    
    return content

def main():
    root_dir = '.'
    for filename in os.listdir(root_dir):
        if filename.endswith('.html'):
            filepath = os.path.join(root_dir, filename)
            print(f"Fixing {filepath}...")
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                fixed_content = fix_mojibake(content)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                print(f"Successfully fixed {filename}")
            except Exception as e:
                print(f"Error fixing {filename}: {e}")

if __name__ == "__main__":
    main()
