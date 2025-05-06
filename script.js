const registros = JSON.parse(localStorage.getItem("registros")) || [];
const tbody = document.querySelector("#registros tbody");

function atualizarTabela() {
    tbody.innerHTML = "";
    const hoje = new Date().toISOString().slice(0, 10);
    registros.filter(r => r.data === hoje).forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${r.nome}</td><td>${r.data}</td><td>${r.hora}</td><td>${r.tipo}</td>`;
        tbody.appendChild(tr);
    });
}

function registrar(tipo) {
    const nome = document.getElementById("nome").value;
    if (!nome) return alert("Selecione seu nome.");
    const agora = new Date();
    const data = agora.toISOString().slice(0, 10);
    const hora = agora.toTimeString().slice(0, 5);
    registros.push({ nome, data, hora, tipo });
    localStorage.setItem("registros", JSON.stringify(registros));
    atualizarTabela();
}

document.getElementById("entrada").onclick = () => registrar("Entrada");
document.getElementById("saida").onclick = () => registrar("Saída");

function loginAdmin() {
    const user = document.getElementById("admin-user").value;
    const pass = document.getElementById("admin-pass").value;
    if (user === "Diogo" && pass === "IMD25") {
        document.getElementById("admin-panel").style.display = "block";
        document.getElementById("admin-data").textContent = JSON.stringify(registros, null, 2);
    } else {
        alert("Credenciais inválidas.");
    }
}

atualizarTabela();