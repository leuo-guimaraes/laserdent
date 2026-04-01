import os
import re

def fix_mojibake(filepath):
    print(f"Fixing mappings in {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The most common broken sequences found in the file
    corrections = {
        'OdontolÃ³gica': 'Odontológica',
        'biolÃ³gica': 'biológica',
        'saÃºde': 'saúde',
        'ExperiÃªncia': 'Experiência',
        'ClÃ\xadnica': 'Clínica',
        'ClÃnica': 'Clínica',
        'avanÃ§ada': 'avançada',
        'AvanÃ§ada': 'Avançada',
        'AtuaÃ§Ã£o': 'Atuação',
        'Odontopediatria': 'Odontopediatria',
        'Ã\xad': 'í',
        'Ã³': 'ó',
        'Ã£': 'ã',
        'Ã§': 'ç',
        'Ã©': 'é',
        'Ãª': 'ê',
        'Ãº': 'ú',
        'Ã¡': 'á',
        'Ã¢': 'â',
        'Ãµ': 'õ',
        'Ã\x8d': 'Í',
        'Ã‰': 'É',
        'Ã“': 'Ó',
        'Ãš': 'Ú',
        'Ã‡': 'Ç',
        'Ã‚': 'Â',
        'Ãƒ': 'Ã',
        'â€”': '—',
        'â€“': '–',
        'â€œ': '“',
        'â€\x9d': '”',
        'Âº': 'º',
        'Âª': 'ª',
        'Â°': '°',
        'SolicitaÃ§Ã£o': 'Solicitação',
        'AvaliaÃ§Ã£o': 'Avaliação',
        'InformaÃ§Ã£o': 'Informação',
        'SessÃ£o': 'Sessão',
        'coraÃ§Ã£o': 'coração',
        'inovaÃ§Ã£o': 'inovação',
        'Dr. Edson Carlos Nagib': 'Dr. Edson Carlos Nagib', # dummy
        'Solange de FÃ¡tima': 'Solange de Fátima',
        'RecepÃ§Ã£o': 'Recepção',
        'recepÃ§Ã£o': 'recepção',
        'ConsultÃ³rio': 'Consultório',
        'EstÃ©tica': 'Estética',
        'estÃ©tica': 'estética',
        'Ãšltima': 'Última',
        'GeraÃ§Ã£o': 'Geração',
        'CÃ¢mera': 'Câmera',
        'clÃ\xadnica': 'clínica',
        'bebÃªs': 'bebês',
        'crianÃ§as': 'crianças',
        'sedaÃ§Ã£o': 'sedação',
        'sistÃªmica': 'sistêmica',
        'biocompatÃ\xadveis': 'biocompatíveis',
        'famÃ\xadlia': 'família',
        'ClÃ\xadnica LASERdent': 'Clínica LASERdent',
        'InÃ\xadcio': 'Início',
        'PadrÃ£o': 'Padrão',
        'sÃ£o': 'são',
        'SÃ£o': 'São',
        'VocÃª': 'Você',
        'vocÃª': 'você',
        'NÃ£o': 'Não',
        'nÃ£o': 'não',
        'vÃ¡rios': 'vários',
        'necessÃ¡rio': 'necessário',
        'Clássica': 'Clássica', # just in case
        'Â': '' # Clear stray Â characters sometimes left over
    }

    # As a secondary pass, just standard decode to handle everything nicely
    try:
        raw_latin = content.encode('latin-1').decode('utf-8')
        content = raw_latin
        print(f"Used generic fallback decoding for {filepath}")
    except:
        # manual replace
        print(f"Using manual mapping for {filepath}")
        for bad in sorted(corrections.keys(), key=len, reverse=True):
            content = content.replace(bad, corrections[bad])

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed!")

project_dir = r"C:\Users\leona\Desktop\Projetos Antigravity\Laserdent"
for file in ["index.html", "admin.html"]:
    path = os.path.join(project_dir, file)
    if os.path.exists(path):
        fix_mojibake(path)

# Also list missing images vs available images
path_index = os.path.join(project_dir, 'index.html')
with open(path_index, 'r', encoding='utf-8') as f:
    html_content = f.read()

import re
refs = re.findall(r'(?:src|data-lightbox)=[\"\']([^\"\']+\.(?:jpg|jpeg|png|webp|gif|svg))[\"\']', html_content, re.IGNORECASE)
refs = list(dict.fromkeys(refs))

fotos_dir = os.path.join(project_dir, 'Fotos')
available = os.listdir(fotos_dir) if os.path.exists(fotos_dir) else []

print("\nMissing Images:")
for ref in refs:
    full_path = os.path.join(project_dir, ref.replace('/', os.sep))
    if not os.path.exists(full_path):
        print(f" - {ref}")

print("\nAvailable Images in Fotos folder:")
for av in sorted(available):
    print(f" - {av}")
