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
                        <span class="flip-card-front__hint">Clique para saber mais</span>
                    </div>
                    <!-- BACK -->
                    <div class="flip-card-back">
                        <h3 class="flip-card-back__title">{title}</h3>
                        <p class="flip-card-back__desc">{desc}</p>
                        <div class="flip-card-back__badges">
                            {badges_html}
                        </div>
                        <span class="flip-card-back__hint">Clique para voltar</span>
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
        "estetica": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        "fluorescencia": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    }

    # We will build the new HTML string
    html_start = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="Explore as especialidades da Clínica LASERdent: laserterapia, limpeza airflow por fluorescência, ozonioterapia, odontologia integrativa, implantes e muito mais." name="description"/>
    <title>Especialidades | Clínica LASERdent</title>
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="styles.css" rel="stylesheet"/>
</head>
<body>

<header class="header header--scrolled" id="header">
    <div class="header__container">
        <a class="header__logo" href="/">
            <img alt="Clínica LASERdent" class="header__logo-img" src="Fotos/logosemfundo.png"/>
        </a>
        <nav class="header__nav" id="mainNav">
            <a class="nav-link" href="/">Início</a>
            <a class="nav-link" href="/#sobre">Sobre</a>
            <a class="nav-link active" href="/tratamentos">Tratamentos</a>
            <a class="nav-link" href="/tecnologia">Tecnologia</a>
            <a class="nav-link" href="/#depoimentos">Depoimentos</a>
            <a class="nav-link" href="#contato">Contato</a>
        </nav>
        <a class="header__cta btn btn--primary" href="#contato">
            <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="18">
                <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            Agendar Consulta
        </a>
        <button aria-label="Abrir menu" class="header__menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>

<!-- Mobile Nav Overlay -->
<div class="mobile-nav-overlay" id="mobileNavOverlay">
    <nav class="mobile-nav">
        <a class="mobile-nav__link" href="/">Início</a>
        <a class="mobile-nav__link" href="/#sobre">Sobre</a>
        <a class="mobile-nav__link" href="/tratamentos">Tratamentos</a>
        <a class="mobile-nav__link" href="/tecnologia">Tecnologia</a>
        <a class="mobile-nav__link" href="/#depoimentos">Depoimentos</a>
        <a class="mobile-nav__link" href="#contato">Contato</a>
        <a class="btn btn--primary mobile-nav__cta" href="#contato">Agendar Consulta</a>
    </nav>
</div>

