# Posicionamento responsivo e navegação automática — etapa 2.3

Implementação em **10 de outubro de 2026**, sobre a versão existente da etapa 2.2. Mantidos integralmente os **62 passos**, títulos, textos, ordem, perfis, rotas, condições de avanço, cenário conectado e persistência. README, identidade visual e dados financeiros fictícios preservados.

## Fontes utilizadas

Os dois caminhos indicados em `Desktop/Modelos` não continham os anexos nesta execução. Foram localizados, na pasta da disciplina, o relato correspondente em **Lista de Ajustes a Fazer no Aplicativo - 7.md**, com **cinco capturas de tela**, e a especificação **2.3. Corrigir o posicionamento responsivo e a navegação automática do guia interativo no mobile.md**. O relato e todas as imagens foram examinados primeiro; depois, as 31 seções da especificação foram lidas integralmente. Não foi possível conferir o PDF original ausente. A lista posterior de novos efeitos visuais não faz parte desta entrega.

## Causas corrigidas

O cálculo anterior escolhia a região inferior como padrão no mobile. Além disso, a função que buscava um link da navegação retornava o botão hambúrguer quando o menu estava recolhido. Por isso o guia destacava o controle intermediário e dependia de sua abertura manual.

Agora o guia resolve sempre o alvo real. O posicionamento avalia a geometria desse alvo, o painel, a viewport visual, cabeçalho fixo, navegação e margens. A necessidade de abrir o menu depende de o alvo pertencer à navegação recolhida; não há regras por número de passo ou por texto.

## Critérios atendidos

| Requisito | Implementação |
| --- | --- |
| Painel contextual no mobile e desktop | Compara espaço acima, abaixo e nas duas laterais; mantém proximidade e margens de segurança. |
| Pouco espaço ou textos longos | Ajusta largura/altura, mantém título e ações acessíveis e permite rolagem interna da descrição com a indicação existente. |
| Fallback | Compartilha a área útil entre o painel compacto e a porção visível do alvo somente quando o conjunto não cabe nos lados disponíveis. |
| Rolagem automática | Considera cabeçalho e área do painel. Em cards/formulários altos, prioriza o campo editável ou o controle em foco, sem abrir o teclado automaticamente. |
| Interação | Campo, botão ou link necessário continua utilizável; ring e sombras usam a mesma geometria final do painel. |
| Atualizações de layout | Recalcula por scroll, resize, visualViewport, foco, carregamento e ResizeObserver; agrupa medições em requestAnimationFrame. |
| Menu automático | Detecta ancestral `.sidebar` e estado recolhido, abre pelo mesmo controlador do hambúrguer e aguarda a transição real e dois frames antes do destaque. Também aguarda o fechamento que possa encobrir o próximo alvo. |
| Menu em passos consecutivos | Mantém aberto ao navegar para outra etapa que também depende dele, sem ciclo de fechar/reabrir. |
| Estado anterior | Registra em memória se a abertura foi feita pelo guia. Fecha o menu aberto pelo guia quando dispensável ou ao sair; preserva um menu que já estava aberto pelo usuário. A navegação livre mantém seu fechamento normal ao mudar de página. |
| Dois perfis | Aplica a mesma regra aos links efetivamente presentes no menu do Cliente ou do Colaborador. |
| Sincronização | Reconsulta o alvo depois da transição; enquanto ela ocorre, não apresenta painel/ring em coordenadas intermediárias. |
| Desktop | Navegação permanente não é aberta artificialmente; o painel aproveita o espaço lateral quando disponível. |
| Acessibilidade | Mantidos teclado, Escape, atributos semânticos, botões de saída, preferência de movimento reduzido e leitura com zoom. |
| Preservação funcional | Sem alterações nas regras de coleta, chat, ajuste, aprovação, recompensa, avaliação, armazenamento ou numeração. |
| Publicação | Continua HTML/CSS/JavaScript estático, sem novas bibliotecas, backend ou serviços externos. |

## Arquivos modificados

- `product-tour.js`: posicionamento adaptativo, revelação do alvo, observação da geometria e preparação/restauração do menu.
- `product-tour.css`: impede encolhimento do título/indicador e evita exibir destaque enquanto a navegação está em transição.
- `app.js`: controlador compartilhado do menu e integração com as transições do guia.
- `ALTERACOES.md` e `VALIDACAO.md`: registro desta entrega e dos testes, preservando o histórico.

