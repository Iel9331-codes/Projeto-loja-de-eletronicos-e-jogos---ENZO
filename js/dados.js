// Cada objeto entre chaves representa um produto da loja.
// A categoria usa o mesmo valor que aparece no <option> do HTML.
const produtos = [
    { nome: "EA Sports FC 27", categoria: "jogos", preco: 349, descricao: "Edição para PS4 e PS5." },
    { nome: "Grand Theft Auto VI", categoria: "jogos", preco: 449.90, descricao: "Edição para PS5." },
    { nome: "PlayStation 5 Slim", categoria: "consoles", preco: 4259, descricao: "Edição digital de 825 GB." },
    { nome: "Samsung Galaxy S25", categoria: "celulares", preco: 3899, descricao: "Celular da linha Galaxy." },
    { nome: "Lenovo IdeaPad Slim 3", categoria: "notebooks", preco: 3134.05, descricao: "8 GB de RAM e SSD de 256 GB." },
    { nome: "Logitech M170", categoria: "acessorios", preco: 62.91, descricao: "Mouse sem fio." }
];
// Os cálculos usam centavos. Por exemplo, R$ 3,50 vira o inteiro 350.
function emCentavos(preco) {
    return Math.round(preco * 100);
}
// Para mostrar na tela, convertemos os centavos de volta para reais.
function emReais(centavos) {
    return (centavos / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
// localStorage guarda os produtos cadastrados neste navegador.
// O prefixo identifica quais registros pertencem à loja.
const prefixo = "ze-games.produto.";
function salvarProduto(produto) {
    const chave = prefixo + crypto.randomUUID();
    // JSON.stringify transforma o objeto em texto para salvá-lo.
    localStorage.setItem(chave, JSON.stringify(produto));
}
function lerCadastros() {
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);

        if (chave.startsWith(prefixo)) {
            // JSON.parse transforma o texto salvo de volta em objeto.
            const produto = JSON.parse(localStorage.getItem(chave));
            produtos.push(produto);
        }
    }
}
try {
    lerCadastros();
} catch {
    console.warn("Não foi possível ler todos os cadastros locais.");
}