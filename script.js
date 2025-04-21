// Variáveis globais
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let statusElement = document.getElementById('status');
let currentPage = 1;
let blinkCounter = 0;
let leftEyeClosed = false;
let rightEyeClosed = false;
let modelsLoaded = false;

// Array de páginas
const pages = document.querySelectorAll('.page');

// Carrega os modelos do face-api.js
async function loadModels() {
    statusElement.textContent = "Carregando modelos...";
    
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models');
        modelsLoaded = true;
        statusElement.textContent = "Modelos carregados. Iniciando câmera...";
        startCamera();
    } catch (error) {
        statusElement.textContent = "Erro ao carregar modelos: " + error;
        console.error(error);
    }
}

// Inicia a câmera
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                statusElement.textContent = "Câmera iniciada. Detectando rostos...";
                detectFaces();
            };
        })
        .catch(err => {
            statusElement.textContent = "Erro ao acessar a câmera: " + err;
            console.error(err);
        });
}

// Detecta rostos e piscadas
async function detectFaces() {
    if (!modelsLoaded) return;
    
    const options = new faceapi.TinyFaceDetectorOptions();
    const result = await faceapi.detectSingleFace(video, options).withFaceLandmarks();
    
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (result) {
        // Desenha os landmarks no canvas
        faceapi.draw.drawDetections(canvas, result);
        faceapi.draw.drawFaceLandmarks(canvas, result);
        
        // Obtém os landmarks dos olhos
        const landmarks = result.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        
        // Verifica se os olhos estão fechados
        checkEyeClosed(leftEye, 'left');
        checkEyeClosed(rightEye, 'right');
        
        // Verifica se ambos os olhos estão fechados (piscada)
        if (leftEyeClosed && rightEyeClosed) {
            blinkCounter++;
            
            // Se detectar uma piscada completa
            if (blinkCounter > 2) { // Limiar para evitar falsos positivos
                changePage();
                blinkCounter = 0;
            }
        } else {
            blinkCounter = 0;
        }
    }
    
    // Continua detectando
    requestAnimationFrame(detectFaces);
}

// Verifica se um olho está fechado
function checkEyeClosed(eyePoints, side) {
    // Calcula a distância vertical média do olho
    const top = (eyePoints[1].y + eyePoints[2].y) / 2;
    const bottom = (eyePoints[4].y + eyePoints[5].y) / 2;
    const distance = bottom - top;
    
    // Limiar para determinar se o olho está fechado
    const threshold = 5;
    
    if (side === 'left') {
        leftEyeClosed = distance < threshold;
    } else {
        rightEyeClosed = distance < threshold;
    }
}

// Muda a página
function changePage() {
    // Esconde a página atual
    document.getElementById(`page${currentPage}`).classList.remove('active');
    
    // Alterna entre página 1 e 2
    currentPage = currentPage === 1 ? 2 : 1;
    
    // Mostra a nova página
    document.getElementById(`page${currentPage}`).classList.add('active');
    
    // Feedback visual
    statusElement.textContent = `Piscada detectada! Mudando para página ${currentPage}`;
}

// Inicia o aplicativo quando a página carrega
window.onload = loadModels;