A extração do controlador do menu foi necessária para usar o estado real do aplicativo. Abrir/fechar o menu agora atualiza seus próprios elementos, sem reconstruir a página ou perder campos em edição. Não foram adicionados passos, funcionalidades de negócio, dependências nem alterações no README.

O pacote de publicação mantém os mesmos 11 arquivos. A versão pública do GitHub Pages só será atualizada quando esses arquivos forem enviados ao repositório.

---

# Fluxo, numeração e transições do Product Tour — etapa 2.2

Implementação concluída em **9 de outubro de 2026**, sobre a versão existente da etapa 2.1. O PDF de observações foi lido primeiro, incluindo as capturas das sete páginas; depois, foi lida a especificação completa da etapa 2.2. O README não foi modificado.

## Correções e critérios atendidos

| Requisito | Resultado |
| --- | --- |
| Apresentação da Área do Cliente | Novo passo 2, após o acesso e antes da Visão geral; explica o papel do Cliente e liga o percurso à futura coleta. |
| Preparação da primeira troca | Passo 13 explica como a mesma solicitação será encontrada, aceita, pesquisada e devolvida pelo Colaborador. |
| Apresentação da Área do Colaborador | Novo passo 16, antes dos indicadores financeiros; situa o usuário no outro lado da mesma solicitação. |
| Dados da conta do Colaborador | Novo passo 19, antes do histórico; destaca nome, e-mail e avatar de iniciais, sem inventar telefone, edição ou upload de foto de perfil. |
| Coleta de preços e fotos | Passos 25 e 26 contextualizam a visita simulada ao estabelecimento, produto, embalagem, etiqueta, preço por unidade e evidência vinculada ao item. Fotos continuam opcionais no uso livre. |
| Numeração repetida | As cinco trocas têm passos separados para sair do perfil e selecionar a conta na entrada. Os novos acessos são 15, 36, 43, 51 e 57. |
| Numeração dinâmica | Indicador calculado pela posição no roteiro e pela quantidade real de etapas: **1 a 62**, sem valores fixos na interface. Os 53 IDs anteriores permanecem na mesma ordem relativa. |
| Transições sem falsa retomada | O acesso guiado confirma a etapa e indica a rota da próxima etapa ao aplicativo. O mesmo pedido e os mesmos participantes continuam vinculados. |
| Retomada legítima | Desvios manuais ainda oferecem “Voltar à etapa”. Confirmações e telas auxiliares não recebem um segundo número de passo. |
| Encerramento | Passo 61 mantém o último resumo funcional. Novo passo 62 traz parabéns, síntese dos dois perfis, sugestões de exploração e “Concluir guia”. Finalizar remove destaque/bloqueios, preserva o cenário e grava a conclusão. |
| Reinicialização pelo Perfil e pelo Guia | Mantida a restauração dos exemplos; o estado do tour, a sessão e a intenção de troca são limpos, com retorno explícito a `index.html#/entrar`. Cancelar continua preservando os dados. |
| Responsividade e identidade | CSS, cores, temas, tipografia e componentes existentes preservados. A despedida usa o posicionamento centralizado já disponível no controlador. |
| GitHub Pages | Aplicação continua estática, sem novas dependências, servidor próprio ou processamento financeiro. |

## Causa dos problemas e organização do estado

Antes, um único passo de troca mostrava duas interfaces diferentes: o botão no cabeçalho e, depois, a seleção do perfil na entrada. Isso repetia o mesmo número. Agora são duas ações com IDs distintos, ambas aguardando a interação real.

O falso aviso de retomada vinha da divergência entre a rota de acesso e a rota esperada pelo tour. O acesso do Colaborador sempre abria `inicio`, mas a correção do orçamento precisava de `coletas/em-andamento`; os retornos ao Cliente também podiam retomar um contexto diferente do próximo passo. A correção conecta a confirmação do acesso ao destino definido pelo roteiro, preservando os destinos padrões fora do guia.

O progresso permanece em `cotajunto.tour.v1`, por ID estável de etapa, com o mesmo `runId`, `demoRequestId`, participantes e rascunhos. Um registro transitório `arrival` contém etapa, conta, origem e destino de um acesso confirmado. Ele permite restaurar uma navegação de acesso interrompida antes de aplicar o redirecionamento padrão de autenticação, é descartado após a chegada e não transforma desvios manuais em avanços automáticos. Progresso da versão anterior continua legível; guias já concluídos não reabrem.

