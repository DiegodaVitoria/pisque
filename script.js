// Variáveis globais
let currentPage = 1;
let timeLeft = 3;
const pages = document.querySelectorAll('.page');
const timerElement = document.getElementById('timer');

// Função para mudar de página
function changePage() {
    // Esconde a página atual
    document.getElementById(`page${currentPage}`).classList.remove('active');
    
    // Alterna entre página 1 e 2
    currentPage = currentPage === 1 ? 2 : 1;
    
    // Mostra a nova página
    document.getElementById(`page${currentPage}`).classList.add('active');
    
    // Reinicia a contagem
    timeLeft = 3;
    updateTimerDisplay();
}

// Atualiza o display do timer
function updateTimerDisplay() {
    timerElement.textContent = `Próxima mudança em: ${timeLeft} segundos`;
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
