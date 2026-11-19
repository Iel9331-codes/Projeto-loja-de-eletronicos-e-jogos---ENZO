const lista = document.getElementById("lista-produtos");
const filtro = document.getElementById("filtro");
const pedido = document.getElementById("pedido");
const itensPedido = document.getElementById("itens-pedido");
const esvaziar = document.getElementById("esvaziar-carrinho");
const carrinho = [];
// 1. Adiciona o produto ou aumenta a quantidade se ele já foi escolhido.
function adicionar(produto) {
    const item = carrinho.find(item => item.produto === produto);
    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ produto, quantidade: 1 });
    }
    mostrarPedido();
}
// 2. Mostra os itens escolhidos e calcula o total do carrinho.
function mostrarPedido() {
    itensPedido.textContent = "";
    let total = 0;
    let quantidade = 0;
    for (const item of carrinho) {
        const subtotal = emCentavos(item.produto.preco) * item.quantidade;
        total += subtotal;
        quantidade += item.quantidade;
        const linha = document.createElement("li");
        linha.textContent = `${item.produto.nome} × ${item.quantidade} = ${emReais(subtotal)}`;
        itensPedido.appendChild(linha);
    }
    pedido.textContent = `Quantidade: ${quantidade} · Total: ${emReais(total)}`;
    esvaziar.disabled = carrinho.length === 0;
}
// 3. Mostra os cartões da categoria selecionada.
function mostrarCatalogo() {
    lista.textContent = "";

    for (const produto of produtos) {
        // O filtro vazio mostra todas as categorias.
        if (filtro.value && produto.categoria !== filtro.value) continue;

        const cartao = document.createElement("article");
        cartao.className = "cartao";
        if (produto.imagem) {
            const foto = document.createElement("img");
            foto.src = produto.imagem;
            foto.alt = produto.nome;
            cartao.appendChild(foto);
        }
        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        cartao.appendChild(nome);

        if (produto.descricao) {
            const descricao = document.createElement("p");
            descricao.textContent = produto.descricao;
            cartao.appendChild(descricao);
        }
        const preco = document.createElement("strong");
        preco.textContent = emReais(emCentavos(produto.preco));

        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = "Adicionar ao carrinho";
        botao.onclick = () => adicionar(produto);

        cartao.append(preco, botao);
        lista.appendChild(cartao);
    }
}
filtro.onchange = mostrarCatalogo;
esvaziar.onclick = function () {
    carrinho.length = 0;
    mostrarPedido();
};
mostrarCatalogo();
mostrarPedido();