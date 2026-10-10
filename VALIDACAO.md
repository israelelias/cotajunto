# Validação de fluxo e transições — etapa 2.2

Testes em **9 de outubro de 2026**, com Google Chrome automatizado e os arquivos finais do projeto. O ambiente não permitiu alcançar o servidor HTTP local, e o Edge não iniciou; por isso os testes serviram os arquivos estáticos sem alteração por uma interceptação HTTP do Playwright. O navegador executou o JavaScript real, as ações de interface, rotas hash, armazenamento e renderização. A aplicação publicada não inclui esse mecanismo de teste.

## Percurso completo

Fluxo concluído em **320×568, 667×375, 768×1024 e 1440×1000**, cobrindo celular em retrato e paisagem, tablet e desktop. Tablet no modo escuro, demais percursos no modo claro. Verificados limites do painel, leitura até o fim dos textos, botões disponíveis e ausência de rolagem horizontal desnecessária. Capturas revisadas nas novas apresentações, perfil, entrada, ajuste, aprovação e despedida.

Cada percurso visita os **62 passos na ordem**, conferindo “Passo X de 62” e unicidade dos IDs. As transições são realizadas pelos botões reais: cabeçalho → entrada → seleção da conta. Um observador registra eventuais painéis de recuperação: nenhum aparece nas progressões normais. A retomada deliberada após uma pausa em outra página é reconhecida separadamente.

O percurso completo usa uma única solicitação: criação da lista, estabelecimento, recompensa de teste de R$ 8,50, aceite, preços, foto de exemplo, conferência, mensagem, envio, revisão, justificativa do ajuste, correção, reenvio, aprovação, recompensa e avaliação. No tablet foram usados dois produtos. Verificados preço final corrigido, revisão 2, nota 5, conclusão e ausência de pedido duplicado.

- Mensagem vazia não registra ajuste nem avança o guia.
- Preço inalterado não conclui a etapa de correção.
- Abrir/cancelar o modal não aprova o orçamento; a confirmação auxiliar não duplica a numeração.
- Selecionar estrelas sem enviar não conclui a avaliação.
- F5 durante reenvio e avaliação mantém progresso; o tablet também recarrega em cada uma das cinco entradas de troca.
- Concluir o passo 62 remove o tour e seus bloqueios; os controles voltam a funcionar e F5 não reabre o guia.

## Persistência, recuperação e reinicialização

**9 verificações de estado/compatibilidade aprovadas:**

1. 62 IDs únicos, todos os 53 passos anteriores na mesma ordem relativa, títulos antigos preservados e textos anteriores intactos fora dos cinco pontos solicitados/necessários; README e estilos comparados com a cópia anterior.
2. Reset pelo Perfil como Cliente.
3. Reset pelo Guia como Cliente.
4. Reset pelo Perfil como Colaborador.
5. Reset pelo Guia como Colaborador.
6. Restauração de uma chegada de login persistida antes da navegação, após recarga, sem falsa retomada.
7. Desvio manual continua oferecendo recuperação real, sem outro número de passo.
8. Progresso antigo no passo de troca continua pelo novo acesso, sem perder o pedido.
9. Guia concluído na versão anterior continua concluído.

Nos quatro resets foram verificados cancelamento, restauração dos exemplos, remoção dos dados extras/rascunhos, limpeza da sessão e intenção de troca, estado inicial do guia, endereço exato `index.html#/entrar` e permanência na entrada após F5. Depois, o acesso livre ao Colaborador continua abrindo o Início.

**9 verificações de ciclo de vida aprovadas:** recusa inicial; reset durante o guia; campos em edição/F5/desvio de rota; saída com confirmação sem perda de dados; retomada sem duplicação; fechamento e reabertura; controle entre abas; Escape; interrupção segura diante de pedido ausente.

**3 verificações de adaptação aprovadas:** rotação/teclado/movimento reduzido; restauração de rolagem e controles ao sair; armazenamento bloqueado com aviso e funcionamento em memória na aba.

## Demais funcionalidades

**12 grupos de regressão do uso livre aprovados:** acesso Cliente; criação de lista; recarga por hash em subdiretório; coleta com validação, foto e envio; chat/ajuste/reenvio; aprovação/recompensa/avaliação; recusa de coleta; cadastro/login fictício; recuperação de acesso simulada; sincronização entre abas; telas móveis/tablet sem overflow; ausência de erros de JavaScript e de recursos nos testes monitorados.

