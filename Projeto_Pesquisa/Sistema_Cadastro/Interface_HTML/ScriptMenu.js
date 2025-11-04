// 1️⃣ Espera o HTML carregar
document.addEventListener("DOMContentLoaded", () => {

    // 2️⃣ Pega o usuário do localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // 3️⃣ Verifica se o usuário existe
    if (!usuario) {
        alert("Você não está logado!");
        window.location.href = "login.html";
        return;
    }

    // 4️⃣ Preenche os campos com os dados atuais
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("tel").value = usuario.telefone || "";

    // 5️⃣ Quando clicar em Atualizar
    document.getElementById("btnAtualizar").addEventListener("click", async () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("tel").value;

        const resposta = await fetch(`http://localhost:8080/Menu/${usuario.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, telefone })
        });

        if (resposta.ok) {
            const atualizado = await resposta.json();
            localStorage.setItem("usuario", JSON.stringify(atualizado)); // atualiza no navegador também
            alert("Dados atualizados com sucesso!");
        } else {
            alert("Erro ao atualizar usuário!");
        }
    });

    // 6️⃣ Quando clicar em Deletar
    document.getElementById("btnDeletar").addEventListener("click", async () => {
        const confirmar = confirm("Tem certeza que deseja deletar sua conta?");
        if (!confirmar) return;

        const resposta = await fetch(`http://localhost:8080/Menu/${usuario.id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            localStorage.removeItem("usuario"); // apaga do navegador
            alert("Usuário deletado!");
            window.location.href = "login.html"; // volta para o login
        } else {
            alert("Erro ao deletar usuário!");
        }
    });
});