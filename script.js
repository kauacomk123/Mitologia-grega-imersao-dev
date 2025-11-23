let cardContainer = document.querySelector(".card-container");

async function iniciarBuscar(){
    // Pega o valor do input e converte para minúsculas para uma busca case-insensitive
    const inputBusca = document.querySelector('input[type="text"]');
    const termoBusca = inputBusca.value.toLowerCase();

    let resposta = await fetch("data.json");
    let dados = await resposta.json();

    // Filtra os dados com base no termo pesquisado
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca) ||
        dado.categoria.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados){
    // Limpa o container de cards antes de renderizar os novos resultados
    cardContainer.innerHTML = "";

    for (let dado of dados ) {
        let article = document.createElement("article");
        article.classList.add("card"); // Corrigido de "cards" para "card" para corresponder ao CSS/HTML
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Categoria:</strong> ${dado.categoria}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Adiciona um listener para o evento 'DOMContentLoaded' para carregar todos os cards inicialmente
document.addEventListener('DOMContentLoaded', () => {
    iniciarBuscar();
});