O reset chamava `login('client')` após restaurar os exemplos, provocando a entrada automática. Agora encerra a sessão e normaliza o endereço para a entrada. A rotina de restauração dos dados de negócio permanece a mesma.

## Arquivos modificados

- `product-tour.js`: passos, textos pontuais, acesso guiado, chegada persistida, numeração de estados auxiliares e despedida.
- `app.js`: integração do destino guiado, restauração durante autenticação, saída após reset e explicação correspondente na página Guia.
- `ALTERACOES.md` e `VALIDACAO.md`: registro da etapa e resultados dos testes, com histórico preservado.

Nenhum arquivo de estilo, ativo, README ou dependência foi alterado. O ZIP contém os mesmos 11 arquivos de publicação, atualizados a partir da pasta final.

## Sequência final

| Passo | Perfil | Etapa |
| --- | --- | --- |
| 1 | Cliente | Comece pelo Cliente |
| 2 | Cliente | Bem-vindo à Área do Cliente |
| 3 | Cliente | Sua visão geral de Cliente |
| 4 | Cliente | Conheça a conta de teste |
| 5 | Cliente | Como recomeçar os testes |
| 6 | Cliente | Vamos preparar sua lista |
| 7 | Cliente | Crie sua lista de produtos |
| 8 | Cliente | Informe o que deseja pesquisar |
| 9 | Cliente | Leve a lista ao próximo passo |
| 10 | Cliente | Onde pesquisar os preços? |
| 11 | Cliente | Defina a recompensa |
| 12 | Cliente | Disponibilize sua solicitação |
| 13 | Cliente | Acompanhe o pedido enviado |
| 14 | Cliente | Vamos atender ao seu pedido |
| 15 | Colaborador | Entre como Colaborador |
| 16 | Colaborador | Bem-vindo à Área do Colaborador |
| 17 | Colaborador | Sua visão geral de Colaborador |
| 18 | Colaborador | Conheça o perfil de quem coleta |
| 19 | Colaborador | Esta é sua conta de Colaborador |
| 20 | Colaborador | Avaliações e coletas anteriores |
| 21 | Colaborador | Encontre o trabalho disponível |
| 22 | Colaborador | Veja o que pode aceitar |
| 23 | Colaborador | Encontre a lista que você criou |
| 24 | Colaborador | Assuma esta coleta |
| 25 | Colaborador | Registre o preço de cada item |
| 26 | Colaborador | Mostre de onde veio o preço |
| 27 | Colaborador | Confirme a conferência dos produtos |
| 28 | Colaborador | Converse antes de enviar |
| 29 | Colaborador | Avise que terminou a pesquisa |
| 30 | Colaborador | Volte à coleta para enviar |
| 31 | Colaborador | Entregue o orçamento ao Cliente |
| 32 | Colaborador | Veja como acompanhar o envio |
| 33 | Colaborador | Localize a coleta em andamento |
| 34 | Colaborador | O próximo passo é do Cliente |
| 35 | Colaborador | Receba o resultado como Cliente |
| 36 | Cliente | Entre como Cliente |
| 37 | Cliente | Procure sua lista de orçamento |
| 38 | Cliente | Abra o orçamento recebido |
| 39 | Cliente | Entenda os valores recebidos |
| 40 | Cliente | Peça a revisão de um preço |
| 41 | Cliente | Explique o que deve ser corrigido |
| 42 | Cliente | Veja o ajuste como Colaborador |
| 43 | Colaborador | Entre como Colaborador |
| 44 | Colaborador | Retome a coleta que precisa de revisão |
| 45 | Colaborador | Entenda o pedido antes de corrigir |
| 46 | Colaborador | Este é o motivo da revisão |
| 47 | Colaborador | Volte aos produtos para corrigir |
| 48 | Colaborador | Altere o preço que foi revisto |
| 49 | Colaborador | Envie a versão corrigida |
| 50 | Colaborador | Volte ao Cliente para concluir |
| 51 | Cliente | Entre como Cliente |
| 52 | Cliente | Confira o orçamento atualizado |
| 53 | Cliente | Confirme que o orçamento atende ao pedido |
| 54 | Cliente | Reconheça o trabalho da coleta |
| 55 | Cliente | Conte como foi a colaboração |
| 56 | Cliente | Veja o resultado do outro lado |
| 57 | Colaborador | Entre como Colaborador |
| 58 | Colaborador | Confira saldo e avaliação |
| 59 | Colaborador | Encontre a coleta concluída |
| 60 | Colaborador | Consulte a recompensa recebida |
| 61 | Colaborador | Você completou os dois lados do fluxo |
| 62 | Colaborador | Parabéns! Você concluiu a demonstração |

