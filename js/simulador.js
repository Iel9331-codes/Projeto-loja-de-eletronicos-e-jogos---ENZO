// 1. Pega o seletor, o formulário e o lugar onde vai aparecer o resultado.
const item = document.getElementById("item");
const formulario = document.getElementById("simulacao");
const resultado = document.getElementById("resultado");
// 2. Cria uma opção para cada produto que veio do dados.js.
produtos.forEach(function (produto, posicao) {
    const opcao = document.createElement("option");
    // Guarda a posição do produto para encontrar o preço depois.
    opcao.value = posicao;
    opcao.textContent = produto.nome + " — " + emReais(emCentavos(produto.preco));
    item.appendChild(opcao);
});
// 3. Faz a conta quando a pessoa clica em "Calcular total".
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Evita que a página recarregue.
    const produto = produtos[Number(item.value)];
    const quantidade = Number(document.getElementById("quantidade").value);
    const parcelas = Number(document.getElementById("pagamento").value);
    if (!Number.isInteger(quantidade) || quantidade < 1) {
        resultado.textContent = "Informe uma quantidade inteira de pelo menos 1.";
        return;
    }
    // emCentavos e emReais já existem no seu dados.js.
    // Fazemos a conta em centavos e mostramos o resultado em reais.
    const subtotal = emCentavos(produto.preco) * quantidade;
    // 4. No seu HTML, a opção de pagamento à vista tem value="0".
    if (parcelas === 0) {
        const desconto = Math.round(subtotal * 0.10);
        const total = subtotal - desconto;
        resultado.textContent =
            "Subtotal: " + emReais(subtotal) +
            " · Desconto: " + emReais(desconto) +
            " · Total à vista: " + emReais(total);
    } else {
        // 5. No cartão, divide o total pelo número de parcelas escolhido.
        const parcela = Math.floor(subtotal / parcelas);
        const ultima = subtotal - parcela * (parcelas - 1);
        let detalhe = parcelas + "x de " + emReais(parcela);
        // Se sobrarem centavos na divisão, eles entram na última parcela.
        if (ultima !== parcela) {
            detalhe = (parcelas - 1) + "x de " + emReais(parcela) +
                      " + 1x de " + emReais(ultima);
        }
        resultado.textContent =
            "Total no cartão: " + emReais(subtotal) +
            " · " + detalhe + " sem juros.";
    }
});
// 6. Se a pessoa mudar uma escolha, apaga o resultado da conta anterior.
formulario.addEventListener("input", function () {
    resultado.textContent = "";
});