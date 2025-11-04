
const formulario = document.querySelector("form");
const getSenha = document.querySelector(".senha");
const getEmail = document.querySelector(".email");

function validarCampos() {


  // Email: formato correto
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(getEmail.value)) {
    alert("Digite um email válido.");
    return false;
  }

  // Senha: mínimo 6 caracteres
  if (getSenha.value.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return false;
  }

  return true; // tudo OK ✅
}

async function login() {
    try {
        const resposta = await fetch("http://localhost:8080/Login", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email: getEmail.value,
                senha: getSenha.value,
            }),
        });

        if (resposta.ok) {
            const usuario = await resposta.json();
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "MenuUsuario.html";
        } else {
            alert("Usuário ou senha inválidos");
        }
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        alert("Erro de conexão com o servidor.");
    }
}

async function consultarUsuarios() {
    try {
        const resposta = await fetch("http://localhost:8080/usuarios", {
            method: "GET",
            headers: { Accept: "application/json" },
        });

        if (!resposta.ok) {
            alert("Erro ao consultar usuários");
            return;
        }

        const usuarios = await resposta.json();
        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = "<p>Nenhum usuário encontrado.</p>";
            return;
        }

        // Renderiza a lista
        listaUsuarios.innerHTML = `
      <table id="tabela" border="1" cellpadding="5">
        <tr><th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th></tr>
        ${usuarios
            .map(
                (u) =>
                    `<tr>
                <td>${u.id}</td>
                <td>${u.nome}</td>
                <td>${u.email}</td>
                <td>${u.telefone ?? "-"}</td>
              </tr>`
            )
            .join("")}
      </table>`;
    } catch (err) {
        console.error("Erro ao consultar usuários:", err);
        alert("Erro ao conectar com o servidor.");
    }
}

function limpa(){

  getSenha.value = "";
  getEmail.value = "";
 
}

formulario.addEventListener('submit', function (event){
  event.preventDefault(); // Impede o envio padrão do formulário

  // 1. CHAMA A VALIDAÇÃO PRIMEIRO
  if (validarCampos()) {
    
    const dados = {
           email: getEmail.value,
           senha: getSenha.value,  
    };
    console.log(dados);
    
    login(); // Envia os dados
    limpa();     // Limpa o formulário
  }
  
});

btnConsultar.addEventListener("click", consultarUsuarios);