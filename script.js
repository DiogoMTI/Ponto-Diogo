// Função para carregar os registros do localStorage
function carregarRegistros() {
    const registrosSalvos = localStorage.getItem('registros');
    if (registrosSalvos) {
        registros = JSON.parse(registrosSalvos);
    } else {
        registros = [];
    }
    atualizarTabela();
}

// Função para salvar os registros no localStorage
function salvarRegistros() {
    localStorage.setItem('registros', JSON.stringify(registros));
}

// Função para adicionar um registro (entrada ou saída)
function adicionarRegistro(tipo) {
    const nome = document.getElementById('nome').value;
    if (!nome) {
        alert('Por favor, insira seu nome.');
        return;
    }

    const data = new Date();
    const registro = {
        nome: nome,
        data: data.toLocaleDateString('pt-BR'),
        hora: data.toLocaleTimeString('pt-BR'),
        tipo: tipo
    };

    registros.push(registro);
    salvarRegistros();  // Salva no localStorage
    atualizarTabela();
}

// Função para atualizar a tabela de registros
function atualizarTabela() {
    const tbody = document.getElementById('registros-list');
    tbody.innerHTML = ''; // Limpar a tabela antes de reexibir

    registros.forEach(registro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.data}</td>
            <td>${registro.hora}</td>
            <td>${registro.tipo}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para login do admin
let usuarioLogado = null;
function loginAdmin() {
    const usuario = document.getElementById('admin-user').value;
    const senha = document.getElementById('admin-pass').value;

    // Verificar se o usuário e senha estão corretos
    if ((usuario === 'admin' && senha === '1234') || (usuario === 'Diogo' && senha === 'IMD25')) {
        usuarioLogado = usuario;
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('admin-login').style.display = 'none';
        atualizarPainelAdmin();
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

// Função para atualizar os dados do painel do admin
function atualizarPainelAdmin() {
    const adminData = document.getElementById('admin-data');
    adminData.innerHTML = JSON.stringify(registros, null, 2);
}

// Função para excluir todos os registros (somente admin ou Diogo pode fazer isso)
function deleteAllRecords() {
    if (usuarioLogado === 'Diogo' || usuarioLogado === 'admin') {
        if (confirm('Tem certeza de que deseja excluir todos os registros?')) {
            registros = [];
            salvarRegistros();  // Salva no localStorage após a exclusão
            atualizarTabela();
            atualizarPainelAdmin();
        }
    } else {
        alert('Acesso restrito. Somente o administrador pode excluir registros.');
    }
}

// Função para exportar os registros para um arquivo Excel
function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registros');
    XLSX.writeFile(wb, 'registros_bate_ponto.xlsx');
}

// Evento de clique para registrar a entrada e saída
document.getElementById('entrada').addEventListener('click', () => adicionarRegistro('Entrada'));
document.getElementById('saida').addEventListener('click', () => adicionarRegistro('Saída'));

// Carregar os registros do localStorage quando a página for carregada
window.addEventListener('DOMContentLoaded', carregarRegistros);
