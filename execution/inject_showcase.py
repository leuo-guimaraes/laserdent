import os

def main():
    filepath = 'index.html'
    if not os.path.exists(filepath):
        print("File not found.")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_section = """<!-- ══════════════════════════════════════════════════════════ -->
<!-- TRATAMENTOS / SERVICES SECTION              -->
<!-- ══════════════════════════════════════════════════════════ -->
<section class="section section--light" id="tratamentos">
    <div class="container">
        <div class="section__header reveal-up">
            <span class="section__tag">Especialidades</span>
            <h2 class="section__title">Nossas <span class="text-gradient">Especialidades</span></h2>
            <p class="section__desc">Tecnologia de ponta e cuidado humanizado em cada detalhe do seu tratamento.</p>
        </div>

        <div class="treatment-showcase__grid reveal-up">
            
            <!-- 1. Odontologia Integrativa -->
            <div class="showcase-card">
                <div class="showcase-card__img">
                    <img src="Fotos/Consultorio 360.jpg" alt="Odontologia Integrativa">
                </div>
                <div class="showcase-card__overlay">
                    <div class="showcase-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 class="showcase-card__title">Odontologia Integrativa</h3>
                    <p class="showcase-card__description">Uma visão sistêmica da saúde bucal, unindo técnica odontológica e equilíbrio biológico.</p>
                    <a href="tratamentos.html" class="showcase-card__link">
                        Ver detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>

            <!-- 2. Implantes -->
            <div class="showcase-card">
                <div class="showcase-card__img">
                    <img src="Fotos/cadeira paciente.jpg" alt="Implantes Dentários">
                </div>
                <div class="showcase-card__overlay">
                    <div class="showcase-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                    </div>
                    <h3 class="showcase-card__title">Implantes & Próteses</h3>
                    <p class="showcase-card__description">Recuperação funcional e estética com planejamento digital e precisão milimétrica.</p>
                    <a href="tratamentos.html" class="showcase-card__link">
                        Ver detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>

            <!-- 3. Canal a Laser -->
            <div class="showcase-card">
                <div class="showcase-card__img">
                    <img src="Fotos/sistema de ozonioterapia.jpg" alt="Tratamento de Canal">
                </div>
                <div class="showcase-card__overlay">
                    <div class="showcase-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    </div>
                    <h3 class="showcase-card__title">Canal a Laser</h3>
                    <p class="showcase-card__description">Desinfecção profunda e maior conforto pós-operatório com tecnologia laser e ozônio.</p>
                    <a href="tratamentos.html" class="showcase-card__link">
                        Ver detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>

            <!-- 4. Myobrace -->
            <div class="showcase-card">
                <div class="showcase-card__img">
                    <img src="Fotos/Equipe laserdent completa.jpg" alt="Ortodontia Myobrace">
                </div>
                <div class="showcase-card__overlay">
                    <div class="showcase-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    </div>
                    <h3 class="showcase-card__title">Ortodontia Myobrace</h3>
                    <p class="showcase-card__description">Tratamento preventivo e interceptativo sem braquetes, focado no desenvolvimento facial.</p>
                    <a href="tratamentos.html" class="showcase-card__link">
                        Ver detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>

            <!-- 5. Ozonioterapia -->
            <div class="showcase-card">
                <div class="showcase-card__img">
                    <img src="Fotos/IMG_7285.jpg" alt="Ozonioterapia">
                </div>
                <div class="showcase-card__overlay">
                    <div class="showcase-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/></svg>
                    </div>
                    <h3 class="showcase-card__title">Ozonioterapia</h3>
                    <p class="showcase-card__description">Terapia natural e potente com ação antimicrobiana e anti-inflamatória em diversos protocolos.</p>
                    <a href="tratamentos.html" class="showcase-card__link">
                        Ver detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>

            <!-- 6. Estética -->
            <div class="showcase-card">
                <div class="showcase-card__img">
                    <img src="Fotos/Imagem consultorio.jpg" alt="Estética Facial">
                </div>
                <div class="showcase-card__overlay">
                    <div class="showcase-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 class="showcase-card__title">Estética & Harmonia</h3>
                    <p class="showcase-card__description">Harmonização facial e estética dental para realçar sua beleza natural com sutileza.</p>
                    <a href="tratamentos.html" class="showcase-card__link">
                        Ver detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
            </div>

        </div>

        <div class="section__footer reveal-up" style="text-align: center; margin-top: 60px;">
            <a href="tratamentos.html" class="btn btn--primary">Ver Todos os Tratamentos</a>
        </div>
    </div>
</section>
"""
    
    # We want to replace lines 293-299 roughly
    start_tag = 'TRATAMENTOS / SERVICES SECTION'
    
    found_start = -1
    for i, line in enumerate(lines):
        if start_tag in line:
            found_start = i
            break
            
    if found_start != -1:
        # Replace the surrounding comment blocks (roughly 2 lines before and 5 lines after)
        start_idx = found_start - 1
        end_idx = found_start + 6 
        
        lines[start_idx:end_idx] = [new_section + '\n']
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print("Successfully injected showcase section.")
    else:
        print("Start tag not found.")

if __name__ == "__main__":
    main()
