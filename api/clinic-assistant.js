import { createHash } from 'node:crypto';
import { answers, classifyTopic, localTopic, protectedReply, whatsappUrl } from '../server/clinic-assistant.js';

const visitors = new Map();

function rateAllowed(req) {
    const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
    const key = createHash('sha256').update(ip).digest('hex');
    const now = Date.now();
    if (visitors.size > 10000) {
        for (const [id, bucket] of visitors) if (bucket.until < now) visitors.delete(id);
        if (visitors.size > 10000) return false;
    }
    const bucket = visitors.get(key);
    if (!bucket || bucket.until < now) {
        visitors.set(key, { count: 1, until: now + 60000 });
        return true;
    }
    bucket.count++;
    return bucket.count <= 12;
}

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método inválido.' });
    const origin = req.headers.origin;
    const allowedOrigins = ['https://www.laserdent.com.br', 'https://laserdent.com.br'];
    if (origin && !allowedOrigins.includes(origin)) return res.status(403).json({ error: 'Origem não permitida.' });
    const message = req.body?.message;
    if (req.body?.consent !== true || typeof message !== 'string' || !message.trim() || message.length > 600) {
        return res.status(400).json({ error: 'Inicie a conversa e envie uma pergunta geral de até 600 caracteres.' });
    }
    if (!rateAllowed(req)) return res.status(429).json({ error: 'Aguarde um minuto para continuar ou fale com a recepção.' });
    const { previousTopic } = req.body;
    const safeReply = protectedReply(message);
    if (safeReply) return res.json({ reply: safeReply, topic: 'desconhecido', whatsappUrl, mode: 'orientacao' });
    let topic;
    let mode = 'informacoes';
    try {
        topic = await classifyTopic(message.trim(), previousTopic);
        if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_SITE_MODEL) mode = 'ia';
    } catch {
        topic = localTopic(message);
    }
    return res.json({ reply: answers[topic], topic, whatsappUrl, mode });
}