## Limites e publicação

Os testes foram feitos em viewports simuladas no Chrome, não em aparelhos físicos ou Safari. A versão pública do GitHub Pages não foi modificada: é preciso substituir os arquivos do repositório pelo pacote entregue. O protótipo mantém as limitações já existentes: dados e colaboração apenas no mesmo navegador/origem, nenhuma transação financeira real; armazenamento bloqueado impede persistir após recarga e essa condição é informada na interface.

Não restaram falhas conhecidas nos requisitos desta etapa. Sintaxe dos dois arquivos JavaScript e integridade/igualdade dos 11 arquivos do ZIP conferidas. Os testes e capturas de apoio ficam em `work/tour-flow-qa` e não integram a publicação.

---

# Validação da revisão textual — etapa 2.1

Revisão em **8 de outubro de 2026**, com leitura sequencial dos 53 textos, conferência dos rótulos na interface e testes no Microsoft Edge pelo Playwright. Arquivos servidos por HTTP local em subdiretório, mantendo a estrutura de publicação no GitHub Pages.

## Conteúdo e continuidade

- **53/53 passos com texto revisado e chamada para ação ao final.** Explicações de 35–62 palavras por passo, sem contar o título.
- Conferidos contexto, finalidade, motivo da ação, ligação com a etapa anterior e orientação para avançar.
- Revistas todas as trocas de perfil e as transições entre envio, ajuste, correção, aprovação, recompensa e avaliação.
- Identificados os recursos simulados; não prometida edição do perfil, geolocalização, alertas por região, prioridade automática por recompensa ou pagamento real.
- Conferida a diferença entre retomar a etapa salva e reiniciar a demonstração apagando as alterações dos testes.
- Instruções de recuperação e acesso adaptadas aos botões realmente disponíveis na tela, mantendo as mesmas rotas e ações.

## Percurso completo e leitura

**Fluxo completo aprovado em quatro viewports:** 320×568, 667×375, 768×1024 e 1440×1000. Tablet no modo escuro, com dois produtos; demais percursos no modo claro. Todos chegam ao passo 53 e à conclusão, com o mesmo pedido, correção de preço, segundo envio, recompensa fictícia e avaliação registrados.

Em cada etapa foram conferidos limites do painel, ausência de rolagem horizontal, disponibilidade dos botões e possibilidade de ler a descrição até o final. Capturas inspecionadas em boas-vindas, entrada, perfil/reinício, local, recompensa, troca de perfil, ajuste, aprovação e conclusão. Painéis conservam o tamanho anterior; descrições mais longas têm rolagem interna, indicação “Role o texto ↓” e instrução final destacada.

Mantidos os testes que comprovam que mensagem vazia não solicita ajuste, preço inalterado não conclui correção, abertura/cancelamento do modal não aprova e seleção da estrela sem envio não conclui a avaliação. F5 no reenvio e na avaliação também passou.

**12 grupos adicionais aprovados:** recusa inicial e persistência; reset durante o guia; F5 e desvio de rota; saída/cancelamento sem perda de dados; retomada sem duplicação; fechamento e reabertura; transferência entre abas; Escape; pedido ausente; rotação/teclado/movimento reduzido; restauração dos controles e da rolagem ao sair; armazenamento bloqueado com aviso.

Não foram observados erros JavaScript ou falhas HTTP nos percursos completos monitorados. Testes em viewports simuladas, não em aparelhos físicos.

## Preservação técnica e entrega

Comparação automática confirmou a mesma sequência, IDs, perfis, rotas, seletores e condições de conclusão dos 53 passos. Máquina de estados, persistência, restauração de formulários e eventos de ações permanecem iguais. A única adição à apresentação durante a rolagem mostra ou oculta a indicação de leitura; não avança o guia nem altera o pedido.

`app.js`, `index.html`, `appearance.css` e README comparados com a cópia anterior desta revisão: conteúdo idêntico. Sintaxe de `product-tour.js` validada. Pacote com 11 arquivos conferido quanto à integridade e igualdade com a pasta final. A publicação remota continua dependente da atualização dos arquivos no repositório do usuário.

---

# Histórico de validação — implementação do Product Tour

Revisão final em **8 de outubro de 2026**, com Microsoft Edge automatizado pelo Playwright, servidor HTTP local e inspeção visual das capturas. Caminho testado: `CotaJunto-GitHub-Pages/index.html#/entrar`, preservando a estrutura de subdiretório do GitHub Pages.

