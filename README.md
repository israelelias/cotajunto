# CotaJunto

**Uma lista de produtos, uma coleta de preços e mais clareza para decidir.**

## Sobre o projeto

O CotaJunto é um protótipo acadêmico navegável do Projeto Integrador III. Conecta quem precisa de um orçamento — o **Cliente** — a quem pode conferir preços em um estabelecimento físico — o **Colaborador**. Você experimenta os dois papéis com dados fictícios.

**[Acessar o protótipo CotaJunto](https://israelelias.github.io/cotajunto/#/entrar)** — funciona diretamente no navegador.

## Problema que buscamos resolver

Nem sempre uma pessoa consegue ou deseja ir até uma loja apenas para pesquisar preços. No CotaJunto, ela informa os produtos e o estabelecimento, enquanto um Colaborador realiza a coleta. O Cliente recebe o orçamento para analisar antes de decidir sobre uma compra.

## Como funciona

O Cliente cria uma lista, escolhe um estabelecimento e oferece uma recompensa fictícia. O Colaborador aceita a solicitação, registra os preços e envia o orçamento. O Cliente pode conversar, pedir uma correção ou aprovar o resultado; depois, confirma a recompensa simulada e avalia a coleta.

**Lista → solicitação → coleta → orçamento → revisão e possíveis ajustes → aprovação → recompensa fictícia → avaliação.**

## Perfis e principais funcionalidades

### Cliente

- **Visão geral e Minhas listas:** acompanhar solicitações, consultar orçamentos e buscar listas por nome ou local, com filtros por andamento.
- **Nova lista:** adicionar, editar e remover produtos do rascunho, com quantidade, unidade e limite de preço opcional; escolher o estabelecimento e definir a recompensa fictícia, a partir de R$ 5,00, antes da confirmação.
- **Orçamento e chat:** conferir preços e fotos, conversar com o Colaborador e usar **Pedir ajuste**. O ajuste só é registrado após o envio obrigatório do motivo.
- **Aprovação e avaliação:** aprovar o orçamento, confirmar a recompensa fictícia e avaliar o Colaborador com uma nota de 1 a 5 e comentário opcional.
- **Meu perfil:** consultar os dados fictícios da conta, trocar de perfil e reiniciar os dados de teste.

### Colaborador

- **Início:** consultar **Saldo disponível**, **Ganhos em andamento**, **Sua avaliação** (média das notas) e o resumo das coletas. Os atalhos abrem o filtro correspondente em **Minhas coletas**.
- **Minhas coletas:** gerenciar as coletas, buscar por lista ou local e usar os filtros **Todas**, **Disponíveis**, **Em andamento** e **Concluídas**. O Início fica reservado à visão geral.
- **Coleta de preços:** aceitar ou recusar uma solicitação; após o aceite, preencher preços por unidade, marcar **Item conferido** ou **Não encontrado** e adicionar fotos opcionais ou uma foto de exemplo.
- **Orçamento e chat:** enviar o resultado, conversar com o Cliente, responder a pedidos de ajuste, corrigir preços e reenviar o orçamento.
- **Meu perfil e histórico:** consultar dados fictícios, avaliações recebidas e coletas concluídas. **Concluídas** reúne as coletas com recompensa confirmada, mesmo com avaliação pendente.

Nos dois perfis, também é possível testar as notificações internas e alternar entre **modo claro e modo escuro**. A interface se adapta a celular, tablet e computador.

## Como explorar o protótipo

Na primeira visita, escolha **Iniciar demonstração** para seguir o guia ou **Não desejo participar do guia** para explorar pelo roteiro abaixo. **Sou Cliente** e **Sou Colaborador** abrem as contas de exemplo sem digitar senha.

**Use o mesmo navegador durante o percurso.** Para mudar de papel, clique em **Trocar para Colaborador** ou **Trocar para Cliente**, no topo. Na tela de entrada, selecione o perfil indicado para continuar com a mesma solicitação.

### 1. Cliente: criar a solicitação

1. Entre como Cliente e, em **Visão geral**, clique em **Nova lista**.
2. Dê um nome à lista. Preencha **Produto e embalagem**, **Quantidade** e **Unidade**, usando **Adicionar** para cada item. Experimente, por exemplo, arroz e leite.
3. Clique em **Escolher local**, selecione o estabelecimento e avance em **Revisar solicitação**. Confira os itens, defina a recompensa fictícia e clique em **Confirmar solicitação**.

### 2. Colaborador: coletar e enviar

1. Troque para Colaborador. Em **Início**, observe o resumo e acesse **Minhas coletas → Disponíveis**. Abra a coleta da lista criada e clique em **Aceitar e iniciar coleta**.
2. Preencha os preços por unidade e marque **Item conferido**, ou indique **Não encontrado**. Todos os itens precisam estar resolvidos, com pelo menos um produto encontrado para permitir o envio.
3. Se desejar, use **Anexar foto** ou **Usar foto de exemplo**. Confira o total e clique em **Enviar orçamento**. A recompensa fica separada do total dos produtos.

### 3. Cliente e Colaborador: revisar, ajustar e concluir

1. Retorne ao Cliente, abra a lista em **Minhas listas** e confira o orçamento.
2. Para testar uma correção, clique em **Pedir ajuste**, escreva o motivo e envie em **Enviar pedido de ajuste**. Apenas abrir a tela ou digitar sem enviar não registra a solicitação.
3. Troque para Colaborador, abra a coleta em **Minhas coletas → Em andamento** e use **Conversar** para ler o motivo. No chat, clique em **Revisar itens**, corrija o preço e escolha **Reenviar orçamento**.
4. Volte ao Cliente e confira a correção. Clique em **Aprovar orçamento** e confirme na janela apresentada. Se não quiser testar o ajuste, você pode aprovar diretamente na primeira revisão.
5. Clique em **Confirmar recompensa fictícia**, escolha a nota e finalize em **Enviar avaliação e concluir**.
6. Retorne ao Colaborador para conferir o saldo, a avaliação e a coleta em **Concluídas**.

Para uma exploração rápida, o cenário inicial também oferece **Compra da semana** (disponível para coleta), **Despensa de casa** (orçamento pronto) e **Café da manhã** (concluída).

## Guia interativo

O guia opcional apresenta as áreas, destaca botões e campos e aguarda suas ações nas etapas práticas. Acompanha a mesma solicitação entre Cliente e Colaborador, da criação da lista à coleta, ajuste, aprovação e avaliação.

No celular, abre o menu lateral quando precisa destacar uma opção nele e ajusta o painel ao espaço disponível. Para interromper, clique em **Sair do guia** e confirme. Para continuar depois, acesse **Guia da demonstração → Retomar guia**.

O progresso permanece após atualizar a página, se o navegador permitir salvar os dados. Para recomeçar, use **Meu perfil → Reiniciar dados de teste** ou **Reiniciar cenário de demonstração** na página do Guia. A confirmação apaga as alterações, restaura os exemplos e retorna à entrada, com o guia pronto para começar novamente.

## Observações sobre o protótipo

- **Tudo é demonstrativo:** contas, preços, recompensas e avaliações são fictícios. Não há compra de produtos, cobrança, transferência ou saque real.
- **A pesquisa não é automática:** você informa os preços ao testar o Colaborador. Não existe consulta a estoque ou preços reais das lojas.
- **A colaboração acontece neste navegador:** os perfis compartilham listas, fotos e mensagens. Duas abas do mesmo endereço e navegador podem refletir as atualizações; celulares, computadores ou navegadores diferentes mantêm demonstrações independentes.
- **Os dados ficam salvos no navegador**, quando permitido. Apagar os dados do site ou reiniciar o cenário remove as alterações dos testes.
- **O acesso é simulado:** cadastro, recuperação de senha e botão Google não oferecem autenticação real. Use somente dados e imagens fictícios.
