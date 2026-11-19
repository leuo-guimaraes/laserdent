# Atendimento virtual Laserdent

O balão público carrega `clinic-assistant.js` pelo script compartilhado do site e substitui o botão flutuante de WhatsApp. O WhatsApp continua disponível dentro da janela. A autorização para iniciar a conversa é específica do assistente e não depende da escolha de cookies de análise.

O endpoint `api/clinic-assistant.js` usa somente a base pública em `server/clinic-assistant.js`. A IA classifica o assunto e o servidor devolve uma resposta dessa base, sem exibir texto livre gerado pelo modelo. Informações da equipe devem ser atualizadas na base quando mudarem. Não há consulta a pacientes, prontuários ou agenda, nem confirmação automática de consulta.

Configure no projeto Vercel do site `laserdent`, em Production, `OPENROUTER_API_KEY` e `OPENROUTER_SITE_MODEL`. O modelo deve ser informado pelo identificador exato disponível na conta OpenRouter. Guarde a chave exclusivamente no servidor, sem prefixo VITE_. Faça redeploy após cadastrar. Prefira uma chave dedicada com limite de gastos no provedor. A configuração do CRM não configura automaticamente o projeto do site.

As chamadas usam `provider.zdr=true` e `data_collection=deny`. Confira as opções de privacidade e retenção do provedor no OpenRouter. Se o modelo estiver indisponível ou as variáveis faltarem, o serviço usa a mesma base por identificação local de palavras e informa essa condição na conversa.

Não há banco ou localStorage de conversas. O visitante pode limpar as mensagens da página. Algumas informações pessoais, sintomas, exames e solicitações de medicação são interceptados antes da chamada externa. Esses filtros têm limites e a interface orienta a enviar somente perguntas gerais. A política pública descreve processamento por terceiros e transferências internacionais.

Há limite de tamanho e de frequência por IP em memória por instância. A memória não é compartilhada entre instâncias serverless; para maior escala use também as regras do firewall da hospedagem e o limite financeiro da chave. IPs são representados por hash em memória e não são enviados ao provedor pelo código da aplicação.

`node execution/check_clinic_assistant.mjs` valida o contrato e as proteções com respostas fictícias, sem chamadas pagas. O funcionamento real do modelo exige configuração e confirmação posterior. Nenhum teste publica mensagens nem cria consultas.
