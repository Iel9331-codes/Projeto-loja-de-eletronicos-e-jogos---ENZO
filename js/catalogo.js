// 1. Encontre no HTML o filtro e o espaço reservado para os cartões.
const filtro = document.getElementById("filtro");
const lista = document.getElementById("lista-produtos");
let quantidadePedido = 0;
let totalPedido = 0;
// 2. Cada clique adiciona uma unidade do produto escolhido.
function adicionarAoPedido(produto) {
    quantidadePedido++;
    totalPedido += emCentavos(produto.preco);

    document.getElementById("pedido").textContent =
        "Pedido: " + quantidadePedido + " item(ns) · Total: " + emReais(totalPedido);
}
// 3. Monte um cartão com as informações de um produto.
function criarCartao(produto) {
    const cartao = document.createElement("article");
    cartao.className = "cartao";

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao;

    const preco = document.createElement("strong");
    preco.textContent = emReais(emCentavos(produto.preco));

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao pedido";

    botao.addEventListener("click", function () {
        adicionarAoPedido(produto);
    });
    // Coloque os elementos dentro do cartão, na ordem em que devem aparecer.
    cartao.appendChild(nome);
    cartao.appendChild(descricao);
    cartao.appendChild(preco);
    cartao.appendChild(botao);
    return cartao;
}
// 4. Filtre os produtos, desenhe os cartões e atualize o resumo.
function mostrarCatalogo() {
    // A opção "Todas as categorias" tem o valor vazio.
    const visiveis = produtos.filter(function (produto) {
        return filtro.value === "" || produto.categoria === filtro.value;
    });
    // Limpe a lista para evitar cartões repetidos ao mudar de categoria.
    lista.textContent = "";
    let soma = 0;

    visiveis.forEach(function (produto) {
        lista.appendChild(criarCartao(produto));
        soma += emCentavos(produto.preco);
    });

    document.getElementById("resumo").textContent =
        "Produtos exibidos: " + visiveis.length + " · Soma dos preços: " + emReais(soma);
}
// A primeira chamada mostra o catálogo assim que a página abre.
mostrarCatalogo();
// Depois, cada mudança no seletor atualiza os cartões.
filtro.addEventListener("change", mostrarCatalogo);