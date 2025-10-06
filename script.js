// ===================================
// MedeX - Medical AI System Frontend
// JavaScript Application Logic
// ===================================

// Configuration
const CONFIG = {
    apiUrl: window.location.hostname === 'localhost' 
        ? 'http://localhost:7860' 
        : window.location.origin,
    streamingEnabled: true,
    maxRetries: 3,
    retryDelay: 1000
};

// State Management
const state = {
    conversationHistory: [],
    isProcessing: false,
    currentMode: 'detecting',
    stats: {
        queries: 0,
        emergencies: 0,
        professional: 0,
        educational: 0
    },
    isConnected: false
};

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🏥 MedeX v25.83 initializing...');
    await checkConnection();
    setupEventListeners();
    adjustTextareaHeight();
});

// ===================================
// Connection Management
// ===================================

async function checkConnection() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    
    try {
        const response = await fetch(`${CONFIG.apiUrl}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            state.isConnected = true;
            statusDot.style.background = 'var(--success-color)';
            statusText.textContent = 'Conectado';
            console.log('✅ Connected to MedeX backend');
        } else {
            throw new Error('Backend not available');
        }
    } catch (error) {
        console.warn('⚠️ Backend connection failed, using fallback mode:', error);
        state.isConnected = false;
        statusDot.style.background = 'var(--warning-color)';
        statusText.textContent = 'Modo Demo';
    }
}

// ===================================
// Event Listeners
// ===================================

function setupEventListeners() {
    const messageInput = document.getElementById('messageInput');
    
    // Auto-resize textarea
    messageInput.addEventListener('input', adjustTextareaHeight);
    
    // Handle paste events
    messageInput.addEventListener('paste', (e) => {
        setTimeout(adjustTextareaHeight, 0);
    });
}

function adjustTextareaHeight() {
    const textarea = document.getElementById('messageInput');
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
}

// ===================================
// Navigation Functions
// ===================================

function startChat() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('chatSection').style.display = 'block';
    document.getElementById('messageInput').focus();
}

function returnToWelcome() {
    if (confirm('¿Deseas volver al inicio? Se perderá la conversación actual.')) {
        document.getElementById('chatSection').style.display = 'none';
        document.getElementById('welcomeSection').style.display = 'block';
        clearChat();
    }
}

function clearChat() {
    if (state.isProcessing) return;
    
    state.conversationHistory = [];
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="chat-intro">
            <i class="fas fa-hand-holding-medical"></i>
            <p>¡Hola! Soy MedeX, tu asistente médico inteligente. ¿En qué puedo ayudarte hoy?</p>
        </div>
    `;
    
    document.getElementById('emergencyAlert').style.display = 'none';
    updateChatMode('detecting');
}

function toggleStats() {
    const statsPanel = document.getElementById('statsPanel');
    statsPanel.style.display = statsPanel.style.display === 'none' ? 'block' : 'none';
    updateStatsDisplay();
}

function updateStatsDisplay() {
    document.getElementById('statQueries').textContent = state.stats.queries;
    document.getElementById('statEmergencies').textContent = state.stats.emergencies;
    document.getElementById('statProfessional').textContent = state.stats.professional;
    document.getElementById('statEducational').textContent = state.stats.educational;
}

function updateChatMode(mode) {
    state.currentMode = mode;
    const chatMode = document.getElementById('chatMode');
    
    const modeTexts = {
        'detecting': 'Modo: Detectando...',
        'Professional': 'Modo: Profesional 👨‍⚕️',
        'Educational': 'Modo: Educativo 📚',
        'Emergency': 'Modo: Emergencia 🚨'
    };
    
    chatMode.textContent = modeTexts[mode] || modeTexts['detecting'];
}

// ===================================
// Message Handling
// ===================================

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function setMessage(text) {
    document.getElementById('messageInput').value = text;
    document.getElementById('messageInput').focus();
    adjustTextareaHeight();
}

async function sendMessage() {
    if (state.isProcessing) return;
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Clear input and reset height
    messageInput.value = '';
    adjustTextareaHeight();
    
    // Update state
    state.isProcessing = true;
    state.stats.queries++;
    updateStatsDisplay();
    
    // Disable send button
    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = true;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Show typing indicator
    const typingId = showTypingIndicator();
    
    try {
        if (state.isConnected) {
            // Use real API
            await sendMessageToAPI(message, typingId);
        } else {
            // Use demo mode
            await sendMessageDemo(message, typingId);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        removeTypingIndicator(typingId);
        addMessageToChat('Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.', 'bot');
    } finally {
        state.isProcessing = false;
        sendButton.disabled = false;
        messageInput.focus();
    }
}

async function sendMessageToAPI(message, typingId) {
    try {
        const response = await fetch(`${CONFIG.apiUrl}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                streaming: CONFIG.streamingEnabled
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        removeTypingIndicator(typingId);
        
        if (CONFIG.streamingEnabled && response.body) {
            await handleStreamingResponse(response, message);
        } else {
            const data = await response.json();
            handleNonStreamingResponse(data, message);
        }
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

async function handleStreamingResponse(response, userMessage) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let messageElement = null;
    let metadata = null;
    
    while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const data = JSON.parse(line.slice(6));
                    
                    if (data.type === 'metadata') {
                        metadata = data;
                        updateChatMode(data.user_type);
                        
                        if (data.is_emergency) {
                            showEmergencyAlert();
                            state.stats.emergencies++;
                        }
                        
                        if (data.user_type === 'Professional') {
                            state.stats.professional++;
                        } else {
                            state.stats.educational++;
                        }
                        updateStatsDisplay();
                    } else if (data.type === 'content') {
                        fullResponse += data.content;
                        
                        if (!messageElement) {
                            messageElement = createMessageElement('', 'bot');
                        }
                        
                        updateMessageContent(messageElement, fullResponse);
                    } else if (data.type === 'done') {
                        // Streaming complete
                        console.log('✅ Streaming complete');
                    }
                } catch (e) {
                    console.error('Error parsing streaming data:', e);
                }
            }
        }
    }
    
    // Save to history
    state.conversationHistory.push({
        role: 'user',
        content: userMessage
    });
    state.conversationHistory.push({
        role: 'assistant',
        content: fullResponse,
        metadata: metadata
    });
}

function handleNonStreamingResponse(data, userMessage) {
    addMessageToChat(data.response, 'bot');
    
    // Update mode and stats
    updateChatMode(data.user_type);
    
    if (data.is_emergency) {
        showEmergencyAlert();
        state.stats.emergencies++;
    }
    
    if (data.user_type === 'Professional') {
        state.stats.professional++;
    } else {
        state.stats.educational++;
    }
    updateStatsDisplay();
    
    // Save to history
    state.conversationHistory.push({
        role: 'user',
        content: userMessage
    });
    state.conversationHistory.push({
        role: 'assistant',
        content: data.response,
        metadata: {
            user_type: data.user_type,
            is_emergency: data.is_emergency
        }
    });
}

async function sendMessageDemo(message, typingId) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    removeTypingIndicator(typingId);
    
    // Demo responses based on keywords
    let response = getDemoResponse(message);
    let userType = detectUserTypeDemo(message);
    let isEmergency = detectEmergencyDemo(message);
    
    addMessageToChat(response, 'bot');
    updateChatMode(userType);
    
    if (isEmergency) {
        showEmergencyAlert();
        state.stats.emergencies++;
    }
    
    if (userType === 'Professional') {
        state.stats.professional++;
    } else {
        state.stats.educational++;
    }
    updateStatsDisplay();
}

function getDemoResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('dolor') && (lowerMessage.includes('pecho') || lowerMessage.includes('torácico'))) {
        return `🚨 **EMERGENCIA MÉDICA DETECTADA**

⚠️ **ACCIÓN INMEDIATA REQUERIDA:**
- Llama al 911 AHORA
- No conduzcas - busca ayuda
- Toma aspirina si está disponible (300mg)
- Permanece en reposo

📋 **Información para profesionales de emergencia:**
- Dolor torácico de características isquémicas
- Protocolo de síndrome coronario agudo
- Requiere ECG de 12 derivaciones < 10 minutos
- Considerar terapia de reperfusión

⚠️ Esta es una emergencia real. Actúa inmediatamente.`;
    }
    
    if (lowerMessage.includes('aine') || lowerMessage.includes('antiinflamatorio')) {
        return `💊 **ANTIINFLAMATORIOS NO ESTEROIDEOS (AINEs)**

📚 Los AINEs son medicamentos que reducen la inflamación, el dolor y la fiebre bloqueando las enzimas COX (ciclooxigenasa).

**Ejemplos comunes:**
- Ibuprofeno (Advil, Motrin)
- Naproxeno (Aleve)
- Diclofenaco
- Aspirina

**Cómo funcionan:**
Los AINEs inhiben la producción de prostaglandinas, sustancias que causan inflamación y dolor.

**Precauciones importantes:**
⚠️ Pueden causar molestias estomacales
⚠️ Usar con precaución en problemas renales
⚠️ No combinar múltiples AINEs
⚠️ Tomar con alimentos

💡 **Consejo:** Siempre consulta con un médico antes de usar estos medicamentos regularmente.`;
    }
    
    if (lowerMessage.includes('paciente') || lowerMessage.includes('caso clínico')) {
        return `👨‍⚕️ **ANÁLISIS CLÍNICO PROFESIONAL**

📋 Para proporcionar un análisis completo, necesitaría información adicional sobre:

**1. Historia clínica:**
- Antecedentes personales patológicos
- Medicación actual
- Alergias conocidas

**2. Presentación actual:**
- Tiempo de evolución
- Características del síntoma
- Factores agravantes/atenuantes

**3. Signos vitales:**
- PA, FC, FR, Temperatura, SpO2

**4. Examen físico:**
- Hallazgos relevantes por sistemas

💡 Proporciona estos datos y puedo ofrecer un análisis diferencial detallado con plan diagnóstico y terapéutico basado en guías actualizadas.`;
    }
    
    return `¡Gracias por tu consulta! 

He recibido tu pregunta sobre: "${message}"

Estoy funcionando en modo demo. Para obtener respuestas médicas completas y precisas usando el modelo Kimi K2-0711-Preview, necesitas:

1. Configurar tu API key de Moonshot AI
2. Desplegar MedeX en un servidor con backend activo

📚 **Modo educativo activo:** Puedo ayudarte con información general médica, pero para consultas complejas o casos clínicos detallados, necesitas la versión completa.

¿Hay algo específico que quieras saber?`;
}

function detectUserTypeDemo(message) {
    const professionalKeywords = ['paciente', 'caso clínico', 'diagnóstico diferencial', 'tratamiento', 'protocolo'];
    const lowerMessage = message.toLowerCase();
    
    for (const keyword of professionalKeywords) {
        if (lowerMessage.includes(keyword)) {
            return 'Professional';
        }
    }
    
    return 'Educational';
}

function detectEmergencyDemo(message) {
    const emergencyKeywords = ['dolor pecho', 'dolor torácico', 'no respira', 'inconsciencia', 'sangrado severo'];
    const lowerMessage = message.toLowerCase();
    
    for (const keyword of emergencyKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true;
        }
    }
    
    return false;
}

// ===================================
// UI Update Functions
// ===================================

function addMessageToChat(content, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = createMessageElement(content, type);
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

function createMessageElement(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Format content with markdown-like syntax
    contentDiv.innerHTML = formatMessageContent(content);
    
    messageDiv.appendChild(contentDiv);
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.appendChild(messageDiv);
    
    return contentDiv;
}

function updateMessageContent(element, content) {
    element.innerHTML = formatMessageContent(content);
    scrollToBottom();
}

function formatMessageContent(content) {
    // Simple markdown-like formatting
    let formatted = content
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // Line breaks
        .replace(/\n/g, '<br>');
    
    return formatted;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    const typingId = 'typing-' + Date.now();
    typingDiv.id = typingId;
    typingDiv.className = 'message message-bot';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    return typingId;
}

function removeTypingIndicator(typingId) {
    const element = document.getElementById(typingId);
    if (element) {
        element.remove();
    }
}

function showEmergencyAlert() {
    const alert = document.getElementById('emergencyAlert');
    alert.style.display = 'flex';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        alert.style.display = 'none';
    }, 10000);
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===================================
// Utility Functions
// ===================================

function showAbout() {
    alert(`🏥 MedeX v25.83
Sistema Avanzado de IA Médica

Características:
✅ IA Médica con Kimi K2-0711-Preview
✅ Detección automática de usuarios
✅ Protocolos de emergencia
✅ RAG con base de conocimiento médico
✅ Respuestas en tiempo real

⚠️ Disclaimer: MedeX es una herramienta educativa. No reemplaza la consulta médica profesional.

© 2024 DeepRatAI - MedeX Project`);
}

// ===================================
// Error Handling
// ===================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// ===================================
// Export for testing
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        state,
        sendMessage,
        formatMessageContent
    };
}
