import os

def main():
    filepath = 'tratamentos.html'
    
    # Custom flip card HTML template
    def get_card_html(icon_svg, title, desc, badges):
        badges_html = "".join([f'<span class="flip-badge">{b}</span>' for b in badges])
        return f'''
            <!-- Card: {title} -->
            <div class="flip-card reveal-up">
                <div class="flip-card-inner">
                    <!-- FRONT -->
                    <div class="flip-card-front">
                        <div class="flip-card-front__icon">
                            {icon_svg}
                        </div>
                        <h3 class="flip-card-front__title">{title}</h3>
                        <span class="flip-card-front__hint">Para saber mais passe o mouse</span>
                    </div>
                    <!-- BACK -->
                    <div class="flip-card-back">
                        <h3 class="flip-card-back__title">{title}</h3>
                        <p class="flip-card-back__desc">{desc}</p>
                        <div class="flip-card-back__badges">
                            {badges_html}
                        </div>
                    </div>
                </div>
            </div>'''

    # Icon SVGs
    icons = {
        "integrativa": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s-8 4.5-8 10c0 4.418 3.582 8 8 8s8-3.582 8-8c0-5.5-8-10-8-10z"></path></svg>',
        "neural": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
        "ozonio": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/></svg>',
        "canal": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
        "ronco": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
        "frenectomia": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6 1.5 1.5 1 3 1 3s-1 1-1 3.5c0 1.38.5 2 1 3-1.072 2.143-.224 4.054-2 6-2-2-3-4-3-6 0-1.38-.5-2-1-3z"></path></svg>',
        "implantes": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
        "myobrace": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
        "estetica": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
    }

    # We will build the new HTML string
    html_start = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="Explore as especialidades da Clínica LASERdent: laserterapia, ozonioterapia, odontologia integrativa, implantes e muito mais." name="description"/>
    <title>Especialidades | Clínica LASERdent</title>
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <link href="styles.css" rel="stylesheet"/>
</head>
<body>

<header class="header header--scrolled" id="header">
    <div class="header__container">
        <a class="header__logo" href="index.html">
            <img alt="Clínica LASERdent" class="header__logo-img" src="Fotos/logosemfundo.png"/>
        </a>
        <nav class="header__nav" id="mainNav">
            <a class="nav-link" href="index.html">Início</a>
            <a class="nav-link" href="index.html#sobre">Sobre</a>
            <a class="nav-link active" href="tratamentos.html">Tratamentos</a>
            <a class="nav-link" href="tecnologia.html">Tecnologia</a>
            <a class="nav-link" href="index.html#depoimentos">Depoimentos</a>
            <a class="nav-link" href="#contato">Contato</a>
        </nav>
        <a class="header__cta btn btn--primary" href="#contato">Agendar Consulta</a>
    </div>
</header>

<section class="section section--dark" style="padding-top: 150px;">
    <div class="container">
        <div class="section__header reveal-up">
            <span class="section__tag section__tag--light">Especialidades</span>
            <h2 class="section__title section__title--light">Onde o <span class="text-gradient">Sentimento</span> encontra a <span class="text-gradient">Razão</span></h2>
            <p class="section__desc section__desc--light">Nossos tratamentos são desenhados para integrar tecnologia laser de ponta com um olhar humanizado e biológico.</p>
        </div>

        <h3 class="category-divider reveal-up">Odontologia Integrativa</h3>
        <div class="treatment-grid">"""

    cards_cat1 = [
        get_card_html(icons["integrativa"], "Odontologia Integrativa", "Entendemos que a boca não é um sistema isolado, mas sim uma janela para a saúde de todo o seu organismo. Buscamos o equilíbrio real entre a precisão técnica e o bem-estar sistêmico.", ["Biocompatibilidade", "Visão Sistêmica"]),
        get_card_html(icons["neural"], "Terapia Neural", "Utilizamos estímulos sutis para recuperar a harmonia do sistema nervoso, tratando campos interferentes que podem gerar dores crônicas ou desequilíbrios físicos e emocionais.", ["Equilíbrio Nervoso", "Bio-decodificação"]),
        get_card_html(icons["ozonio"], "Ozonioterapia", "O ozônio é um potente aliado antimicrobiano e regenerador natural. Utilizado para desinfecções profundas e aceleração de cirurgias, respeitando a cura natural do corpo.", ["Antimicrobiano Natural", "Cura Acelerada"])
    ]

    html_mid1 = """
        </div>

        <h3 class="category-divider reveal-up">Tecnologia Laser de Alta Precisão</h3>
        <div class="treatment-grid">"""

    cards_cat2 = [
        get_card_html(icons["canal"], "Canal a Laser", "O medo do canal ficou no passado. O laser elimina focos infecciosos com mínimo trauma e profundidade inalcançável por métodos comuns. Conforto e segurança.", ["Dor Zero", "Desinfecção Profunda"]),
        get_card_html(icons["ronco"], "Melhora do Ronco", "Tratamento inovador e indolor que utiliza laser para fortalecer os tecidos do palato. Reduz significativamente a apneia e melhora a qualidade do seu sono.", ["Sono de Qualidade", "Sem Cirurgia"]),
        get_card_html(icons["frenectomia"], "Frenectomia a Laser", "Ideal para 'língua presa' em bebês e crianças. O laser substitui o bisturi, realizando um corte preciso sem sangramento e sem necessidade de pontos.", ["Sem Pontos", "Recuperação Rápida"])
    ]

    html_mid2 = """
        </div>

        <h3 class="category-divider reveal-up">Reabilitação, Estética & Harmonia</h3>
        <div class="treatment-grid">"""

    cards_cat3 = [
        get_card_html(icons["implantes"], "Implantes & Próteses", "Planejamento digital 3D para devolver a força da mastigação e o prazer de sorrir. Resultados indistinguíveis de dentes naturais com precisão milimétrica.", ["Precisão Digital", "Naturalidade"]),
        get_card_html(icons["myobrace"], "Ortodontia Myobrace", "Focado nas causas do desalinhamento dental: respiração e postura da língua. Guia o crescimento facial de forma natural, evitando aparelhos fixos fixos no futuro.", ["Preventivo", "Sem Braquetes"]),
        get_card_html(icons["estetica"], "Estética & Lifting", "Harmonização facial realçando sua beleza natural. O laser estimula o seu próprio colágeno de dentro para fora, garantindo rejuvenescimento sutil e elegante.", ["Lifting sem Cortes", "Beleza Natural"])
    ]

    html_end = """
        </div>

        <div class="cta-bottom reveal-up">
            <h3>Sente que é o momento de cuidar de você?</h3>
            <p>O primeiro passo é uma conversa honesta e detalhada sobre seus objetivos.</p>
            <a href="index.html#contato" class="btn btn--primary btn--lg">Agendar Consulta</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer__bottom">
            <p>© 2026 Clínica LASERdent. Todos os direitos reservados.</p>
            <p>Unindo Razão & Sentimento em cada sorriso.</p>
        </div>
    </div>
</footer>

<script src="script.js"></script>
</body>
</html>"""

    full_html = html_start + "".join(cards_cat1) + html_mid1 + "".join(cards_cat2) + html_mid2 + "".join(cards_cat3) + html_end
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print("Successfully generated new tratamentos.html with 3D FLIP CARDS structure.")

if __name__ == "__main__":
    main()