---

# Revisão dos textos do Product Tour — etapa 2.1

Concluída em **8 de outubro de 2026**. Lidas primeiro as observações de **Lista de Ajustes a Fazer no Aplicativo - 5.md**, seguidas da especificação integral **2.1. Revisar e otimizar os textos do guia interativo (UX Writing).md**. Os exemplos foram tratados como referência para revisar o guia inteiro.

**53 de 53 passos revisados**, além das boas-vindas e mensagens de entrada/troca de perfil, saída, retomada, mudança de página, confirmação e recuperação. Não houve inclusão, remoção ou reordenação de etapas.

| Critério | Revisão aplicada |
| --- | --- |
| Contexto para quem nunca usou o aplicativo | Cada passo situa o usuário, apresenta a finalidade da tela ou recurso e liga a ação ao percurso. Cliente e Colaborador são apresentados nas boas-vindas e no início do roteiro. |
| Motivo de começar como Cliente | Explica que a solicitação precisa ser criada antes de ser atendida pelo Colaborador. |
| Conceitos sem jargão | Lista, solicitação, rascunho, coleta, orçamento, recompensa, saldo, ganhos e ajuste recebem explicações simples. “Dashboard” dá lugar aos nomes visíveis “Início” e “Visão geral”. |
| Continuidade entre perfis | As trocas explicam o resultado da ação anterior, por que o outro participante precisa agir e o que será feito em seguida na mesma solicitação. |
| Recompensa | Explica a remuneração fictícia pelo trabalho, o mínimo de R$ 5,00, o equilíbrio entre as partes e o possível interesse em um valor maior, sem garantir aceite ou inventar prioridade automática. |
| Estabelecimento | Explica a relação entre lista e local, o limite de um estabelecimento por solicitação e a ausência de localização por proximidade ou alertas reais por região. |
| Perfil e reinicialização | Esclarece que nome/e-mail são apenas consultados. Distingue restauração dos exemplos e reinício do guia, que apagam alterações de teste, da retomada que mantém o percurso. |
| Instrução final | Todos os 53 textos terminam com uma chamada para ação. Rótulos conferidos na interface, incluindo “Revisar solicitação”, “Enviar pedido de ajuste”, “Confirmar recompensa fictícia” e “Enviar avaliação e concluir”. |
| Orientação adequada à tela atual | A instrução de troca é substituída pela de acesso ao chegar à entrada; não manda procurar um botão de troca que já não está naquela tela. Essa substituição modifica somente a mensagem. |
| Leitura e tom | Textos com 35 a 62 palavras, em pequenos parágrafos, com linguagem direta e instrução final em destaque. Quando necessário, “Role o texto ↓” indica a continuação da leitura dentro do painel. |
| Preservação | Mesmos 53 identificadores, ordem, perfis, rotas, seletores, condições de avanço, ações, vínculo do pedido, persistência e eventos. Nenhuma regra de negócio alterada. |

## Arquivos alterados nesta revisão

- `product-tour.js`: títulos, descrições e mensagens auxiliares; apresentação em parágrafos, chamada final contextual e indicação de leitura por rolagem.
- `product-tour.css`: espaçamento entre parágrafos, destaque da instrução final e aparência da barra de rolagem do texto.
- `ALTERACOES.md` e `VALIDACAO.md`: registro desta etapa, mantendo o histórico abaixo.

**Além dos textos, foram feitos apenas ajustes de apresentação.** Os limites de tamanho e o posicionamento dos painéis, overlays e spotlight foram mantidos. `app.js`, `index.html`, `appearance.css` e README permanecem idênticos à versão anterior desta etapa. Pacote ZIP atualizado com os mesmos 11 arquivos.

---

# Histórico — implementação do Product Tour

Etapa concluída em **8 de outubro de 2026**, conforme **2. Criar um guia interativo automático do protótipo.md**. Continuação sobre os arquivos existentes: preservada a implementação já concluída, corrigida a interação em telas baixas e finalizados os testes e o pacote.

