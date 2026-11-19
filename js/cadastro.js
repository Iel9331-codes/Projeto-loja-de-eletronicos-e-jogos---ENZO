// 1. Encontra o formulário, o botão e a mensagem na página.
const formulario = document.getElementById("form-produto");
const botao = formulario.querySelector("button[type=submit]");
const mensagem = document.getElementById("mensagem");

// Mostra o erro e leva o cursor até o campo que precisa de correção.
function mostrarErro(texto, campo) {
    mensagem.textContent = texto;
    mensagem.className = "erro";
    campo.focus();
}

// 2. Executa quando a pessoa clica em "Cadastrar produto".
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Evita salvar duas vezes enquanto a foto está sendo lida.
    if (botao.disabled) return;

    const nome = document.getElementById("nome-produto");
    const preco = document.getElementById("preco");
    const descricao = document.getElementById("descricao");
    const categoria = document.getElementById("categoria");
    const email = document.getElementById("email");
    const imagem = document.getElementById("imagem");

    // files é a lista de arquivos escolhidos. A posição 0 é o primeiro arquivo.
    const arquivo = imagem.files[0];

    // 3. Valida cada campo. O return interrompe o cadastro no primeiro erro.
    if (nome.value.trim().length < 3) {
        mostrarErro("Escreva um nome com pelo menos 3 caracteres.", nome);
        return;
    }

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
    // Verifica se existe um arquivo e se o tipo informado é de imagem.
    if (!arquivo || !arquivo.type.startsWith("image/")) {
        mostrarErro("Escolha um arquivo de imagem para o produto.", imagem);
        return;
    }
    // 4. Monta o produto com os dados que vão aparecer no catálogo.
    const produto = {
        nome: nome.value.trim(),
        preco: Number(preco.value),
        descricao: descricao.value.trim(),
        categoria: categoria.value
    };
    // 5. Prepara a leitura da foto.
    const leitor = new FileReader();
    botao.disabled = true;
    mensagem.className = "";
    mensagem.textContent = "Lendo a imagem...";
    // O evento "load" acontece quando a foto termina de carregar.
    leitor.addEventListener("load", function () {
        // O catálogo pode usar esse valor diretamente no src de uma imagem.
        produto.imagem = leitor.result;
        try {
            salvarProduto(produto); // Função que já existe no dados.js.
        } catch {
            mostrarErro("Não foi possível salvar. Verifique o armazenamento ou tente uma foto menor.", imagem);
            return;
        }
        formulario.reset();
        mensagem.className = "ok";
        mensagem.textContent = produto.nome + " cadastrado com foto! Abra o catálogo para conferir.";
    });
    leitor.addEventListener("error", function () {
        mostrarErro("Não foi possível ler a foto. Escolha o arquivo novamente.", imagem);
    });
    // Libera o botão tanto no sucesso quanto no erro.
    leitor.addEventListener("loadend", function () {
        botao.disabled = false;
    });
    // Inicia a leitura depois que os eventos acima já estão preparados.
    leitor.readAsDataURL(arquivo);
});