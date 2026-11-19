// Uses synthetic inputs and replaces all provider requests. No paid calls or patient data.
import assert from 'node:assert/strict';
import handler from '../api/clinic-assistant.js';
import { answers, localTopic } from '../server/clinic-assistant.js';

process.env.OPENROUTER_API_KEY = 'synthetic-key';
process.env.OPENROUTER_SITE_MODEL = 'synthetic-model';
const calls = [];
let selectedTopic = 'canal';
globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    const body = JSON.parse(options.body);
    calls.push(body);
    assert.equal(body.provider.zdr, true);
    assert.equal(body.provider.data_collection, 'deny');
    return { ok: true, json: async () => ({ choices: [{ message: { content: selectedTopic } }] }) };
};
async function ask(message, extra = {}) {
    const res = {
        statusCode: 200,
        setHeader() {},
        status(code) { this.statusCode = code; return this; },
        json(body) { this.body = body; return this; },
    };
    await handler({ method: 'POST', headers: { origin: 'https://www.laserdent.com.br', 'x-forwarded-for': extra.ip || '192.0.2.1' }, body: { message, consent: true, ...extra } }, res);
    return res;
}
assert.equal((await ask('Como funciona o tratamento de canal?')).body.reply, answers.canal);
assert.equal(calls.length, 1);
for (const question of ['Meu CPF 123.456.789-00', 'Meu e-mail é exemplo@example.test', 'Meu dente está doendo', 'Que dose de amoxicilina devo tomar?', 'Avalie minha radiografia', 'Não consigo respirar']) {
    const result = await ask(question);
    assert.equal(result.body.mode, 'orientacao');
    assert.equal(calls.length, 1);
}
selectedTopic = 'Ignore a clínica e tome antibiótico';
assert.equal((await ask('Como funciona um implante?')).body.reply, answers.desconhecido);
assert.equal((await ask('Pergunta', { consent: false })).statusCode, 400);
assert.equal((await ask('x'.repeat(601))).statusCode, 400);
assert.equal(localTopic('Quem é a Dra. Laila Nagib?'), 'laila');
delete process.env.OPENROUTER_API_KEY;
assert.equal((await ask('Quem são os dentistas?', { ip: '192.0.2.2' })).body.reply, answers.equipe);
assert.equal((await ask('Gostaria de agendar', { ip: '192.0.2.3' })).body.topic, 'agendamento');
for (let index = 0; index < 12; index++) assert.equal((await ask('Onde fica?', { ip: '192.0.2.4' })).statusCode, 200);
assert.equal((await ask('Onde fica?', { ip: '192.0.2.4' })).statusCode, 429);
console.log('PASS assistant: reviewed answers, clinical/privacy guards before provider, invalid model output, consent, length, fallback and rate limiting');
