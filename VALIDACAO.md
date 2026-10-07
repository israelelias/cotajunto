# Registro de validação — Dashboard do Colaborador

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