| Requisito da fonte | Implementação e conferência | Resultado |
| --- | --- | --- |
| 1.1. Apresentação inicial | Boas-vindas explica o problema, a proposta, os dois perfis e a atividade guiada. Opções “Iniciar demonstração” e “Não desejo participar do guia”. | Atendido |
| 1.2. Sequência contextual | 53 etapas, com explicações e ações reais. Cada avanço interativo depende da navegação ou do dado confirmado pelo aplicativo. | Atendido |
| 1.3. Destaque responsivo | Spotlight, fundo escurecido, painel contextual, controles de toque, rolagem e foco. Posicionamento adaptável, inclusive em celular na horizontal; respeita movimento reduzido. | Atendido |
| 1.4. Cobertura dos dois perfis | Dashboards, menus, perfis, listas, produtos, local, recompensa, acompanhamento, filtros, aceite, preços, foto, conferência, chat, orçamento, ajuste, aprovação, avaliação e recebimento. Apenas recursos existentes. | Atendido |
| 1.5. Saída permanente | “Sair do guia” em todas as etapas iniciadas, com confirmação e cancelamento. Remove somente a apresentação do guia, mantém página e dados e libera os controles. Não reabre automaticamente. | Atendido |
| 1.6. Reinício | “Reiniciar dados de teste”, já existente no perfil, reinicia também o tour e reapresenta as boas-vindas. Guia interrompido pode ser retomado explicitamente em “Guia da demonstração”. | Atendido |
| 1.7. Persistência | Estado próprio e versionado, salvo localmente: novo, ativo, interrompido, recusado e concluído. Recusa e conclusão persistem após F5. | Atendido |
| 1.8. História única | Um percurso conectado Cliente → Colaborador → Cliente, incluindo correção e conclusão. | Atendido |
| 1.9. Trocas explícitas | Destaca o botão de troca e a opção correta na entrada; aguarda o acesso pelo usuário. Não efetua login silencioso. | Atendido |
| 1.10. Progresso entre perfis | Conserva execução, etapa, participantes e solicitação durante todas as trocas. | Atendido |
| 1.11. Mesmo cenário | O identificador do pedido realmente criado vincula lista, coleta, orçamento, conversa, ajuste, recompensa e avaliação. Não cria pedidos paralelos para demonstrar as telas. | Atendido |
| 1.12. Percurso recomendado | Apresentação, Cliente cria/envia, Colaborador aceita/coleta/conversa/envia, Cliente localiza e revisa o orçamento. Inclui navegação e perfil de ambos. | Atendido |
| 1.13. Ajuste e conclusão | Abrir “Pedir ajuste” não avança o estado do pedido. Exige mensagem enviada, troca ao Colaborador, leitura, mudança real de preço, reenvio, aprovação confirmada, recompensa simulada e avaliação enviada. | Atendido |
| 1.14. Ações obrigatórias | “Continuar” existe apenas nas explicações. Criação, inclusão, escolha, envio, troca, aceite, preços, mensagens, correção, aprovação e avaliação são observados no aplicativo. | Atendido |
| 1.15. Estado independente | Registra situação, etapa, execução, perfil/rota atual e esperados, ação esperada, participantes e identificador do cenário. | Atendido |
| 1.16. Restauração segura | F5, troca de rota/perfil e nova aba preservam o percurso quando os dados locais existem. Oferece retorno à etapa e transferência explícita entre abas; cenário ausente ou incompatível interrompe a condução sem fabricar dados. | Atendido |

## Estrutura e preservação

- `product-tour.js`: controlador isolado com etapas declarativas, condições de conclusão, observação da interface, persistência, restauração de campos em edição e recuperação segura.
- `product-tour.css`: estilos exclusivos do guia, aproveitando as cores e os temas existentes; reserva espaço para o painel sem impedir o acesso aos controles destacados.
- `index.html`: carrega os dois arquivos novos antes da inicialização do aplicativo.
- `app.js`: integração pontual na renderização, gravação, entrada/troca de perfil, criação do pedido e reinicialização. A orientação antiga de troca continua disponível fora do Product Tour.
- `ALTERACOES.md` e `VALIDACAO.md`: conferência dos requisitos e evidências da etapa, com histórico anterior preservado.

