# CotaJunto — protótipo de orçamento colaborativo

Aplicativo navegável da **Atividade Avaliativa 01 do Projeto Integrador III**, baseado no projeto **Aplicativo de Orçamento Colaborativo em Tempo Real** e na base de requisitos preparada para a atividade.

**Pronto para GitHub Pages.** Não exige instalação de pacotes, compilação, servidor de aplicação, chave de API ou banco de dados. Os arquivos HTML, CSS, JavaScript e SVG são locais, sem bibliotecas ou fontes externas.

## Começar a testar

1. Extraia o ZIP.
2. Abra `index.html` em um navegador moderno para uma demonstração local simples. Para testar a sincronização entre abas de forma consistente, use a versão publicada ou um servidor HTTP local.
3. Clique em **Sou Cliente** ou **Sou Colaborador**. O botão **Trocar para...** no topo encerra o perfil atual e retorna à entrada. Clique na opção destacada (**Sou Cliente** ou **Sou Colaborador**) para concluir a troca. O Colaborador sempre entra em **Início**. No retorno ao Cliente, o contexto da solicitação é retomado quando disponível.
4. Consulte **Guia da demonstração**, no menu do aplicativo, para o roteiro do professor.

| Perfil | E-mail fictício | Senha fictícia |
| --- | --- | --- |
| Cliente — Marina Alves | cliente@teste.com | demo1234 |
| Colaborador — João Silva | colaborador@teste.com | demo1234 |

O cadastro também funciona como demonstração: cria uma identidade local que usa a mesma senha fictícia. **Não use sua senha, e-mail ou dados pessoais reais.** Não existe autenticação de produção. O botão Google e a recuperação de senha são simulações explicitamente identificadas.

## Publicar no GitHub Pages

1. Entre na sua conta do GitHub e crie um repositório. No plano gratuito, use um repositório público para este procedimento.
2. Extraia os arquivos do ZIP em seu computador.
3. Envie **o conteúdo** da pasta do protótipo para a raiz do repositório. O arquivo `index.html` deve ficar diretamente na raiz, junto de `app.js`, `styles.css` e da pasta `assets`.
4. Inclua o arquivo `.nojekyll`. Ele pode aparecer como arquivo oculto em alguns programas. Nenhum arquivo do protótipo depende de Jekyll.
5. Confirme o envio dos arquivos com um commit na branch `main` (ou na branch principal que você utiliza).
6. Abra **Settings → Pages** no repositório.
7. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
8. Selecione a branch em que os arquivos foram enviados e a pasta **/(root)**. Clique em **Save**.
9. Aguarde a publicação terminar. Consulte o link exibido pelo próprio GitHub Pages.
10. Abra o endereço publicado em uma janela privativa e teste os dois perfis antes de enviar ao professor.

O endereço de um site de projeto normalmente segue o formato `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`. Esse endereço é apenas um **modelo**; substitua-o pelo link realmente publicado. O protótipo usa arquivos relativos e rotas com `#`, permitindo recarregar uma tela dentro do subdiretório do repositório.

Não envie somente o ZIP ao repositório: **extraia e publique seus arquivos**. Se o ZIP for enviado sem extração, o GitHub Pages não encontrará a página inicial.

