# Projeto-Loja-de-Eletronicos-e-Game----Enzo
# Zé Games e eletrônicos

Projeto escolar de Enzo Gabriel, aluno do SENAI. A loja permite consultar jogos e eletrônicos, cadastrar produtos com foto e simular uma compra com vários itens. O projeto usa HTML, CSS e JavaScript e roda no navegador.

## Como abrir o site

1. Abra a pasta do projeto no VS Code.
2. Se você usa a extensão Live Server, clique com o botão direito em `index.html` e escolha **Open with Live Server**.
3. Na página inicial, escolha uma categoria para ver os produtos ou abra o **Simulador** para calcular uma compra.

Outra opção, se você tem Python instalado, é abrir o terminal na pasta que contém `index.html` e executar `python -m http.server 8000`. Depois, acesse `http://localhost:8000` no navegador.

## Páginas da loja

| Arquivo | O que você pode fazer |
| --- | --- |
| `index.html` | Conhecer a loja e navegar entre as páginas. |
| `catalogo.html` | Consultar os cartões dos produtos e filtrar por categoria. |
| `jogos.html`, `consoles.html`, `celulares.html`, `notebooks.html` e `acessorios.html` | Explorar os produtos de cada categoria. |
| `cadastro.html` | Informar nome, preço, descrição, categoria, e-mail do responsável e imagem. O formulário valida os campos antes de salvar. |
| `simulador.html` | Adicionar produtos, escolher quantidades, remover itens e comparar formas de pagamento. |

## Como testar o simulador

1. Escolha **EA Sports FC 27**, deixe a quantidade em **1** e clique em **Adicionar à simulação**.
2. Escolha **PlayStation 5 Slim Edição Digital** e adicione uma unidade. Os dois produtos aparecem na lista.
3. Com os preços de exemplo de R$ 349,00 e R$ 4.259,00, o subtotal é **R$ 4.608,00**. À vista, o desconto de 10% reduz o total para **R$ 4.147,20**. No cartão, a compra pode ser dividida em até **6 parcelas de R$ 768,00**, sem juros.

## Como o código está organizado

- `css/style.css` reúne o estilo das páginas, as cores definidas em `:root`, o layout com Flexbox e a adaptação para telas de até 600 px.
- `js/dados.js` contém o array de produtos e as funções usadas para calcular em centavos e exibir os valores em reais.
- `js/catalogo.js` controla o filtro por categoria e a exibição dos produtos.
- `js/cadastro.js` valida o formulário, lê a imagem e salva o produto no navegador usando `localStorage`. Para conferir um cadastro, abra o simulador no mesmo navegador e endereço e procure o nome do produto no seletor.
- `js/simulador.js` soma os itens, aplica a forma de pagamento e guarda a simulação na aba usando `sessionStorage`.
- `img/` é a pasta para o logotipo, as capas dos jogos e as fotos dos produtos. Os nomes das imagens devem corresponder aos caminhos usados no código.