## Fluxo conectado completo

**As 53 etapas foram concluídas de ponta a ponta** em 320×568, 667×375, 768×1024 e 1440×1000 pixels. Tablet testado no modo escuro, com dois produtos; demais percursos no modo claro. Em 390×844 foram conferidos persistência, saída, retomada e navegação, além da rotação para 667×375.

O teste utiliza os controles reais: Cliente cria lista e solicitação → Colaborador aceita, informa preços, inclui foto de exemplo, confere itens, conversa e envia → Cliente solicita ajuste com justificativa → Colaborador lê, corrige preço e reenvia → Cliente confirma aprovação, recompensa fictícia e avaliação → Colaborador consulta saldo e recebimento → conclui o guia.

Conferências do percurso:

- Um único pedido novo vinculado à mesma execução até o final, sem duplicação entre perfis.
- Recompensa alterada para R$ 8,50; preço corrigido de R$ 6,00 para R$ 5,50; segunda revisão registrada; nota 5 e estado final concluído.
- Etapas obrigatórias sem botão para pular; mensagem vazia não solicita ajuste; preço sem alteração não conclui correção.
- Abrir ou cancelar aprovação não aprova; selecionar estrela sem enviar não registra avaliação.
- F5 antes do reenvio mantém a etapa. No tablet, F5 restaura estrelas e comentário ainda não enviados.
- Saída do guia durante o modal de aprovação preserva esse modal; aprovação normal e retomada continuam na etapa correta.
- Painéis do guia dentro da viewport e ausência de rolagem horizontal da página nas etapas verificadas.
- Nenhum erro JavaScript ou falha HTTP de recursos nos percursos monitorados.

## Persistência, saída e condições especiais

**12 grupos aprovados**: 9 de ciclo de vida e 3 de adaptação/armazenamento.

1. Recusar nas boas-vindas persiste após F5; cancelar a reinicialização mantém a decisão.
2. Reiniciar dados durante o guia elimina a execução anterior e reapresenta as boas-vindas.
3. F5 preserva etapa e campos em edição; desvio de rota oferece retorno sem reiniciar.
4. Sair exige confirmação, permite cancelar, mantém rota/dados e libera a interface sem retorno automático.
5. Retomada explícita conserva execução e rascunho, sem adicionar o mesmo produto novamente.
6. Fechar e abrir uma nova aba restaura o progresso após escolha explícita de continuar nela e acessar o perfil.
7. Uma segunda aba pode dispensar o guia ou assumir sua condução; a aba anterior remove a apresentação após a transferência.
8. Escape abre a confirmação de saída; pressioná-lo novamente retorna ao guia.
9. Pedido removido externamente produz orientação segura, sem recriar ou inventar um cenário.
10. Rotação da viewport durante o guia, Tab/Shift+Tab/Enter e preferência por movimento reduzido funcionam.
11. Saída remove os ajustes temporários de rolagem e libera os controles após a mudança de tamanho.
12. Armazenamento bloqueado apresenta aviso e mantém guia/aplicativo utilizáveis na aba atual.

## Funções anteriores e pacote

**19 grupos de regressão aprovados**: 12 do percurso normal e 7 adicionais, com o guia dispensado. Cobrem criação e persistência, perfil, preço decimal/negativo, imagem local comprimida, itens não encontrados, chat, ajuste, reenvio, aprovação/recompensa/avaliação, recusa, cadastro/login, recuperação demonstrativa, sincronização entre abas, formulários móveis, menu/Escape, confirmação de reinício, busca e estado vazio.

Sintaxe de `app.js` e `product-tour.js` validada. README e estilos da etapa anterior comparados por SHA-256, sem diferenças. ZIP conferido por lista de arquivos, integridade e igualdade dos conteúdos com a pasta final, incluindo os dois novos arquivos do tour.

## Limites da verificação

São viewports simuladas em navegador, não testes em aparelhos físicos. A URL pública não foi atualizada nesta etapa; deve receber os arquivos do pacote para disponibilizar o novo guia. O projeto continua sem backend: progresso e dados dependem do armazenamento desse navegador/origem, não são compartilhados entre dispositivos, e deixam de existir ao limpar os dados do site. Sem armazenamento disponível, permanecem apenas na aba atual. Restauração insegura orienta o usuário a sair ou reiniciar os dados, sem desfazer ações do aplicativo.

---

# Histórico de validação — UI/UX e responsividade

