import os
import re

def update_html_files():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    html_files = ['index.html', 'tratamentos.html', 'tecnologia.html', 'admin.html']
    
    replacements = [
        # Match index.html#section
        (r'href="index\.html#([^"]+)"', r'href="/#\1"'),
        # Match index.html
        (r'href="index\.html"', r'href="/"'),
        # Match tratamentos.html#section
        (r'href="tratamentos\.html#([^"]+)"', r'href="/tratamentos#\1"'),
        # Match tratamentos.html
        (r'href="tratamentos\.html"', r'href="/tratamentos"'),
        # Match tecnologia.html#section
        (r'href="tecnologia\.html#([^"]+)"', r'href="/tecnologia#\1"'),
        # Match tecnologia.html
        (r'href="tecnologia\.html"', r'href="/tecnologia"'),
        # Match admin.html
        (r'href="admin\.html"', r'href="/admin"'),
    ]
    
    for filename in html_files:
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for pattern, repl in replacements:
            new_content = re.sub(pattern, repl, new_content)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes needed in {filename}")

def create_server_configs():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # 1. Apache .htaccess
    htaccess_content = """# Habilitar reescrita de URL amigável (Clean URLs)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirecionar acessos diretos com .html para a URL limpa (ex: /tratamentos.html -> /tratamentos)
  RewriteCond %{THE_REQUEST} \s/+(.+?)\.html[\s?] [NC]
  RewriteRule ^ /%1 [R=301,L]

  # Se o arquivo não existir como diretório nem como arquivo direto, tenta adicionar .html internamente
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>
"""
    htaccess_path = os.path.join(base_dir, '.htaccess')
    with open(htaccess_path, 'w', encoding='utf-8') as f:
        f.write(htaccess_content)
    print("Created .htaccess")

    # 2. Vercel vercel.json
    vercel_content = """{
  "cleanUrls": true
}
"""
    vercel_path = os.path.join(base_dir, 'vercel.json')
    with open(vercel_path, 'w', encoding='utf-8') as f:
        f.write(vercel_content)
    print("Created vercel.json")

    # 3. Nginx default.conf
    nginx_content = """server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ $uri.html =404;
    }
}
"""
    nginx_path = os.path.join(base_dir, 'nginx.conf')
    with open(nginx_path, 'w', encoding='utf-8') as f:
        f.write(nginx_content)
    print("Created nginx.conf")

if __name__ == '__main__':
    update_html_files()
    create_server_configs()
