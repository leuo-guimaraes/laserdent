(() => {
    if (window.laserdentAnalyticsReady) return;
    window.laserdentAnalyticsReady = true;

    const measurementId = 'G-FKD90KENST';
    const preferenceKey = 'laserdent_analytics_consent_v1';
    const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
    let started = false;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/analytics-consent.css';
    document.head.append(stylesheet);

    const banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.setAttribute('aria-label', 'Preferências de cookies');
    banner.innerHTML = `<div><strong>Podemos medir os acessos ao site?</strong>
        <p>Com sua autorização, usamos o Google Analytics para entender as visitas e melhorar o site.
        Você pode rever sua escolha a qualquer momento. <a href="/cookies">Política de cookies</a></p></div>
        <div class="analytics-consent-actions"><button type="button" data-choice="denied">Recusar Analytics</button>
        <button type="button" data-choice="granted">Aceitar Analytics</button></div>`;
    document.body.append(banner);

    const preferences = document.createElement('button');
    preferences.type = 'button';
    preferences.className = 'analytics-preferences';
    preferences.textContent = 'Preferências de cookies';
    preferences.addEventListener('click', () => {
        banner.hidden = false;
        banner.querySelector('button').focus();
    });
    document.body.append(preferences);

    function readPreference() {
        try {
            const saved = JSON.parse(localStorage.getItem(preferenceKey));
            if (saved && ['granted', 'denied'].includes(saved.choice) && saved.expires > Date.now()) return saved.choice;
        } catch { /* Storage can be unavailable in private browsing. */ }
        return null;
    }

    function cleanUrl(raw) {
        try {
            const url = new URL(raw);
            return url.origin + url.pathname;
        } catch { return ''; }
    }

    function startAnalytics() {
        window[`ga-disable-${measurementId}`] = false;
        if (started) {
            window.gtag('consent', 'update', { analytics_storage: 'granted' });
            return;
        }
        started = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('consent', 'default', {
            analytics_storage: 'denied', ad_storage: 'denied',
            ad_user_data: 'denied', ad_personalization: 'denied',
        });
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
            send_page_view: false,
            page_location: cleanUrl(location.href),
            page_referrer: cleanUrl(document.referrer),
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
        });
        window.gtag('event', 'page_view', {
            send_to: measurementId,
            page_location: cleanUrl(location.href),
            page_referrer: cleanUrl(document.referrer),
            page_title: document.title,
        });
        const tag = document.createElement('script');
        tag.async = true;
        tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.append(tag);
    }

    function clearAnalyticsCookies() {
        const hostname = location.hostname;
        const parts = hostname.split('.');
        const domains = [null, hostname];
        for (let index = 0; index < parts.length - 1; index++) domains.push(`.${parts.slice(index).join('.')}`);
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.trim().split('=')[0];
            if (!/^_ga(?:_|$)/.test(name)) return;
            domains.forEach(domain => {
                document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax`;
            });
        });
    }

    function choose(choice) {
        try {
            localStorage.setItem(preferenceKey, JSON.stringify({ choice, expires: Date.now() + preferenceLifetime }));
        } catch { /* The choice still applies to this page when storage is blocked. */ }
        banner.hidden = true;
        if (choice === 'granted') startAnalytics();
        else {
            window[`ga-disable-${measurementId}`] = true;
            if (started) window.gtag('consent', 'update', { analytics_storage: 'denied' });
            clearAnalyticsCookies();
        }
        preferences.focus({ preventScroll: true });
    }

    banner.querySelectorAll('[data-choice]').forEach(button => {
        button.addEventListener('click', () => choose(button.dataset.choice));
    });
    window.addEventListener('storage', event => {
        if (event.key !== preferenceKey && event.key !== null) return;
        const choice = readPreference();
        if (choice === 'granted') startAnalytics();
        else {
            window[`ga-disable-${measurementId}`] = true;
            if (started) window.gtag('consent', 'update', { analytics_storage: 'denied' });
            clearAnalyticsCookies();
        }
        banner.hidden = choice !== null;
    });
    const choice = readPreference();
    banner.hidden = choice !== null;
    if (choice === 'granted') startAnalytics();
})();
