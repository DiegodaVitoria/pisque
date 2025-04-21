// Variáveis globais
let currentPage = 1;
const totalPages = 5; // Definimos o total de páginas
let timeLeft = 7;
const pages = document.querySelectorAll('.page');
const timerElement = document.getElementById('timer');

// Função para mudar de página
function changePage() {
    // Esconde a página atual
    document.getElementById(`page${currentPage}`).classList.remove('active');
    
    // Avança para a próxima página (e volta para 1 após a 5)
    currentPage = currentPage === totalPages ? 1 : currentPage + 1;
    
    // Mostra a nova página
    document.getElementById(`page${currentPage}`).classList.add('active');
    
    // Reinicia a contagem
    timeLeft = 7;
    updateTimerDisplay();
}

// Atualiza o display do timer
function updateTimerDisplay() {
    timerElement.textContent = `Próxima mudança em: ${timeLeft} segundos`;
}

function goToPage(pageNumber) {
    // Esconde todas
    pages.forEach(page => page.classList.remove('active'));
    // Mostra a selecionada
    document.getElementById(`page${pageNumber}`).classList.add('active');
    currentPage = pageNumber;
    timeLeft = 3; // Ou pageTimes[pageNumber-1] se usar tempos diferentes
    updateTimerDisplay();
}

// Configura o intervalo para mudança de página
setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
        changePage();
    }
}, 1000); // Executa a cada segundo

// Inicializa o timer
updateTimerDisplay();
