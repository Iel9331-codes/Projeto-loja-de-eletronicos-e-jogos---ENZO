// 1. Preencha o seletor usando o array de dados.js.
// O value guarda a posição do produto no array: 0, 1, 2...
const item = document.getElementById("item");

produtos.forEach(function (produto, posicao) {
    const opcao = document.createElement("option");
    opcao.value = posicao;
    opcao.textContent = produto.nome + " — " + emReais(emCentavos(produto.preco));
    item.appendChild(opcao);
});

const formulario = document.getElementById("simulacao");
const resultado = document.getElementById("resultado");

// 2. Faça o cálculo ao clicar em "Calcular total" ou pressionar Enter.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const produto = produtos[Number(item.value)];
    const quantidade = Number(document.getElementById("quantidade").value);
    const parcelas = Number(document.getElementById("pagamento").value);

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        resultado.textContent = "Informe uma quantidade inteira de pelo menos 1.";
        return;
    }

    // 3. Preço de uma unidade multiplicado pela quantidade escolhida.
    const subtotal = emCentavos(produto.preco) * quantidade;

    // No HTML, o valor 0 representa o pagamento à vista.
    if (parcelas === 0) {
        const desconto = Math.round(subtotal * 0.10);

        resultado.textContent = "Subtotal: " + emReais(subtotal) +
            " · Desconto: " + emReais(desconto) +
            " · Total à vista: " + emReais(subtotal - desconto);
    } else {
        // Divida o total sem juros. Os centavos que sobrarem entram na última parcela.
        const parcela = Math.floor(subtotal / parcelas);
        const ultima = subtotal - parcela * (parcelas - 1);

        let detalhe = parcelas + "x de " + emReais(parcela);

        if (ultima !== parcela) {
            detalhe = (parcelas - 1) + "x de " + emReais(parcela) +
                " + 1x de " + emReais(ultima);
        }

        resultado.textContent =
            "Total no cartão: " + emReais(subtotal) + " · " + detalhe + " sem juros.";
    }
});

// Se a pessoa mudar algum campo, o resultado anterior deixa de valer.
formulario.addEventListener("input", function () {
    resultado.textContent = "";
});