<section class="section section--dark" style="padding-top: 150px;">
    <div class="container">
        <div class="section__header reveal-up">
            <span class="section__tag section__tag--light">Especialidades</span>
            <h2 class="section__title section__title--light">Onde o <span class="text-gradient">Sentimento</span> encontra a <span class="text-gradient">Razão</span></h2>
            <p class="section__desc section__desc--light">Nossos tratamentos são desenhados para integrar tecnologia laser e biotecnologia de ponta com um olhar humanizado e biológico.</p>
        </div>

        <h3 class="category-divider reveal-up">Odontologia Integrativa & Diagnóstico Biológico</h3>
        <div class="treatment-grid">"""

    cards_cat1 = [
        get_card_html(icons["integrativa"], "Odontologia Integrativa", "Entendemos que a boca não é um sistema isolado, mas sim uma janela para a saúde de todo o seu organismo. Buscamos o equilíbrio real entre a precisão técnica e o bem-estar sistêmico.", ["Biocompatibilidade", "Visão Sistêmica"]),
        get_card_html(icons["neural"], "Terapia Neural", "Utilizamos estímulos sutis para recuperar a harmonia do sistema nervoso, tratando campos interferentes que podem gerar dores crônicas ou desequilíbrios físicos e emocionais.", ["Equilíbrio Nervoso", "Bio-decodificação"]),
        get_card_html(icons["ozonio"], "Ozonioterapia", "O ozônio é um potente aliado antimicrobiano e regenerador natural. Utilizado para desinfecções profundas e aceleração de cirurgias, respeitando a cura natural do corpo.", ["Antimicrobiano Natural", "Cura Acelerada"])
    ]

    html_mid1 = """
        </div>

        <h3 class="category-divider reveal-up">Tecnologia Laser & Biofilme de Alta Precisão</h3>
        <div class="treatment-grid">"""

    cards_cat2 = [
        get_card_html(icons["fluorescencia"], "Limpeza Airflow por Fluorescência", "Higienização revolucionária onde a luz de fluorescência revela com precisão bacteriana o biofilme dental invisível a olho nu. O sistema EMS Airflow remove 100% da placa com jato morno e suave, garantindo limpeza guiada sem agredir o esmalte.", ["Biofilme Guiado", "Luz Fluorescente", "Zero Dor"]),
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
        get_card_html(icons["myobrace"], "Ortodontia Myobrace", "Focado nas causas do desalinhamento dental: respiração e postura da língua. Guia o crescimento facial de forma natural, evitando aparelhos fixos no futuro.", ["Preventivo", "Sem Braquetes"]),
        get_card_html(icons["estetica"], "Estética & Lifting", "Harmonização facial realçando sua beleza natural. O laser estimula o seu próprio colágeno de dentro para fora, garantindo rejuvenescimento sutil e elegante.", ["Lifting sem Cortes", "Beleza Natural"])
    ]

    html_end = """
        </div>

        <div class="cta-bottom reveal-up">
            <h3>Sente que é o momento de cuidar de você?</h3>
            <p>O primeiro passo é uma conversa honesta e detalhada sobre seus objetivos.</p>
            <a href="/#contato" class="btn btn--primary btn--lg">Agendar Consulta</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer__grid">
            <div class="footer__brand">
                <a class="header__logo" href="/">
                    <img alt="Clínica LASERdent" class="header__logo-img footer__logo-img" src="Fotos/logosemfundo.png" />
                </a>
                <p class="footer__about">Especialistas em odontologia avançada com laser, oferecendo tratamentos de ponta para toda a família.</p>
                <div class="footer__social">
                    <a aria-label="WhatsApp" class="footer__social-link" href="https://wa.me/5541992513035" target="_blank">
                        <svg fill="currentColor" height="20" viewbox="0 0 24 24" width="20">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                        </svg>
                    </a>
                </div>
            </div>

            <div class="footer__links">
                <h4>Navegação</h4>
                <a href="/">Início</a>
                <a href="/#sobre">Sobre</a>
                <a href="/tratamentos">Tratamentos</a>
                <a href="/tecnologia">Tecnologia</a>
                <a href="/#depoimentos">Depoimentos</a>
                <a href="#contato">Contato</a>
            </div>

            <div class="footer__links">
                <h4>Especialidades</h4>
                <a href="/tratamentos">Limpeza Airflow por Fluorescência</a>
                <a href="/tratamentos">Canal a Laser</a>
                <a href="/tratamentos">Implantes Dentários</a>
                <a href="/tratamentos">Ozonioterapia</a>
                <a href="/tratamentos">Estética Dental</a>
                <a href="/tratamentos">Odontologia Integrativa</a>
            </div>

            <div class="footer__newsletter">
                <h4>Horário de Funcionamento</h4>
                <div class="footer__schedule">
                    <div class="footer__schedule-row">
                        <span>Segunda – Sexta</span>
                        <strong>09h – 18h</strong>
                    </div>
                    <div class="footer__schedule-row">
                        <span>Sábado</span>
                        <strong>Fechado</strong>
                    </div>
                    <div class="footer__schedule-row">
                        <span>Domingo</span>
                        <strong>Fechado</strong>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer__bottom">
            <p>© 2026 Clínica LASERdent. Todos os direitos reservados.</p>
            <p>Desenvolvido por <a href="http://www.morphix.com.br" target="_blank" style="color: inherit; text-decoration: none;"><strong>Morphix Tecnologia</strong></a></p>
        </div>
    </div>
</footer>

<!-- WhatsApp Floating Button -->
<a aria-label="Falar no WhatsApp" class="whatsapp-float" href="https://wa.me/5541992513035?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20LASERdent." id="whatsappFloat" rel="noopener noreferrer" target="_blank">
    <svg fill="currentColor" height="28" viewbox="0 0 24 24" width="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
    </svg>
    <span class="whatsapp-float__tooltip">Fale Conosco</span>
</a>

<!-- Mobile Sticky CTA -->
<div class="mobile-sticky-cta" id="mobileStickyBar">
    <a href="https://wa.me/5541992513035?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta." rel="noopener" target="_blank">
        <svg fill="currentColor" height="20" viewbox="0 0 24 24" width="20">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
        </svg>
        Agendar Consulta via WhatsApp
    </a>
</div>

<script src="script.js"></script>
</body>
</html>"""

    full_html = html_start + "".join(cards_cat1) + html_mid1 + "".join(cards_cat2) + html_mid2 + "".join(cards_cat3) + html_end
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print("Successfully generated new tratamentos.html with 3D FLIP CARDS structure.")

if __name__ == "__main__":
    main()
