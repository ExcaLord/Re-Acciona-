// Waste types data
const wasteTypes = {
    organic: {
        name: "Orgánico",
        color: "bg-green-100",
        textColor: "text-green-800",
        icon: "fas fa-trash",
        description: "Residuos biodegradables como restos de comida, cáscaras, etc.",
        disposal: "Contenedor marrón o compostera",
        tips: "Puedes compostar estos residuos para crear abono natural.",
    },
    plastic: {
        name: "Plástico",
        color: "bg-yellow-100",
        textColor: "text-yellow-800",
        icon: "fas fa-recycle",
        description: "Envases, botellas, bolsas y otros productos plásticos.",
        disposal: "Contenedor amarillo",
        tips: "Lava los envases antes de reciclarlos. Reduce el uso de plásticos de un solo uso.",
    },
    paper: {
        name: "Papel/Cartón",
        color: "bg-blue-100",
        textColor: "text-blue-800",
        icon: "fas fa-file-alt",
        description: "Periódicos, revistas, cajas de cartón, papel de oficina, etc.",
        disposal: "Contenedor azul",
        tips: "Aplana las cajas para ahorrar espacio. No recicles papel sucio o con restos de comida.",
    },
    glass: {
        name: "Vidrio",
        color: "bg-purple-100",
        textColor: "text-purple-800",
        icon: "fas fa-wine-bottle",
        description: "Botellas, frascos y otros envases de vidrio.",
        disposal: "Contenedor verde",
        tips: "Quita tapas y corchos antes de reciclar. No mezcles con cerámica o cristal.",
    },
    metal: {
        name: "Metal",
        color: "bg-gray-100",
        textColor: "text-gray-800",
        icon: "fas fa-cogs",
        description: "Latas, tapas, papel aluminio y otros objetos metálicos.",
        disposal: "Contenedor amarillo (envases) o punto limpio (otros metales)",
        tips: "Aplasta las latas para ahorrar espacio. Separa los metales ferrosos y no ferrosos.",
    },
    hazardous: {
        name: "Peligroso",
        color: "bg-red-100",
        textColor: "text-red-800",
        icon: "fas fa-biohazard",
        description: "Baterías, productos químicos, medicamentos, electrónicos.",
        disposal: "Punto limpio o contenedores especiales",
        tips: "Nunca tires estos residuos a la basura normal. Sigue las instrucciones de eliminación.",
    },
};

// Camera variables
let stream = null;
let facingMode = "environment";

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const cameraBtn = document.getElementById("camera-btn");
    const uploadBtn = document.getElementById("upload-btn");
    const cameraSection = document.getElementById("camera-section");
    const uploadSection = document.getElementById("upload-section");
    const initialView = document.getElementById("initial-view");
    const resultSection = document.getElementById("result-section");
    const cameraView = document.getElementById("camera-view");
    const captureBtn = document.getElementById("capture-btn");
    const switchCameraBtn = document.getElementById("switch-camera");
    const fileUpload = document.getElementById("file-upload");
    const fileUploadLabel = document.getElementById("file-upload-label");
    const uploadPreview = document.getElementById("upload-preview");
    const uploadedImage = document.getElementById("uploaded-image");
    const resultContent = document.getElementById("result-content");
    const newAnalysisBtn = document.getElementById("new-analysis");
    const aiChat = document.getElementById("ai-chat");
    const aiInput = document.getElementById("ai-input");
    const aiSend = document.getElementById("ai-send");

    // Event Listeners
    cameraBtn?.addEventListener("click", () => {
        initialView.classList.add("hidden");
        uploadSection.classList.add("hidden");
        resultSection.classList.add("hidden");
        cameraSection.classList.remove("hidden");
        startCamera();
    });

    uploadBtn?.addEventListener("click", () => {
        initialView.classList.add("hidden");
        cameraSection.classList.add("hidden");
        resultSection.classList.add("hidden");
        uploadSection.classList.remove("hidden");
        stopCamera();
    });

    newAnalysisBtn?.addEventListener("click", () => {
        resultSection.classList.add("hidden");
        initialView.classList.remove("hidden");
    });

    captureBtn?.addEventListener("click", captureImage);
    switchCameraBtn?.addEventListener("click", switchCamera);

    fileUpload?.addEventListener("change", handleFileUpload);

    // Drag and drop events
    fileUploadLabel?.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileUploadLabel.classList.add("drag-over");
    });

    fileUploadLabel?.addEventListener("dragleave", () => {
        fileUploadLabel.classList.remove("drag-over");
    });

    fileUploadLabel?.addEventListener("drop", (e) => {
        e.preventDefault();
        fileUploadLabel.classList.remove("drag-over");
        if (e.dataTransfer.files.length) {
            fileUpload.files = e.dataTransfer.files;
            handleFileUpload();
        }
    });

    // AI Chat functionality
    aiSend?.addEventListener("click", sendAiMessage);
    aiInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendAiMessage();
        }
    });

    // Waste type click events
    document.querySelectorAll(".waste-type").forEach((type) => {
        type.addEventListener("click", () => {
            const wasteName = type.querySelector("span").textContent.toLowerCase();
            let wasteKey = "";

            if (wasteName.includes("orgánico")) wasteKey = "organic";
            else if (wasteName.includes("plástico")) wasteKey = "plastic";
            else if (wasteName.includes("papel") || wasteName.includes("cartón")) wasteKey = "paper";
            else if (wasteName.includes("peligroso")) wasteKey = "hazardous";

            if (wasteKey) {
                askAboutWaste(wasteKey);
            }
        });
    });
});

