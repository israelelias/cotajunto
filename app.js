'use strict';
/* CotaJunto — aplicação estática, sem dependências e sem transações reais. */
(() => {
  const KEY = 'cotajunto.v1';
  const SESSION = 'cotajunto.session';
  const THEME = 'cotajunto.theme';
  const SWITCH_INTENT = 'cotajunto.switch-intent';
  const DEMO_PASSWORD = 'demo1234';
  const app = document.getElementById('app');
  const icons = {
    home:'M3 10 12 3l9 7v10H3z M9 20v-7h6v7', list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', user:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2', users:'M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0M5 20v-2a7 7 0 0 1 14 0v2M18 3a3 3 0 0 1 0 6M2 8a3 3 0 0 1 4-4', plus:'M12 5v14M5 12h14', arrow:'M5 12h14m-5-5 5 5-5 5', back:'M19 12H5m5-5-5 5 5 5', chevron:'m9 5 7 7-7 7', check:'m5 12 4 4L19 6', clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 7v5l3 2', bag:'M4 7h16l-2 14H6zM8 7V5a4 4 0 0 1 8 0v2', bell:'M5 9a7 7 0 0 1 14 0v5l2 3H3l2-3zM10 21h4', switch:'M4 7h15l-4-4M20 17H5l4 4', logout:'M9 4H4v16h5M9 12h12m-4-4 4 4-4 4', help:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M9 9a3 3 0 1 1 4 3c-1 1-1 1-1 3M12 18h.01', pin:'M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0M14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0', store:'M3 9V4h18v5M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M4 12v9h16v-9M9 21v-7h6v7', chat:'M21 4H3v14h5l4 4v-4h9zM7 9h10M7 13h6', camera:'M3 7h4l2-3h6l2 3h4v14H3zM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0', photo:'M3 3h18v18H3zM3 17l6-6 4 4 3-3 5 5M16 7h.01', trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7', edit:'m4 16 12-12 4 4L8 20H4zM13 7l4 4', menu:'M4 6h16M4 12h16M4 18h16', close:'m6 6 12 12M6 18 18 6', search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-2 5 6 6', star:'m12 2 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z', gift:'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-8 0-7-7-3-5 2 1 3 5 3 5s1-4 3-5c4-2 5 5-3 5', info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 11v6M12 7h.01', leaf:'M20 3C7 2 2 10 6 16c6 7 15-1 14-13M4 21 16 8', send:'m3 3 19 9-19 9 4-9zM7 12h15', refresh:'M20 8a9 9 0 1 0 1 8M20 3v5h-5', shield:'m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6zM8 12l3 3 5-6', eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0'
  };
  const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons.list}"/></svg>`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = n => Number(n || 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const number = n => Number(n || 0).toLocaleString('pt-BR',{maximumFractionDigits:2});
  const date = n => new Date(n).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
  const id = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const intials = name => name.trim().split(/\s+/).map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const emoji = name => /leite|iogurte/i.test(name)?'🥛':/arroz|farinha/i.test(name)?'🌾':/pão|pao/i.test(name)?'🍞':/tomate/i.test(name)?'🍅':/maçã|maca/i.test(name)?'🍎':/feijão|feijao/i.test(name)?'🫘':/café|cafe/i.test(name)?'☕':'🛒';
  const stores = [
    {id:'dia',name:'Atacadão Dia a Dia',address:'Unidade de demonstração · Empresa parceira do projeto'},
    {id:'bairro',name:'Mercado do Bairro',address:'Estabelecimento fictício · Cenário de teste'},
    {id:'verde',name:'Supermercado Verde',address:'Estabelecimento fictício · Cenário de teste'}
  ];
  const labels = {waiting:'Aguardando colaborador',collecting:'Em coleta',received:'Orçamento pronto',adjustment:'Ajuste solicitado',approved:'Aprovado',rewarded:'Recompensa simulada',completed:'Concluído'};
  const storeName = r => stores.find(s=>s.id===r.store)?.name || 'Local não definido';
  const total = r => Math.round(r.items.filter(i=>!i.unavailable).reduce((s,i)=>s+(Number(i.price)||0)*i.quantity,0)*100)/100;
  const collected = r => r.items.filter(i=>i.unavailable || (i.done && i.price>0)).length;
  const statusPill = r => `<span class="pill ${esc(r.status)}"><span class="status-dot"></span>${labels[r.status] || 'Em andamento'}</span>`;
  const btn = (label, action, cls='', attrs='') => `<button class="btn ${cls}" data-action="${action}" ${attrs}>${label}</button>`;
  const link = (label, href, cls='') => `<a class="btn ${cls}" href="#/${href}">${label}</a>`;
  const brand = cls => `<a class="brand ${cls||''}" href="#/inicio" aria-label="CotaJunto início"><img src="assets/logo.svg" alt="">CotaJunto<span class="dot">.</span></a>`;
  const notice = (text,cls='') => `<div class="notice ${cls}">${icon('info')}<div>${text}</div></div>`;
  const empty = (title,text,cta='') => `<div class="empty">${icon('list')}<h3>${title}</h3><p>${text}</p>${cta}</div>`;
  function seed() {
    const now=Date.now();
    const makeItems = (priced=false) => [
      {id:'milk',name:'Leite integral',quantity:2,unit:'un',limit:8,price:priced?6:null,done:priced,photo:null,unavailable:false},
      {id:'rice',name:'Arroz tipo 1 · 5 kg',quantity:1,unit:'pacote',limit:30,price:priced?25:null,done:priced,photo:null,unavailable:false},
      {id:'beans',name:'Feijão carioca · 1 kg',quantity:2,unit:'pacote',limit:10,price:priced?8.5:null,done:priced,photo:null,unavailable:false},
      {id:'bread',name:'Pão de forma',quantity:1,unit:'pacote',limit:9,price:priced?7.9:null,done:priced,photo:null,unavailable:false}
    ];
    return {version:1,users:[{id:'client',name:'Marina Alves',email:'cliente@teste.com',role:'client'},{id:'worker',name:'João Silva',email:'colaborador@teste.com',role:'worker'}],drafts:{},requests:[
      {id:'CJ-1003',name:'Compra da semana',client:'client',worker:null,store:'dia',items:makeItems(),status:'waiting',reward:5,created:now-3600000,updated:now-3600000,declined:[],messages:[],rating:null,paid:false,revision:0},
      {id:'CJ-1002',name:'Despensa de casa',client:'client',worker:'worker',store:'bairro',items:makeItems(true).slice(0,2),status:'received',reward:5,created:now-86400000,updated:now-1800000,declined:[],messages:[{id:'welcome',author:'worker',text:'Olá, Marina! Conferi os preços da sua lista. O orçamento está pronto para você revisar.',time:now-1800000}],rating:null,paid:false,revision:1},
      {id:'CJ-1001',name:'Café da manhã',client:'client',worker:'worker',store:'verde',items:makeItems(true).filter(i=>i.id!=='beans'&&i.id!=='rice'),status:'completed',reward:5,created:now-172800000,updated:now-86400000,declined:[],messages:[],rating:{score:5,comment:'Obrigada pela ajuda!'},paid:true,revision:1}
    ]};
  }
  let persistent=true, session=null;
  let state;
  try { const raw=JSON.parse(localStorage.getItem(KEY)); state=raw?.version===1 && Array.isArray(raw.users) && Array.isArray(raw.requests) && raw.drafts ? raw : seed(); }
  catch { state=seed(); }
  // Upgrade only the known legacy adjustment event, preserving lists and prices.
  // Older builds wrote this event before asking the Client for a reason.
  for (const request of state.requests) {
    if (request.status !== 'adjustment') continue;
    const marker = request.messages.map(m=>m.text).lastIndexOf('O Cliente solicitou um ajuste. Use esta conversa para esclarecer o pedido.');
    if (marker < 0) continue;
    const reason = request.messages.slice(marker + 1).find(m=>m.author===request.client && m.text.trim());
    if (reason) {
      reason.kind = 'adjustment';
      reason.revision = request.revision;
    } else {
      request.status = 'received';
      request.messages[marker].text = 'O pedido de ajuste anterior não foi confirmado: nenhuma justificativa foi enviada. O orçamento está disponível para revisão.';
    }
  }
  try {session=JSON.parse(sessionStorage.getItem(SESSION));}catch{}
  if(session && !state.users.some(u=>u.id===session.id)) session=null;
  let ui={filter:'all',search:'',menu:false,notifications:false,rating:0,editing:null};
  let toastTimer, tourTimer;
  let switchIntent = null;
  try { switchIntent = JSON.parse(sessionStorage.getItem(SWITCH_INTENT)); } catch {}
  if (!['client','worker'].includes(switchIntent?.role)) switchIntent = null;
  let theme = 'light';
  try { theme = localStorage.getItem(THEME) === 'dark' ? 'dark' : 'light'; } catch {}

  function themeButton() {
    return `<button class="icon-btn theme-toggle" data-action="theme" aria-label="${theme==='dark'?'Ativar modo claro':'Ativar modo escuro'}" title="${theme==='dark'?'Ativar modo claro':'Ativar modo escuro'}" aria-pressed="${theme==='dark'}"><span aria-hidden="true">${theme==='dark'?'☀':'☾'}</span></button>`;
  }
  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme==='dark' ? '#111e19' : '#153f36';
    document.querySelectorAll('.theme-toggle').forEach(button => { button.outerHTML = themeButton(); });
  }
  function clearSwitchIntent() {
    switchIntent = null;
    try { sessionStorage.removeItem(SWITCH_INTENT); } catch {}
  }
  function dismissTour() {
    clearTimeout(tourTimer);
    document.querySelectorAll('.tour-backdrop,.tour-panel').forEach(el=>el.remove());
    document.querySelectorAll('[data-tour-inert]').forEach(el=>{el.inert=false;delete el.dataset.tourInert;});
    const target = document.querySelector('.tour-target');
    target?.classList.remove('tour-target');
    target?.removeAttribute('aria-describedby');
  }
  function showSwitchTour() {
    if (window.CotaJuntoTour?.isRunning()) return;
    if (!switchIntent) return;
    const target = app.querySelector(`[data-action="demo-${switchIntent.role}"]`);
    if (!target) return;
    target.classList.add('tour-target');
    target.setAttribute('aria-describedby','tour-tip');
    app.insertAdjacentHTML('beforeend', `<div class="tour-backdrop" data-action="dismiss-tour"></div><div class="tour-panel" role="region" aria-label="Orientação para trocar de perfil"><div id="tour-tip"><strong>Agora, escolha ${switchIntent.role==='worker'?'Sou Colaborador':'Sou Cliente'}.</strong><p>Você saiu do perfil anterior. Clique na opção destacada para concluir a troca.</p></div><button class="btn secondary small" data-action="dismiss-tour">Entendi</button></div>`);
    document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{
      if(el!==target && !el.closest('.tour-panel') && !el.inert){el.inert=true;el.dataset.tourInert='true';}
    });
    target.scrollIntoView({block:'center',behavior:'instant'});
    target.focus({preventScroll:true});
    // The guidance is temporary; dismissing it never logs in automatically.
    tourTimer=setTimeout(dismissTour,15000);
  }
  applyTheme();
  const user = () => state.users.find(u=>u.id===session?.id);
  const role = () => user()?.role;
  const ownRequests = () => role()==='worker' ? workerCollections().all : state.requests.filter(r=>r.client===user()?.id);
  const getRequest = rid => state.requests.find(r=>r.id===rid && (role()==='client'?r.client===user()?.id:r.worker===user()?.id || (r.status==='waiting'&&!r.declined.includes(user()?.id))));
  const draft = () => state.drafts[user()?.id];
  const backHome = () => 'inicio';
  function toast(text) { const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4200); }
  function save(next=state) {
    try {localStorage.setItem(KEY,JSON.stringify(next));state=next;window.CotaJuntoTour?.sync();return true;}
    catch(e) {
      if(e.name==='QuotaExceededError') {toast('Espaço local insuficiente. Remova fotos de outro pedido ou reinicie o cenário.');return false;}
      persistent=false;state=next;window.CotaJuntoTour?.sync();toast('Armazenamento indisponível. Os dados permanecerão apenas nesta aba.');return true;
    }
  }
  function change(mutator) { const next=JSON.parse(JSON.stringify(state));mutator(next);return save(next); }
  function mutateRequest(rid,mutator) {return change(s=>{const r=s.requests.find(x=>x.id===rid);if(r){mutator(r);r.updated=Date.now();}});}
  function login(uid) {
    const u=state.users.find(x=>x.id===uid);if(!u)return;
    const intent=switchIntent;
    session={id:uid};try{sessionStorage.setItem(SESSION,JSON.stringify(session));}catch{}
    clearSwitchIntent();dismissTour();
    ui.filter='all';ui.search='';ui.notifications=false;ui.menu=false;
    const r=intent?.role===u.role ? getRequest(intent.rid) : null;
    // An explicit tour access has its own destination; free navigation keeps its defaults.
    const guidedPage=window.CotaJuntoTour?.afterLogin(uid);
    go(guidedPage || (u.role==='worker' ? 'inicio' : r ? (intent.chat&&r.worker ? `chat/${r.id}` : routeFor(r,u)) : 'inicio'));
  }
  function logout() {clearSwitchIntent();dismissTour();session=null;try{sessionStorage.removeItem(SESSION);}catch{}ui.menu=false;go('entrar');}
  function go(path) {if(location.hash===`#/${path}`)render();else location.hash=`/${path}`;}
  function routeFor(r,u=user()) {
    if(u.role==='client')return `pedido/${r.id}`;
    if(r.status==='waiting')return `tarefa/${r.id}`;
    if(['collecting','adjustment'].includes(r.status))return `coleta/${r.id}`;
    return r.paid?`recebimento/${r.id}`:`pedido/${r.id}`;
  }
  function systemMessage(r,text) {r.messages.push({id:id('m'),author:'system',text,time:Date.now()});}
  function modal(title,body,confirm,callback,danger=false) {
    const root=document.getElementById('modal-root'), prev=document.activeElement;
    root.innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><h2 id="modal-title">${esc(title)}</h2>${body}<div class="actions"><button class="btn secondary" id="modal-cancel">${confirm?'Cancelar':'Fechar'}</button>${confirm?`<button class="btn ${danger?'danger':''}" id="modal-confirm">${esc(confirm)}</button>`:''}</div></section></div>`;
    const close=()=>{root.innerHTML='';document.removeEventListener('keydown',key);prev?.focus();};
    const key=e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const a=[...root.querySelectorAll('button,a,input')];if(e.shiftKey&&document.activeElement===a[0]){e.preventDefault();a.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===a.at(-1)){e.preventDefault();a[0].focus();}}};
    document.addEventListener('keydown',key);
    root.querySelector('#modal-cancel').onclick=close;
    if(confirm)root.querySelector('#modal-confirm').onclick=()=>{close();callback();};
    root.querySelector('.modal-backdrop').onclick=e=>{if(e.target.classList.contains('modal-backdrop'))close();};
    root.querySelector('button').focus();
  }
  function beginDraft() {
    if(!draft()) change(s=>{s.drafts[user().id]={name:'',store:'dia',items:[],reward:5};});
    ui.editing=null;go('nova');
  }
  function heading(title,subtitle='',action='') {return `<div class="page-heading"><div><h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div>${action}</div>`;}
  function breadcrumb(label,back=backHome()) {return `<div class="breadcrumb"><a href="#/${back}">${icon('back')} Voltar</a>${icon('chevron')}<span>${esc(label)}</span></div>`;}
  function auth(page) {
    const register=page==='cadastro', recover=page==='recuperar';
    return `<div class="auth-layout"><section class="auth-story">${brand()}<span class="eyebrow">Planeje melhor. Compre com clareza.</span><h1>Uma lista.<br>Uma ajuda.<br><span>Boas escolhas.</span></h1><p>Conectamos quem precisa de um orçamento a quem pode conferir os preços de perto.</p><div class="story-visual"><div class="sample-budget"><div class="row spaced"><strong>Compra da semana</strong>${icon('bag')}</div><div class="product-line"><span>🥛</span><span class="grow">Leite integral · 2 un</span><strong>R$ 12,00</strong></div><div class="product-line"><span>🌾</span><span class="grow">Arroz · 1 pacote</span><strong>R$ 25,00</strong></div><div class="row spaced" style="padding-top:12px"><small>Total dos produtos</small><div class="total">R$ 37,00</div></div></div><div class="floating-avatar"><span class="avatar worker">JS</span><span><strong>Orçamento pronto!</strong><br>João terminou a coleta.</span>${icon('check')}</div></div><footer>Projeto Integrador III · Atividade Avaliativa 01<br>Todos os dados e valores desta demonstração são fictícios.</footer></section><main id="main" class="auth-form-area"><div class="auth-form"><div class="auth-tools">${themeButton()}</div><span class="pill demo">${icon('shield')} PROTÓTIPO ACADÊMICO</span><h2>${register?'Crie seu acesso de teste':recover?'Recuperar acesso':'Bem-vindo ao CotaJunto'}</h2><p class="sub">${register?'Explore o aplicativo com uma identidade fictícia.':recover?'Este é um ambiente de demonstração.':'Escolha um perfil para experimentar o fluxo completo.'}</p>
    ${!register&&!recover?`<div class="demo-choices"><button class="demo-choice" data-action="demo-client">${icon('bag')}<strong>Sou Cliente ${icon('arrow')}</strong><small>Crie e acompanhe listas</small></button><button class="demo-choice" data-action="demo-worker">${icon('users')}<strong>Sou Colaborador ${icon('arrow')}</strong><small>Confira e envie preços</small></button></div><div class="or">ou use um acesso de demonstração</div>`:''}
    <form id="${register?'register-form':recover?'recover-form':'login-form'}">
    ${register?'<div class="field"><label for="name">Nome fictício</label><input id="name" name="name" placeholder="Como podemos chamar você?" required maxlength="60" autocomplete="off"></div>':''}
    <div class="field"><label for="email">E-mail ${register?'fictício':''}</label><input id="email" name="email" type="email" placeholder="cliente@teste.com" required maxlength="100" autocomplete="off"></div>
    ${!recover?`<div class="field"><label for="password">Senha de demonstração</label><div class="password-row"><input id="password" name="password" type="password" ${register?'value="demo1234" readonly':'placeholder="demo1234"'} required autocomplete="off"><button type="button" data-action="password" aria-label="Mostrar ou ocultar senha">${icon('eye')}</button></div><small>Senha fictícia: <strong>demo1234</strong>. Não use sua senha real.</small></div>`:''}
    ${register?'<div class="field"><label for="confirm-password">Confirme a senha fictícia</label><input id="confirm-password" name="confirm" type="password" placeholder="Digite demo1234" required autocomplete="off"></div><div class="field"><label for="role">Quero testar como</label><select name="role" id="role"><option value="client">Cliente</option><option value="worker">Colaborador</option></select></div>':''}
    ${!register&&!recover?'<div style="text-align:right;margin-top:-10px;margin-bottom:16px"><a class="text-sm" href="#/recuperar">Esqueci minha senha</a></div>':''}
    <div class="form-error" role="alert" id="form-error"></div><button class="btn block" type="submit">${register?'Criar conta fictícia':recover?'Ver instruções de acesso':'Entrar'} ${icon('arrow')}</button></form>
    ${!register&&!recover?`${btn('Entrar com Google · simulação','google','secondary block','style="margin-top:11px"')}<div class="auth-bottom">Primeira vez aqui? <a href="#/cadastro">Criar conta de teste</a></div>`:'<div class="auth-bottom"><a href="#/entrar">Voltar para o acesso</a></div>'}
    ${notice('Nenhum dado é enviado a um servidor. Chat, contas e recompensas são simulados neste navegador.')}<div class="auth-bottom"><a href="#/guia">Como testar o protótipo ${icon('arrow')}</a></div></div></main></div>`;
  }
  function shell(content,page) {
    const u=user(),client=u.role==='client',active=(...pages)=>pages.includes(page)?'active':'';
    const items=ownRequests(),notifs=items.filter(r=>client?['received','adjustment','rewarded'].includes(r.status):['waiting','approved','rewarded','adjustment'].includes(r.status));
    return `${ui.menu?'<div class="nav-scrim" data-action="menu"></div>':''}<aside class="sidebar ${ui.menu?'open':''}">${brand()}<div class="nav-label">SEU ESPAÇO</div><nav class="nav" aria-label="Navegação principal"><a class="${active('inicio')}" href="#/${backHome()}">${icon('home')}${client?'Visão geral':'Início'}</a><a class="${active('listas','coletas','pedido','tarefa','coleta','recompensa','recebimento','avaliar','chat')}" href="#/${client?'listas':'coletas'}">${icon('list')}${client?'Minhas listas':'Minhas coletas'}<span class="count">${items.length}</span></a><a class="${active('perfil')}" href="#/perfil">${icon('user')}Meu perfil</a><a class="${active('guia')}" href="#/guia">${icon('help')}Guia da demonstração</a></nav><div class="sidebar-bottom"><div class="demo-card">${icon('leaf')}<h3>Colaboração que faz sentido</h3><p>Uma lista, preços conferidos e mais clareza para decidir.</p><a class="link-btn" href="#/guia">Entenda o projeto ${icon('arrow')}</a></div><div class="sidebar-user"><span class="avatar ${client?'':'worker'}">${esc(intials(u.name))}</span><div class="grow"><strong>${esc(u.name.split(' ')[0])}</strong><small>${client?'Cliente':'Colaborador'}</small></div><button class="icon-btn" aria-label="Sair da demonstração" title="Sair" data-action="logout">${icon('logout')}</button></div></div></aside><div class="workspace"><header class="topbar"><div class="top-left"><button class="icon-btn menu-toggle" data-action="menu" aria-label="Abrir menu" aria-expanded="${ui.menu}">${icon('menu')}</button>${brand('mobile-brand')}<span class="profile-indicator">${icon(client?'bag':'users')} Área do ${client?'Cliente':'Colaborador'}</span></div><div class="top-actions"><span class="pill demo">Demonstração</span>${themeButton()}<button class="switch" data-action="switch">${icon('switch')}<span class="switch-label">Trocar para </span>${client?'Colaborador':'Cliente'}</button><div class="notif-wrap"><button class="icon-btn" data-action="notifications" aria-label="Notificações" aria-expanded="${ui.notifications}">${icon('bell')}${notifs.length?'<span class="notification-dot"></span>':''}</button>${ui.notifications?`<div class="notify-menu"><h3>Atualizações da demonstração</h3><div class="notification-list">${notifs.length?notifs.map(r=>`<a href="#/${routeFor(r)}"><strong>${esc(r.name)}</strong><small>${labels[r.status]} · ${date(r.updated)}</small></a>`).join(''):'<p class="muted text-sm" style="padding:18px">Nenhuma atualização no momento.</p>'}</div></div>`:''}</div><span class="avatar ${client?'':'worker'}">${esc(intials(u.name))}</span></div></header><main class="main" id="main">${!persistent?notice('Armazenamento indisponível: alterações serão perdidas ao fechar esta aba.','warning'):''}${content}<footer class="footer-note">CotaJunto · Protótipo acadêmico · Sem pagamentos reais · Dados locais neste navegador</footer></main></div>`;
  }
  function card(r) {
    const worker=role()==='worker';
    const action=r.status==='waiting'?'Ver coleta':['collecting','adjustment'].includes(r.status)?'Continuar coleta':r.paid?'Ver recebimento':'Ver orçamento';
    return `<a class="request-card" href="#/${routeFor(r)}"><div class="row spaced">${statusPill(r)}<span class="text-sm muted">${date(r.created)}</span></div><h3>${esc(r.name)}</h3><div class="meta">${icon('pin')}${esc(storeName(r))}</div><div class="product-icons" aria-hidden="true">${r.items.slice(0,4).map(i=>`<span class="product-icon">${emoji(i.name)}</span>`).join('')}${r.items.length>4?`<span class="product-icon text-sm">+${r.items.length-4}</span>`:''}</div>${worker?`<div class="collection-card-meta"><span>${r.status==='waiting'?`${r.items.length} produtos`:`${collected(r)} de ${r.items.length} produtos resolvidos`}</span><span>Recompensa fictícia <strong>${money(r.reward)}</strong></span></div><div class="card-footer"><strong class="card-action">${action}</strong>${icon('arrow')}</div>`:`<div class="card-footer"><span>${r.items.length} ${r.items.length===1?'item':'itens'} na lista</span><div class="row">${r.revision>0?`<strong>${money(total(r))}</strong>`:'<span>Ver detalhes</span>'}${icon('arrow')}</div></div>`}</a>`;
  }
  function sideGuide() {return `<aside class="stack"><div class="panel"><div class="row">${icon('help')}<h3>Como funciona</h3></div><ol class="mini-steps"><li><span class="step-n">1</span><div><strong>Monte sua lista</strong><p>Informe produtos, quantidades e local.</p></div></li><li><span class="step-n">2</span><div><strong>Alguém confere por você</strong><p>O colaborador registra preços e fotos.</p></div></li><li><span class="step-n">3</span><div><strong>Receba e decida</strong><p>Revise, aprove e avalie a experiência.</p></div></li></ol></div><div class="tip-card">${icon('leaf')}<h3>O detalhe faz a diferença.</h3><p>Inclua a marca e a embalagem no nome do item. Assim, o colaborador sabe exatamente o que procurar.</p></div></aside>`;}
  function dashboard() {
    const all=ownRequests(),active=all.filter(r=>!r.paid),ready=all.filter(r=>r.status==='received').length;
    return `${heading(`Olá, ${esc(user().name.split(' ')[0])} <span style="font-size:26px">☀</span>`,'Seu próximo orçamento começa com uma lista.',btn(icon('plus')+' Nova lista','new'))}<section class="hero"><div><span class="eyebrow" style="color:#b9d698">MENOS INCERTEZA, MAIS CLAREZA</span><h2 style="margin-top:9px">Os preços certos,<br>com uma mão amiga.</h2><p>Crie uma lista e conte com um colaborador para conferir os preços no estabelecimento.</p>${btn('Criar meu orçamento '+icon('arrow'),'new')}</div><div class="hero-illustration" aria-hidden="true"><div class="hero-orbit"></div><div class="receipt">${icon('bag')}<span></span><span></span><span></span><strong>Vamos juntos.</strong></div><div class="floating-check">${icon('check')}</div></div></section><div class="three-col metrics">${metric(active.length,'Em andamento','clock')}${metric(ready,'Prontos para revisar','check')}${metric(all.filter(r=>r.paid).length,'Concluídos','bag')}</div><div class="grid-main"><div><div class="section-title" style="margin-top:0"><h2>Suas listas recentes</h2><a class="link-btn" href="#/listas">Ver todas ${icon('arrow')}</a></div><div class="two-col">${all.slice().sort((a,b)=>b.created-a.created).slice(0,4).map(card).join('')||empty('Tudo começa com uma lista','Crie seu primeiro orçamento de demonstração.',btn('Criar lista','new'))}</div><div style="margin-top:22px">${notice('Para testar a colaboração, use <strong>Trocar para Colaborador</strong> no topo. Os dois perfis compartilham os pedidos deste navegador.')}</div></div>${sideGuide()}</div>`;
  }
  function metric(n,label,ic) {return `<div class="metric"><div class="metric-icon">${icon(ic)}</div><div><strong>${n}</strong><span>${label}</span></div></div>`;}
  // A single classification feeds the overview, filters, counters and earnings.
  const collectionFilters = [
    {key:'all',slug:'',label:'Todas'},
    {key:'waiting',slug:'disponiveis',label:'Disponíveis'},
    {key:'active',slug:'em-andamento',label:'Em andamento'},
    {key:'done',slug:'concluidas',label:'Concluídas'}
  ];
  const collectionRoute = key => {
    const filter=collectionFilters.find(f=>f.key===key)||collectionFilters[0];
    return `coletas${filter.slug?'/'+filter.slug:''}`;
  };
  function workerCollections(uid=user()?.id) {
    const assigned=state.requests.filter(r=>r.worker===uid);
    const waiting=state.requests.filter(r=>r.status==='waiting'&&!r.worker&&!r.declined.includes(uid));
    const active=assigned.filter(r=>!r.paid);
    const done=assigned.filter(r=>r.paid);
    const ratings=assigned.filter(r=>Number.isFinite(r.rating?.score)&&r.rating.score>=1&&r.rating.score<=5);
    const sumRewards=rows=>rows.reduce((sum,r)=>sum+Math.round(Number(r.reward||0)*100),0)/100;
    return {
      all:state.requests.filter(r=>assigned.includes(r)||waiting.includes(r)), waiting, active, done, ratings,
      balance:sumRewards(done),pending:sumRewards(active),
      average:ratings.length?ratings.reduce((sum,r)=>sum+r.rating.score,0)/ratings.length:null
    };
  }
  const ratingText = average => average===null?'Sem avaliações':average.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
  function workerDashboard() {
    const data=workerCollections();
    const priority={adjustment:0,collecting:1,received:2,approved:3};
    const active=data.active.slice().sort((a,b)=>(priority[a.status]??4)-(priority[b.status]??4)||b.updated-a.updated);
    const available=data.waiting.slice().sort((a,b)=>b.created-a.created);
    const summary=(key,label,ic)=>`<a class="metric collection-shortcut" href="#/${collectionRoute(key)}" aria-label="${data[key].length} coletas ${label.toLowerCase()}"><div class="metric-icon">${icon(ic)}</div><div><strong data-count="${key}">${data[key].length}</strong><span>${label}</span></div>${icon('arrow')}</a>`;
    const previews=(title,rows,key,action,emptyTitle,emptyText)=>`<section class="dashboard-section"><div class="section-title"><h2>${title}</h2><a class="link-btn" href="#/${collectionRoute(key)}">${action} ${icon('arrow')}</a></div><div class="two-col">${rows.slice(0,2).map(card).join('')||`<div class="panel preview-empty">${empty(emptyTitle,emptyText)}</div>`}</div></section>`;
    return `${heading(`Olá, ${esc(user().name.split(' ')[0])}!`,'Uma visão geral das suas recompensas e da sua colaboração.',link('Minhas coletas '+icon('arrow'),'coletas','secondary'))}
      <div class="three-col worker-finances">
        <section class="panel finance-card balance-card"><div class="row">${icon('gift')}<h2>Saldo disponível</h2></div><strong class="finance-value" id="worker-balance">${money(data.balance)}</strong><p>Recompensas confirmadas pelo Cliente.</p><span class="pill demo">Saldo fictício · sem saque real</span></section>
        <section class="panel finance-card"><div class="row">${icon('clock')}<h2>Ganhos em andamento</h2></div><strong class="finance-value" id="worker-pending">${money(data.pending)}</strong><p>Estimativa das coletas aceitas, ainda sem recompensa confirmada.</p><a class="link-btn" href="#/${collectionRoute('active')}">Acompanhar ganhos ${icon('arrow')}</a></section>
        <section class="panel finance-card"><div class="row">${icon('star')}<h2>Sua avaliação</h2></div><strong class="finance-value rating-value" id="worker-rating">${data.average===null?'—':ratingText(data.average)}</strong><p>${data.ratings.length?`${data.ratings.length} ${data.ratings.length===1?'avaliação recebida':'avaliações recebidas'} · média de 1 a 5`:'Você ainda não recebeu avaliações.'}</p><a class="link-btn" href="#/perfil">Ver avaliações ${icon('arrow')}</a></section>
      </div>
      ${notice('Valores fictícios para demonstração. O saldo considera recompensas já confirmadas; os ganhos em andamento dependem da conclusão e da aprovação do Cliente. Não há saque ou transferência real.')}
      <section aria-labelledby="collection-summary-title"><div class="section-title"><h2 id="collection-summary-title">Resumo das coletas</h2><a class="link-btn" href="#/coletas">Ver todas ${icon('arrow')}</a></div><div class="three-col collection-summary">${summary('waiting','Disponíveis','bag')}${summary('active','Em andamento','clock')}${summary('done','Concluídas','check')}</div></section>
      <div class="dashboard-previews">${previews('Em andamento',active,'active','Continuar','Nenhuma coleta em andamento','Aceite uma coleta disponível para começar sua próxima colaboração.')}
      ${previews('Coletas disponíveis',available,'waiting','Ver todas','Nenhuma coleta disponível','Novas solicitações aparecerão aqui quando forem criadas pelo Cliente.')}</div>`;
  }
  function listing(isWorker=false) {
    const filter=isWorker?(collectionFilters.find(f=>f.slug===(current().rid||''))||collectionFilters[0]).key:ui.filter;
    const all=isWorker?workerCollections()[filter]:ownRequests().filter(r=>filter==='active'?!r.paid:filter==='done'?r.paid:true);
    const eligible=all.filter(r=>(r.name+' '+storeName(r)).toLowerCase().includes(ui.search.toLowerCase()));
    const filters=isWorker?collectionFilters.map(f=>[f.key,f.label]):[['all','Todas'],['active','Em andamento'],['done','Concluídas']];
    return `${heading(isWorker?'Minhas coletas':'Minhas listas',isWorker?'Encontre, acompanhe e gerencie suas coletas em um só lugar.':'Cada orçamento, do primeiro item à última decisão.',!isWorker?btn(icon('plus')+' Nova lista','new'):'')}<div class="filter-bar"><div class="tabs" role="group" aria-label="${isWorker?'Filtrar coletas':'Filtrar listas'}">${filters.map(([v,l])=>`<button data-action="filter" data-value="${v}" class="${filter===v?'active':''}" aria-pressed="${filter===v}">${l}</button>`).join('')}</div><div class="search">${icon('search')}<input class="input" id="search" aria-label="Buscar por lista ou local" placeholder="Buscar lista ou local" value="${esc(ui.search)}"></div></div><div class="two-col" id="results">${eligible.map(card).join('')||`<div class="panel" style="grid-column:1/-1">${empty(isWorker?'Nenhuma coleta por aqui':'Nenhuma lista por aqui','Tente outro filtro ou crie uma nova solicitação no perfil Cliente.')}</div>`}</div>${isWorker?`<div style="margin-top:23px">${notice('As coletas concluídas têm recompensa fictícia confirmada pelo Cliente, mesmo quando a avaliação ainda está pendente. Recusar uma coleta encerra apenas sua participação nela.')}</div>`:''}`;
  }
  function workerProfileDetails() {
    const data=workerCollections(),recent=data.ratings.slice().sort((a,b)=>b.updated-a.updated).slice(0,5);
    return `<section class="panel profile-card profile-history"><h2>Avaliações recebidas</h2><p class="muted text-sm">${data.ratings.length?`${data.ratings.length} ${data.ratings.length===1?'avaliação registrada':'avaliações registradas'}. Histórico mais recente abaixo.`:'Sua reputação começa com a primeira avaliação de um Cliente.'}</p>${recent.length?`<ul class="review-list">${recent.map(r=>`<li><div class="row spaced"><strong>${esc(r.name)}</strong><span>${icon('star')} ${r.rating.score}/5</span></div><p>${r.rating.comment?esc(r.rating.comment):'Avaliação sem comentário.'}</p><a class="link-btn" href="#/${routeFor(r)}">Consultar coleta ${icon('arrow')}</a></li>`).join('')}</ul>`:''}<div class="divider"></div><h3>Histórico da participação</h3><p class="muted text-sm">Consulte as coletas concluídas e seus recebimentos fictícios em Minhas coletas. Saldos e atividades atuais ficam no Início.</p><div class="actions profile-history-actions">${link('Consultar histórico',collectionRoute('done'),'secondary')}${link('Voltar ao Início','inicio','secondary')}</div></section>`;
  }
  function steps(n) {return `<div class="progress-steps">${['Sua lista','Escolher local','Confirmar'].map((x,i)=>`${i?'<span class="step-line"></span>':''}<div class="progress-step ${i<n?'done':i===n?'active':''}"><span>${i<n?'✓':i+1}</span>${x}</div>`).join('')}</div>`;}
  function draftSummary(d) {return `<aside class="panel summary"><h2 style="font-size:18px">Resumo da lista</h2><dl><div><dt>Produtos</dt><dd>${d.items.length}</dd></div><div><dt>Local</dt><dd>${esc(stores.find(s=>s.id===d.store)?.name||'A escolher')}</dd></div><div><dt>Recompensa fictícia</dt><dd id="draft-reward-summary">${money(d.reward??5)}</dd></div></dl>${notice('Os preços serão preenchidos pelo Colaborador. O limite por item é apenas uma referência unitária.')}<div class="divider"></div><p class="muted text-sm">A recompensa é uma simulação acadêmica. Nenhum valor será cobrado.</p></aside>`;}
  function draftPage(page) {
    const d=draft();if(!d)return `${heading('Monte seu primeiro orçamento')}${empty('Sua lista ainda não começou','Adicione os itens que deseja pesquisar.',btn('Nova lista','new'))}`;
    if(page==='nova') {
      const e=d.items.find(x=>x.id===ui.editing);
      return `${breadcrumb('Nova lista')}${heading('O que você precisa orçar?','Comece pelos produtos. Depois, escolha onde conferir.')}${steps(0)}<div class="grid-main"><section class="panel"><div class="field"><label for="list-name">Nome da lista</label><input id="list-name" maxlength="70" placeholder="Ex.: Compra da semana" value="${esc(d.name)}" required></div><div class="divider"></div><h2 style="font-size:17px;margin-bottom:17px">${e?'Editar produto':'Adicionar produto'}</h2><form id="item-form" class="input-row"><div class="field"><label for="product-name">Produto e embalagem</label><input id="product-name" name="name" maxlength="100" required placeholder="Ex.: Arroz tipo 1 · 5 kg" value="${esc(e?.name||'')}"></div><div class="field"><label for="quantity">Quantidade</label><input id="quantity" name="quantity" type="number" min="0.01" max="999" step="0.01" required value="${e?.quantity||1}"></div><div class="field"><label for="unit">Unidade</label><select id="unit" name="unit">${['un','pacote','kg','litro','caixa'].map(u=>`<option ${e?.unit===u?'selected':''}>${u}</option>`).join('')}</select></div><div class="field"><label for="limit">Limite / un. (R$)</label><input id="limit" name="limit" inputmode="decimal" placeholder="Opcional" value="${e?.limit??''}"></div><button type="submit" class="btn">${icon(e?'check':'plus')}<span>${e?'Salvar':'Adicionar'}</span></button></form><div id="form-error" class="form-error" role="alert"></div><div class="draft-items">${d.items.length?d.items.map(i=>`<div class="product-line"><div class="product-thumb">${emoji(i.name)}</div><div class="grow"><div class="product-title">${esc(i.name)}</div><p class="muted">${number(i.quantity)} ${esc(i.unit)}${i.limit?' · Limite unitário: '+money(i.limit):' · Sem limite definido'}</p></div><button class="icon-btn" data-action="edit-item" data-item="${i.id}" aria-label="Editar ${esc(i.name)}">${icon('edit')}</button><button class="icon-btn" data-action="remove-item" data-item="${i.id}" aria-label="Remover ${esc(i.name)}">${icon('trash')}</button></div>`).join(''):empty('Sua lista está esperando os primeiros itens','Informe o produto, a quantidade e, se quiser, um limite de preço.')}</div><div class="divider"></div><div class="actions spaced">${btn('Descartar rascunho','discard','ghost')}${btn('Escolher local '+icon('arrow'),'draft-next','',d.items.length?'':'disabled')}</div></section>${draftSummary(d)}</div>`;
    }
    if(page==='local')return `${breadcrumb('Escolher local','nova')}${heading('Onde vamos conferir?','Escolha um estabelecimento para esta solicitação.')}${steps(1)}<div class="grid-main"><section class="panel"><h2>Locais da demonstração</h2><p class="muted text-sm" style="margin:8px 0 20px">Uma solicitação corresponde a um local. Não há consulta a estoque real.</p><form id="store-form">${stores.map(s=>`<label class="store-option"><span class="store-icon">${icon('store')}</span><span class="grow"><h3>${s.name}</h3><p>${s.address}</p></span><input type="radio" name="store" value="${s.id}" ${d.store===s.id?'checked':''} required aria-label="${s.name}"></label>`).join('')}<div class="divider"></div><div class="actions spaced">${link('Voltar à lista','nova','secondary')}<button class="btn" type="submit">Revisar solicitação ${icon('arrow')}</button></div></form></section>${draftSummary(d)}</div>`;
    return `${breadcrumb('Confirmar solicitação','local')}${heading('Tudo certo para começar?','Confira sua lista antes de disponibilizar a tarefa.')}${steps(2)}<div class="grid-main"><section class="panel"><div class="panel-header"><div><h2>${esc(d.name)}</h2><div class="detail-meta"><span>${icon('pin')}${esc(storeName(d))}</span></div></div>${link('Editar','nova','secondary small')}</div>${d.items.map(i=>productRow(i,false)).join('')}<div class="divider"></div>${rewardEditor(d)}${notice('Após confirmar, troque para Colaborador para aceitar a tarefa, registrar os preços e enviar o orçamento.')}<div class="actions spaced" style="margin-top:22px">${link('Alterar local','local','secondary')}${btn('Confirmar solicitação '+icon('check'),'create-request')}</div></section>${draftSummary(d)}</div>`;
  }
  function rewardEditor(d) {
    return `<div class="reward-editor field"><label for="reward-value">Recompensa fictícia oferecida (R$)</label><input id="reward-value" inputmode="decimal" value="${esc(d.reward??5)}" aria-describedby="reward-help reward-error"><small id="reward-help">Valor inicial e mínimo: R$ 5,00. Você pode aumentar antes de confirmar. Nenhum pagamento real será realizado.</small><div id="reward-error" class="form-error" role="alert"></div></div>`;
  }
  function updateReward(report=false) {
    const input=document.getElementById('reward-value');
    if(!input||role()!=='client'||!draft())return false;
    const value=parsePrice(input.value);
    const valid=Number.isFinite(value)&&value>=5;
    const error=valid?'':'Informe uma recompensa de pelo menos R$ 5,00, com até duas casas decimais (máximo R$ 1.000.000,00).';
    input.setCustomValidity(error);
    input.setAttribute('aria-invalid',String(!valid));
    document.getElementById('reward-error').textContent=error;
    if(!valid){if(report){input.focus();input.reportValidity();}return false;}
    if(!change(s=>s.drafts[user().id].reward=value))return false;
    document.getElementById('draft-reward-summary').textContent=money(value);
    return true;
  }
  function productRow(i,priced=true) {return `<div class="product-line"><div class="product-thumb" aria-hidden="true">${emoji(i.name)}</div><div class="grow"><div class="product-title">${esc(i.name)}</div><div class="muted">${number(i.quantity)} ${esc(i.unit)}${priced&&!i.unavailable&&i.price>0?' × '+money(i.price):i.limit?' · Limite: '+money(i.limit)+'/un.':''}${i.unavailable?' · Não encontrado':''}</div>${priced&&i.limit&&i.price>i.limit?`<span class="over-limit">Acima do limite unitário de ${money(i.limit)}</span>`:''}${i.photo?`<button class="photo-button" data-action="photo" data-item="${i.id}">${icon('photo')} Ver foto${i.photo.startsWith('data:image/svg')?' de exemplo':''}</button>`:''}</div>${priced?`<div class="price">${i.unavailable?'—':i.price>0?money(i.quantity*i.price):'A coletar'}</div>`:''}</div>`;}
  function timeline(r) {
    const stage=r.paid?4:r.status==='approved'?3:['received','adjustment'].includes(r.status)?2:r.worker?1:0;
    return `<div class="timeline">${[['Solicitação enviada','A lista já está disponível.'],['Coleta de preços','O colaborador confere os itens.'],['Orçamento disponível',r.status==='adjustment'?'Ajuste solicitado pelo Cliente.':'Revise os preços e as fotos.'],['Aprovação do Cliente','O orçamento foi aceito.'],['Recompensa e conclusão','Confirmação apenas simulada.']].map(([t,s],i)=>`<div class="timeline-step ${i<stage?'done':i===stage?'current':'pending'}"><span>${icon(i<stage?'check':i===stage?'clock':'list')}</span><div><strong>${t}</strong><p>${s}</p></div></div>`).join('')}</div>`;
  }
  function requestPage(r,task=false) {
    const client=role()==='client',other=state.users.find(u=>u.id===(client?r.worker:r.client));
    const detail=(r.revision>0),canChat=r.worker;
    let primary='';
    if(!client&&r.status==='waiting')primary=`<div class="actions">${btn('Recusar tarefa','decline','secondary')}${btn('Aceitar e iniciar coleta '+icon('arrow'),'accept')}</div>`;
    else if(!client&&['collecting','adjustment'].includes(r.status))primary=link('Continuar coleta '+icon('arrow'),`coleta/${r.id}`);
    else if(client&&r.status==='received')primary=`<div class="actions">${btn(icon('chat')+' Pedir ajuste','request-adjust','secondary')}${btn('Aprovar orçamento '+icon('check'),'approve')}</div>`;
    else if(client&&r.status==='approved')primary=link('Confirmar recompensa simulada',`recompensa/${r.id}`);
    else if(client&&r.status==='rewarded')primary=link('Avaliar colaborador '+icon('star'),`avaliar/${r.id}`);
    else if(!client&&r.paid)primary=link('Ver recompensa simulada',`recebimento/${r.id}`);
    const statusText={waiting:'Sua lista está disponível para um colaborador.',collecting:'Os preços da sua lista estão sendo conferidos.',received:'Preços conferidos. Agora é só revisar.',adjustment:'Uma conversa pode deixar tudo mais claro.',approved:'Orçamento aprovado. Falta confirmar a recompensa fictícia.',rewarded:'Tudo confirmado. Conte como foi a experiência.',completed:'Mais uma lista concluída em conjunto.'};
    return `${breadcrumb(esc(r.id))}${heading(esc(r.name),`${esc(r.id)} · Criada em ${date(r.created)}`,statusPill(r))}<div class="grid-main"><div class="stack"><section class="panel"><div class="overview">${icon(detail?'check':'clock')}<div><h3>${labels[r.status]}</h3><p>${statusText[r.status]}</p></div></div><div class="detail-meta"><span>${icon('store')}${esc(storeName(r))}</span><span>${icon('user')}${other?esc(other.name):'Aguardando colaborador'}</span><span>${icon('list')}${r.items.length} itens</span></div><div class="divider"></div><div class="panel-header"><h2>${detail?'Preços do orçamento':'Itens solicitados'}</h2>${r.revision>1?'<span class="pill gray">Versão atualizada</span>':''}</div>${r.items.map(i=>productRow(i,detail)).join('')}${detail?`<div class="divider"></div><div class="price-header"><div><span class="eyebrow">TOTAL DOS PRODUTOS</span><div class="budget-amount">${money(total(r))}</div></div><span class="muted text-sm">Recompensa à parte</span></div>`:''}${r.items.some(i=>i.unavailable)?notice('Itens não encontrados foram excluídos do total. Revise-os com o Colaborador antes de aprovar.','warning'):''}${r.status==='adjustment'?notice('O Cliente pediu um ajuste. O orçamento exibido será atualizado depois do reenvio do Colaborador.','warning'):''}<div class="divider"></div><div class="actions spaced">${canChat?link(icon('chat')+' Abrir chat',`chat/${r.id}`,'secondary'):''}${primary}</div>${r.rating?`<div class="divider"></div><p class="text-sm"><strong>Avaliação registrada: ${r.rating.score}/5</strong>${r.rating.comment?'<br>'+esc(r.rating.comment):''}</p>`:''}</section>${client&&!r.paid?notice('Para avançar na demonstração, alterne os perfis no topo. A coleta e as respostas do chat são feitas por você ao testar o Colaborador.'):''}</div><aside class="stack"><section class="panel"><h2 style="font-size:18px">Acompanhe o caminho</h2>${timeline(r)}</section><section class="tip-card">${icon('gift')}<h3>${money(r.reward)} de recompensa fictícia</h3><p>Uma forma de demonstrar o reconhecimento pela coleta. Não há cobrança, transferência ou saque.</p></section></aside></div>`;
  }
  function collection(r) {
    if(role()!=='worker'||r.worker!==user().id||!['collecting','adjustment'].includes(r.status))return requestPage(r);
    return `${breadcrumb('Checklist de coleta')}${heading('Cada preço faz a diferença.',`${esc(r.name)} · ${esc(storeName(r))}`,link(icon('chat')+' Conversar',`chat/${r.id}`,'secondary'))}<div class="grid-main"><section><div class="notice ${r.status==='adjustment'?'warning':''}" style="margin-bottom:20px">${icon('info')}<div>${r.status==='adjustment'?'Revise o pedido de ajuste no chat, corrija os itens e reenvie o orçamento.':'Preencha o preço por unidade. Anexe uma foto ou use uma evidência fictícia para testar.'}</div></div>${r.items.map(i=>`<article class="collection-item ${i.done||i.unavailable?'finished':''}"><div class="collection-top"><div class="product-thumb">${emoji(i.name)}</div><div class="grow"><h3>${esc(i.name)}</h3><small>${number(i.quantity)} ${esc(i.unit)}${i.limit?' · Limite unitário: '+money(i.limit):''}</small></div>${i.done||i.unavailable?icon('check'):''}</div><div class="collection-fields"><div class="field"><label for="price-${i.id}">Preço por unidade (R$)</label><input id="price-${i.id}" class="price-input" data-item="${i.id}" inputmode="decimal" placeholder="0,00" value="${i.price??''}" ${i.unavailable?'disabled':''}></div><label class="file-label">${icon('camera')} ${i.photo?'Trocar foto':'Anexar foto'}<input class="photo-input" type="file" accept="image/png,image/jpeg,image/webp" data-item="${i.id}" aria-label="Anexar foto de ${esc(i.name)}" ${i.unavailable?'disabled':''}></label></div><div class="collection-tools"><label><input type="checkbox" data-change="done" data-item="${i.id}" ${i.done?'checked':''} ${i.unavailable?'disabled':''}> Item conferido</label><label><input type="checkbox" data-change="unavailable" data-item="${i.id}" ${i.unavailable?'checked':''}> Não encontrado</label>${!i.unavailable?`<button class="link-btn" data-action="sample-photo" data-item="${i.id}">${i.photo?'Substituir por':'Usar'} foto de exemplo</button>`:''}${i.photo?`<button class="photo-button" data-action="photo" data-item="${i.id}"><img class="line-photo" src="${safePhoto(i.photo)}" alt="Evidência de ${esc(i.name)}">Ampliar</button><button class="link-btn" data-action="remove-photo" data-item="${i.id}">Remover foto</button>`:''}</div></article>`).join('')}</section><aside class="panel summary"><h2 style="font-size:18px">Sua coleta</h2><div style="margin-top:20px" class="row spaced text-sm"><span>Itens resolvidos</span><strong id="collected-count">${collected(r)} de ${r.items.length}</strong></div><div class="progress-track"><span id="collection-progress" style="width:${collected(r)/r.items.length*100}%"></span></div><dl><div><dt>Local</dt><dd>${esc(storeName(r))}</dd></div><div><dt>Recompensa fictícia</dt><dd>${money(r.reward)}</dd></div></dl><div class="divider"></div><span class="eyebrow">TOTAL DOS PRODUTOS</span><div class="summary-total" id="collection-total">${money(total(r))}</div><p class="muted text-sm" style="margin:8px 0 20px">Quantidade × preço unitário, sem recompensa.</p>${btn((r.revision?'Reenviar':'Enviar')+' orçamento '+icon('arrow'),'send-budget','block')}${notice('Você pode sair e continuar depois. Os dados ficam neste navegador. Fotos são opcionais na demonstração.')}</aside></div>`;
  }
  function chat(r) {
    const adjusting=current().mode==='ajuste';
    const canAdjust=role()==='client'&&r.status==='received';
    if(!r.worker)return requestPage(r);
    const other=state.users.find(u=>u.id===(role()==='client'?r.worker:r.client));
    return `${breadcrumb('Conversa',routeFor(r))}${heading(adjusting?'Solicitar ajuste':'Uma boa conversa ajuda.',adjusting?'Explique ao Colaborador o que precisa ser alterado. O pedido só será registrado após o envio.':'Esclareça dúvidas sobre os itens e os preços da lista.')}<div class="chat-layout"><section class="panel chat-panel"><header class="chat-header"><span class="avatar ${other?.role==='worker'?'worker':''}">${esc(intials(other?.name||'Usuário'))}</span><div class="grow"><h3>${esc(other?.name||'Usuário')}</h3><p class="muted text-sm">${other?.role==='worker'?'Colaborador':'Cliente'} · Conversa da solicitação</p></div><span class="pill gray">Simulação local</span></header><div class="messages" id="messages" role="log" aria-label="Mensagens da solicitação">${r.messages.length?r.messages.map(m=>m.author==='system'?`<div class="message system">${esc(m.text)}</div>`:`<div class="message ${m.author===user().id?'mine':''}"><strong>${esc(state.users.find(u=>u.id===m.author)?.name||'Usuário')}</strong>${m.kind==='adjustment'?'<span class="message-kind">Motivo do pedido de ajuste</span>':''}${esc(m.text).replace(/\n/g,'<br>')}<small>${new Date(m.time).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</small></div>`).join(''):'<div class="empty"><h3>Comece a conversa</h3><p>Envie uma mensagem sobre esta lista. Troque de perfil para responder como o outro participante.</p></div>'}</div>${adjusting&&!canAdjust?notice('Este orçamento não está mais disponível para solicitar ajuste. Volte ao orçamento para conferir o status.','warning'):`<form class="chat-compose ${adjusting?'adjust-compose':''}" id="chat-form" data-adjustment="${adjusting}" novalidate><div class="compose-field"><label class="${adjusting?'':'sr-only'}" for="message">${adjusting?'Motivo do ajuste (obrigatório)':'Sua mensagem'}</label><textarea id="message" class="input" name="message" placeholder="${adjusting?'Ex.: O preço do arroz está diferente da foto enviada.':'Escreva sua mensagem...'}" maxlength="1200" required rows="${adjusting?3:1}" aria-describedby="chat-error"></textarea><div id="chat-error" class="form-error" role="alert"></div></div><button class="btn" aria-label="${adjusting?'Enviar pedido de ajuste':'Enviar mensagem'}" type="submit">${icon('send')}${adjusting?' Enviar pedido de ajuste':''}</button>${adjusting?link('Cancelar e voltar',routeFor(r),'secondary'):''}</form>`}</section><aside class="panel summary"><span class="eyebrow">SOBRE ESTA CONVERSA</span><h2 style="margin-top:12px;font-size:19px">${esc(r.name)}</h2><p class="muted text-sm" style="margin:10px 0 17px">${esc(storeName(r))}</p>${statusPill(r)}<div class="divider"></div>${link('Voltar ao orçamento',routeFor(r),'secondary block')}${role()==='worker'&&['collecting','adjustment'].includes(r.status)?link('Revisar itens',`coleta/${r.id}`,'block'):''}${notice('Mensagens não são enviadas pela internet. Para conversar, alterne os perfis ou use duas abas deste navegador.')}</aside></div>`;
  }
  function reward(r,receipt=false) {
    if(receipt&&(!r.paid||role()!=='worker'))return requestPage(r);
    if(!receipt&&(role()!=='client'||r.status!=='approved'))return requestPage(r);
    return `${breadcrumb('Recompensa',routeFor(r))}<section class="panel center-panel"><div class="reward-icon">${icon(receipt?'check':'gift')}</div><span class="pill demo">SEM TRANSAÇÃO REAL</span><h1 style="margin-top:18px;font-size:29px">${receipt?'Sua ajuda fez a diferença.':'Reconheça essa ajuda.'}</h1><p>${receipt?'O Cliente confirmou a recompensa fictícia pela sua coleta.':'O orçamento foi aprovado. Confirme a recompensa fictícia do Colaborador para continuar.'}</p><div class="summary-total">${money(r.reward)}</div><span class="eyebrow">RECOMPENSA ${receipt?'RECEBIDA · ':''}SIMULADA</span><div class="divider"></div><div class="row spaced text-sm"><span class="muted">Solicitação</span><strong>${esc(r.name)}</strong></div><div class="row spaced text-sm" style="margin-top:13px"><span class="muted">Total dos produtos</span><strong>${money(total(r))}</strong></div><div style="margin-top:23px">${notice('Esta ação não realiza Pix, cobrança, transferência, saque ou qualquer operação financeira.','success')}</div>${receipt?link('Voltar às coletas','coletas','block'):btn('Confirmar recompensa fictícia '+icon('check'),'pay','block')}<p class="text-sm">${receipt?'Participação concluída. Obrigado por colaborar!':'Depois, você poderá avaliar o Colaborador.'}</p></section>`;
  }
  function ratingPage(r) {
    if(role()!=='client'||r.status!=='rewarded')return requestPage(r);
    return `${breadcrumb('Avaliação',`pedido/${r.id}`)}<section class="panel center-panel"><div class="reward-icon">${icon('star')}</div><h1 style="font-size:29px">Como foi a experiência?</h1><p>Avalie a coleta de ${esc(state.users.find(u=>u.id===r.worker)?.name||'seu colaborador')}. Seu retorno encerra este orçamento.</p><form id="rating-form"><div class="stars" role="group" aria-label="Nota de 1 a 5">${[1,2,3,4,5].map(n=>`<button class="star ${n<=ui.rating?'selected':''}" type="button" data-action="rate" data-value="${n}" aria-label="${n} ${n===1?'estrela':'estrelas'}" aria-pressed="${ui.rating===n}">${icon('star')}</button>`).join('')}</div><p id="rating-label" class="text-sm">${ui.rating?['','Pode melhorar','Regular','Bom','Muito bom','Excelente'][ui.rating]:'Escolha uma nota para continuar.'}</p><div class="field" style="text-align:left;margin-top:22px"><label for="comment">Comentário (opcional)</label><textarea id="comment" name="comment" placeholder="Conte o que funcionou bem..." maxlength="500"></textarea></div><div id="form-error" class="form-error" role="alert"></div><button class="btn block" type="submit">Enviar avaliação e concluir ${icon('check')}</button></form></section>`;
  }
  function profile() {const u=user();return `${heading('Seu perfil de demonstração','Uma identidade fictícia para explorar os fluxos.')}<section class="panel profile-card"><div class="profile-head"><span class="avatar ${u.role==='worker'?'worker':''}">${esc(intials(u.name))}</span><div><h2>${esc(u.name)}</h2><p class="muted">${u.role==='client'?'Cliente':'Colaborador'}</p></div></div><div class="form-grid"><div class="field"><label>Nome</label><input value="${esc(u.name)}" readonly aria-label="Nome"></div><div class="field"><label>E-mail de teste</label><input value="${esc(u.email)}" readonly aria-label="E-mail de teste"></div></div>${notice('Não existe autenticação real neste protótipo. Os dados são locais e a senha de todas as contas fictícias é demo1234.')}<div class="divider"></div><div class="actions">${btn(icon('switch')+' Trocar perfil','switch','secondary')}${btn(icon('logout')+' Sair','logout','secondary')}</div><div class="divider"></div><h3>Recomeçar a demonstração</h3><p class="muted text-sm" style="margin:8px 0 17px">Restaura as listas de exemplo e remove somente as contas fictícias, fotos e mensagens deste protótipo, neste navegador.</p>${btn(icon('refresh')+' Reiniciar dados de teste','reset','danger')}</section>`;}
  function guide() {return `${breadcrumb('Guia da demonstração',user()?backHome():'entrar')}${heading('Conheça o caminho completo.','Um guia rápido para explorar o projeto.')}<div class="guide stack"><section class="panel"><div class="eyebrow">PROJETO INTEGRADOR III · ATIVIDADE AVALIATIVA 01</div><h2 style="margin-top:12px">Orçamento colaborativo em tempo real</h2><p>O projeto conecta consumidores a colaboradores que levantam preços em estabelecimentos físicos. Busca tornar a obtenção de orçamentos mais prática, com lista de itens, fotos, comunicação, aprovação e avaliação.</p><p>O Atacadão Dia a Dia consta como empresa parceira do projeto acadêmico. “CotaJunto” é o nome de interface proposto para esta demonstração.</p></section><div class="two-col"><section class="panel"><h2>${icon('bag')} Experimente como Cliente</h2><ol><li>Entre como Cliente ou use <code>cliente@teste.com</code>.</li><li>Crie uma lista e adicione os produtos.</li><li>Escolha um local, defina a recompensa fictícia (mínimo R$ 5,00) e confirme a solicitação.</li><li>Após a coleta, confira preços e fotos.</li><li>Peça um ajuste no chat, enviando obrigatoriamente o motivo, ou aprove.</li><li>Confirme a recompensa fictícia e avalie.</li></ol></section><section class="panel"><h2>${icon('users')} Experimente como Colaborador</h2><ol><li>Use “Trocar para Colaborador” no topo. Na entrada, clique em “Sou Colaborador”, que estará em destaque.</li><li>No Início, confira o resumo da conta. Acesse Minhas coletas ou um atalho do Dashboard, abra a solicitação e aceite a coleta.</li><li>Preencha preços, confira os itens e anexe fotos.</li><li>Envie o orçamento e aguarde o Cliente.</li><li>Se houver ajuste, revise e reenvie.</li><li>Veja a recompensa simulada após a confirmação.</li></ol></section></div><section class="panel"><h2>Como demonstrar a colaboração</h2><p>Use o botão de troca de perfil para voltar à entrada e selecione a opção destacada. Só então o novo perfil será acessado. No uso livre, o Colaborador começa pelo Início e encontra a solicitação em Minhas coletas. Durante o guia interativo, cada troca abre a página necessária para continuar a mesma coleta. No retorno ao Cliente, o contexto do pedido é retomado quando disponível. O cabeçalho identifica a área atual e permite alternar o modo claro/escuro; sua preferência fica salva neste navegador. As contas de exemplo são <strong>cliente@teste.com</strong> e <strong>colaborador@teste.com</strong>; senha fictícia: <strong>demo1234</strong>.</p><p>As mudanças são refletidas em outras abas abertas na mesma origem e no mesmo navegador pelo armazenamento local. Você pode abrir duas abas, deixar uma em cada perfil e testar o chat. Não existe comunicação com outros dispositivos ou usuários pela internet.</p>${notice('Chat, notificações, login, coleta e recompensa são demonstrativos. Nenhuma pesquisa de preço é feita automaticamente. Nenhum dinheiro é movimentado.','warning')}</section><section class="panel"><h2>Seu espaço de Colaborador</h2><p><strong>Início:</strong> saldo fictício, ganhos estimados, média das avaliações, contadores e até duas coletas por seção. Os atalhos abrem o filtro correspondente em Minhas coletas.</p><p><strong>Minhas coletas:</strong> gerenciamento completo com Todas, Disponíveis, Em andamento e Concluídas. Uma coleta aceita permanece em andamento até a confirmação da recompensa; depois conta como concluída, mesmo antes da avaliação.</p><p><strong>Meu perfil:</strong> nome, avatar, dados de acesso fictícios e histórico de avaliações. Recompensas e notas sempre são calculadas a partir das coletas deste Colaborador; valores de compras não compõem seus ganhos.</p></section><section class="panel"><h2>Um roteiro pronto para avaliar</h2><ol><li>Como Colaborador, abra Início → Disponíveis → “Compra da semana” e registre os preços.</li><li>Use “foto de exemplo” ou escolha uma imagem local.</li><li>Envie e volte ao Cliente para revisar.</li><li>Peça um ajuste e envie o motivo no chat. Sem mensagem enviada, o status não muda, mesmo ao voltar ou recarregar. Depois, alterne para responder.</li><li>Corrija um preço e reenvie. Confira a mudança no total.</li><li>Aprove, confirme a recompensa e registre a avaliação.</li></ol><p>“Despensa de casa” já possui um orçamento pronto para testar aprovação. “Café da manhã” mostra uma solicitação concluída. Todos são cenários fictícios.</p></section><section class="panel"><h2>Escopo e escolhas da implementação</h2><p>As etapas de negócio seguem os materiais do Projeto Integrador II e a base de requisitos. Nome visual, cores, campos de formulário, escala de avaliação de 1 a 5, recompensa fictícia a partir de R$ 5,00, busca por nome, itens não encontrados e armazenamento no navegador são recomendações adotadas para o protótipo.</p><p>O total é a soma de quantidade × preço unitário dos produtos encontrados. O limite informado é unitário e apenas gera um aviso. A recompensa é exibida separadamente.</p><p>Fotos são opcionais, comprimidas e armazenadas localmente. Dados são preservados após recarregar a página, salvo se o navegador bloquear armazenamento ou se o cenário for reiniciado.</p><p>Não há integração bancária, Google real, servidor, banco remoto, geolocalização ou validação de fotos por inteligência artificial.</p></section><section class="panel"><h2>Equipe registrada no PI II</h2><p>Caio Silva Pinto de Queiroz · Israel Elias Ricardo Pereira · Letícia Rodrigues Fraga · Maria Eduarda Alves Herculano · Thaila Thamires Bispo de Oliveira.</p><p class="text-sm">Grupo 17, Turma B 0426 no PI II. Confirmar a identificação atual no documento de entrega do PI III.</p></section>${user()?btn('Reiniciar cenário de demonstração','reset','secondary'):link('Começar a demonstração','entrar')}</div>`;}
  function safePhoto(value) {return typeof value==='string'&&/^data:image\/(jpeg|png|webp|svg\+xml);base64,[a-zA-Z0-9+/=]+$/.test(value)?value:'';}
  function missing() {return `${heading('Este caminho não está disponível')}${empty('Vamos voltar ao seu espaço?','A solicitação pode pertencer a outro perfil ou não estar mais neste cenário.',link('Voltar ao início',backHome()))}`;}
  function current() {const p=location.hash.replace(/^#\/?/,'').split('/');return {page:p[0]||'entrar',rid:p[1],mode:p[2]};}
  function render() {
    window.CotaJuntoTour?.sync();
    dismissTour();
    const {page,rid}=current();
    document.documentElement.dataset.profile=role()||'guest';
    document.title='CotaJunto — '+(page==='entrar'?'Acesso':page==='chat'?'Conversa':'Orçamento colaborativo');
    if(!user()) {
      if(!['entrar','cadastro','recuperar','guia'].includes(page)){go('entrar');return;}
      app.innerHTML=page==='guia'?`<main class="main" id="main"><div class="auth-tools">${themeButton()}</div>${guide()}</main>`:auth(page);if(page==='entrar')showSwitchTour();return;
    }
    if(['entrar','cadastro','recuperar'].includes(page)){go(window.CotaJuntoTour?.arrivalPage(user().id)||backHome());return;}
    if(role()==='worker'&&['listas','nova','local','confirmar'].includes(page)){go('inicio');return;}
    // Compatibility redirect only: the redundant page is no longer rendered.
    if(page==='tarefas'){history.replaceState(null,'',`#/${role()==='worker'?'coletas':'inicio'}`);render();return;}
    if(page==='coletas'&&rid&&!collectionFilters.some(f=>f.slug===rid)){go('coletas');return;}
    if(role()==='client'&&page==='coletas'){go('inicio');return;}
    let content;
    if(page==='inicio')content=role()==='worker'?workerDashboard():dashboard();
    else if(page==='listas')content=listing();
    else if(page==='coletas')content=listing(true);
    else if(['nova','local','confirmar'].includes(page))content=draftPage(page);
    else if(page==='perfil')content=profile()+(role()==='worker'?workerProfileDetails():'');
    else if(page==='guia')content=guide();
    else {const r=getRequest(rid);content=!r?missing():page==='coleta'?collection(r):page==='chat'?chat(r):page==='recompensa'?reward(r):page==='recebimento'?reward(r,true):page==='avaliar'?ratingPage(r):['pedido','tarefa'].includes(page)?requestPage(r):missing();}
    app.innerHTML=shell(content,page);
    const sidebar=app.querySelector('.sidebar');if(sidebar)sidebar.inert=window.matchMedia('(max-width:740px)').matches&&!ui.menu;
    const msgs=document.getElementById('messages');if(msgs)msgs.scrollTop=msgs.scrollHeight;
  }
  const parsePrice = v => {
    const s=String(v??'').trim();
    if(!s)return null;
    if(!/^\d+([.,]\d{1,2})?$/.test(s))return NaN;
    const n=Number(s.replace(',','.'));return n<=1000000?n:NaN;
  };
  const formError = text => {const el=document.getElementById('form-error');if(el)el.textContent=text;else toast(text);};
  function switchProfile() {
    const r=getRequest(current().rid),u=user();
    const target=window.CotaJuntoTour?.switchUserId() || (r?(u.role==='client'?r.worker:r.client):null);
    const next=state.users.find(x=>x.id===target)||state.users.find(x=>x.id===(u.role==='client'?'worker':'client'));
    if(!next)return;
    switchIntent={role:next.role,uid:next.id,rid:r?.id,chat:current().page==='chat'};
    try {sessionStorage.setItem(SWITCH_INTENT,JSON.stringify(switchIntent));sessionStorage.removeItem(SESSION);}catch{}
    session=null;ui.menu=false;ui.notifications=false;
    history.replaceState(null,'',new URL('index.html#/entrar',location.href));
    render();
  }
  function renderCollectionSummary(r) {
    const count=document.getElementById('collected-count'),bar=document.getElementById('collection-progress'),sum=document.getElementById('collection-total');
    if(count)count.textContent=`${collected(r)} de ${r.items.length}`;
    if(bar)bar.style.width=`${collected(r)/r.items.length*100}%`;
    if(sum)sum.textContent=money(total(r));
  }
  function updatePrice(el) {
    const r=getRequest(current().rid);
    if(!r||role()!=='worker'||r.worker!==user().id||!['collecting','adjustment'].includes(r.status))return;
    const price=parsePrice(el.value);
    if(Number.isNaN(price)||(price!==null&&price<=0)){el.setCustomValidity('Informe um preço positivo, com até duas casas decimais.');el.reportValidity();return false;}
    el.setCustomValidity('');
    const ok=mutateRequest(r.id,x=>{const i=x.items.find(i=>i.id===el.dataset.item);if(i){i.price=price;if(!price)i.done=false;}});
    if(ok)renderCollectionSummary(getRequest(r.id));return ok;
  }
  function samplePhoto(item) {
    // Evidência vetorial fictícia: não representa uma foto de loja real.
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520"><rect width="800" height="520" fill="#f1f3e9"/><rect x="70" y="60" width="660" height="400" rx="20" fill="white" stroke="#d0d8c4"/><text x="110" y="115" font-family="Arial" font-size="19" fill="#73875f">EVIDÊNCIA FICTÍCIA · COTAJUNTO</text><rect x="110" y="150" width="90" height="120" rx="12" fill="#dae8ba"/><path d="M128 150v-22h54v22" fill="none" stroke="#668146" stroke-width="5"/><text x="230" y="190" font-family="Arial" font-size="23" fill="#153f36">${esc(item.name.slice(0,42))}</text><text x="230" y="242" font-family="Arial" font-size="39" font-weight="bold" fill="#153f36">${esc(money(item.price||0))}</text><text x="110" y="335" font-family="Arial" font-size="20" fill="#6d7c62">Imagem de exemplo para testar o anexo.</text><text x="110" y="370" font-family="Arial" font-size="20" fill="#6d7c62">Não é uma fotografia nem um preço real.</text></svg>`;
    return 'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));
  }
  async function loadPhoto(file,itemId) {
    const r=getRequest(current().rid),actor=user()?.id;
    if(!file||!r||role()!=='worker'||r.worker!==actor||!['collecting','adjustment'].includes(r.status))return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){toast('Escolha uma imagem JPG, PNG ou WebP.');return;}
    if(file.size>10*1024*1024){toast('Escolha uma imagem de até 10 MB.');return;}
    const url=URL.createObjectURL(file),img=new Image();
    try {
      img.src=url;await img.decode();
      const factor=Math.min(1,900/Math.max(img.width,img.height)),canvas=document.createElement('canvas');
      canvas.width=Math.max(1,Math.round(img.width*factor));canvas.height=Math.max(1,Math.round(img.height*factor));
      const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
      const live=getRequest(r.id);
      if(!live||user()?.id!==actor||live.worker!==actor||!['collecting','adjustment'].includes(live.status))return;
      if(mutateRequest(r.id,x=>{const item=x.items.find(i=>i.id===itemId);if(item)item.photo=canvas.toDataURL('image/jpeg',.75);})){render();toast('Foto anexada apenas neste navegador.');}
    }catch {toast('Não foi possível abrir essa imagem. Tente outro arquivo.');}
    finally{URL.revokeObjectURL(url);}
  }
  app.addEventListener('click',event=>{
    const el=event.target.closest('[data-action]');if(!el)return;
    const action=el.dataset.action,r=getRequest(current().rid);
    if(action==='theme'){theme=theme==='light'?'dark':'light';try{localStorage.setItem(THEME,theme);}catch{}applyTheme();return;}
    if(action==='dismiss-tour'){dismissTour();app.querySelector(`[data-action="demo-${switchIntent?.role||'client'}"]`)?.focus();return;}
    if(action==='demo-client'||action==='demo-worker'){
      const target=action==='demo-client'?'client':'worker';
      login(window.CotaJuntoTour?.accessUserId(target) || (switchIntent?.role===target ? switchIntent.uid : target));return;
    }
    if(action==='google'){modal('Acesso Google simulado','<p>Este botão demonstra um acesso alternativo. Não há conexão com o Google nem coleta de dados da sua conta.</p>','Entrar como Cliente',()=>login('client'));return;}
    if(action==='password'){const input=document.getElementById('password');input.type=input.type==='password'?'text':'password';return;}
    if(!user())return;
    if(action==='menu'){ui.menu=!ui.menu;render();app.querySelector(ui.menu?'.nav a':'.menu-toggle')?.focus();return;}
    if(action==='notifications'){ui.notifications=!ui.notifications;render();return;}
    if(action==='logout'){logout();return;}
    if(action==='switch'){switchProfile();return;}
    if(action==='new'&&role()==='client'){beginDraft();return;}
    if(action==='filter'){if(role()==='worker')go(collectionRoute(el.dataset.value));else{ui.filter=el.dataset.value;render();}return;}
    if(action==='reset') {modal('Reiniciar a demonstração?','<p>As listas, contas de teste, mensagens e fotos locais do CotaJunto serão substituídas pelos exemplos iniciais. Nenhum dado de outros sites será alterado.</p>','Reiniciar cenário',()=>{if(save(seed())){window.CotaJuntoTour?.reset();logout();history.replaceState(null,'',new URL('index.html#/entrar',location.href));render();toast('Cenário inicial restaurado.');}},true);return;}
    if(action==='rate') {
      ui.rating=Number(el.dataset.value);app.querySelectorAll('.star').forEach((b,i)=>{b.classList.toggle('selected',i<ui.rating);b.setAttribute('aria-pressed',String(i+1===ui.rating));});document.getElementById('rating-label').textContent=['','Pode melhorar','Regular','Bom','Muito bom','Excelente'][ui.rating];return;
    }
    if(['remove-item','edit-item','discard','draft-next','create-request'].includes(action)&&role()==='client') {
      const d=draft();if(!d)return;
      if(action==='remove-item') {change(s=>{s.drafts[user().id].items=s.drafts[user().id].items.filter(i=>i.id!==el.dataset.item);});if(ui.editing===el.dataset.item)ui.editing=null;render();return;}
      if(action==='edit-item'){ui.editing=el.dataset.item;render();document.getElementById('product-name')?.focus();return;}
      if(action==='discard'){modal('Descartar este rascunho?','<p>Os itens ainda não enviados desta lista serão removidos.</p>','Descartar',()=>{change(s=>delete s.drafts[user().id]);go('inicio');},true);return;}
      if(action==='draft-next') {
        const input=document.getElementById('list-name');
        if(!input.value.trim()){input.setCustomValidity('Dê um nome para sua lista.');input.reportValidity();return;}
        input.setCustomValidity('');if(!d.items.length){toast('Adicione pelo menos um produto.');return;}
        if(change(s=>s.drafts[user().id].name=input.value.trim()))go('local');return;
      }
      if(action==='create-request') {
        if(!d.name.trim()||!d.items.length||!stores.some(s=>s.id===d.store)){toast('Revise o nome, os itens e o local da lista.');go('nova');return;}
        if(!updateReward(true))return;
        const reward=draft().reward;
        const rid=id('CJ');
        if(change(s=>{s.requests.unshift({id:rid,name:d.name,client:user().id,worker:null,store:d.store,items:d.items,status:'waiting',reward,created:Date.now(),updated:Date.now(),declined:[],messages:[],rating:null,paid:false,revision:0,...window.CotaJuntoTour?.requestTag()});delete s.drafts[user().id];})){go('pedido/'+rid);toast('Solicitação enviada! Alterne para Colaborador para continuar.');}return;
      }
    }
    if(!r)return;
    if(action==='photo') {const i=r.items.find(x=>x.id===el.dataset.item);if(i?.photo&&safePhoto(i.photo))modal('Evidência do item',`<p>${esc(i.name)}</p><img src="${safePhoto(i.photo)}" alt="Evidência de ${esc(i.name)}">`);return;}
    if(role()==='worker') {
      if(r.status==='waiting'&&action==='accept') {if(mutateRequest(r.id,x=>{x.worker=user().id;x.status='collecting';systemMessage(x,'O Colaborador aceitou a tarefa e iniciou a coleta.');})){go(`coleta/${r.id}`);toast('Tarefa aceita. Boa coleta!');}return;}
      if(r.status==='waiting'&&action==='decline') {modal('Recusar esta coleta?','<p>Esta solicitação sairá das suas coletas disponíveis. Ela continuará aguardando um colaborador para o Cliente.</p>','Recusar coleta',()=>{if(mutateRequest(r.id,x=>x.declined.push(user().id))){go(collectionRoute('waiting'));toast('Coleta recusada. Nenhuma recompensa foi registrada.');}});return;}
      if(r.worker!==user().id||!['collecting','adjustment'].includes(r.status))return;
      if(action==='sample-photo') {const item=r.items.find(i=>i.id===el.dataset.item);if(!item||item.unavailable)return;if(mutateRequest(r.id,x=>x.items.find(i=>i.id===item.id).photo=samplePhoto(item))){render();toast('Evidência fictícia anexada.');}return;}
      if(action==='remove-photo'){if(mutateRequest(r.id,x=>{const i=x.items.find(i=>i.id===el.dataset.item);if(i)i.photo=null;}))render();return;}
      if(action==='send-budget') {
        const inputs=[...app.querySelectorAll('.price-input:not(:disabled)')];
        for(const input of inputs){if(updatePrice(input)===false)return;}
        const live=getRequest(r.id);
        if(collected(live)!==live.items.length){toast('Preencha os preços e marque os itens conferidos, ou indique “Não encontrado”.');return;}
        if(live.items.every(i=>i.unavailable)){toast('A lista inteira não foi encontrada. Esclareça o pedido pelo chat antes de enviar.');return;}
        if(mutateRequest(r.id,x=>{x.status='received';x.revision++;systemMessage(x,x.revision>1?'O orçamento foi atualizado e reenviado.':'O orçamento foi enviado para revisão do Cliente.');})){go(`pedido/${r.id}`);toast('Orçamento enviado! Troque para Cliente para revisar.');}return;
      }
    } else {
      if(action==='request-adjust'&&r.status==='received') {go(`chat/${r.id}/ajuste`);return;}
      if(action==='approve'&&r.status==='received') {modal('Aprovar este orçamento?',`<p>O total dos produtos é <strong>${money(total(r))}</strong>. A recompensa fictícia de ${money(r.reward)} será confirmada separadamente.${r.items.some(i=>i.unavailable)?' Há itens não encontrados, excluídos deste total.':''}</p>`,'Aprovar orçamento',()=>{if(getRequest(r.id)?.status!=='received')return;if(mutateRequest(r.id,x=>{x.status='approved';systemMessage(x,'O Cliente aprovou o orçamento.');}))go(`recompensa/${r.id}`);});return;}
      if(action==='pay'&&r.status==='approved'&&!r.paid) {if(mutateRequest(r.id,x=>{x.paid=true;x.status='rewarded';systemMessage(x,'Recompensa fictícia confirmada. Nenhuma transação financeira foi realizada.');})){ui.rating=0;go(`avaliar/${r.id}`);toast('Recompensa simulada confirmada.');}return;}
    }
  });
  app.addEventListener('input',e=>{
    const el=e.target;
    if(el.matches('input,textarea'))el.setCustomValidity('');
    if(el.id==='reward-value'){updateReward();return;}
    if(el.id==='message'){document.getElementById('chat-error').textContent='';el.removeAttribute('aria-invalid');}
    if(el.id==='list-name'&&user()&&draft())change(s=>s.drafts[user().id].name=el.value);
    if(el.id==='search') {
      const pos=el.selectionStart;ui.search=el.value;render();const input=document.getElementById('search');input?.focus();input?.setSelectionRange(pos,pos);
    }
  });
  app.addEventListener('change',e=>{
    const el=e.target;
    if(el.matches('.price-input')){updatePrice(el);return;}
    if(el.matches('.photo-input')){loadPhoto(el.files[0],el.dataset.item);return;}
    if(el.dataset.change) {
      const r=getRequest(current().rid);if(!r||role()!=='worker'||r.worker!==user().id||!['collecting','adjustment'].includes(r.status))return;
      const i=r.items.find(x=>x.id===el.dataset.item);if(!i)return;
      if(el.dataset.change==='done'&&el.checked&&!(i.price>0)){el.checked=false;toast('Informe o preço unitário antes de marcar o item.');return;}
      if(mutateRequest(r.id,x=>{const a=x.items.find(i=>i.id===el.dataset.item);a[el.dataset.change]=el.checked;if(el.dataset.change==='unavailable'&&el.checked){a.done=false;a.price=null;}}))render();
    }
  });
  app.addEventListener('submit',e=>{
    e.preventDefault();const form=e.target,fd=new FormData(form),r=getRequest(current().rid);
    if(form.id==='login-form') {
      const u=state.users.find(u=>u.email.toLowerCase()===String(fd.get('email')).trim().toLowerCase());
      if(!u||fd.get('password')!==DEMO_PASSWORD){formError('Use uma conta de teste e a senha fictícia demo1234.');return;}login(u.id);return;
    }
    if(form.id==='register-form') {
      const name=String(fd.get('name')).trim(),email=String(fd.get('email')).trim().toLowerCase();
      if(name.length<2){formError('Informe um nome fictício com pelo menos 2 caracteres.');return;}
      if(fd.get('confirm')!==DEMO_PASSWORD){formError('Confirme a senha de demonstração: demo1234.');return;}
      if(state.users.some(u=>u.email===email)){formError('Este e-mail de teste já existe. Entre com a senha demo1234.');return;}
      if(change(s=>s.users.push({id:id('user'),name,email,role:fd.get('role')==='worker'?'worker':'client'}))){go('entrar');toast('Conta fictícia criada. Entre com o e-mail informado e demo1234.');}return;
    }
    if(form.id==='recover-form') {modal('Acesso de demonstração','<p>Nenhum e-mail foi enviado. Todas as contas fictícias deste protótipo usam a senha <strong>demo1234</strong>. Volte ao acesso para continuar.</p>');return;}
    if(!user())return;
    if(form.id==='item-form'&&role()==='client') {
      if(!draft())return;
      const name=String(fd.get('name')).trim(),quantity=Number(fd.get('quantity')),limit=parsePrice(fd.get('limit'));
      if(!name||!Number.isFinite(quantity)||quantity<=0||quantity>999||Number.isNaN(limit)||(limit!==null&&limit<=0)){formError('Informe nome, quantidade positiva e um limite válido (ou deixe o limite em branco).');return;}
      const item={id:ui.editing||id('item'),name,quantity,unit:fd.get('unit'),limit,price:null,done:false,photo:null,unavailable:false};
      if(change(s=>{const d=s.drafts[user().id],idx=d.items.findIndex(i=>i.id===ui.editing);if(idx>=0)d.items[idx]=item;else d.items.push(item);})){ui.editing=null;render();document.getElementById('product-name')?.focus();}return;
    }
    if(form.id==='store-form'&&role()==='client'&&draft()) {const store=fd.get('store');if(stores.some(s=>s.id===store)&&change(s=>s.drafts[user().id].store=store))go('confirmar');return;}
    if(!r)return;
    if(form.id==='chat-form'&&r.worker) {
      const adjusting=form.dataset.adjustment==='true';
      const text=String(fd.get('message')??'').trim();
      if(!text){
        const error=adjusting?'Informe o motivo do ajuste antes de enviar a solicitação.':'Escreva uma mensagem antes de enviar.';
        document.getElementById('chat-error').textContent=error;
        const input=document.getElementById('message');input.setAttribute('aria-invalid','true');input.focus();return;
      }
      if(adjusting&&(role()!=='client'||r.status!=='received')){toast('O orçamento mudou. Confira seu status antes de solicitar um ajuste.');render();return;}
      // Reason and transition share one save: failure cannot create a reasonless request.
      if(mutateRequest(r.id,x=>{
        x.messages.push({id:id('m'),author:user().id,text:text.slice(0,1200),time:Date.now(),...(adjusting?{kind:'adjustment',revision:x.revision}:{})});
        if(adjusting)x.status='adjustment';
      })){
        if(adjusting){go(`chat/${r.id}`);toast('Pedido de ajuste enviado com sua justificativa.');}
        else {render();document.getElementById('message')?.focus();}
      }return;
    }
    if(form.id==='rating-form'&&role()==='client'&&r.status==='rewarded') {
      if(ui.rating<1||ui.rating>5){formError('Escolha uma nota de 1 a 5.');return;}
      if(mutateRequest(r.id,x=>{x.rating={score:ui.rating,comment:String(fd.get('comment')).trim().slice(0,500)};x.status='completed';})){ui.rating=0;go(`pedido/${r.id}`);toast('Avaliação registrada. Orçamento concluído!');}return;
    }
  });
  window.addEventListener('hashchange',e=>{
    const oldPage=new URL(e.oldURL).hash.replace(/^#\/?/,'').split('/')[0];
    if(current().page==='coletas'&&oldPage!=='coletas')ui.search='';
    ui.menu=false;ui.notifications=false;ui.rating=0;render();window.scrollTo(0,0);});
  window.addEventListener('resize',()=>{const sidebar=app.querySelector('.sidebar');if(sidebar)sidebar.inert=window.matchMedia('(max-width:740px)').matches&&!ui.menu;});
  window.addEventListener('keydown',e=>{
    const target=document.querySelector('.tour-target');
    if(target){
      if(e.key==='Escape'){dismissTour();target.focus();return;}
      if(e.key==='Tab'){e.preventDefault();const close=document.querySelector('.tour-panel button');(document.activeElement===target?close:target)?.focus();return;}
    }
    if(e.key==='Escape'&&!document.querySelector('[role=dialog]')&&(ui.menu||ui.notifications)){ui.menu=false;ui.notifications=false;render();app.querySelector('.menu-toggle')?.focus();}});
  window.addEventListener('storage',e=>{
    if(e.key===THEME){theme=e.newValue==='dark'?'dark':'light';applyTheme();return;}
    if(e.key!==KEY)return;
    try {
      const incoming=JSON.parse(e.newValue);if(!incoming||incoming.version!==1||!Array.isArray(incoming.requests))return;
      const active=document.activeElement,focusId=active?.id,pending={};
      app.querySelectorAll('input:not([type=file]):not([type=checkbox]):not([type=radio]),textarea').forEach(el=>{if(el.id)pending[el.id]=el.value;});
      state=incoming;if(session&&!state.users.some(u=>u.id===session.id)){logout();return;}
      render();
      // Preserve a message or form still being typed in this tab. Collected prices
      // come from shared state so a remote accepted change is not hidden.
      for(const [key,value] of Object.entries(pending)){const input=document.getElementById(key);if(input&&!input.classList.contains('price-input'))input.value=value;}
      if(focusId)document.getElementById(focusId)?.focus();
    }catch{}
  });
  window.CotaJuntoTour?.connect({
    snapshot:()=>({state,user:user(),role:role(),route:location.hash.replace(/^#\/?/,''),persistent}),
    navigate:go,
    release:()=>{clearSwitchIntent();dismissTour();}
  });
  save();
  if(!location.hash)location.hash='/entrar';else render();
})();