Verificação concluída em **7 de outubro de 2026**, com Microsoft Edge automatizado pelo Playwright, utilizando viewports simuladas e inspeção visual de capturas. Aplicativo servido por HTTP local no subdiretório `CotaJunto-GitHub-Pages/`.

## Resultado desta etapa

- **908 verificações de layout aprovadas**, incluindo os modos claro e escuro, os dois perfis e as páginas de acesso.
- **27 grupos de testes funcionais aprovados**: 12 do fluxo completo, 7 adicionais e 8 de Dashboard/navegação/indicadores.
- Nenhum erro JavaScript, falha HTTP de recursos ou ocorrência de overflow nos cenários monitorados.
- Verificados limites internos dos cards/formulários e da página; ausência de sobreposição entre os controles dos grupos de ações, filtros, coleta e formulários.
- Modais, notificações, menu móvel e cabeçalho fixo verificados também em telas baixas. Textos longos e valores financeiros extensos testados.
- README comparado com a versão anterior: conteúdo idêntico. Sintaxe JavaScript validada.

## Tamanhos verificados

320×568, 360×800, 390×844, 540×800, 740×900, 741×900, 768×1024, 950×900, 951×900, 1024×800, 1151×900, 1280×900, 1440×1000, 1920×1080 e 667×375 pixels.

As larguras próximas às mudanças de layout foram incluídas para conferir a transição entre menu móvel e lateral, colunas de resumos, formulários e Dashboard. São testes de navegador com dimensões simuladas; não correspondem a testes em aparelhos físicos.

## Telas e interações verificadas

- Entrada, cadastro, recuperação e guia.
- Cliente: Início, listas, adição de produtos, local, confirmação/recompensa editável, orçamento em diferentes estados, chat comum e pedido de ajuste, recompensa, avaliação e perfil.
- Colaborador: Início, todos os filtros de Minhas coletas, detalhe da solicitação, coleta/preços/fotos, orçamento, recebimento, chat, perfil e histórico de avaliações.
- Criação e persistência de listas, aceite/recusa, validação de preços, fotos locais, envio, ajuste com justificativa, reenvio, aprovação, recompensa fictícia e avaliação.
- Troca guiada de perfil já existente, retorno ao Dashboard, navegação por hash, filtros, busca, estados vazios e atualização entre abas.
- Menu por toque e Escape, notificações, abrir/cancelar modais, acesso ao botão de confirmação em viewport curta e preservação de dados ao cancelar.

## Comparação de densidade

Cenário inicial idêntico antes e depois, medido em 360 px de largura:

| Componente/tela | Antes | Depois | Efeito |
| --- | ---: | ---: | --- |
| Conjunto dos três cards financeiros | 631 px | 414 px | Aproximadamente 34% menos altura |
| Página do Dashboard do Colaborador | 2086 px | 1623 px | Aproximadamente 22% menos rolagem |
| Cards de listas do Cliente | 238–244 px | 163 px | Informações e acesso preservados em cards menores |

No desktop de 1440 px, o Dashboard inicial passou de 1548 para 1093 px de altura, com as duas seções de coletas lado a lado. As medidas representam o cenário de exemplo, não uma altura fixa imposta às páginas.

---

# Histórico de validação — Dashboard do Colaborador

Verificação em 6 de outubro de 2026, com Microsoft Edge automatizado pelo Playwright. Arquivos servidos por HTTP local no subdiretório `CotaJunto-GitHub-Pages/`, mantendo a estrutura esperada em um site de projeto no GitHub Pages.

**31 grupos de verificações passaram nesta etapa.** Sintaxe JavaScript validada; nenhum erro JavaScript ou falha HTTP nas jornadas monitoradas. Capturas de desktop, tablet e celular foram inspecionadas, nos modos claro e escuro.

## Dashboard e organização

- Passou: Entrada Colaborador abre Início com menu correto, saudação e dados coerentes do cenário inicial.
- Passou: Indicadores, Ver todas e Continuar abrem filtros corretos; busca, F5 e Voltar funcionam.
- Passou: Rota antiga redireciona sem página duplicada; login por senha e troca guiada entram no Dashboard.
- Passou: Somas por recompensa, média de notas, separação por usuário, recusa, limite de prévias e histórico do perfil.
- Passou: Recompensa confirmada migra de ganhos para saldo uma vez; nova avaliação atualiza a média entre abas.
- Passou: Dashboard, lista e perfil responsivos em 320–1440 px, dois temas, cabeçalho fixo e menu móvel.
- Passou: Estado sem coletas e sem avaliações mostra zeros, explicações e filtros vazios funcionais.
- Passou: Sem erros JavaScript ou HTTP nas jornadas monitoradas.

