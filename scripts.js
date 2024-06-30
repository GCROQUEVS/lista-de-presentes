// Dados dos presentes
const presentes = [
    { nome: 'Panela', imagem: 'imagens/panela.jpg', escolhido: false, escolhidoPor: '' },
    { nome: 'Conjunto de Talheres', imagem: 'imagens/talheres.jpg', escolhido: false, escolhidoPor: '' },
    { nome: 'Liquidificador', imagem: 'imagens/liquidificador.jpg', escolhido: false, escolhidoPor: '' },
    { nome: 'Faqueiro', imagem: 'imagens/faqueiro.jpg', escolhido: false, escolhidoPor: '' },
    { nome: 'Jogo de Copos', imagem: 'imagens/copos.jpg', escolhido: false, escolhidoPor: '' },
    { nome: 'Chaleira Elétrica', imagem: 'imagens/chaleira.jpg', escolhido: false, escolhidoPor: '' },
];

let convidadoAtual = {};
const adminNome = "Guilherme";
const adminSobrenome = "Roque";

// Função para iniciar o site ao clicar em "Iniciar"
function iniciar() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;

    if (nome && sobrenome) {
        convidadoAtual = { nome, sobrenome };

        document.getElementById('name-section').classList.add('hidden');
        document.getElementById('gift-list').classList.remove('hidden');
        mostrarPresentes();

        // Verifica se é o administrador
        if (nome === adminNome && sobrenome === adminSobrenome) {
            document.getElementById('admin-section').classList.remove('hidden');
        }
    } else {
        alert('Por favor, preencha seu nome e sobrenome.');
    }
}

// Função para mostrar a lista de presentes
function mostrarPresentes() {
    const giftList = document.getElementById('gift-list');
    giftList.innerHTML = '';

    presentes.forEach((presente, index) => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');

        giftItem.innerHTML = `
            <h3>${presente.nome}</h3>
            <img src="${presente.imagem}" alt="${presente.nome}">
            <button onclick="exibirModal(${index})" ${presente.escolhido ? 'disabled' : ''}>
                Escolher
            </button>
        `;

        giftList.appendChild(giftItem);
    });
}

// Função para exibir modal de confirmação ao escolher um presente
function exibirModal(index) {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('hidden');

    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <p>Você tem certeza que deseja escolher o presente "${presentes[index].nome}"?</p>
        <button onclick="confirmarEscolha(${index})">Confirmar</button>
        <button onclick="fecharModal()">Voltar</button>
    `;
}

// Função para confirmar a escolha do presente
function confirmarEscolha(index) {
    presentes[index].escolhido = true;
    presentes[index].escolhidoPor = `${convidadoAtual.nome} ${convidadoAtual.sobrenome}`;
    fecharModal();
    atualizarListaPresentes();
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.add('hidden');
}

// Função para atualizar a lista de presentes após uma escolha
function atualizarListaPresentes() {
    const giftList = document.getElementById('gift-list');
    giftList.innerHTML = '';

    presentes.forEach((presente) => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');

        if (presente.escolhido) {
            giftItem.innerHTML = `
                <h3>${presente.nome} (Já escolhido por ${presente.escolhidoPor})</h3>
                <img src="${presente.imagem}" alt="${presente.nome}">
            `;
        } else {
            giftItem.innerHTML = `
                <h3>${presente.nome}</h3>
                <img src="${presente.imagem}" alt="${presente.nome}">
                <button onclick="exibirModal(${presentes.indexOf(presente)})">
                    Escolher
                </button>
            `;
        }

        giftList.appendChild(giftItem);
    });
}

// Função para mostrar as escolhas na seção de administração
function mostrarEscolhas() {
    const escolhasList = document.getElementById('escolhas-list');
    escolhasList.innerHTML = '';

    presentes.forEach((presente) => {
        if (presente.escolhido) {
            const escolhaItem = document.createElement('div');
            escolhaItem.innerHTML = `
                <p>${presente.nome} foi escolhido por ${presente.escolhidoPor}</p>
            `;
            escolhasList.appendChild(escolhaItem);
        }
    });

    document.getElementById('admin-section').classList.remove('hidden');
}
