import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contact = '<a href="mailto:laserdentodontologia@gmail.com">laserdentodontologia@gmail.com</a>';
const pages = [
  ['privacidade', 'Política de Privacidade', 'Como a LASERdent trata dados do site e das integrações de redes sociais.', `
    <p>Esta política explica o tratamento de dados no site www.laserdent.com.br e nas funcionalidades de marketing do sistema Laserdent. Última atualização: <time datetime="2026-11-09">9 de novembro de 2026</time>.</p>
    <h2>1. Quem é responsável</h2>
    <p>A Clínica LASERdent, na Rua Tenente Djalma Dutra, 576, Centro, São José dos Pinhais, PR, é responsável pelas finalidades de uso dos dados coletados nestes canais. Para assuntos de privacidade, entre em contato pelo e-mail ${contact} ou pelo telefone <a href="tel:+554132823035">(41) 3282-3035</a>.</p>
    <h2>2. Quais dados são tratados</h2>
    <ul><li><strong>Solicitações de contato:</strong> nome, e-mail, telefone, tratamento de interesse e mensagem enviados no formulário.</li>
    <li><strong>Depoimentos:</strong> nome, e-mail, avaliação em estrelas, relato, data e situação de aprovação. Quando autorizado e aprovado, nome, relato e avaliação podem ser publicados; o e-mail não é exibido publicamente.</li>
    <li><strong>Navegação:</strong> informações técnicas necessárias à entrega e proteção do site, como endereço IP e registros de requisições processados pela infraestrutura. Parâmetros de campanha podem identificar a origem do contato.</li>
    <li><strong>Integração com a Meta:</strong> quando um administrador autoriza a conexão, o sistema trata a identificação da conta profissional, nome de usuário, autorização de acesso e os conteúdos e informações técnicas necessários à publicação e acompanhamento das postagens.</li></ul>
    <p>Evite enviar exames, documentos ou detalhes de saúde nos campos livres do site. Os formulários de contato não substituem o prontuário nem a avaliação profissional. O tratamento de dados clínicos exige informações e medidas próprias do atendimento.</p>
    <h2>3. Para que usamos os dados</h2>
    <p>Usamos os dados para responder às solicitações, organizar contatos e agendamentos, moderar depoimentos, identificar a origem de contatos e operar os recursos autorizados de marketing. A conexão com Instagram permite preparar e publicar conteúdo aprovado pela equipe, dentro das permissões concedidas.</p>
    <p>O tratamento deve observar a base legal adequada à finalidade: consentimento, quando solicitado; procedimentos relacionados a uma contratação a pedido do titular; cumprimento de obrigações legais; e legítimo interesse para finalidades compatíveis, mediante avaliação dos direitos dos titulares. Quando houver dados sensíveis, aplicam-se as hipóteses e os cuidados específicos previstos na LGPD.</p>
    <h2>4. Serviços utilizados e compartilhamento</h2>
    <p>O site utiliza Vercel para hospedagem e Supabase para armazenamento e processamento de formulários e depoimentos. A equipe autorizada e os prestadores que dão suporte à operação podem acessar dados necessários às suas atividades. Integrações com Meta, ferramentas de IA e seus provedores processam os dados necessários às funcionalidades utilizadas. Recursos de Google Maps, fontes do Google e bibliotecas distribuídas por CDN podem receber informações técnicas quando carregados.</p>
    <p>Ao abrir WhatsApp, Instagram ou outros links externos, também se aplicam as políticas desses serviços. Alguns fornecedores podem processar dados fora do Brasil; o uso desses serviços deve observar os mecanismos de transferência internacional e as demais exigências aplicáveis.</p>
    <h2>5. Acesso ao Instagram e segurança</h2>
    <p>A autorização ocorre nas páginas da Meta. A ferramenta não solicita a senha do Instagram nos seus formulários. A autorização da integração é armazenada de forma criptografada no servidor, com acesso restrito. A revogação pode ser feita nas configurações de integrações da Meta; solicitações à clínica também podem ser feitas pelo canal de privacidade.</p>
    <p>São utilizadas medidas como conexão HTTPS e restrições de acesso. Essas medidas reduzem riscos, mas nenhum sistema elimina todos os riscos de segurança.</p>
    <h2>6. Por quanto tempo os dados são mantidos</h2>
    <p>A conservação considera a finalidade da coleta, a necessidade de responder ao contato e prestar atendimento, as autorizações concedidas e as obrigações legais ou de exercício de direitos. Pedidos de exclusão são avaliados conforme esses critérios. Dados que precisem ser conservados por obrigação legal não serão apagados apenas pela desconexão de uma rede social.</p>
    <h2>7. Seus direitos e como exercê-los</h2>
    <p>Você pode solicitar confirmação de tratamento, acesso, correção, informações sobre compartilhamento, revogação de consentimento e, nas hipóteses aplicáveis, anonimização, bloqueio, eliminação ou portabilidade. Também pode se opor a tratamento irregular e apresentar uma petição à ANPD.</p>
    <p>Envie sua solicitação para ${contact}. Podemos pedir informações proporcionais para confirmar sua identidade e evitar a divulgação de dados a terceiros. Não envie senhas ou tokens. Veja o passo a passo em <a href="/exclusao-de-dados">Exclusão de dados</a>.</p>
    <h2>8. Cookies e alterações nesta política</h2>
    <p>Consulte a <a href="/cookies">Política de Cookies</a> para entender o armazenamento no navegador e os recursos externos. Esta política poderá ser atualizada quando o funcionamento dos canais mudar; a data no início identifica a versão publicada.</p>`],
  ['cookies', 'Política de Cookies', 'Entenda o uso de armazenamento no navegador e de recursos externos no site LASERdent.', `
    <p>Última atualização: <time datetime="2026-11-09">9 de novembro de 2026</time>. Esta página descreve cookies e tecnologias semelhantes no site da LASERdent.</p>
    <h2>O que são cookies e armazenamento local</h2>
    <p>Cookies são pequenos registros que um serviço pode guardar no navegador. Há tecnologias semelhantes, como sessionStorage e localStorage. Suas finalidades e duração variam conforme o serviço utilizado.</p>
    <h2>O que o site utiliza hoje</h2>
    <ul><li><strong>Origem de campanhas:</strong> o registro <code>laserdent_campaign</code>, em sessionStorage, guarda parâmetros da URL para associar o formulário à origem do contato. Em geral, o navegador elimina esse registro ao encerrar a sessão da aba. Isso não é um cookie de publicidade de terceiros.</li>
    <li><strong>Infraestrutura e segurança:</strong> hospedagem e serviços de suporte podem processar informações técnicas para entregar páginas e proteger as requisições.</li>
    <li><strong>Recursos externos:</strong> o mapa incorporado do Google, fontes do Google e bibliotecas por CDN fazem conexões com seus fornecedores. Eles podem receber IP, informações do navegador e, conforme suas próprias configurações, usar cookies ou outros identificadores. O mapa é carregado automaticamente quando o navegador inicia o recurso.</li></ul>
    <p>A versão atual do código do site não inclui Google Analytics, Google Ads tag ou Meta Pixel. Esta informação precisará ser revista se forem adicionados mecanismos de medição ou publicidade.</p>
    <h2>Como controlar</h2>
    <p>Você pode consultar, bloquear e excluir cookies e dados de sites nas configurações de privacidade do seu navegador. O bloqueio de determinados serviços pode afetar o mapa e outras funcionalidades externas. Para remover o registro de campanha, encerre a sessão da aba ou limpe os dados do site no navegador.</p>
    <p>Esta página é informativa e não funciona como um painel de consentimento. Caso sejam implantadas tecnologias opcionais que dependam de consentimento, elas deverão oferecer escolhas e meios de revogação compatíveis antes de serem ativadas.</p>
    <h2>Serviços externos e contato</h2>
    <p>Consulte também a <a href="https://policies.google.com/privacy">Política de Privacidade do Google</a> e as configurações do navegador. Para dúvidas sobre o uso de dados pela clínica, escreva para ${contact} e consulte nossa <a href="/privacidade">Política de Privacidade</a>.</p>`],
  ['exclusao-de-dados', 'Exclusão de dados', 'Como solicitar a exclusão de dados e revogar a conexão do Instagram com a LASERdent.', `
    <p>Última atualização: <time datetime="2026-11-09">9 de novembro de 2026</time>. Utilize estas instruções para solicitar a exclusão de dados tratados pelo site e pelas integrações do sistema Laserdent.</p>
    <h2>1. Envie uma solicitação à clínica</h2>
    <p>Escreva para ${contact} com o assunto <strong>Solicitação de exclusão de dados — Laserdent</strong>. Informe o nome usado no contato e o e-mail associado. Para dados de uma integração do Instagram, informe o @ da conta e sua relação com ela. Não envie senhas, tokens, documentos ou informações clínicas sem orientação da equipe.</p>
    <h2>2. Confirmação e análise</h2>
    <p>A equipe poderá solicitar informações adicionais proporcionais para confirmar a identidade ou a autoridade sobre a conta. O pedido será analisado e respondido pelo canal informado, observando os prazos legais aplicáveis. Serão indicados os dados excluídos e eventuais motivos para conservação obrigatória ou exercício de direitos.</p>
    <h2>3. Revogue o acesso na Meta</h2>
    <p>Na conta que autorizou a conexão, acesse as configurações de aplicativos, sites ou integrações empresariais da Meta e remova a autorização do aplicativo <strong>sistemalaserdent</strong>. Os nomes dos menus podem variar. A revogação impede novos acessos autorizados, mas não substitui o pedido de exclusão dos dados já armazenados pela clínica.</p>
    <h2>4. Escopo da exclusão</h2>
    <p>Você pode solicitar a remoção de um depoimento e dos dados de contato ou da integração que lhe digam respeito. A equipe verificará a autorização antes de eliminar dados de uma conta empresarial. A solicitação não apaga automaticamente publicações já existentes no Instagram: elas devem ser gerenciadas na própria rede. Registros clínicos sujeitos a conservação legal são analisados separadamente.</p>
    <p>Estas são instruções de solicitação por contato; esta página não executa exclusão automática. Saiba mais na <a href="/privacidade">Política de Privacidade</a>.</p>`],
];
for (const [slug, title, description, content] of pages) {
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | LASERdent</title><meta name="description" content="${description}"><link rel="canonical" href="https://www.laserdent.com.br/${slug}">
<link rel="icon" href="/Fotos/logosemfundo.png"><link rel="stylesheet" href="/legal.css"></head>
<body><a class="skip-link" href="#conteudo">Ir para o conteúdo</a><header><a href="/" aria-label="LASERdent — Página inicial"><img src="/Fotos/logosemfundo.png" alt="LASERdent" width="140" height="100"></a><a href="/">Voltar ao site</a></header>
<main id="conteudo"><h1>${title}</h1>${content}</main><footer><nav aria-label="Privacidade"><a href="/privacidade">Privacidade</a><a href="/cookies">Cookies</a><a href="/exclusao-de-dados">Exclusão de dados</a></nav><p>© 2026 Clínica LASERdent</p></footer></body></html>`;
  writeFileSync(resolve(root, `${slug}.html`), html, 'utf8');
}
console.log('Páginas de privacidade, cookies e exclusão geradas.');