## Transições e contas

- Passou: Aceite pelo Dashboard atualiza contadores/ganhos e Continuar coleta retoma progresso real.
- Passou: Recusa retorna ao filtro Disponíveis e remove a coleta do Dashboard sem mudar recompensas.
- Passou: Menu, guia, perfil e recebimento não apontam à página removida; retorno do recebimento abre Minhas coletas.
- Passou: Novo cadastro Colaborador também entra no Início, sem herdar saldo, notas ou recusas de outra conta.

## Regressão do fluxo completo

- Passou: Acesso Cliente e painel com dados iniciais.
- Passou: Criação da lista, local, confirmação e itens persistidos.
- Passou: Recarga de rota por hash em subdiretório.
- Passou: Aceite, validação de coleta incompleta, preços decimais, foto e envio.
- Passou: Chat dos dois perfis, ajuste e reenvio recalculam o total.
- Passou: Aprovação, recompensa fictícia, avaliação e prevenção de repetição.
- Passou: Recusa encerra a participação sem cancelar a solicitação.
- Passou: Cadastro fictício e login da conta criada.
- Passou: Recuperação informa ausência de envio real.
- Passou: Sincronização local entre abas com perfis independentes.
- Passou: Telas principais sem overflow em celular e tablet.
- Passou: Sem erros JavaScript ou falhas de recursos HTTP.

## Regressão adicional

- Passou: Preço negativo rejeitado e imagem local comprimida para JPEG.
- Passou: Envio bloqueado quando nenhum produto foi encontrado.
- Passou: Colaborador não recebe ações de aprovação ou pagamento.
- Passou: Lista, local e confirmação responsivos em 360 px; texto especial exibido com segurança.
- Passou: Menu móvel oculta controles fora da tela e responde a Escape.
- Passou: Reinício exige confirmação; cancelamento preserva os dados.
- Passou: Busca filtra corretamente e exibe estado vazio.

## Evidências de coerência dos indicadores

- Cenário inicial: saldo R$ 5,00, ganhos em andamento R$ 5,00, média 5,00 e uma coleta por categoria.
- Cenário de teste ampliado: saldo R$ 24,75, ganhos R$ 33,25, média 4,50, com 2 disponíveis, 4 em andamento e 3 concluídas. Coleta de outro Colaborador e coleta recusada não entraram nos indicadores dessa conta.
- Após confirmar uma recompensa de R$ 10,00: saldo R$ 34,75, ganhos R$ 23,25 e uma coleta adicional concluída. Uma nova nota 3 atualizou a média para 4,00. Recarregar não duplicou o recebimento.
- Aceitar uma coleta disponível atualizou a categoria e os ganhos; conferir um produto atualizou o progresso mostrado no Dashboard.
- Nova conta de Colaborador entrou no Início com saldo e ganhos zerados e sem avaliações, sem herdar notas ou recusas de outra conta.

Os cenários ampliados são dados exclusivos de teste, não foram incorporados ao cenário inicial distribuído.

## Responsividade e limites

Foram verificadas larguras simuladas de **320, 360, 390, 768, 1024 e 1440 pixels**, incluindo Dashboard, listagem, filtros e perfil nos dois temas, sem transbordamento horizontal. O cabeçalho permaneceu no topo durante rolagem; o menu móvel abriu e fechou corretamente.

Os testes foram realizados em navegador desktop, sem aparelhos físicos, Safari ou Firefox. A inspeção visual e a navegação por teclado não constituem certificação de acessibilidade. A URL publicada do GitHub Pages não foi testada nesta entrega local.

## Conferência após atualizar o GitHub Pages

1. Substitua os arquivos do projeto e aguarde a publicação.
2. Abra a URL pública em janela privativa e entre como Colaborador.
3. Confira `#/inicio`, menu, valores e atalhos para os quatro filtros.
4. Recarregue uma rota filtrada e confira o filtro ativo.
5. Percorra uma coleta entre os dois perfis e confira a atualização de ganhos, saldo e avaliação.
6. Teste os dois temas e os aparelhos disponíveis.

Todos os valores financeiros continuam fictícios. A colaboração permanece local entre abas da mesma origem e navegador, sem backend, processamento financeiro ou sincronização remota entre dispositivos.
