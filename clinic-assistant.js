(() => {
    if (document.getElementById('clinic-assistant')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/clinic-assistant.css';
    document.head.append(stylesheet);

    const root = document.createElement('div');
    root.id = 'clinic-assistant';
    root.innerHTML = `
        <p class="clinic-assistant-greeting" role="status">Olá! Sou a Sol, assistente de IA da Laserdent.</p>
        <button class="clinic-assistant-launcher" type="button" aria-label="Conversar com Sol, assistente de IA da Laserdent" aria-controls="clinic-assistant-panel" aria-expanded="false"><img src="/Fotos/sol-ola.png" alt="" width="96" height="96"></button>
        <section class="clinic-assistant-panel" id="clinic-assistant-panel" aria-label="Atendimento virtual da Laserdent" hidden>
            <header><div><strong>Sol · Laserdent</strong><small>Assistente de IA</small></div><button type="button" data-action="close" aria-label="Fechar atendimento">×</button></header>
            <div class="clinic-assistant-start"><p>Olá, sou a Sol! ☀️ Estou aqui para tirar suas dúvidas sobre a Laserdent, apresentar nossos dentistas e explicar os procedimentos em termos gerais. Quer agendar? Eu ajudo você a falar com a recepção pelo WhatsApp.</p>
                <p>Para cuidar da sua privacidade, faça perguntas gerais e evite compartilhar dados pessoais, sintomas ou exames.</p>
                <p>Ao iniciar nosso chat, essas mensagens ficarão disponíveis enquanto esta página estiver aberta.</p>
                <a href="/privacidade" target="_blank" rel="noopener">Política de privacidade</a>
                <button type="button" data-action="start">Concordo e iniciar</button></div>
            <div class="clinic-assistant-conversation" hidden>
                <p class="clinic-assistant-scope">Informações gerais. Avaliação clínica e medicamentos precisam de orientação do dentista.</p>
                <div class="clinic-assistant-messages" role="log" aria-label="Conversa" aria-live="polite"></div>
                <div class="clinic-assistant-questions"><button type="button" data-question="Quais procedimentos vocês oferecem?">Procedimentos</button><button type="button" data-question="Quem são os dentistas?">Dentistas</button><button type="button" data-question="Gostaria de agendar uma consulta">Agendar</button></div>
                <form><label for="clinic-assistant-question">Sua pergunta</label><div class="clinic-assistant-input"><input id="clinic-assistant-question" maxlength="600" autocomplete="off" placeholder="Ex.: quem atende na clínica?" required><button type="submit">Enviar</button></div></form>
                <button class="clinic-assistant-clear" type="button" data-action="clear">Limpar conversa</button>
            </div>
            <a class="clinic-assistant-whatsapp" href="https://wa.me/5541992513035?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Laserdent." target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp ↗</a>
        </section>`;
    document.body.append(root);
    document.querySelectorAll('.whatsapp-float').forEach(link => { link.hidden = true; link.style.display = 'none'; });

    const launcher = root.querySelector('.clinic-assistant-launcher');
    const greeting = root.querySelector('.clinic-assistant-greeting');
    let greetingTimer;
    function dismissGreeting() {
        clearTimeout(greetingTimer);
        greeting.hidden = true;
    }
    function scheduleGreeting() {
        if (!greeting.hidden) greetingTimer = setTimeout(dismissGreeting, 10000);
    }
    const avatar = launcher.querySelector('img');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateAvatarMotion = () => {
        avatar.src = reducedMotion.matches ? '/Fotos/sol-ola.png' : '/Fotos/sol-acenando.gif';
    };
    updateAvatarMotion();
    reducedMotion.addEventListener('change', updateAvatarMotion);
    if (avatar.complete) scheduleGreeting();
    else {
        avatar.addEventListener('load', scheduleGreeting, { once: true });
        avatar.addEventListener('error', scheduleGreeting, { once: true });
    }
    const panel = root.querySelector('.clinic-assistant-panel');
    const messages = root.querySelector('.clinic-assistant-messages');
    const input = root.querySelector('input');
    const send = root.querySelector('button[type="submit"]');
    let authorized = false;
    let busy = false;
    let previousTopic = '';
    let controller;
    let generation = 0;

    function addMessage(text, author) {
        const item = document.createElement('p');
        item.className = `clinic-assistant-message clinic-assistant-message-${author}`;
        item.textContent = text;
        messages.append(item);
        messages.scrollTop = messages.scrollHeight;
        while (messages.children.length > 24) messages.firstElementChild.remove();
    }

    function close() {
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        launcher.focus();
    }
    launcher.addEventListener('click', () => {
        dismissGreeting();
        if (!panel.hidden) { close(); return; }
        panel.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        (authorized ? input : root.querySelector('[data-action="start"]')).focus();
    });
    root.querySelector('[data-action="close"]').addEventListener('click', close);
    root.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    root.querySelector('[data-action="start"]').addEventListener('click', () => {
        authorized = true;
        root.querySelector('.clinic-assistant-start').hidden = true;
        root.querySelector('.clinic-assistant-conversation').hidden = false;
        addMessage('Como posso ajudar? Você pode perguntar sobre a equipe, os procedimentos ou o endereço.', 'bot');
        input.focus();
    });

    async function ask(question) {
        if (!authorized || busy || !question.trim()) return;
        busy = true;
        const current = generation;
        send.disabled = true;
        send.textContent = 'Aguarde…';
        messages.setAttribute('aria-busy', 'true');
        input.value = '';
        addMessage(question, 'visitor');
        controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 18000);
        try {
            const response = await fetch('/api/clinic-assistant', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
                body: JSON.stringify({ message: question, consent: authorized, previousTopic }),
            });
            const result = await response.json();
            if (current !== generation) return;
            if (!response.ok) throw new Error(result.error || 'Não foi possível responder agora.');
            previousTopic = result.topic;
            addMessage(result.reply, 'bot');
            if (result.mode === 'informacoes') addMessage('Estou usando as informações da clínica. Para confirmar detalhes, fale com a recepção.', 'notice');
        } catch (error) {
            if (current === generation) addMessage(error.name === 'AbortError' ? 'O atendimento demorou para responder. Tente novamente ou fale com a recepção pelo WhatsApp.' : 'Não consegui responder agora. Tente novamente ou fale com a recepção pelo WhatsApp.', 'notice');
        } finally {
            clearTimeout(timer);
            if (current === generation) {
                busy = false;
                send.disabled = false;
                send.textContent = 'Enviar';
                messages.setAttribute('aria-busy', 'false');
            }
        }
    }
    root.querySelector('form').addEventListener('submit', event => { event.preventDefault(); ask(input.value.trim()); });
    root.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => ask(button.dataset.question)));
    root.querySelector('[data-action="clear"]').addEventListener('click', () => {
        generation++;
        controller?.abort();
        busy = false;
        send.disabled = false;
        send.textContent = 'Enviar';
        messages.setAttribute('aria-busy', 'false');
        previousTopic = '';
        input.value = '';
        messages.replaceChildren();
        addMessage('Conversa limpa. Envie uma pergunta geral ou fale com a recepção pelo WhatsApp.', 'bot');
    });
})();
