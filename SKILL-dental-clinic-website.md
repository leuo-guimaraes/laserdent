# SKILL: Dental Clinic Website — Modern, Minimalist, Timeless
**For use with Antigravity | Versão PT-BR**

---

## 1. CONTEXTO E OBJETIVO

Este documento é um guia completo de design e desenvolvimento para criar sites de clínica odontológica modernos, minimalistas e atemporais. O objetivo é transformar uma clínica odontológica em uma marca digital de alto padrão — transmitindo confiança, sofisticação e acolhimento ao mesmo tempo.

**Referência do cliente:** Laserdent (laserdent.com.br) — clínica odontológica brasileira, foco em laser e estética dental.

---

## 2. IDENTIDADE VISUAL — DIREÇÃO ESTÉTICA

### Filosofia Central
> "Menos clínica médica, mais boutique de luxo. O paciente deve sentir calma antes mesmo de entrar."

### Paleta de Cores Recomendada

**Opção A — Clássico Sofisticado (evergreen)**
```
--color-bg:        #FAFAF8    /* Off-white quente, nunca branco puro */
--color-surface:   #F2F0EC    /* Para cards e seções alternadas */
--color-text:      #1A1A18    /* Quase preto, mais suave que #000 */
--color-text-muted:#6B6860    /* Textos secundários */
--color-accent:    #2D5F5D    /* Verde-musgo escuro — confiança + saúde */
--color-accent-light:#E8F0EF  /* Fundo de destaques suaves */
--color-cta:       #1A1A18    /* Botões principais: dark, não colorido */
```

**Opção B — Premium Escuro (para posicionamento alto padrão)**
```
--color-bg:        #0F0F0F
--color-surface:   #1A1A1A
--color-text:      #F5F3EF
--color-text-muted:#8A8780
--color-accent:    #C8B89A    /* Dourado envelhecido — luxo discreto */
--color-cta:       #F5F3EF
```

**Opção C — Fresh & Moderno (para clínicas com foco jovem/estética)**
```
--color-bg:        #FFFFFF
--color-surface:   #F7F4F0
--color-text:      #1C1C1C
--color-accent:    #3B7EA1    /* Azul-petróleo — tecnologia + saúde */
--color-accent-warm:#D4A57A  /* Tom pele/quente para humanizar */
```

> **Regra geral:** Nunca use azul royal, verde limão ou cores saturadas. Prefira tons dessaturados, quentes ou neutros com UM acento definido.

---

## 3. TIPOGRAFIA

### Stack Recomendado
```css
/* Display — Títulos grandes, hero */
font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;

/* Body — Texto corrido, parágrafos */
font-family: 'DM Sans', 'Outfit', system-ui, sans-serif;

/* Alternativa moderna/minimalista */
font-family: 'Syne', 'Space Grotesk', sans-serif; /* apenas para body */
```

### Regras Tipográficas
- Títulos de hero: 64–96px, peso 300–400 (light/regular), letra-spacing negativo (-0.02em)
- Corpo: 16–18px, line-height 1.6–1.8
- Labels/eyebrows: 11–12px, ALL CAPS, letter-spacing 0.15em, peso 500
- **Nunca use bold em títulos principais** — o peso do serif já é suficiente
- Limite: máximo 2 famílias tipográficas por site

---

## 4. ESTRUTURA DO SITE — ARQUITETURA DE PÁGINAS

### Páginas Essenciais
```
/                   → Home
/sobre              → Sobre a clínica e equipe
/tratamentos        → Lista de serviços (ou subpáginas por tratamento)
/galeria            → Antes/depois + fotos da clínica
/depoimentos        → Avaliações de pacientes
/blog               → Artigos educativos (SEO)
/contato            → Formulário + mapa + WhatsApp
/agendamento        → CTA principal (pode ser modal ou página dedicada)
```

### Seções Obrigatórias na Home (na ordem)
1. **Hero** — Headline impactante + subheadline + CTA + imagem/vídeo de fundo
2. **Social Proof Rápido** — 3 números: anos de experiência, pacientes atendidos, avaliação Google
3. **Especialidades** — Cards dos principais tratamentos (ícones, não fotos)
4. **Por que nos escolher** — 3–4 diferenciais com ícones simples
5. **Antes e Depois** — Slider ou grid com casos reais
6. **Equipe** — Fotos humanizadas dos dentistas
7. **Depoimentos** — Mínimo 5, preferencialmente com foto e nome
8. **Localização + Horários** — Mapa integrado
9. **CTA Final** — "Agende sua consulta" bem visível

---

## 5. COMPONENTES DE UI — ESPECIFICAÇÕES

### Navbar
```
- Fundo: transparente no topo, torna-se sólido ao rolar (backdrop-filter: blur)
- Logo: esquerda
- Links: centro ou direita (máx. 5 itens)
- CTA button: direita, estilo outline ou filled
- Mobile: hamburger com menu drawer lateral
- Altura: 64–72px desktop, 56px mobile
```