Referências técnicas: [O que é GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) e [Configurar a origem de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Roteiro completo para demonstrar

### Criar uma solicitação

1. Entre como Cliente e escolha **Nova lista**.
2. Dê um nome à lista. Adicione os produtos, quantidades, unidades e limites de preço opcionais.
3. Escolha um estabelecimento.
4. Revise a lista e defina a recompensa fictícia. Ela começa em **R$ 5,00** e pode ser aumentada antes da confirmação. Confirme; a solicitação ficará **Aguardando colaborador**.

### Coletar e enviar

5. Use **Trocar para Colaborador** no topo e, na entrada, clique em **Sou Colaborador**, que estará destacado. O aplicativo abrirá o Dashboard em `#/inicio`. Use **Disponíveis** ou **Minhas coletas** e abra a solicitação criada.
6. Aceite a tarefa. A recusa também pode ser demonstrada e encerra apenas a participação desse colaborador.
7. Informe os preços **por unidade**, marque os produtos como conferidos e anexe fotos locais. Se preferir, use **foto de exemplo**, que cria uma evidência fictícia claramente marcada.
8. Caso um produto não seja encontrado, marque **Não encontrado**. Ele ficará fora do total. A demonstração exige pelo menos um produto encontrado antes do envio.
9. Clique em **Enviar orçamento**.

### Revisar, ajustar e concluir

10. Troque para Cliente, confirme a escolha na tela de entrada e examine o orçamento e as fotos.
11. Para testar a alternativa, escolha **Pedir ajuste**, escreva o motivo e clique em **Enviar pedido de ajuste**. Só esse envio registra a solicitação. Campo vazio ou apenas espaços é bloqueado. Voltar, sair, recarregar ou fechar antes de enviar não muda o status. Depois, troque de perfil pela entrada. No Dashboard do Colaborador, abra a coleta em andamento e use o chat para responder.
12. No Colaborador, abra **Revisar itens**, corrija os preços e reenvie. O total visto pelo Cliente será atualizado.
13. No Cliente, aprove o orçamento e confirme a recompensa **fictícia** definida na criação da solicitação (R$ 5,00 por padrão).
14. Registre uma nota de 1 a 5 e um comentário opcional.
15. Volte ao perfil Colaborador. No Início, o saldo será atualizado; abra **Concluídas** e a coleta para consultar o recebimento. Nenhuma transação real foi realizada.

Também existem três pedidos iniciais: **Compra da semana** (disponível para coleta), **Despensa de casa** (orçamento pronto) e **Café da manhã** (concluído). Eles facilitam a avaliação sem precisar preencher todo o fluxo.

## Área do Colaborador

O acesso por botão de demonstração, login ou troca guiada sempre leva o Colaborador a **`index.html#/inicio`**.

| Área | Função |
| --- | --- |
| Início | Visão geral: saudação, saldo fictício, ganhos em andamento, média das avaliações, contadores e prévias limitadas de coletas. |
| Minhas coletas | Única listagem operacional completa, com busca e filtros Todas, Disponíveis, Em andamento e Concluídas. |
| Meu perfil | Identidade fictícia, dados da conta, avaliações recebidas e atalho para o histórico de coletas. |
| Guia da demonstração | Explicação do projeto e roteiro dos dois perfis. |

**Minhas tarefas foi removida.** Não existe outra página de listagem com a mesma função. Um endereço antigo `#/tarefas` apenas redireciona para `#/coletas`, sem renderizar uma tela duplicada; nenhum botão ou link atual aponta para essa rota antiga.

### Indicadores calculados a partir das coletas

- **Disponíveis:** solicitações aguardando Colaborador, ainda não aceitas e não recusadas por esta conta.
- **Em andamento:** coletas vinculadas a este Colaborador cuja recompensa ainda não foi confirmada. Inclui coleta, ajuste, orçamento enviado e orçamento aprovado aguardando confirmação da recompensa.
- **Concluídas:** coletas deste Colaborador com recompensa confirmada. A avaliação pode ainda estar pendente; esse critério preserva o comportamento operacional anterior.
- **Saldo disponível:** soma das recompensas fictícias confirmadas das coletas concluídas.
- **Ganhos em andamento:** soma das recompensas das coletas aceitas ainda sem confirmação. Coletas apenas disponíveis e recompensas de outros colaboradores não entram nessa soma.
- **Sua avaliação:** média das notas efetivamente registradas para este Colaborador, com duas casas decimais e quantidade de avaliações. Sem notas, aparece “—” e uma explicação.

O total dos produtos não é ganho do Colaborador. As somas das recompensas são feitas em centavos para evitar diferenças de arredondamento. No cenário inicial: saldo **R$ 5,00**, ganhos **R$ 5,00**, média **5,00** de uma avaliação, com **1 disponível, 1 em andamento e 1 concluída**. Esses números mudam conforme as ações na demonstração.

### Atalhos e filtros

| Atalho | Destino |
| --- | --- |
| Disponíveis / Ver todas da seção Coletas disponíveis | `#/coletas/disponiveis` |
| Em andamento / Continuar / Acompanhar ganhos | `#/coletas/em-andamento` |
| Concluídas / Consultar histórico no perfil | `#/coletas/concluidas` |
| Minhas coletas / Ver todas do resumo | `#/coletas` — filtro Todas |
| Ver avaliações | `#/perfil` |

Os filtros fazem parte da rota: continuam corretos após F5, acesso direto e navegação pelo histórico do navegador. Ao chegar do Dashboard, uma busca anterior é limpa. Dentro da listagem, trocar o filtro preserva a busca atual.

O Dashboard mostra até **duas coletas em andamento** e **duas disponíveis**. Ajustes e coletas em execução têm prioridade; dentro de cada prioridade, aparecem as atualizações mais recentes. As disponíveis são ordenadas pela criação mais recente. Os cards exibem estabelecimento, produtos/progresso, recompensa e acesso à ação adequada ao estado. O perfil mostra até cinco avaliações recentes; o histórico completo de coletas permanece na listagem.

## O que significa tempo real neste protótipo

- Ao alternar perfis no mesmo navegador, os dois visualizam os mesmos pedidos, preços, fotos e mensagens.
- Em duas abas da **mesma origem e do mesmo navegador**, mudanças são refletidas pelo evento `storage`. Cada aba mantém seu próprio perfil ativo.
- Para testar: abra duas abas do endereço publicado, entre em um perfil diferente em cada uma e abra a mesma solicitação.
- **Não há sincronização entre computadores, celulares, navegadores diferentes ou janelas privativas separadas.** Cada um terá sua própria demonstração local.
- Não existe backend, WebSocket, API, Firebase, banco de dados remoto nem autenticação real. A implementação de múltiplos usuários reais exigiria serviços adicionais e regras de segurança.
- As notificações são internas à aplicação; não são notificações push do sistema.

## Regras e escolhas adotadas

- Os fluxos de Cliente e Colaborador seguem os materiais do PI II: lista, local, coleta, fotos, chat, ajustes, aprovação, recompensa simulada e avaliação.
- **CotaJunto**, a identidade visual, as contas de exemplo, os campos detalhados, a escala de avaliação, o filtro de listas e o tratamento de itens não encontrados são escolhas recomendadas adotadas para a demonstração; não são novas exigências do professor.
- Quantidade × preço unitário gera o subtotal; a soma dos produtos encontrados gera o total. A recompensa é separada e não entra no total dos produtos.
- O limite de preço é **unitário e indicativo**. Um preço acima do limite gera um aviso, sem bloqueio automático.
- Valores monetários têm até duas casas decimais. Digite `6,50` ou `6.50`, sem separador de milhar.
- Fotos são opcionais. São aceitas imagens JPG, PNG e WebP de até 10 MB, reduzidas para no máximo 900 px na maior dimensão antes do armazenamento. Fotos são locais e não são enviadas a um servidor.
- A foto de exemplo é uma ilustração fictícia do valor no momento em que foi criada. Se o preço for corrigido, substitua a evidência, como faria com uma foto real.
- Ao recusar, o colaborador deixa de ver a tarefa; o Cliente continua aguardando um colaborador. A redistribuição automática não foi implementada. Reinicie o cenário para demonstrar essa tarefa novamente com a mesma conta.
- Aprovação, recompensa e avaliação dependem do estado do pedido, evitando repetição indevida por retorno à tela.
- A lógica de perfis é apenas de interface. Como todo o código e os dados estão no navegador, não existe isolamento seguro equivalente a um sistema de produção.

## Aparência e identificação do perfil

- O botão de sol/lua alterna entre **modo claro e modo escuro**, inclusive na entrada, cadastro, recuperação e guia. A escolha fica salva no navegador e é compartilhada entre abas da mesma origem.
- O cabeçalho permanece no topo durante a rolagem. Em telas menores, seus controles se organizam em duas linhas.
- **Área do Cliente** tem identificação em verde mais leve; **Área do Colaborador** usa um cabeçalho verde mais forte. O nome da área permanece visível nos dois temas.
- A orientação de troca escurece o restante da entrada e destaca a opção de destino. O destaque termina ao selecionar o perfil, clicar em **Entendi**, pressionar **Escape**, clicar fora ou aguardar 15 segundos. Nenhuma dessas formas de dispensar a orientação entra automaticamente em uma conta.
- A animação é desativada quando o navegador está configurado para reduzir movimentos.

## Recompensa e ajustes

O Cliente pode alterar a recompensa na etapa **Confirmar**, antes de criar a solicitação. O mínimo e padrão são **R$ 5,00**, conforme a possibilidade de aumentar o valor pedida nesta revisão. A validação aceita até duas casas decimais, vírgula ou ponto, sem separador de milhar, e usa o mesmo limite técnico dos campos monetários do protótipo (R$ 1.000.000,00). O valor é preservado no rascunho e exibido na coleta, aprovação e recebimento; permanece separado do total dos produtos. Depois da criação, ele não é editável.

O motivo do ajuste e a mudança para **Ajuste solicitado** são salvos juntos. A mensagem fica identificada como **Motivo do pedido de ajuste** no chat. Uma conversa comum não muda o status. Se houver falha de armazenamento, nem o status nem a mensagem parcial são gravados, e o texto permanece para tentar novamente.

Pedidos da versão anterior que ainda estejam em ajuste com o aviso antigo e sem uma mensagem posterior do Cliente voltam a **Orçamento pronto**, com uma explicação no histórico. Quando já existe uma justificativa, ela é preservada e identificada. Listas, itens e preços existentes são mantidos.

## Persistência e reinício

Os dados ficam em `localStorage`, sob a chave `cotajunto.v1`. O perfil ativo de cada aba fica em `sessionStorage`, sob `cotajunto.session`. O tema usa `cotajunto.theme`; a intenção de troca de perfil usa `cotajunto.switch-intent` apenas na aba atual. Fechar uma aba exige selecionar o perfil novamente, mas as listas permanecem no navegador, se o armazenamento estiver disponível.

Em **Meu perfil → Reiniciar dados de teste**, o aplicativo pede confirmação antes de restaurar o cenário inicial. Esse comando remove apenas os dados do CotaJunto. Não apaga informações de outros sites.

Se o armazenamento estiver bloqueado, o aplicativo informa que os dados permanecerão apenas na aba. Se o espaço local estiver cheio, uma mensagem orienta a remover fotos ou reiniciar. O protótipo não é adequado a grandes volumes de imagens nem a edição concorrente de produção.

## Arquivos

```text
index.html          Entrada da aplicação
styles.css          Estilos e regras responsivas
appearance.css      Temas, identificação dos perfis, cabeçalho e orientação
app.js              Telas, navegação, estados, regras e persistência local
assets/logo.svg     Marca vetorial local
.nojekyll           Publicação estática sem processamento Jekyll
README.md           Instruções de uso e publicação
VALIDACAO.md        Testes executados e limites da verificação
ALTERACOES.md       Conferência dos 12 itens da organização do Colaborador
```

## Antes da entrega acadêmica

- Abra o link publicado sem estar conectado ao GitHub.
- Teste botões, rotas, retorno e recarregamento.
- Percorra os dois perfis, inclusive recusa e ajuste.
- Confira no celular, tablet e desktop.
- Inclua a URL real e capturas da versão publicada no guia entregue ao professor.
- Confirme integrantes atuais, prazo e demais documentos exigidos no AVA.
- Registre eventual confirmação específica do professor sobre GitHub Pages. A rubrica aceita aplicativo navegável, mas o material consultado não documentava aprovação individual desta hospedagem.

O site ainda **não foi publicado** por esta entrega de arquivos. A publicação e o teste da URL final devem seguir os passos acima.