O progresso usa `cotajunto.tour.v1` no `localStorage`; `cotajunto.tour.tab` no `sessionStorage` identifica a aba que conduz o guia. `demoRequestId` associa a mesma solicitação a todas as etapas; `runId` e a marca `tourRunId` permitem recuperar esse vínculo caso a página seja atualizada entre a gravação do pedido e a atualização da interface. Preços, mensagens e decisões continuam sendo registrados pelas funções existentes do aplicativo.

**README e `appearance.css` preservados byte a byte.** Nenhum backend, dependência externa, pagamento real ou etapa de compilação foi adicionado. Os arquivos continuam próprios para publicação em subdiretório no GitHub Pages.

---

# Histórico — UI/UX e responsividade

Etapa concluída em **7 de outubro de 2026**, conforme o arquivo **1. Melhorar a experiência visual e a responsividade, principalmente em dispositiv.md**. Ajustes feitos sobre o aplicativo existente.

| Requisito | Implementação e conferência | Resultado |
| --- | --- | --- |
| 1.1. Componentes principais | Revistos cards, botões, cabeçalhos, menu lateral, barra superior, campos, filtros, indicadores, espaçamentos, margens, padding, ícones, fontes, modais e Dashboard. Controles móveis principais têm área mínima de 44 px; campos móveis usam fonte de 16 px. | Atendido |
| 1.2. Cards móveis | Valores e descrições financeiras lado a lado; menos espaçamento; prévias de listas/coletas compactadas; ícones puramente decorativos de produtos retirados das prévias móveis. Informações e ações mantidas. | Atendido |
| 1.3. Identidade visual | Preservados paleta, fontes, marca, bordas, ícones funcionais, estilo dos cards, temas claro/escuro e distinção dos dois perfis. | Atendido |
| 1.4. Breakpoints | Verificados celular pequeno, celular, tablet, notebook, desktop e tela larga, incluindo transições de layout e modo paisagem. Larguras entre 320 e 1920 px. | Atendido |
| 1.5. Aceitação | Conferidos limites de texto/componentes, ausência de rolagem horizontal, áreas de toque, sobreposição de controles, menus, modais, legibilidade e aproveitamento de espaço. | Atendido nos cenários testados |

## Melhorias específicas

- Cabeçalho fixo mais compacto e controles móveis com área confortável para toque.
- Cards financeiros horizontais em celulares, duas colunas e avaliação compacta em tamanhos intermediários, três colunas no desktop.
- Seções de coletas relevantes lado a lado quando há espaço, mantendo os mesmos dados e atalhos.
- Filtros em grade no celular, com todos os rótulos visíveis e busca em linha própria.
- Correção dos resumos que eram indevidamente divididos em colunas no tablet.
- Formulário de produtos reorganizado também na faixa intermediária de notebooks, evitando ultrapassar o card.
- Campos, produtos, botões, etapas e estabelecimentos com espaçamentos menores e quebra de texto adequada.
- Chat com altura adaptável; composição do pedido de ajuste preservada.
- Modais e notificações limitados à altura disponível da viewport; menu lateral com rolagem própria em telas baixas.
- Entrada, perfil, avaliação e recompensa ajustados aos mesmos critérios de densidade e legibilidade.

## Arquivos desta etapa

- `appearance.css`: refinamentos de apresentação e responsividade, organizados por componente e largura de tela.
- `app.js`: adicionado apenas um contêiner de layout às duas seções de prévias do Dashboard do Colaborador. Regras de negócio, rotas e eventos preservados.
- `ALTERACOES.md` e `VALIDACAO.md`: registro da implementação e dos testes; registros anteriores mantidos abaixo como histórico.

**Escopo respeitado:** README preservado byte a byte; nenhum novo Product Tour implementado. A orientação de troca de perfil que já existia foi preservada. Os dados continuam locais e fictícios, sem novas dependências ou servidor próprio.

---

# Histórico — Dashboard do Colaborador

Especificação integralmente lida: **Lista de Ajustes a Fazer no Aplicativo - 3.md**, na pasta informada pelo usuário. O nome sem sufixo citado na mensagem não existe nessa pasta; a versão 3 contém os 12 itens desta etapa e corresponde à nova organização solicitada.

Implementação realizada sobre o protótipo existente, preservando as rotas e funcionalidades não substituídas pelo documento.