// Functions
async function startCamera() {
    try {
        const constraints = {
            video: {
                facingMode: facingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 },
            },
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        document.getElementById("camera-view").srcObject = stream;
    } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        alert("No se pudo acceder a la cámara. Asegúrate de haber dado los permisos necesarios.");
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
        document.getElementById("camera-view").srcObject = null;
    }
}

function switchCamera() {
    facingMode = facingMode === "user" ? "environment" : "user";
    stopCamera();
    startCamera();
}

function captureImage() {
    if (!stream) return;
    const cameraView = document.getElementById("camera-view");

    // Create canvas to capture image
    const canvas = document.createElement("canvas");
    canvas.width = cameraView.videoWidth;
    canvas.height = cameraView.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(cameraView, 0, 0, canvas.width, canvas.height);

    // Process the captured image
    processImage(canvas.toDataURL("image/jpeg"));
}

function handleFileUpload() {
    const fileUpload = document.getElementById("file-upload");
    const uploadedImage = document.getElementById("uploaded-image");
    const uploadPreview = document.getElementById("upload-preview");
    
    const file = fileUpload.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
        alert("Por favor, selecciona una imagen válida.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadPreview.classList.remove("hidden");
        processImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

function processImage(imageData) {
    // Simulate AI processing with loading animation
    const cameraSection = document.getElementById("camera-section");
    const uploadSection = document.getElementById("upload-section");
    const initialView = document.getElementById("initial-view");
    const resultSection = document.getElementById("result-section");
    const resultContent = document.getElementById("result-content");

    cameraSection.classList.add("hidden");
    uploadSection.classList.add("hidden");
    initialView.classList.add("hidden");

    resultSection.classList.remove("hidden");
    resultContent.innerHTML = `
        <div class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p class="text-gray-600">Analizando la imagen...</p>
        </div>
    `;

    // Simulate API call with timeout
    setTimeout(() => {
        showResult(getRandomWasteType());
    }, 2000);
}

function getRandomWasteType() {
    const types = Object.keys(wasteTypes);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}

function showResult(wasteType) {
    const waste = wasteTypes[wasteType];
    const resultContent = document.getElementById("result-content");

    resultContent.innerHTML = `
        <div class="w-full mb-6">
            <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 rounded-full ${waste.color} flex items-center justify-center mr-4">
                    <i class="${waste.icon} ${waste.textColor} text-2xl"></i>
                </div>
                <div>
                    <h4 class="text-xl font-semibold ${waste.textColor}">${waste.name}</h4>
                    <p class="text-gray-600">${waste.description}</p>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-4 mb-4">
                <h5 class="font-medium text-gray-700 mb-2"><i class="fas fa-trash-alt mr-2"></i>¿Dónde tirarlo?</h5>
                <p class="text-gray-600 pl-8">${waste.disposal}</p>
            </div>
            
            <div class="bg-white rounded-lg p-4">
                <h5 class="font-medium text-gray-700 mb-2"><i class="fas fa-lightbulb mr-2"></i>Consejos</h5>
                <p class="text-gray-600 pl-8">${waste.tips}</p>
            </div>
        </div>
        
        <button id="ask-ai" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition mt-4">
            <i class="fas fa-robot mr-2"></i>Preguntar al asistente sobre ${waste.name}
        </button>
    `;

    // Show result with animation
    setTimeout(() => {
        document.querySelector(".result-card").classList.add("show");
    }, 100);

    // Add event listener to the ask AI button
    document.getElementById("ask-ai")?.addEventListener("click", () => {
        askAboutWaste(wasteType);
    });
}

function sendAiMessage() {
    const aiInput = document.getElementById("ai-input");
    const message = aiInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addChatMessage(message, "user");
    aiInput.value = "";

    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "El reciclaje de este material es importante porque...",
            "Para este tipo de residuo, te recomiendo...",
            "Una alternativa interesante es reutilizarlo como...",
            "Según las normativas locales, este residuo debe...",
            "¿Sabías que reciclando esto puedes ayudar a...?",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, "ai");
    }, 1000);
}

function addChatMessage(message, sender) {
    const aiChat = document.getElementById("ai-chat");
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}-message mb-4`;

    if (sender === "user") {
        messageDiv.innerHTML = `
            <div class="flex items-start justify-end">
                <div class="bg-purple-600 text-white p-3 rounded-lg shadow-sm max-w-[85%]">
                    <p>${message}</p>
                </div>
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center ml-3">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <i class="fas fa-robot text-purple-600 text-sm"></i>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
                    <p class="text-gray-700">${message}</p>
                </div>
            </div>
        `;
    }

    aiChat.appendChild(messageDiv);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function askAboutWaste(wasteType) {
    const waste = wasteTypes[wasteType];
    addChatMessage(`Tengo dudas sobre cómo reciclar ${waste.name.toLowerCase()}. ¿Podrías ayudarme?`, "user");

    setTimeout(() => {
        let response = `Por supuesto. Los residuos ${waste.name.toLowerCase()} ${waste.description.toLowerCase()} `;
        response += `Deben depositarse en ${waste.disposal.toLowerCase()}. `;
        response += `Un consejo útil: ${waste.tips.toLowerCase()} `;
        response += `¿Necesitas más información sobre este tipo de residuo?`;

        addChatMessage(response, "ai");
    }, 1000);
}
