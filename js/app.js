let amigos = [];

/**
 * Função utilitária para simplificar o acesso a elementos pelo ID.
 * 
 * @param {string} id - O ID do elemento que deseja acessar.
 * @returns {HTMLElement} - O elemento DOM correspondente ao ID fornecido.
 */
function getById(id) {
    return document.getElementById(id);
}

/**
 * Adiciona um novo amigo à lista de amigos, se o nome for válido e único.
 * Atualiza a lista de amigos numerada e o sorteio na interface.
 */
function adicionar() {
    const amigoInput = getById('nome-amigo');
    const nome = amigoInput.value.trim();

    if (!nome) {
        alert('Digite um nome de amigo');
        return;
    }

    const nomeNormalizado = nome.toLowerCase();

    // Verifica se o nome já existe na lista
    if (amigos.map(amg => amg.toLowerCase()).includes(nomeNormalizado)) {
        alert('Nome de amigo já existe');
        return;
    }

    amigos.push(nome);
    atualizarLista();
    atualizarSorteio();
    amigoInput.value = '';
}

/**
 * Realiza o sorteio entre os amigos na lista.
 * Exibe o resultado do sorteio na interface, conectando cada amigo ao próximo.
 * Requer pelo menos 4 amigos na lista para executar o sorteio.
 */
function sortear() {
    if (amigos.length < 4) {
        alert('Você precisa ter pelo menos 4 amigos para sortear');
        return;
    }
    
    embaralhar(amigos);
    const sorteio = getById('lista-sorteio');
    sorteio.innerHTML = amigos.map((amigo, i) => {
        const proximo = (i === amigos.length - 1) ? amigos[0] : amigos[i + 1];
        return `${amigo} --> ${proximo}`;
    }).join('<br/>');
}

/**
 * Exclui um amigo da lista de amigos pelo índice.
 * Atualiza a lista de amigos numerada e o sorteio na interface.
 * 
 * @param {number} index - O índice do amigo a ser excluído.
 */
function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

/**
 * Embaralha a lista de amigos usando o algoritmo de Fisher-Yates.
 * 
 * @param {Array} lista - A lista de amigos a ser embaralhada.
 */
function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
}

/**
 * Limpa a exibição do sorteio na interface.
 */
function atualizarSorteio() {
    getById('lista-sorteio').innerHTML = '';
}

/**
 * Atualiza a lista de amigos numerada na interface.
 * Cada amigo na lista pode ser clicado para ser excluído.
 */
function atualizarLista() {
    const lista = getById('lista-amigos');
    lista.innerHTML = amigos.map((amigo, i) => {
        const paragrafo = document.createElement('p');
        paragrafo.textContent = `${i + 1}. ${amigo}`;
        paragrafo.addEventListener('click', () => excluirAmigo(i));
        return paragrafo.outerHTML;
    }).join('');
}

/**
 * Reinicia o sistema, limpando a lista de amigos e o sorteio.
 */
function reiniciar() {
    amigos = [];
    getById('lista-amigos').innerHTML = '';
    getById('lista-sorteio').innerHTML = '';
}
