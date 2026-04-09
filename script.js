/* ═══════════════════════════════════════════════════════════
   CLÍNICA LASERDENT — INTERACTIVE SCRIPTS
   Scroll reveal, chatbot, carousel, lightbox, hero particles
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── HEADER SCROLL EFFECT ──
    const header = document.getElementById('header');
    const handleScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    // ── HERO SLIDESHOW ──
    const heroSlides = document.querySelectorAll('.hero__slide');
    if (heroSlides.length > 1) {
        let currentHeroSlide = 0;
        setInterval(() => {
            heroSlides[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            heroSlides[currentHeroSlide].classList.add('active');
        }, 5000);
    }


    // ── MOBILE MENU TOGGLE ──
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ── ACTIVE NAV LINK HIGHLIGHTING ──
    // Desativado: As classes 'active' agora são inseridas diretamente no HTML via rotas
    // (index.html, sobre.html, tratamentos.html, tecnologia.html) para não conflitar com a navegação multi-page.


    // ── SCROLL REVEAL ANIMATIONS ──
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // ── HERO COUNTER ANIMATION ──
    const counters = document.querySelectorAll('.hero__stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.round(target * eased).toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }


    // ── HERO CANVAS PARTICLE EFFECT ──
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.color = Math.random() > 0.7 ? '#E53935' : '#4AADCC';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initParticles() {
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
        particles = Array.from({ length: count }, () => new Particle());
    }
    initParticles();

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(74, 173, 204, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animationId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Pause particles when not visible
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (!animationId) animateParticles();
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
        heroObserver.observe(heroSection);
    }


    // ── TESTIMONIALS — DYNAMIC RENDERING ──
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const carouselEl = document.querySelector('.testimonials__carousel');

    if (track && dotsContainer && prevBtn && nextBtn && carouselEl) {
        // Google Reviews Reais Extraídas da Laserdent São José dos Pinhais
        const defaultTestimonials = [
            {
                name: "Bruna Silva",
                role: "Paciente de Odontopediatria",
                text: "Um consultório muito humano, com uma equipe espetacular e ótimos profissionais! A Dra Jamile foi super atenciosa com meu filho, passando confiança tanto pra nós pais como pro meu filho! Recomendo 100%.",
                stars: 5
            },
            {
                name: "Lucas Telles",
                role: "Paciente de Tratamento a Laser",
                text: "Melhor tratamento odontológico que já fiz. Fiquei muito confortável e sem dor, além do Dr. Edson explicar tudo pacientemente. O laser é inovador, de alta eficiência, rápido e não agride tanto como brocas normais.",
                stars: 5
            },
            {
                name: "Fernanda Miqueloti",
                role: "Paciente de Endodontia",
                text: "Atendimento de ponta! A Dra. Claudia foi excepcional no meu tratamento de canal. Fiquei impressionada com o foco no cuidado integrativo, uso de Laser e a paciência para me tranquilizar. Indico com segurança.",
                stars: 5
            },
            {
                name: "Mariana Costa",
                role: "Paciente de Odontologia Biológica",
                text: "Ambiente impecável, super limpo e aconchegante. Realizei toda a minha reabilitação focada numa odontologia biológica e recomendo a todos que procuram saúde real, não só estética. Doutores fantásticos!",
                stars: 5
            }
        ];

        function getApprovedTestimonials() {
            try {
                const all = JSON.parse(localStorage.getItem('laserdent_testimonials') || '[]');
                return all.filter(t => t.status === 'approved');
            } catch { return []; }
        }

        function renderTestimonials() {
            const approved = getApprovedTestimonials();
            const allTestimonials = [...defaultTestimonials, ...approved];

            track.innerHTML = '';
            dotsContainer.innerHTML = '';

            allTestimonials.forEach((t, i) => {
                const initials = t.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                const stars = '★'.repeat(t.stars || 5);
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="testimonial-card__stars">${stars}</div>
                    <p class="testimonial-card__text">${t.text}</p>
                    <div class="testimonial-card__author">
                        <div class="testimonial-card__avatar">${initials}</div>
                        <div><strong>${t.name}</strong></div>
                    </div>
                `;
                track.appendChild(card);

                const dot = document.createElement('button');
                dot.classList.add('testimonials__dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });

            return allTestimonials.length;
        }

        let currentSlide = 0;
        let totalSlides = renderTestimonials();

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        });

        // Auto-advance testimonials
        let autoSlide = setInterval(() => {
            goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        }, 6000);

        carouselEl.addEventListener('mouseenter', () => clearInterval(autoSlide));
        carouselEl.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
            }, 6000);
        });
    }


    // ── TESTIMONIAL MODAL ──
    const testimonialModalOverlay = document.getElementById('testimonialModalOverlay');
    const openModalBtn = document.getElementById('openTestimonialModal');
    const closeModalBtn = document.getElementById('closeTestimonialModal');
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialSuccess = document.getElementById('testimonialSuccess');

    if (testimonialModalOverlay && openModalBtn && closeModalBtn && testimonialForm && testimonialSuccess) {
        openModalBtn.addEventListener('click', () => {
            testimonialModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeTestimonialModal() {
            testimonialModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeModalBtn.addEventListener('click', closeTestimonialModal);
        testimonialModalOverlay.addEventListener('click', (e) => {
            if (e.target === testimonialModalOverlay) closeTestimonialModal();
        });

        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('testimonialName').value.trim();
            const email = document.getElementById('testimonialEmail').value.trim();
            const text = document.getElementById('testimonialText').value.trim();

            if (!name || !email || !text) return;

            // Save to localStorage as pending
            const testimonials = JSON.parse(localStorage.getItem('laserdent_testimonials') || '[]');
            testimonials.push({
                id: Date.now(),
                name,
                email,
                text: `"${text}"`,
                stars: 5,
                status: 'pending',
                date: new Date().toISOString()
            });
            localStorage.setItem('laserdent_testimonials', JSON.stringify(testimonials));

            // Show success
            testimonialForm.style.display = 'none';
            testimonialSuccess.classList.add('active');

            setTimeout(() => {
                closeTestimonialModal();
                testimonialForm.style.display = '';
                testimonialForm.reset();
                testimonialSuccess.classList.remove('active');
            }, 3000);
        });
    }


    // ── LIGHTBOX ──
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    // Include both tech cards and gallery items
    const lightboxItems = document.querySelectorAll('[data-lightbox]');

    lightboxItems.forEach(item => {
        item.addEventListener('click', () => {
            lightboxImg.src = item.dataset.lightbox;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });



    // ── CONTACT FORM ──
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('formSubmitBtn');

    // Phone mask
    const phoneInput = document.getElementById('formPhone');
    phoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
            v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
            v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
            v = `(${v}`;
        }
        e.target.value = v;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const phone = document.getElementById('formPhone').value.trim();
        const treatment = document.getElementById('formTreatment').value;

        if (!name || !email || !phone || !treatment) return;

        // Animate button
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20" />
            </svg>
            Enviando...
        `;
        submitBtn.disabled = true;

        // Simulate sending (replace with EmailJS in production)
        setTimeout(() => {
            form.style.display = 'none';
            formSuccess.classList.add('active');
        }, 1500);
    });


    // ── AI CHATBOT ──
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotMinimize = document.getElementById('chatbotMinimize');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const quickBtns = document.querySelectorAll('.chatbot__quick-btn');
    let chatStarted = false;

    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('active');
        if (!chatStarted) {
            chatStarted = true;
            addBotMessage('Olá! 👋 Sou o assistente virtual da Clínica LASERdent. Como posso ajudar você hoje?');
        }
        if (chatbot.classList.contains('active')) {
            setTimeout(() => chatbotInput.focus(), 400);
        }
    });

    chatbotMinimize.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const msg = chatbotInput.value.trim();
        if (!msg) return;
        addUserMessage(msg);
        chatbotInput.value = '';
        showTyping();
        setTimeout(() => {
            removeTyping();
            const reply = getBotReply(msg);
            addBotMessage(reply);
        }, 800 + Math.random() * 800);
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const msg = btn.dataset.message;
            addUserMessage(msg);
            showTyping();
            setTimeout(() => {
                removeTyping();
                addBotMessage(getBotReply(msg));
            }, 800 + Math.random() * 600);
        });
    });

    function addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-message chat-message--bot';
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-message chat-message--user';
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'chat-message chat-message--bot chat-message--typing';
        div.id = 'typingIndicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function getBotReply(message) {
        const msg = message.toLowerCase();

        // Scheduling / appointments
        if (msg.includes('agendar') || msg.includes('consulta') || msg.includes('marcar') || msg.includes('horário disponível')) {
            return 'Para agendar sua consulta, você pode ligar para (41) 3282-3035 ou preencher o formulário na seção de contato! Temos horários disponíveis de segunda a sexta, das 09:00 às 18:00, e sábados das 8h às 12h. 📅';
        }

        // Treatments
        if (msg.includes('tratamento') || msg.includes('serviço') || msg.includes('oferecem') || msg.includes('procedimento')) {
            return 'Oferecemos: ✨ Laserterapia, 🦷 Implantes Dentários, 🫧 Ozonioterapia, 💎 Estética Dental (clareamento, facetas), 👶 Odontopediatria e 🌿 Odontologia Biológica. Qual tratamento te interessa?';
        }

        // Hours
        if (msg.includes('horário') || msg.includes('funcionamento') || msg.includes('abre') || msg.includes('fecha') || msg.includes('hora')) {
            return 'Nosso horário de funcionamento: 🕐 Segunda a Sexta: 09:00 às 18:00 | Sábado: Fechado | Domingo: Fechado.';
        }

        // Location
        if (msg.includes('endereço') || msg.includes('localização') || msg.includes('onde fica') || msg.includes('mapa') || msg.includes('como chegar')) {
            return 'Estamos localizados em São José dos Pinhais, Paraná. Você pode ver nosso mapa na seção "Localização" abaixo! Temos estacionamento próprio. 📍';
        }

        // Prices
        if (msg.includes('preço') || msg.includes('valor') || msg.includes('custo') || msg.includes('quanto custa') || msg.includes('orçamento')) {
            return 'Os valores variam conforme o tratamento. Para um orçamento personalizado e sem compromisso, preencha nosso formulário na seção "Contato" ou ligue para (41) 3282-3035. 💰';
        }

        // Laser
        if (msg.includes('laser')) {
            return 'A laserterapia é uma das nossas especialidades! Utilizamos lasers de alta e baixa potência para procedimentos minimamente invasivos, com menos dor e recuperação mais rápida. Quer saber mais? 💡';
        }

        // Ozone
        if (msg.includes('ozônio') || msg.includes('ozonioterapia') || msg.includes('ozonio')) {
            return 'A ozonioterapia é uma terapia complementar incrível! Usamos ozônio para esterilização, regeneração tecidual e tratamento de infecções de forma natural e eficaz, com o equipamento Philozon. 🫧';
        }

        // Implants
        if (msg.includes('implante')) {
            return 'Realizamos implantes dentários com planejamento digital e tecnologia de piezocirurgia (W&H Piezomed) para máxima precisão e conforto. Os resultados são duradouros e naturais! 🦷';
        }

        // Children
        if (msg.includes('criança') || msg.includes('infantil') || msg.includes('bebê') || msg.includes('pediatria') || msg.includes('filho') || msg.includes('filha')) {
            return 'Temos a Laser Dent Kids! 👶 Crianças e adolescentes, em um ambiente lúdico pensado para transformar o dentista em um lugar de alegria.';
        }

        // WhatsApp
        if (msg.includes('whatsapp') || msg.includes('zap')) {
            return 'Você pode nos chamar no WhatsApp: (41) 99251-3035. Estamos prontos para atender! 📱';
        }

        // Insurance / plans
        if (msg.includes('convênio') || msg.includes('plano') || msg.includes('seguro')) {
            return 'Trabalhamos com diversos convênios e planos odontológicos. Entre em contato pelo telefone (41) 3282-3035 para verificar se seu plano é aceito. 📋';
        }

        // Greetings
        if (msg.includes('olá') || msg.includes('oi') || msg.includes('bom dia') || msg.includes('boa tarde') || msg.includes('boa noite') || msg.includes('hello') || msg.includes('hi')) {
            return 'Olá! 😊 Que bom ter você aqui! Como posso te ajudar? Posso falar sobre nossos tratamentos, horários, localização ou ajudar a agendar uma consulta.';
        }

        // Thanks
        if (msg.includes('obrigado') || msg.includes('obrigada') || msg.includes('valeu') || msg.includes('agradeço')) {
            return 'Disponha! 😊 Se precisar de qualquer coisa, estou aqui 24/7. A Clínica LASERdent está sempre à disposição!';
        }

        // Default
        return 'Obrigado pela sua mensagem! Para um atendimento mais detalhado, recomendo entrar em contato pelo telefone (41) 3282-3035 ou preencher o formulário de orçamento. Posso ajudar com informações sobre tratamentos, horários ou agendamento! 😊';
    }



    // ── FADING HERO TEXT ──
    const fadingText = document.getElementById('fadingText');
    if (fadingText) {
        const words = ['Laserterapia', 'Ozonioterapia'];
        let wordIdx = 0;
        setInterval(() => {
            fadingText.style.opacity = '0';
            setTimeout(() => {
                wordIdx = (wordIdx + 1) % words.length;
                fadingText.textContent = words[wordIdx];
                fadingText.style.opacity = '1';
            }, 500);
        }, 3000);
    }

    // ── SMOOTH SCROLL (POLYFILL) ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if(anchor.getAttribute('href') === '#') return;
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // ── TREATMENT ACCORDIONS ──
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const content = otherItem.querySelector('.accordion-content');
                    if (content) content.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                // We use scrollHeight to get the exact height for the animation
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    // ── FLIP CARDS (MOBILE INTERACTION) ──
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            // No mobile, remove a classe active dos outros cards para focar em um
            flipCards.forEach(other => {
                if (other !== card) other.classList.remove('active');
            });
            card.classList.toggle('active');
        });
    });

});
