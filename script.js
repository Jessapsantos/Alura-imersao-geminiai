document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const searchInput = document.getElementById('search-input');

    // 1. Carrega os dados do arquivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 2. Cria e exibe todos os cards na tela
            displayCards(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            cardsContainer.innerHTML = '<p>Não foi possível carregar os dados.</p>';
        });

    /**
     * Cria os elementos HTML para cada card e os insere no container.
     * @param {Array} items - O array de objetos vindo do data.json
     */
    function displayCards(items) {
        cardsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card'); // Adiciona uma classe para estilização

            // Define o conteúdo HTML do card
            card.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.descricão}</p>
                <p><strong>Ano de criação:</strong> ${item.ano}</p>
                <a href="${item.link}" target="_blank">Saiba mais</a>
            `;

            // Adiciona o card ao container
            cardsContainer.appendChild(card);
        });
    }

    // 3. Adiciona o evento de 'input' para o campo de pesquisa
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        // 4. Filtra os cards
        cards.forEach(card => {
            const cardTitle = card.querySelector('h2').textContent.toLowerCase();
            
            // Se o título do card incluir o termo pesquisado, mostra o card. Senão, esconde.
            if (cardTitle.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});