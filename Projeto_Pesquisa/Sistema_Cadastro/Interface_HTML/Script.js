// File: /static/js/ScriptCadastro.js
// Documentação: script de cadastro — valida, envia POST e redireciona ao sucesso.

const formulario = document.querySelector("form");
const getNome = document.querySelector(".nome");
const getSenha = document.querySelector(".senha"); // assegure que o input tenha class="senha"
const getEmail = document.querySelector(".email");
const getTel = document.querySelector(".tel");

// Valida os campos do formulário (retorna booleano)
function validarCampos() {
  if (getNome.value.trim().length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(getEmail.value)) {
    alert("Digite um email válido.");
    return false;
  }

  if (getSenha.value.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return false;
  }

  const telRegex = /^[0-9]{9,}$/;
  if (!telRegex.test(getTel.value)) {
    alert("Digite um telefone válido (somente números, pelo menos 9 dígitos).");
    return false;
  }

  return true;
}

// Envia dados ao backend. Só limpa e redireciona após sucesso.
async function cadastrar() {
  try {
    const resposta = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: getNome.value,
        email: getEmail.value,
        senha: getSenha.value,
        telefone: getTel.value,
      }),
    });

    if (resposta.ok) {
      // sucesso: limpa e redireciona
      alert("Cadastro realizado com sucesso!");
      limpa();
      // confirmar case-sensitive do nome do arquivo
      window.location.href = "Login.html";
    } else {
      // tenta extrair mensagem do backend se existir
      alert("Erro ao realizar cadastro! Email ou senha ja existe");
      
      //let msg = `Erro ao realizar cadastro (status ${resposta.status}).`;
      //try {
      // alert("Erro ao realizar cadastro! Email ou senha ja existe");
      //  const errBody = await resposta.json();
      //  if (errBody && errBody.message) msg = errBody.message;
      //  } catch (_) { /* resposta não é JSON */ }
      //  alert(msg);
    }
  } catch (err) {
    // erro de rede ou CORS
    console.error("Erro ao cadastrar:", err);
    alert("Erro de conexão com o servidor. Verifique se a API está rodando e se o CORS está configurado.");
  }
}

// Limpa os campos do formulário
function limpa() {
  getNome.value = "";
  getSenha.value = "";
  getEmail.value = "";
  getTel.value = "";
}

// Manipulador do submit: valida e chama cadastrar()
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validarCampos()) {
    console.log({
      nome: getNome.value,
      email: getEmail.value,
      senha: getSenha.value,
      telefone: getTel.value,
    });
    cadastrar(); // limpa será chamada dentro de cadastrar() somente se houver sucesso
  }
});
