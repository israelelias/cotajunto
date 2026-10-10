'use strict';
/* A single guided scenario. This controller observes confirmed application data;
   it never creates prices, messages, approvals or payments on the user's behalf. */
(() => {
  const KEY = 'cotajunto.tour.v1', TAB = 'cotajunto.tour.tab';
  const uid = () => globalThis.crypto?.randomUUID?.() || `tour-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  let tabId = uid();
  try { tabId = sessionStorage.getItem(TAB) || tabId; sessionStorage.setItem(TAB, tabId); } catch {}
  const fresh = () => ({version:1,status:'new',runId:null,step:'client-access',demoRequestId:null,clientId:'client',workerId:'worker',owner:null,formDraft:{},arrival:null});
  let tour = fresh(), host, root, frame, target, panelKey='', exitPrompt=false, takeoverDismissed=false, storageOK=true;
  let lastTarget, lastStep, restoreRoot, restoreKey='', missingReason='';
  const inertNodes = new Map();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paragraphs = text => text.split('\n\n').map((part,i,parts)=>`<p${i===parts.length-1?' class="pt-instruction"':''}>${esc(part)}</p>`).join('');
  // Copy ends with the next action; access guidance replaces only that paragraph.
  const withAction = (text,instruction) => [...text.split('\n\n').slice(0,-1),instruction].join('\n\n');
  const q = selector => document.querySelector(selector);
  const req = s => s.state.requests.find(r=>r.id===tour.demoRequestId);
  const draft = s => s.state.drafts[tour.clientId];
  const route = prefix => () => `${prefix}/${tour.demoRequestId}`;
  const at = expected => s => s.route === (typeof expected==='function'?expected():expected);
  const byAction = action => `[data-action="${action}"]`;
  const requestLink = prefix => () => [...document.querySelectorAll('a.request-card')].find(a=>a.getAttribute('href')===`#/${prefix}/${tour.demoRequestId}`);
  const nav = href => () => {
    const sidebar=q('.sidebar');
    return matchMedia('(max-width:740px)').matches&&!sidebar?.classList.contains('open') ? q('.menu-toggle') : q(`.nav a[href="#/${href}"]`);
  };
  const itemTarget = predicate => s => {
    const item=req(s)?.items.find(predicate);
    return item ? q(`.price-input[data-item="${CSS.escape(item.id)}"]`)?.closest('.collection-item') : q('.collection-item');
  };
  const allPriced = s => !!req(s)?.items.length && req(s).items.some(i=>!i.unavailable) && req(s).items.every(i=>i.unavailable||Number(i.price)>0);
  const allChecked = s => allPriced(s)&&req(s).items.every(i=>i.unavailable||i.done);
  const action = (id,role,page,target,title,text,done) => ({id,role,page,target,title,text,done});
  const info = (id,role,page,target,title,text,valid) => ({id,role,page,target,title,text,info:true,valid});
  const access = (id,role,title,text) => ({...action(id,role,'entrar',byAction('demo-'+role),title,text,s=>s.user?.id===tour[role+'Id']),access:true});
  // Leaving an account and entering the other are separate, visible actions.
  // IDs stay stable so progress saved by the previous tour can still be resumed.
  const transition = (id,role,title,text) => [
    action(id,role==='client'?'worker':'client',null,'.topbar [data-action="switch"]',title,text,
      s=>(!s.user&&s.route==='entrar')||s.user?.id===tour[role+'Id']),
    access(id+'-access',role,`Entre como ${role==='client'?'Cliente':'Colaborador'}`,
      withAction(text,`Você chegou à tela de entrada. Clique em “Sou ${role==='client'?'Cliente':'Colaborador'}” para continuar com a mesma solicitação e os dados preservados.`))
  ];
  const steps = [
    access('client-access','client',"Comece pelo Cliente","O Cliente cria uma lista dos produtos que deseja pesquisar. O Colaborador aceita esse pedido e confere os preços no local escolhido: esse trabalho é a coleta.\n\nComeçamos pelo Cliente porque primeiro precisamos criar o pedido que você atenderá depois como Colaborador.\n\nClique em “Sou Cliente” para começar."),
    info("client-intro","client","inicio",".page-heading","Bem-vindo à Área do Cliente","Aqui você pede uma pesquisa de preços: cria a lista de produtos, escolhe o estabelecimento e acompanha a coleta. Quando o Colaborador envia o orçamento, você pode pedir ajustes, aprovar e avaliar o atendimento.\n\nVamos conhecer esta área e depois criar uma solicitação que você também atenderá como Colaborador.\n\nClique em “Continuar” para conhecer a Visão geral."),
    info('client-overview','client','inicio','.metrics',"Sua visão geral de Cliente","Esta é a Visão geral. Uma solicitação é o pedido de pesquisa de preços que você envia com sua lista de produtos. Os indicadores mostram quantas estão em cada fase; as listas recentes dão acesso aos detalhes.\n\nOs exemplos já preenchidos ajudam a explorar o aplicativo. Vamos conhecer seu perfil antes de criar nossa própria lista.\n\nClique em “Continuar”."),
    action('client-profile','client','inicio',nav('perfil'),"Conheça a conta de teste","Em “Meu perfil” você consulta o nome e o e-mail fictícios usados nesta demonstração. Esses dados são apenas para consulta no protótipo.\n\nVamos conhecer também a opção de recomeçar os testes, caso você queira repetir o percurso depois.\n\nAbra o menu, se estiver recolhido, e clique em “Meu perfil”.",at('perfil')),
    info('client-profile-info','client','perfil','.profile-card',"Como recomeçar os testes","Este perfil usa dados fictícios. “Reiniciar dados de teste” apaga as alterações feitas nos testes, restaura os exemplos e volta à tela de entrada, com o guia pronto para começar novamente. Use essa opção quando quiser experimentar tudo do zero.\n\nSe apenas sair do guia, você pode retomá-lo de onde parou em “Guia da demonstração” → “Retomar guia”.\n\nAgora, mantenha os dados atuais e clique em “Continuar”."),
    action('client-home','client','perfil',nav('inicio'),"Vamos preparar sua lista","Você já sabe onde consultar a conta e como recomeçar os testes. Agora vamos criar uma lista com os produtos cujos preços deseja conhecer.\n\nO botão para começar fica na Visão geral, a página inicial do Cliente.\n\nNo menu, clique em “Visão geral”.",at('inicio')),
    action('create-list','client','inicio','.page-heading [data-action="new"]',"Crie sua lista de produtos","A lista informa ao Colaborador quais produtos e quantidades você quer pesquisar. Depois, ela será enviada como uma solicitação de orçamento.\n\nUma lista começada, mas ainda não enviada, é um rascunho. Se você já tiver um, poderá continuar preenchendo os mesmos itens.\n\nClique em “Nova lista” para começar.",s=>s.route==='nova'&&!!draft(s)),
    action('add-items','client','nova','.grid-main>section.panel',"Informe o que deseja pesquisar","Estamos montando a lista que o Colaborador usará na coleta. Um nome ajuda a reconhecê-la; produto, embalagem e quantidade indicam o que pesquisar. “Limite / un.” é opcional e sinaliza um preço acima do desejado.\n\nPreencha “Nome da lista” e um produto, como Leite integral, quantidade 2 e unidade “un”. Depois, clique em “Adicionar”.",s=>!!draft(s)?.name.trim()&&draft(s).items.length>0),
    action('choose-location','client','nova','.grid-main>section.panel',"Leve a lista ao próximo passo","O produto adicionado já faz parte da sua lista. Se quiser incluir outros, preencha os campos e clique em “Adicionar” novamente. Os itens reunidos serão pesquisados no mesmo estabelecimento.\n\nAgora vamos escolher onde o Colaborador deverá conferir esses preços.\n\nAo terminar os itens, clique em “Escolher local”, no final do formulário.",at('local')),
    action('save-location','client','local','#store-form',"Onde pesquisar os preços?","O estabelecimento define onde os preços desta lista serão conferidos. Cada solicitação atende a um único local; para pesquisar outro, é preciso criar outra solicitação.\n\nAqui os locais são exemplos: o protótipo não localiza Colaboradores próximos nem envia alertas reais por região.\n\nSelecione um estabelecimento e clique em “Revisar solicitação”.",at('confirmar')),
    info('reward-value','client','confirmar','.reward-editor',"Defina a recompensa","A recompensa representa o valor oferecido ao Colaborador pelo trabalho da coleta. Aqui é fictícia: não há cobrança.\n\nUm valor baixo pode despertar menos interesse; oferecer mais pode atrair ajuda, inclusive numa urgência, sem garantir o aceite. Busque um valor justo para ambos.\n\nMantenha R$ 5,00, o valor inicial e mínimo, ou aumente em “Recompensa fictícia oferecida (R$)”. Depois, clique em “Continuar”.",s=>Number(draft(s)?.reward)>=5&&q('#reward-value')?.getAttribute('aria-invalid')!=='true'),
    action('confirm-request','client','confirmar',byAction('create-request'),"Disponibilize sua solicitação","A lista, o estabelecimento e a recompensa formam sua solicitação: o pedido para um Colaborador pesquisar os preços. Até aqui, ela ainda era um rascunho.\n\nAo confirmar, ela ficará disponível para aceite no protótipo. Em seguida, veremos como acompanhar seu andamento.\n\nClique em “Confirmar solicitação”.",s=>!!req(s)),
    info('track-request','client',route('pedido'),'.timeline',"Acompanhe o pedido enviado","Sua solicitação foi enviada e aguarda um Colaborador. As etapas destacadas mostram o caminho do pedido até sua conclusão, incluindo coleta, envio do orçamento e aprovação.\n\nAgora veremos esta mesma solicitação pelo olhar do Colaborador: ele encontra o pedido, aceita a coleta, confere preços e fotos no estabelecimento e envia o orçamento para você revisar como Cliente.\n\nClique em “Continuar” para ver como trocar de perfil."),
    ...transition('switch-worker','worker',"Vamos atender ao seu pedido","A solicitação que você criou como Cliente está disponível. Agora veremos o outro lado: o Colaborador vai aceitar a coleta, registrar os preços e devolver um orçamento.\n\nA troca de perfil permite testar os dois papéis no protótipo, mantendo este mesmo pedido. Você também pode usá-la fora do guia.\n\nClique em “Trocar para Colaborador”, no topo."),
    info("worker-intro","worker","inicio",".page-heading","Bem-vindo à Área do Colaborador","Agora você representa quem pesquisa os preços para o Cliente. Nesta área é possível encontrar solicitações, aceitar uma coleta, registrar preços e fotos, conversar pelo chat e enviar o orçamento.\n\nVamos atender à mesma lista que você acabou de criar. Primeiro, conheça o Início e seu perfil de Colaborador.\n\nClique em “Continuar” para entender os indicadores."),
    info('worker-overview','worker','inicio','.worker-finances',"Sua visão geral de Colaborador","Você está no Início do Colaborador. “Saldo disponível” soma recompensas confirmadas; “Ganhos em andamento” mostra valores ainda esperados das coletas aceitas. Ambos são fictícios. A avaliação é a média das notas recebidas.\n\nOs indicadores de coletas levam às listas correspondentes. Antes de atender ao pedido, vamos conhecer o perfil deste participante.\n\nClique em “Continuar”."),
    action('worker-profile','worker','inicio',nav('perfil'),"Conheça o perfil de quem coleta","O perfil do Colaborador reúne os dados da conta de teste e as avaliações que os Clientes deixaram sobre seu trabalho. Esse retorno ajuda a entender como foram as coletas anteriores.\n\nVamos conhecer esse espaço antes de aceitar a solicitação.\n\nAbra o menu, se necessário, e clique em “Meu perfil”.",at('perfil')),
    info("worker-account","worker","perfil",".profile-card:not(.profile-history)","Esta é sua conta de Colaborador","O nome e o e-mail de teste identificam a conta que realizará esta coleta. O avatar mostra as iniciais do nome; ele não é uma foto de perfil.\n\nEsses dados fictícios são apenas para consulta no protótipo. Logo abaixo, veremos o histórico de trabalhos e o retorno dos Clientes.\n\nConfira os dados e clique em “Continuar”."),
    info('worker-profile-info','worker','perfil','.profile-history',"Avaliações e coletas anteriores","Esta parte do perfil mostra notas e comentários dos Clientes. O histórico permite consultar coletas concluídas; os valores de saldo e ganhos ficam no Início.\n\nNo fim da coleta, sua avaliação como Cliente também ficará neste perfil. Agora vamos encontrar o pedido que criamos.\n\nClique em “Continuar”."),
    action('worker-collections','worker','perfil',nav('coletas'),"Encontre o trabalho disponível","“Minhas coletas” é a área para consultar e gerenciar as pesquisas de preços: as que você pode aceitar, as que está realizando e as já concluídas.\n\nÉ lá que estará a solicitação enviada no papel de Cliente. Vamos localizá-la para começar a coleta.\n\nAbra o menu, se necessário, e clique em “Minhas coletas”.",at('coletas')),
    action('filter-available','worker','coletas','[data-action="filter"][data-value="waiting"]',"Veja o que pode aceitar","Os filtros separam as coletas por situação. “Todas” reúne as categorias; “Disponíveis” mostra pedidos para aceitar; “Em andamento” acompanha os aceitos; “Concluídas” mostra os que já tiveram recompensa confirmada.\n\nNossa solicitação ainda não foi aceita, por isso está entre as disponíveis.\n\nClique em “Disponíveis”.",at('coletas/disponiveis')),
    action('open-request','worker','coletas/disponiveis',requestLink('tarefa'),"Encontre a lista que você criou","O cartão destacado representa a solicitação que você enviou como Cliente, com o mesmo nome, local e recompensa.\n\nAbrir esse pedido permite conhecer os produtos e decidir se deseja realizar a coleta. Nesta demonstração, vamos aceitá-lo para continuar o percurso.\n\nClique no cartão destacado da sua lista.",at(route('tarefa'))),
    action('accept-request','worker',route('tarefa'),byAction('accept'),"Assuma esta coleta","Aqui estão os detalhes do pedido: produtos, quantidades, estabelecimento e recompensa. Aceitar significa assumir a tarefa de conferir esses preços.\n\nNeste teste, você preencherá valores de exemplo como Colaborador. Após o aceite, a coleta ficará em andamento e os campos de preços serão liberados.\n\nClique em “Aceitar e iniciar coleta”.",s=>req(s)?.worker===tour.workerId&&req(s).status==='collecting'),
    action('collect-prices','worker',route('coleta'),itemTarget(i=>!i.unavailable&&!(i.price>0)),"Registre o preço de cada item","Imagine que você chegou ao estabelecimento escolhido pelo Cliente. Localize cada produto da lista, confira a embalagem e leia o preço na etiqueta. Aqui você simula esse registro com valores de teste: informe o preço por unidade; o aplicativo multiplica pela quantidade pedida.\n\nPara testar, digite um valor maior que zero, como 6,00, em “Preço por unidade (R$)” e toque fora do campo para salvar. Repita nos próximos itens destacados.",allPriced),
    action('collect-photo','worker',route('coleta'),itemTarget(i=>!i.unavailable),"Mostre de onde veio o preço","No estabelecimento, uma foto do produto e da etiqueta ajuda o Cliente a conferir a pesquisa sem estar lá. Neste teste, anexe uma imagem do dispositivo ou use a foto fictícia de exemplo, mantendo-a ligada ao item pesquisado.\n\nAs fotos são opcionais no uso livre; neste guia vamos experimentar uma para conhecer o recurso.\n\nNo item destacado, clique em “Usar foto de exemplo” ou em “Anexar foto” e escolha uma imagem.",s=>req(s)?.items.some(i=>!!i.photo&&!i.unavailable)),
    action('check-items','worker',route('coleta'),itemTarget(i=>!i.unavailable&&!i.done),"Confirme a conferência dos produtos","Marcar um item como conferido indica que você terminou sua verificação. O resumo “Sua coleta” acompanha o progresso.\n\nSe um produto faltar no estabelecimento, “Não encontrado” o retira do total. Ao menos um precisa ter preço para enviar o orçamento.\n\nPara seguir com os preços deste teste, marque “Item conferido” em cada produto destacado.",allChecked),
    action('open-worker-chat','worker',route('coleta'),()=>q('.page-heading a[href^="#/chat/"]'),"Converse antes de enviar","O chat é a conversa entre Cliente e Colaborador sobre esta solicitação. Ele permite esclarecer dúvidas sobre produtos e preços sem perder a ligação com a lista.\n\nAntes de enviar o orçamento, vamos avisar que a pesquisa está pronta.\n\nClique em “Conversar”, no topo da página.",at(route('chat'))),
    action('worker-message','worker',route('chat'),'#chat-form',"Avise que terminou a pesquisa","Você está na conversa desta coleta, falando como Colaborador. A mensagem ficará no histórico e poderá ser lida ao voltar ao Cliente neste navegador; ela não é enviada a alguém pela internet.\n\nDigite uma mensagem, como “Conferi os preços e vou enviar o orçamento”, e clique no botão com o ícone de envio ao lado do campo.",s=>req(s)?.messages.some(m=>m.author===tour.workerId&&m.text.trim())),
    action('back-to-collection','worker',route('chat'),()=>q(`.summary a.btn:not(.secondary)[href="#/coleta/${CSS.escape(tour.demoRequestId)}"]`),"Volte à coleta para enviar","Sua mensagem ficou registrada na conversa. Avisar pelo chat ainda não envia o orçamento: os preços precisam ser encaminhados pela área da coleta.\n\nVamos voltar aos produtos para concluir esse envio.\n\nClique em “Revisar itens”.",at(route('coleta'))),
    action('send-budget','worker',route('coleta'),byAction('send-budget'),"Entregue o orçamento ao Cliente","Com os preços preenchidos e os itens conferidos, o orçamento reúne o resultado da pesquisa. O total corresponde aos produtos; a recompensa pelo trabalho aparece separadamente.\n\nO envio permitirá que o Cliente revise os valores e aprove ou peça uma correção.\n\nClique em “Enviar orçamento”.",s=>req(s)?.revision>=1&&req(s).status==='received'),
    action('worker-home-after-send','worker',route('pedido'),nav('inicio'),"Veja como acompanhar o envio","O orçamento foi enviado. A coleta ainda está em andamento porque o Cliente precisa revisar o resultado e confirmar a recompensa.\n\nVamos voltar ao Início do Colaborador para encontrar essa participação pelos indicadores da página inicial.\n\nAbra o menu, se necessário, e clique em “Início”.",at('inicio')),
    action('filter-active','worker','inicio','a[href="#/coletas/em-andamento"].collection-shortcut',"Localize a coleta em andamento","O indicador “Em andamento” reúne coletas aceitas cuja recompensa ainda não foi confirmada. Isso inclui a que você acabou de enviar ao Cliente.\n\nEsse atalho abre “Minhas coletas” já com o filtro correto, facilitando acompanhar o que ainda está pendente.\n\nClique em “Em andamento”.",at('coletas/em-andamento')),
    info('active-collection','worker','coletas/em-andamento',requestLink('pedido'),"O próximo passo é do Cliente","A coleta destacada é a sua, agora aguardando a análise do orçamento. Ela permanece em andamento até a confirmação da recompensa fictícia.\n\nComo você representa os dois participantes neste teste, vamos retornar ao Cliente para conferir os preços recebidos e experimentar um pedido de ajuste.\n\nClique em “Continuar” para preparar a troca."),
    ...transition('switch-client-review','client',"Receba o resultado como Cliente","Você já enviou os preços no papel de Colaborador. Agora o Cliente precisa analisar o orçamento recebido para decidir se ele atende ao pedido.\n\nVamos voltar a esse perfil e abrir a mesma lista, com os preços e a conversa preservados.\n\nClique em “Trocar para Cliente”, no topo."),
    action('client-lists','client','inicio',nav('listas'),"Procure sua lista de orçamento","Você voltou ao Cliente. “Minhas listas” reúne suas solicitações e mostra em que fase cada uma está.\n\nA lista criada neste guia já recebeu os preços enviados pelo Colaborador. Vamos encontrá-la para conferir o resultado.\n\nAbra o menu, se necessário, e clique em “Minhas listas”.",at('listas')),
    action('open-budget','client','listas',requestLink('pedido'),"Abra o orçamento recebido","O cartão destacado é o pedido que você criou. Ele agora tem um orçamento para revisão: os preços registrados pelo Colaborador para os produtos da lista.\n\nVamos abrir os detalhes para conhecer esse resultado antes de aprová-lo.\n\nClique no cartão destacado da sua lista.",at(route('pedido'))),
    info('review-budget','client',route('pedido'),'.price-header',"Entenda os valores recebidos","Este é o orçamento da sua lista. Os itens mostram quantidades e preços; as fotos anexadas ajudam na conferência. O total soma os produtos encontrados, sem incluir a recompensa. Os dados do Colaborador aparecem acima.\n\nSe algum valor precisar de revisão, você pode pedir um ajuste. Vamos experimentar esse caminho antes de aprovar.\n\nClique em “Continuar”."),
    action('request-adjustment','client',route('pedido'),byAction('request-adjust'),"Peça a revisão de um preço","Um pedido de ajuste serve para explicar ao Colaborador o que precisa ser corrigido no orçamento. Neste teste, vamos pedir que ele confira um preço.\n\nO botão abre o chat; a solicitação de ajuste só será registrada quando você enviar o motivo.\n\nClique em “Pedir ajuste”.",s=>s.route===`chat/${tour.demoRequestId}/ajuste`),
    action('adjustment-reason','client',()=>`chat/${tour.demoRequestId}/ajuste`,'#chat-form',"Explique o que deve ser corrigido","Esta conversa está preparada para registrar o motivo do ajuste. A explicação ajuda o Colaborador a saber qual item revisar; abrir a tela ou deixar a mensagem em branco não envia o pedido.\n\nEm “Motivo do ajuste (obrigatório)”, escreva algo como “Pode conferir o preço do primeiro produto?”. Depois, clique em “Enviar pedido de ajuste”.",s=>req(s)?.status==='adjustment'&&req(s).messages.some(m=>m.kind==='adjustment'&&m.author===tour.clientId&&m.text.trim())),
    ...transition('switch-worker-adjust','worker',"Veja o ajuste como Colaborador","Seu pedido de ajuste foi registrado com a mensagem enviada. Agora cabe ao Colaborador ler o motivo, revisar o preço e devolver uma nova versão do orçamento.\n\nVamos assumir esse papel para fazer a correção na mesma coleta, mantendo o histórico da conversa.\n\nClique em “Trocar para Colaborador”, no topo."),
    action('open-adjustment','worker','coletas/em-andamento',requestLink('coleta'),"Retome a coleta que precisa de revisão","A coleta destacada continua em andamento e agora indica o ajuste solicitado pelo Cliente. Ela contém os mesmos produtos e preços do orçamento enviado.\n\nVamos abri-la para consultar o motivo e corrigir o que foi pedido.\n\nClique no cartão destacado da coleta.",at(route('coleta'))),
    action('read-adjustment','worker',route('coleta'),()=>q('.page-heading a[href^="#/chat/"]'),"Entenda o pedido antes de corrigir","Você voltou aos itens da coleta como Colaborador. Antes de mudar um preço, é preciso consultar a explicação do Cliente para saber o que revisar.\n\nA mensagem enviada no pedido de ajuste está no chat desta mesma solicitação.\n\nClique em “Conversar”, no topo da página.",at(route('chat'))),
    info('adjustment-message','worker',route('chat'),'.message:has(.message-kind)',"Este é o motivo da revisão","A mensagem destacada é a justificativa que você escreveu como Cliente. Ela orienta o Colaborador sobre o que precisa ser conferido novamente.\n\nNeste percurso, vamos corrigir um preço e reenviar o orçamento. A mensagem continuará no histórico para os dois participantes.\n\nLeia o pedido e clique em “Continuar”."),
    action('back-to-correction','worker',route('chat'),()=>q(`.summary a.btn:not(.secondary)[href="#/coleta/${CSS.escape(tour.demoRequestId)}"]`),"Volte aos produtos para corrigir","Você já leu o motivo do ajuste. A conversa guarda essa explicação, enquanto a alteração do preço é feita nos campos da coleta.\n\nVamos voltar aos mesmos itens para preparar a versão corrigida do orçamento.\n\nClique em “Revisar itens”.",at(route('coleta'))),
    action('correct-price','worker',route('coleta'),itemTarget(i=>!i.unavailable),"Altere o preço que foi revisto","Agora vamos representar a correção solicitada. Alterar o preço recalcula o total dos produtos, mas ainda não envia a nova versão ao Cliente.\n\nNo item destacado, preencha “Preço por unidade (R$)” com um valor positivo diferente do anterior, por exemplo 5,50 se antes usou 6,00. Depois, toque fora do campo para salvar e avançar.",s=>allPriced(s)&&req(s).items.some(i=>!i.unavailable&&i.price!==tour.priceBaseline?.[i.id])),
    action('resend-budget','worker',route('coleta'),byAction('send-budget'),"Envie a versão corrigida","O preço foi alterado e o total atualizado. O Cliente precisa receber essa nova versão para conferir o ajuste e decidir sobre a aprovação.\n\nO reenvio mantém os produtos e o histórico da mesma solicitação.\n\nClique em “Reenviar orçamento”.",s=>req(s)?.revision>=2&&req(s).status==='received'),
    ...transition('switch-client-final','client',"Volte ao Cliente para concluir","O Colaborador reenviou o orçamento com o preço corrigido. Agora o Cliente poderá conferir essa mudança, aprovar o resultado e avaliar o atendimento.\n\nVamos voltar ao perfil que fez a solicitação para concluir o processo.\n\nClique em “Trocar para Cliente”, no topo."),
    info('review-correction','client',route('pedido'),'.price-header',"Confira o orçamento atualizado","Você está novamente no orçamento do Cliente, agora com a correção enviada pelo Colaborador. O preço alterado e o novo total aparecem nesta versão; a conversa continua no histórico.\n\nDepois de conferir, vamos aprovar o resultado para conhecer a confirmação da recompensa e a avaliação.\n\nClique em “Continuar”."),
    action('approve-budget','client',route('pedido'),byAction('approve'),"Confirme que o orçamento atende ao pedido","Aprovar registra que o Cliente está satisfeito com o orçamento. Essa ação encerra a revisão dos preços; depois, a recompensa fictícia será confirmada em outra tela.\n\nUma janela pedirá sua confirmação antes de registrar a aprovação.\n\nClique em “Aprovar orçamento” para abrir essa janela.",s=>req(s)?.status==='approved'),
    action('confirm-reward','client',route('recompensa'),byAction('pay'),"Reconheça o trabalho da coleta","O orçamento foi aprovado. Esta tela confirma a recompensa que você ofereceu pelo trabalho do Colaborador, separada do total dos produtos.\n\nTudo é simulado: nenhum dinheiro será cobrado ou transferido. Ao confirmar, o valor entra no saldo fictício do Colaborador e você segue para a avaliação.\n\nClique em “Confirmar recompensa fictícia”.",s=>req(s)?.paid&&req(s).status==='rewarded'),
    action('rate-worker','client',route('avaliar'),'#rating-form',"Conte como foi a colaboração","A recompensa já foi confirmada. Agora sua avaliação registra como foi a coleta e passa a compor a nota média do Colaborador. O comentário é opcional.\n\nEscolha de uma a cinco estrelas e, se quiser, escreva um comentário. Para registrar a avaliação e encerrar este orçamento, clique em “Enviar avaliação e concluir”.",s=>req(s)?.status==='completed'&&!!req(s).rating),
    ...transition('switch-worker-result','worker',"Veja o resultado do outro lado","Sua avaliação foi enviada e o orçamento está concluído. Vamos fazer uma última troca para ver o efeito da recompensa e da nota na área do Colaborador.\n\nAssim, você acompanha o resultado do mesmo trabalho para quem pediu e para quem coletou os preços.\n\nClique em “Trocar para Colaborador”, no topo."),
    info('worker-result','worker','inicio','.worker-finances',"Confira saldo e avaliação","A recompensa desta coleta agora faz parte do saldo fictício do Colaborador e saiu dos ganhos em andamento. A nota que você enviou como Cliente entrou no cálculo da avaliação média.\n\nEsses indicadores refletem as coletas da conta. Vamos localizar a que acabamos de concluir para consultar seu recebimento.\n\nClique em “Continuar”."),
    action('filter-completed','worker','inicio','a[href="#/coletas/concluidas"].collection-shortcut',"Encontre a coleta concluída","“Concluídas” reúne as coletas cuja recompensa fictícia foi confirmada pelo Cliente. A que percorremos juntos já está nessa situação.\n\nO indicador abre a lista com esse filtro, permitindo consultar trabalhos anteriores e seus recebimentos.\n\nClique em “Concluídas”.",at('coletas/concluidas')),
    action('open-receipt','worker','coletas/concluidas',requestLink('recebimento'),"Consulte a recompensa recebida","O cartão destacado corresponde à mesma solicitação que começou como sua lista de produtos. Agora ele dá acesso ao registro da recompensa fictícia confirmada pelo Cliente.\n\nVamos consultar esse recebimento para fechar a demonstração pelo lado do Colaborador.\n\nClique no cartão destacado da coleta.",at(route('recebimento'))),
    info('finish','worker',route('recebimento'),'.center-panel .summary-total',"Você completou os dois lados do fluxo","Este registro mostra a recompensa fictícia da coleta concluída. Você criou a lista como Cliente, coletou preços como Colaborador, trocou mensagens, pediu e corrigiu um ajuste, aprovou e avaliou.\n\nO processo está completo e os dados permanecem neste navegador para você explorar o protótipo.\n\nClique em “Continuar” para encerrar o guia."),
    {...info("farewell","worker","",null,"Parabéns! Você concluiu a demonstração","Você percorreu uma solicitação completa pelos dois perfis: criou a lista como Cliente, coletou e enviou preços como Colaborador, pediu e corrigiu um ajuste, aprovou, confirmou a recompensa fictícia e avaliou.\n\nAgora explore à vontade: crie novas listas, teste filtros, converse pelo chat e alterne os temas. Os dados deste percurso continuam salvos no navegador.\n\nClique em “Concluir guia” para fechar as orientações e usar o CotaJunto livremente."),centered:true}
  ];
  const step = () => steps.find(s=>s.id===tour.step);
  const running = () => tour.status==='active'&&tour.owner===tabId;
  function read(value) {
    try {
      const data=JSON.parse(value);
      if(data?.version!==1||!['new','active','interrupted','declined','completed'].includes(data.status)||!steps.some(s=>s.id===data.step))return fresh();
      return {...fresh(),...data};
    } catch {return fresh();}
  }
  try {tour=read(localStorage.getItem(KEY));} catch {storageOK=false;}
  function persist() {
    const s=host?.snapshot(), current=step();
    tour.updatedAt=Date.now();
    tour.currentRole=s?.role||null; tour.currentRoute=s?.route||'entrar';
    tour.expectedRole=current?.role; tour.expectedRoute=typeof current?.page==='function'?current.page():current?.page;
    tour.expectedAction=current?.info?'acknowledge':current?.id;
    try {localStorage.setItem(KEY,JSON.stringify(tour));} catch {storageOK=false;}
  }
  function advance(s) {
    if(tour.step==='adjustment-reason')tour.priceBaseline=Object.fromEntries(req(s).items.map(i=>[i.id,i.price]));
    const next=steps[steps.findIndex(x=>x.id===tour.step)+1];
    if(!next){tour.status='completed';tour.completedAt=Date.now();host.release();}
    else tour.step=next.id;
    tour.formDraft={}; restoreKey=''; persist();
  }
  function afterLogin(userId) {
    const current=step();
    if(!running()||!current.access||userId!==tour[current.role+'Id'])return null;
    // Commit access and its destination together. Ordinary logins keep the app's
    // defaults; only an explicit access step can plan a guided arrival.
    const from=host.snapshot().route;
    advance(host.snapshot());
    const next=step(),page=typeof next.page==='function'?next.page():next.page;
    if(!page)return null;
    tour.arrival={step:next.id,userId,from,page};persist();
    return page;
  }
  function arrivalPage(userId) {
    const current=step(),arrival=tour.arrival;
    const expected=typeof current.page==='function'?current.page():current.page;
    return running()&&arrival?.step===current.id&&arrival.userId===userId&&
      arrival.page===expected&&host.snapshot().route===arrival.from ? arrival.page : null;
  }
  function sync() {if(!host||frame)return;frame=requestAnimationFrame(()=>{frame=null;update();});}
  function restoreInert() {for(const [node,value] of inertNodes)node.inert=value;inertNodes.clear();}
  function allowOnly(element) {
    const visit=node=>{
      if(node===root||node===element||['SCRIPT','STYLE','LINK'].includes(node.tagName))return;
      if(node.contains(root)||(element&&node.contains(element))){for(const child of node.children)visit(child);return;}
      inertNodes.set(node,node.inert);node.inert=true;
    };
    for(const child of document.body.children)visit(child);
  }
  function clear() {
    restoreInert();root?.remove();root=null;target=null;panelKey='';lastTarget=null;
    document.body.classList.remove('pt-active');document.documentElement.style.removeProperty('--pt-panel-height');document.documentElement.style.removeProperty('--pt-safe-top');
  }
  function end(status) {
    tour.status=status;tour.owner=null;tour.stoppedAt=Date.now();persist();exitPrompt=false;missingReason='';
    clear();host.release();sync();
  }
  function start() {
    const s=host.snapshot();
    host.release();
    tour={...fresh(),status:'active',owner:tabId,runId:uid(),clientId:s.role==='client'?s.user.id:'client',startedAt:Date.now()};
    takeoverDismissed=false;exitPrompt=false;persist();sync();
  }
  function resume() {
    host.release();tour.status='active';tour.owner=tabId;exitPrompt=false;missingReason='';restoreKey='';persist();sync();
  }
  function reset() {clear();tour=fresh();exitPrompt=false;missingReason='';takeoverDismissed=false;restoreKey='';persist();sync();}
  function panel(title,text,buttons,mode,key,progress='') {
    if(!root){
      root=document.createElement('div');root.id='product-tour-root';
      root.innerHTML='<div class="pt-shade"></div><div class="pt-shade"></div><div class="pt-shade"></div><div class="pt-shade"></div><div class="pt-ring" aria-hidden="true"></div><section class="pt-panel" tabindex="-1"></section>';
      document.body.append(root);
    }
    const card=root.querySelector('.pt-panel');root.dataset.mode=mode;
    if(panelKey!==key){
      const focused=root.contains(document.activeElement);panelKey=key;
      card.setAttribute('role',mode==='step'?'region':'dialog');card.setAttribute('aria-labelledby','pt-title');
      if(mode==='step')card.removeAttribute('aria-modal');else card.setAttribute('aria-modal','true');
      card.innerHTML=`<div class="pt-kicker" aria-live="polite">${progress||'COTAJUNTO · DEMONSTRAÇÃO GUIADA'}<span class="pt-read-hint" hidden aria-hidden="true"> · Role o texto ↓</span></div><h2 id="pt-title">${esc(title)}</h2><div class="pt-description">${!storageOK?'<p class="pt-storage">Seu navegador não permite salvar o progresso. Você pode seguir nesta aba, mas precisará recomeçar se fechar ou atualizar a página.</p>':''}${paragraphs(text)}</div><div class="pt-actions">${buttons.map(b=>`<button type="button" class="btn ${b.secondary?'secondary':''}" data-pt-action="${b.action}" ${b.disabled?'disabled':''}>${esc(b.label)}</button>`).join('')}</div>`;
      if(mode!=='step'||focused)card.querySelector('button')?.focus({preventScroll:true});
    }
    return card;
  }
  function decorate(element,scroll=false) {
    restoreInert();target=element;allowOnly(element);document.body.classList.add('pt-active');
    layout(scroll);
  }
  function layout(scroll=false) {
    if(!root)return;
    const card=root.querySelector('.pt-panel'),vv=window.visualViewport;
    const left=vv?.offsetLeft||0,top=vv?.offsetTop||0,w=vv?.width||innerWidth,h=vv?.height||innerHeight;
    const centered=root.dataset.mode!=='step'||root.dataset.centered==='true';
    card.style.width=`${Math.min(centered?440:360,w-24)}px`;
    card.style.maxHeight=`${centered?h-24:Math.min(270,Math.max(160,h*.5))}px`;
    const ch=card.getBoundingClientRect().height,cw=card.getBoundingClientRect().width;
    document.documentElement.style.setProperty('--pt-panel-height',`${ch+24}px`);
    let cx=left+(w-cw)/2,cy=top+(h-ch)/2;
    const header=q('.topbar')?.getBoundingClientRect();
    const isHeader=target?.closest('.topbar')||target?.classList.contains('modal');
    const safeTop=Math.max(top+10,!isHeader&&header?header.bottom+10:top+10);
    document.documentElement.style.setProperty('--pt-safe-top',`${safeTop}px`);
    if(!centered){
      cy=top+h-ch-12;
      if(scroll&&target){
        const r=target.getBoundingClientRect(),available=Math.max(44,cy-safeTop-16);
        if(r.top<safeTop||r.bottom>cy-12){
          // For long forms, show the beginning and let the user scroll through it.
          target.scrollIntoView({block:'start',behavior:'instant'});
          if(!isHeader)window.scrollBy(0,target.getBoundingClientRect().top-safeTop);
          if(r.height<available&&q('#messages')?.contains(target))target.scrollIntoView({block:'center',behavior:'instant'});
        }
      }
      let r=target?.getBoundingClientRect();
      if((w>1000||w>=600&&h<500)&&r&&r.height<h*.65){
        if(r.right+cw+28<left+w){cx=r.right+16;cy=Math.max(top+12,Math.min(r.top,top+h-ch-12));}
        else if(r.left-cw-28>left){cx=r.left-cw-16;cy=Math.max(top+12,Math.min(r.top,top+h-ch-12));}
      }
    }
    card.style.left=`${cx}px`;card.style.top=`${cy}px`;
    let hole={x:left,y:top,width:0,height:0};
    if(target&&!centered){
      const r=target.getBoundingClientRect(),docked=Math.abs(cx-(left+(w-cw)/2))<1;
      const y1=Math.max(safeTop-6,r.top-5),y2=Math.min(docked?cy-10:top+h-8,r.bottom+5);
      const x1=Math.max(left+5,r.left-5),x2=Math.min(left+w-5,r.right+5);
      hole={x:x1,y:y1,width:Math.max(0,x2-x1),height:Math.max(0,y2-y1)};
    }
    const ring=root.querySelector('.pt-ring');
    Object.assign(ring.style,{left:`${hole.x}px`,top:`${hole.y}px`,width:`${hole.width}px`,height:`${hole.height}px`,display:hole.height?'block':'none'});
    const rects=hole.height?[
      [left,top,w,hole.y-top],[left,hole.y,hole.x-left,hole.height],
      [hole.x+hole.width,hole.y,left+w-hole.x-hole.width,hole.height],
      [left,hole.y+hole.height,w,top+h-hole.y-hole.height]
    ]:[[left,top,w,h],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    root.querySelectorAll('.pt-shade').forEach((node,i)=>{const [x,y,width,height]=rects[i];Object.assign(node.style,{left:`${x}px`,top:`${y}px`,width:`${Math.max(0,width)}px`,height:`${Math.max(0,height)}px`});});
    const description=card.querySelector('.pt-description');
    card.querySelector('.pt-read-hint').hidden=description.scrollTop+description.clientHeight>=description.scrollHeight-1;
  }
  function resumeEntry(s) {
    if(tour.status!=='interrupted'||s.route!=='guia'||q('[data-pt-action="resume"]'))return;
    const box=document.createElement('section');box.className='panel pt-resume';
    box.innerHTML='<h2>Continue o guia de onde parou</h2><p>Você saiu do guia, mas sua etapa e os dados da demonstração foram mantidos. Para continuar o mesmo percurso, clique em “Retomar guia”. Se preferir começar do zero, use “Reiniciar dados de teste” em Meu perfil; isso também apaga as alterações feitas nos testes.</p><button class="btn" data-pt-action="resume">Retomar guia</button>';
    q('#main .guide')?.prepend(box);
  }
  function restoreForm(s) {
    const key=`${tour.step}|${s.route}`;
    if(restoreKey===key&&restoreRoot===q('#main'))return;restoreKey=key;restoreRoot=q('#main');
    for(const [id,value] of Object.entries(tour.formDraft?.[key]||{})){
      const input=document.getElementById(id);
      if(input&&input.matches('input:not([type=file]):not([type=password]),textarea,select'))input.value=value;
    }
    const rating=Number(tour.formDraft?.[key]?.__rating);
    if(tour.step==='rate-worker'&&rating>=1&&rating<=5)q(`[data-action="rate"][data-value="${rating}"]`)?.click();
  }
  function update() {
    if(!host)return;restoreInert();const s=host.snapshot();
    if(tour.status==='new'){
      panel('Bem-vindo ao CotaJunto!','Quer conhecer preços sem visitar cada loja? A proposta do CotaJunto é conectar o Cliente, que pede um orçamento, ao Colaborador, que pesquisa os preços no estabelecimento.\n\nNeste teste, você fará os dois papéis: criará uma lista, registrará preços, conversará, corrigirá e aprovará o orçamento. Os dados e valores são fictícios. O guia espera suas ações e permite sair a qualquer momento.\n\nClique em “Iniciar demonstração” para seguir o guia ou em “Não desejo participar do guia” para explorar por conta própria.',[{action:'start',label:'Iniciar demonstração'},{action:'decline',label:'Não desejo participar do guia',secondary:true}],'welcome','welcome');decorate(null);return;
    }
    if(tour.status==='active'&&tour.owner!==tabId&&!takeoverDismissed){
      panel('Retomar a demonstração nesta aba?','Há um guia em andamento neste navegador. Você pode continuar do passo salvo, com a mesma solicitação, nesta aba. Se ele estiver aberto em outra, as instruções passarão a aparecer aqui.\n\nClique em “Continuar nesta aba” para retomar ou em “Usar esta aba sem o guia” para explorar livremente.',[{action:'takeover',label:'Continuar nesta aba'},{action:'dismiss-takeover',label:'Usar esta aba sem o guia',secondary:true}],'welcome','takeover');decorate(null);return;
    }
    if(!running()){clear();resumeEntry(s);return;}
    const arrival=tour.arrival,currentPage=typeof step().page==='function'?step().page():step().page;
    if(arrival){
      // Recover only a recorded login navigation, never an unrelated route change.
      const valid=arrival.step===tour.step&&arrival.userId===s.user?.id&&arrival.page===currentPage;
      if(valid&&s.route===arrival.from&&s.route!==arrival.page){host.navigate(arrival.page);sync();return;}
      tour.arrival=null;persist();
    }
    // Recover the binding even if refresh happened between business save and UI update.
    if(!tour.demoRequestId){const created=s.state.requests.find(r=>r.tourRunId===tour.runId&&r.client===tour.clientId);if(created){tour.demoRequestId=created.id;persist();}}
    if(tour.demoRequestId&&!req(s))missingReason='A solicitação usada no guia não foi encontrada entre os dados deste navegador. Por isso, não é possível continuar o mesmo percurso.\n\nPara começar do zero depois de sair, use “Reiniciar dados de teste” em Meu perfil. Essa opção restaura os exemplos e apaga as alterações dos testes.\n\nClique em “Sair do guia” para escolher como continuar.';
    if(req(s)?.worker&&req(s).worker!==tour.workerId)missingReason='Esta coleta foi aceita por outra conta de Colaborador. O guia não pode continuar com os participantes esperados, mas os dados do pedido foram mantidos.\n\nVocê pode explorar o aplicativo livremente ou recomeçar usando “Reiniciar dados de teste” em Meu perfil.\n\nClique em “Sair do guia” para continuar fora da demonstração guiada.';
    if(exitPrompt){
      panel('Deseja sair do guia?','Ao sair, você permanece nesta página e mantém tudo o que criou. As instruções deixam de aparecer automaticamente, mas o aplicativo continua disponível.\n\nPara retomar depois, abra “Guia da demonstração” no menu e escolha “Retomar guia”.\n\nClique em “Sair do guia” para explorar livremente ou em “Continuar no guia” para seguir nesta etapa.',[{action:'stay',label:'Continuar no guia'},{action:'exit',label:'Sair do guia',secondary:true}],'confirm','exit-confirm');decorate(null);return;
    }
    if(missingReason){panel('Este cenário precisa de atenção',missingReason,[{action:'ask-exit',label:'Sair do guia'}],'confirm','missing');decorate(null);return;}
    for(let count=0;count<steps.length;count++){
      const current=step();if(!current?.done||!current.done(s))break;advance(s);
    }
    if(!running()){clear();return;}
    // A changed external scenario must never be silently rewound or overwritten.
    const index=steps.findIndex(x=>x.id===tour.step),indexOf=id=>steps.findIndex(x=>x.id===id);
    const expectedStatus=index<=indexOf('accept-request')?'waiting':index<=indexOf('send-budget')?'collecting':index<=indexOf('adjustment-reason')?'received':index<=indexOf('resend-budget')?'adjustment':index<=indexOf('approve-budget')?'received':index<=indexOf('confirm-reward')?'approved':index<=indexOf('rate-worker')?'rewarded':'completed';
    if(req(s)&&req(s).status!==expectedStatus){
      missingReason='Este pedido mudou fora da sequência do guia, por exemplo em outra aba ou durante uma pausa. Continuar as instruções poderia repetir algo já feito. Os dados foram mantidos.\n\nVocê pode seguir usando o aplicativo ou começar do zero com “Reiniciar dados de teste” em Meu perfil.\n\nClique em “Sair do guia” para continuar fora dele.';
      sync();return;
    }
    if(tour.currentRoute!==s.route||tour.currentRole!==(s.role||null))persist();
    const current=step(),expectedPage=typeof current.page==='function'?current.page():current.page;
    const correctUser=s.user?.id===tour[current.role+'Id'];
    let element,title=current.title,text=current.text,buttons=[],mode='normal';
    if(!correctUser){
      mode='access';
      if(!s.user){
        if(s.route==='entrar')element=q(byAction('demo-'+current.role));
        else buttons.push({action:'access',label:'Ir à tela de entrada'});
        text=withAction(current.text,s.route==='entrar'?`Você está na tela de entrada. Clique em “Sou ${current.role==='client'?'Cliente':'Colaborador'}” para assumir esse papel e continuar.`:'Vamos acessar a conta que participa desta demonstração, mantendo seu progresso. Clique em “Ir à tela de entrada”.');
      }else if(s.role!==current.role){element=q('.topbar [data-action="switch"]');text=withAction(current.text,`Clique em “Trocar para ${current.role==='client'?'Cliente':'Colaborador'}”, no topo. Na entrada, o guia indicará a conta para continuar.`);}
      else if(s.route==='perfil'){element=q('#main [data-action="logout"]');text='Você está no perfil de uma conta diferente da usada neste pedido. Precisamos voltar à conta da demonstração para continuar com a mesma solicitação. Seus dados serão mantidos.\n\nClique em “Sair”. Na entrada, escolha a opção que o guia destacar.';}
      else {text='Você acessou outra conta. Para seguir com a mesma solicitação, precisamos voltar à conta que participa desta demonstração. Seu progresso está salvo.\n\nClique em “Abrir perfil”; lá você poderá sair desta conta e acessar a indicada pelo guia.';buttons.push({action:'profile',label:'Abrir perfil'});}
    }else if(expectedPage&&s.route!==expectedPage){
      mode='route';title='Continue de onde parou';
      text=`Seu progresso está salvo, mas a etapa “${current.title}” acontece em outra página. Vamos voltar a ela para continuar a mesma demonstração, com tudo o que você já fez preservado.\n\nClique em “Voltar à etapa”.`;
      buttons.push({action:'return',label:'Voltar à etapa'});
    }else{
      restoreForm(s);
      element=typeof current.target==='function'?current.target(s):current.target?q(current.target):null;
      if(current.info)buttons.push({action:'next',label:current.id==='farewell'?'Concluir guia':'Continuar',disabled:!!current.valid&&!current.valid(s)});
      if(!element&&!current.centered){mode='missing-target';text='O item indicado pelo guia não aparece nesta tela. Reabrir a etapa ajuda a recuperar a visualização necessária, sem apagar seu progresso.\n\nClique em “Reabrir etapa” para tentar novamente ou em “Sair do guia” para explorar o aplicativo.';buttons=[{action:'return',label:'Reabrir etapa'}];}
    }
    const businessModal=q('#modal-root .modal');
    if(businessModal){element=businessModal;mode='business-modal';buttons=[];text=current.id==='approve-budget'?'Esta janela confirma sua decisão de aceitar o orçamento. Após aprovar, você seguirá para a recompensa fictícia. Se escolher “Cancelar”, o orçamento continuará aguardando sua decisão.\n\nPara seguir com a demonstração, clique em “Aprovar orçamento” nesta janela.':'Uma janela do aplicativo está aberta e precisa da sua decisão antes de seguirmos. O guia mantém seu progresso enquanto você resolve essa ação.\n\nUse os botões da janela destacada para confirmar ou fechar. Se preferir parar as instruções, clique em “Sair do guia”.';}
    buttons.push({action:'ask-exit',label:'Sair do guia',secondary:true});
    const key=`${tour.step}|${mode}|${s.role}|${s.route}|${buttons[0]?.disabled}`;
    const changed=lastStep!==tour.step||lastTarget!==element;
    // Recovery/confirmation panels are supporting states, not new numbered steps.
    const numbered=mode==='normal'||(mode==='access'&&current.access&&!s.user&&s.route==='entrar');
    panel(title,text,buttons,'step',key,numbered?`Passo ${steps.indexOf(current)+1} de ${steps.length} · ${current.role==='client'?'Cliente':'Colaborador'}`:'COTAJUNTO · '+(mode==='business-modal'?'CONFIRMAÇÃO':'RETOMAR GUIA'));
    root.dataset.step=tour.step;root.dataset.context=mode;
    root.dataset.centered=String(!!current.centered&&mode==='normal');
    decorate(element,changed);lastTarget=element;lastStep=tour.step;
    if(changed&&element&&!element.contains(document.activeElement)){
      const focusable=current.info?root.querySelector('button'):element.matches('button,a,input,textarea,select')?element:element.querySelector('input:not([type=file]),button,a,select,textarea');
      if(focusable&&(!focusable.matches('input,textarea')||innerWidth>740))focusable.focus({preventScroll:true});
    }
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-pt-action]');if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();
    const a=button.dataset.ptAction;
    if(a==='start')start();
    else if(a==='decline')end('declined');
    else if(a==='ask-exit'){exitPrompt=true;sync();}
    else if(a==='stay'){exitPrompt=false;panelKey='';sync();}
    else if(a==='exit')end('interrupted');
    else if(a==='takeover'||a==='resume')resume();
    else if(a==='dismiss-takeover'){takeoverDismissed=true;clear();}
    else if(a==='profile')host.navigate('perfil');
    else if(a==='access')host.navigate('entrar');
    else if(a==='return'){
      const current=step(),page=typeof current.page==='function'?current.page():current.page;
      host.navigate(page||'inicio');sync();
    }else if(a==='next'&&running()){
      const current=step(),s=host.snapshot();
      if(current.info&&(!current.valid||current.valid(s))){advance(s);sync();}
    }
  },true);
  document.addEventListener('input',event=>{
    if(!running())return;const el=event.target;
    if(!el.id||!el.matches('input:not([type=password]):not([type=file]):not([type=radio]):not([type=checkbox]),textarea,select'))return;
    if(!/^(list-name|product-name|quantity|unit|limit|reward-value|price-.+|message|comment)$/.test(el.id))return;
    const key=`${tour.step}|${host.snapshot().route}`;
    tour.formDraft[key]||={};tour.formDraft[key][el.id]=el.value;persist();sync();
  });
  document.addEventListener('click',event=>{
    if(running()&&tour.step==='rate-worker'&&event.target.closest('[data-action="rate"]')){
      const key=`${tour.step}|${host.snapshot().route}`;tour.formDraft[key]||={};tour.formDraft[key].__rating=event.target.closest('[data-action="rate"]').dataset.value;persist();
    }
    sync();
  });document.addEventListener('change',sync);document.addEventListener('submit',sync);
  document.addEventListener('keydown',event=>{
    if(!root)return;
    if(event.key==='Escape'){
      event.preventDefault();event.stopImmediatePropagation();
      if(tour.status==='new')end('declined');
      else if(running()){exitPrompt=!exitPrompt;panelKey='';sync();}
      else {takeoverDismissed=true;clear();}
    }
    if(event.key==='Tab'){
      const controls=[...(target?.matches('button,a,input,select,textarea')?[target]:target?[...target.querySelectorAll('button,a,input,select,textarea')]:[]),...root.querySelectorAll('button')].filter(el=>!el.disabled&&!el.closest('[inert]')&&el.getBoundingClientRect().width>5);
      if(!controls.length)return;
      event.preventDefault();event.stopImmediatePropagation();
      const i=controls.indexOf(document.activeElement),next=controls[(i+(event.shiftKey?-1:1)+controls.length)%controls.length];next.focus();layout();
    }
  },true);
  window.addEventListener('storage',event=>{if(event.key===KEY){const owned=running();tour=read(event.newValue);if(owned&&tour.owner!==tabId)takeoverDismissed=true;exitPrompt=false;missingReason='';clear();sync();}});
  window.addEventListener('resize',()=>layout());window.addEventListener('scroll',()=>layout(),true);
  window.visualViewport?.addEventListener('resize',()=>layout());window.visualViewport?.addEventListener('scroll',()=>layout());
  window.CotaJuntoTour=Object.freeze({
    connect(api){host=api;new MutationObserver(sync).observe(q('#app'),{childList:true,subtree:true});new MutationObserver(sync).observe(q('#modal-root'),{childList:true,subtree:true});sync();},
    sync,reset,afterLogin,arrivalPage,isRunning:running,
    accessUserId:role=>running()?tour[role+'Id']:null,
    switchUserId:()=>running()?tour[host.snapshot().role==='client'?'workerId':'clientId']:null,
    requestTag:()=>running()&&tour.step==='confirm-request'&&!tour.demoRequestId?{tourRunId:tour.runId}:{}
  });
})();