### Hero Section
```
- Layout: texto à esquerda (60%), imagem à direita (40%) OU full-width com overlay
- Headline: 2–4 palavras impactantes. Exemplo: "Seu sorriso, redefinido."
- Subheadline: 1–2 frases explicando o diferencial
- CTA primário: "Agende agora" → cor de destaque
- CTA secundário: "Conheça nossos tratamentos" → ghost/outline
- Imagem: foto real da clínica ou paciente satisfeito (nunca stock genérico)
- Animação: fade-in suave com stagger de 150ms entre elementos
```

### Cards de Tratamento
```css
.treatment-card {
  border-radius: 12px;
  padding: 32px;
  background: var(--color-surface);
  border: 1px solid rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.treatment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}
```
- Ícone: SVG minimalista, 40–48px, cor do acento
- Título: 20–22px, serif
- Descrição: 14–15px, muted, máx. 2 linhas
- Link: "Saiba mais →" sem botão, apenas texto sublinhado ao hover

### Botões (CTA)
```css
/* Primário */
.btn-primary {
  background: var(--color-cta);
  color: var(--color-bg);
  padding: 14px 32px;
  border-radius: 4px; /* cantos levemente arredondados, não pill */
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.85; }

/* Secundário */
.btn-secondary {
  background: transparent;
  border: 1.5px solid var(--color-text);
  color: var(--color-text);
  /* mesmos padding e border-radius */
}
```

### Seção de Depoimentos
```
- Layout: grid 3 colunas (desktop) / 1 coluna (mobile)
- Card: foto circular 48px + nome + cargo/cidade + texto
- Estrelas: apenas se forem reais (Google Reviews)
- Fundo do card: var(--color-surface)
- Sem aspas decorativas gigantes — são clichê
```

### Galeria Antes/Depois
```
- Componente: slider com divisor central arrastável (before/after slider)
- Alternativa: grid com hover reveal
- Legenda obrigatória: tratamento realizado + tempo de tratamento
- Nota legal: consentimento do paciente (LGPD)
```

---

## 6. ANIMAÇÕES E MICRO-INTERAÇÕES

### Princípios
- **Sutileza:** animações devem ser percebidas inconscientemente
- **Performance:** preferir CSS transitions e transforms (GPU-accelerated)
- **Propósito:** cada animação deve ter função, não ser decorativa aleatória

### Implementações Recomendadas
```css
/* Fade-in ao entrar na viewport (usar IntersectionObserver) */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger em listas/cards */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }

/* Navbar blur ao rolar */
.navbar.scrolled {
  background: rgba(250, 250, 248, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(0,0,0,0.08);
}
```

### Evitar
- Parallax agressivo (cansa em mobile)
- Hover 3D flip em cards
- Carregamentos animados longos (>1s)
- Cursor customizado (quebra expectativa do usuário)

---

## 7. FUNCIONALIDADES ESSENCIAIS

### Botão WhatsApp Flutuante
```html
<!-- Fixo no canto inferior direito -->
<a href="https://wa.me/55XXXXXXXXXXX?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
   class="whatsapp-float" target="_blank" aria-label="Falar no WhatsApp">
  <svg><!-- ícone WhatsApp --></svg>
</a>
```
```css
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  transition: transform 0.2s;
}
.whatsapp-float:hover { transform: scale(1.1); }
```

### Formulário de Agendamento
Campos mínimos:
- Nome completo
- Telefone/WhatsApp
- E-mail
- Tratamento de interesse (dropdown)
- Mensagem (opcional)
- Horário preferido (opcional)

Integração recomendada: Google Forms embed OU formulário nativo com envio para WhatsApp API.

### Google Maps Embed
```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="400"
  style="border:0; border-radius: 12px;"
  loading="lazy">
</iframe>
```

### Chat/CTA Sticky Mobile
```
- Banner fixo no bottom em mobile: "📅 Agende sua consulta → WhatsApp"
- Fundo: var(--color-cta), texto branco
- Altura: 52px
- Não exibir no desktop
```

---

## 8. SEO E PERFORMANCE

### Meta Tags Essenciais
```html
<title>Laserdent | Clínica Odontológica em [Cidade] — Laser e Estética Dental</title>
<meta name="description" content="Tratamentos odontológicos com tecnologia laser em [Cidade]. Clareamento, implantes, ortodontia e mais. Agende sua consulta.">
<meta property="og:image" content="/images/og-laserdent.jpg"> <!-- 1200x630px -->
```

