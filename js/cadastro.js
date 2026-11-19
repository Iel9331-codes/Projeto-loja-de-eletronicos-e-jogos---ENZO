// 1. Encontre o formulário e o parágrafo que mostra o resultado do cadastro.
const formulario = document.getElementById("form-produto");
const mensagem = document.getElementById("mensagem");
function mostrarErro(texto, campo) {
    mensagem.textContent = texto;
    mensagem.className = "erro";
    campo.focus(); // Leva o cursor até o campo que precisa de correção.
}
// 2. Leia os cinco campos quando a pessoa enviar o formulário.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome-produto");
    const preco = document.getElementById("preco");
    const descricao = document.getElementById("descricao");
    const categoria = document.getElementById("categoria");
    const email = document.getElementById("email");

    // 3. Verifique um campo por vez.
    // trim() remove espaços nas pontas. return interrompe o envio no primeiro erro.
    if (nome.value.trim().length < 3) {
        mostrarErro("Escreva um nome com pelo menos 3 caracteres.", nome);
        return;
    }
    // validity.valid consulta as regras do input: required, min e step.
    if (!preco.validity.valid) {
        mostrarErro("Informe um preço maior que zero, com até duas casas decimais.", preco);
        return;
    }
    if (descricao.value.trim() === "") {
        mostrarErro("Descreva o produto antes de cadastrá-lo.", descricao);
        return;
    }
    if (categoria.value === "") {
        mostrarErro("Escolha a categoria do produto.", categoria);
        return;
    }
    if (!email.validity.valid) {
        mostrarErro("Informe um e-mail válido, como nome@exemplo.com.", email);
        return;
    }
    // 4. Monte o produto com os dados que o catálogo precisa.
    // O e-mail é validado no formulário e não é armazenado com o produto.
    const produto = {
        nome: nome.value.trim(),
        preco: Number(preco.value),
        descricao: descricao.value.trim(),
        categoria: categoria.value
    };
    try {
        salvarProduto(produto);
    } catch {
        mostrarErro("O navegador não conseguiu salvar. Seus campos continuam preenchidos.", nome);
        return;
    }
    mensagem.textContent = produto.nome + " cadastrado! Abra o catálogo para ver o cartão.";
    mensagem.className = "ok";
    formulario.reset();
});