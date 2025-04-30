        // Variáveis globais
        let currentPage = 1;
        const totalPages = 24; // Definimos o total de páginas
        let timeLeft = 8;
        const pages = document.querySelectorAll('.page');
        const timerElement = document.getElementById('timer');
        const pageIndicator = document.getElementById('page-indicator');
        const skipButton = document.getElementById('skip-button');

        // Função para mudar de página
        function changePage() {
            // Esconde a página atual
            document.getElementById(`page${currentPage}`).classList.remove('active');
            
            // Avança para a próxima página (e volta para 1 após a última)
            currentPage = currentPage === totalPages ? 1 : currentPage + 1;
            
            // Mostra a nova página
            document.getElementById(`page${currentPage}`).classList.add('active');
            
            // Atualiza o indicador de página
            pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
            
            // Reinicia a contagem
            timeLeft = 8;
            updateTimerDisplay();
        }

        // Atualiza o display do timer
        function updateTimerDisplay() {
            timerElement.textContent = `Próxima mudança em: ${timeLeft} segundos`;
        }

        // Função para ir para uma página específica
        function goToPage(pageNumber) {
            // Esconde todas
            pages.forEach(page => page.classList.remove('active'));
            // Mostra a selecionada
            document.getElementById(`page${pageNumber}`).classList.add('active');
            currentPage = pageNumber;
            timeLeft = 8;
            updateTimerDisplay();
            pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
        }

        // Configura o intervalo para mudança de página
        const pageInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                changePage();
            }
        }, 1000); // Executa a cada segundo

        // Evento para o botão de pular
        skipButton.addEventListener('click', changePage);

        // Inicializa o timer e o indicador de página
        updateTimerDisplay();
        pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