### Schema Markup (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Laserdent",
  "url": "https://laserdent.com.br",
  "telephone": "+55-XX-XXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "...",
    "addressRegion": "...",
    "postalCode": "...",
    "addressCountry": "BR"
  },
  "openingHours": ["Mo-Fr 08:00-18:00", "Sa 08:00-13:00"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200"
  }
}
```

### Performance
- Imagens: WebP com fallback JPG, lazy loading nativo
- Fontes: `font-display: swap`, preload das fontes críticas
- CSS crítico: inline no `<head>`
- LCP alvo: < 2.5s
- CLS: 0 (reservar espaço para imagens com width/height)

---

## 9. MOBILE FIRST — CHECKLIST

- [ ] Navbar vira hamburger abaixo de 768px
- [ ] Hero: texto empilha acima da imagem
- [ ] Cards de tratamento: 1 coluna no mobile, 2 no tablet
- [ ] Fontes: reduzir hero para 40–48px no mobile
- [ ] WhatsApp button: sempre visível
- [ ] Formulário: campos full-width
- [ ] Imagens: `object-fit: cover` em containers fixos
- [ ] Tap targets: mínimo 44x44px
- [ ] Sem hover-only interactions (usar :focus-within como fallback)

---

## 10. CONTEÚDO — COPY GUIDE

### Tom de Voz
- **Humano, não técnico:** "Cuidamos do seu sorriso" > "Realizamos procedimentos odontológicos"
- **Confiante, não arrogante:** "Mais de 10 anos de experiência" > "Os melhores dentistas"
- **Acolhedor:** Use "você", nunca "o/a paciente"
- **Claro e direto:** Frases curtas. Parágrafos de no máximo 3 linhas.

### Headlines que Funcionam
```
✅ "Seu sorriso merece o melhor cuidado."
✅ "Odontologia que você não tem medo."
✅ "Tecnologia laser. Resultado que você vê."
✅ "Do check-up ao implante. Tudo em um lugar."
❌ "Bem-vindo à nossa clínica odontológica!"
❌ "Somos especialistas em saúde bucal."
```

### CTAs que Convertem
```
✅ "Agende sua consulta agora"
✅ "Quero meu orçamento gratuito"
✅ "Falar com especialista"
❌ "Clique aqui"
❌ "Saiba mais"
❌ "Enviar"
```

---

## 11. TRATAMENTOS TÍPICOS PARA MAPEAR (Laserdent)

Crie páginas ou seções individuais para cada:
- Clareamento a laser
- Implantes dentários
- Ortodontia (aparelho e invisalign)
- Próteses dentárias
- Lentes de contato dental / Facetas
- Tratamento de canal
- Periodontia (gengiva)
- Odontopediatria
- Cirurgia oral
- Harmonização orofacial

---

## 12. ERROS COMUNS A EVITAR

| Erro | Por quê evita | O que fazer |
|------|--------------|-------------|
| Stock photos genéricas | Quebra confiança | Fotos reais da clínica e equipe |
| Cores muito saturadas | Parecem amadores | Paleta neutra + 1 acento |
| Menu com 10+ itens | Sobrecarga cognitiva | Máx. 5 itens no nav |
| Texto em parágrafos enormes | Ninguém lê | Quebrar em tópicos curtos |
| Sem CTA acima do fold | Perde conversão | CTA visível sem rolar |
| Velocidade lenta | Google penaliza | Otimizar imagens e JS |
| Sem SSL (https) | Quebra confiança | Certificado obrigatório |
| Sem versão mobile | 70%+ do tráfego é mobile | Mobile first sempre |
| Formulário com muitos campos | Abandono | Máx. 4–5 campos |
| Sem Google Meu Negócio vinculado | Perde SEO local | Vincular e manter atualizado |

---

## 13. CHECKLIST DE ENTREGA FINAL

### Design
- [ ] Paleta de cores definida e aplicada consistentemente
- [ ] Tipografia: máx. 2 famílias, hierarquia clara
- [ ] Responsive: mobile, tablet, desktop testados
- [ ] Animações: sutis e funcionais
- [ ] Dark mode: opcional, mas definir se vai ter

### Conteúdo
- [ ] Todas as seções da home preenchidas com copy real
- [ ] Fotos da clínica e equipe (não stock)
- [ ] Depoimentos reais com nome e foto
- [ ] Galeria antes/depois com consentimento

### Técnico
- [ ] SSL ativo (https)
- [ ] Schema markup implementado
- [ ] Meta tags completas (title, description, OG)
- [ ] Google Analytics / Tag Manager instalado
- [ ] Google Search Console verificado
- [ ] Sitemap.xml gerado e enviado
- [ ] robots.txt configurado
- [ ] Formulário testado (envio de e-mail/WhatsApp)
- [ ] WhatsApp button funcional
- [ ] Google Maps integrado
- [ ] PageSpeed Insights: acima de 80 (mobile)

### SEO Local
- [ ] Google Meu Negócio atualizado e vinculado
- [ ] NAP consistente (Nome, Endereço, Telefone) em todo o site
- [ ] Página de cada tratamento com texto otimizado para busca local

---

## 14. REFERÊNCIAS DE DESIGN PARA INSPIRAÇÃO

Sites internacionais de alto padrão (estudar estrutura e estética, não copiar):
- **Maison Dental** — monochrome, tipografia elegante
- **Zen Dental Studio** — minimalismo zen, muito espaço em branco
- **Arbor Dental** — dark palette, refinado
- **The Tooth Co** — clean, bold typography, usabilidade
- **Surrey Docks Dental** — menos é mais, sophísticado

> Referência visual principal para Laserdent: **clinica boutique de luxo discreto** — não precisa gritar "odontologia", precisa transmitir confiança e qualidade silenciosa.

---

*SKILL criada para Antigravity | Morphix — Uso exclusivo do projeto Laserdent*
*Versão 1.0 — Março 2026*