| Item | Conferência final | Resultado |
| --- | --- | --- |
| 1. Nova página Início | `#/inicio` renderiza o Dashboard do Colaborador, com saudação e visão geral da conta. O mesmo endereço continua exibindo o Dashboard próprio do Cliente quando esse perfil está ativo. | Atendido |
| 2. Remover Minhas tarefas | Removida a renderização duplicada e o item do menu. Endereços antigos apenas redirecionam a Minhas coletas; nenhum link atual aponta para a tela antiga. | Atendido |
| 3. Preservar Minhas coletas | Uma única listagem operacional, com busca, Todas, Disponíveis, Em andamento e Concluídas. Aceite, recusa, continuação e consulta permanecem funcionais. | Atendido |
| 4. Resumo financeiro | Saldo disponível calculado pelas recompensas confirmadas; ganhos em andamento pelas aceitas ainda sem confirmação. Apenas valores do Colaborador ativo. Identificação explícita de simulação, sem saque real. | Atendido |
| 5. Avaliação média | Média das notas reais do cenário, duas casas decimais, quantidade de avaliações e estado sem avaliações. | Atendido |
| 6. Resumo das coletas | Contadores usam a mesma classificação da listagem. Cada contador abre Minhas coletas com o filtro correspondente. | Atendido |
| 7. Coletas no Dashboard | Até duas em andamento e duas disponíveis, com estado, estabelecimento, quantidade/progresso, recompensa e acesso à coleta/orçamento. Lista completa permanece em Minhas coletas. | Atendido |
| 8. Atalhos entre as páginas | Ver todas, Continuar, Acompanhar ganhos e contadores abrem os filtros corretos; Minhas coletas abre Todas. Filtros preservados na rota e ao recarregar. | Atendido |
| 9. Organização de Meu perfil | Nome, avatar e dados de conta preservados. Avaliações recentes e atalho para histórico adicionados; painéis de saldo e operação ficam no Início. | Atendido |
| 10. Entrada padrão | Botão Sou Colaborador, login por senha, novo cadastro e troca guiada entram em `#/inicio`. O Colaborador não é levado diretamente à coleta ao acessar. | Atendido |
| 11. Estrutura final | Menu contém Início, Minhas coletas, Meu perfil e Guia da demonstração. Visão geral, operação e conta têm responsabilidades separadas. | Atendido |
| 12. Identidade visual | Reutilizados marca, cores, fontes, ícones, painéis, cards, espaçamentos, navegação e temas existentes. Ajustes responsivos aplicados ao conteúdo novo. | Atendido |

## Critérios para manter os valores coerentes

As classificações são compartilhadas pelo Dashboard e pela listagem. Coletas com recompensa confirmada contam como concluídas, inclusive enquanto aguardam a avaliação, seguindo a regra que já existia no protótipo. Aprovar o orçamento sem confirmar a recompensa ainda não transfere o valor para o saldo. Uma confirmação soma a recompensa uma única vez; a avaliação posterior altera apenas a reputação.

Não são usados números de exemplo fixos para os indicadores. Recompensas variáveis, novas solicitações, recusas, aceite, alterações de estado e avaliações são refletidos a partir dos dados locais. Coletas de outros colaboradores não somam saldo, ganhos ou notas desta conta.

## Alterações anteriores preservadas

Mantidos: troca guiada pela entrada, modos claro/escuro, identificação permanente dos perfis, cabeçalho fixo, recompensa editável antes de criar a solicitação e ajuste condicionado ao envio de justificativa. Nesta etapa, a regra nova de entrada no Dashboard substitui somente o retorno direto à solicitação ao acessar o perfil Colaborador. O retorno contextual ao Cliente continua disponível.

Mantidos também criação de listas, preços, fotos, mensagens, ajustes, reenvio, aprovação, recompensa fictícia, avaliação, cadastro simulado, recuperação demonstrativa, armazenamento local e sincronização entre abas.

## Arquivos alterados

- `app.js`: Dashboard, classificação compartilhada, cards, filtros por rota, navegação, entrada, histórico do perfil e guia.
- `appearance.css`: estilos complementares do Dashboard e do histórico, reutilizando os componentes e temas.
- `README.md`, `ALTERACOES.md`, `VALIDACAO.md`: orientações e registro desta revisão.

Nenhum backend, pacote externo ou etapa de compilação foi adicionado. Os arquivos continuam prontos para GitHub Pages. A URL pública precisa ser testada depois da substituição dos arquivos no repositório.
