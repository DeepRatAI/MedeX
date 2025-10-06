/**
 * MedeX - Medical AI Interface JavaScript
 * Modern medical consultation interface
 */

// ===== Application State =====
const AppState = {
    currentChatId: null,
    messages: [],
    isProcessing: false,
    sessionStats: {
        queries: 0,
        emergencies: 0,
        professional_queries: 0,
        patient_queries: 0
    }
};

// ===== DOM Elements =====
const DOM = {
    loadingScreen: null,
    app: null,
    welcomeScreen: null,
    chatMessages: null,
    inputArea: null,
    userInput: null,
    sendBtn: null,
    newChatBtn: null,
    chatHistory: null,
    exampleButtons: null,
    infoBtn: null,
    settingsBtn: null,
    infoModal: null,
    settingsModal: null,
    closeModalButtons: null,
    statQueries: null,
    statEmergencies: null
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeDOMElements();
    initializeEventListeners();
    simulateLoading();
});

function initializeDOMElements() {
    DOM.loadingScreen = document.getElementById('loading-screen');
    DOM.app = document.getElementById('app');
    DOM.welcomeScreen = document.getElementById('welcome-screen');
    DOM.chatMessages = document.getElementById('chat-messages');
    DOM.inputArea = document.getElementById('input-area');
    DOM.userInput = document.getElementById('user-input');
    DOM.sendBtn = document.getElementById('send-btn');
    DOM.newChatBtn = document.getElementById('new-chat-btn');
    DOM.chatHistory = document.getElementById('chat-history');
    DOM.exampleButtons = document.querySelectorAll('.example-btn');
    DOM.infoBtn = document.getElementById('info-btn');
    DOM.settingsBtn = document.getElementById('settings-btn');
    DOM.infoModal = document.getElementById('info-modal');
    DOM.settingsModal = document.getElementById('settings-modal');
    DOM.closeModalButtons = document.querySelectorAll('.close-modal');
    DOM.statQueries = document.getElementById('stat-queries');
    DOM.statEmergencies = document.getElementById('stat-emergencies');
}

function initializeEventListeners() {
    // Send message
    DOM.sendBtn.addEventListener('click', handleSendMessage);
    DOM.userInput.addEventListener('keydown', handleInputKeydown);
    DOM.userInput.addEventListener('input', handleInputChange);
    
    // New chat
    DOM.newChatBtn.addEventListener('click', startNewChat);
    
    // Example queries
    DOM.exampleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const example = btn.getAttribute('data-example');
            startChatWithQuery(example);
        });
    });
    
    // Modals
    DOM.infoBtn.addEventListener('click', () => openModal('info-modal'));
    DOM.settingsBtn.addEventListener('click', () => openModal('settings-modal'));
    DOM.closeModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.currentTarget.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    // Close modals on backdrop click
    [DOM.infoModal, DOM.settingsModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// ===== Loading =====
function simulateLoading() {
    setTimeout(() => {
        DOM.loadingScreen.classList.add('hidden');
        DOM.app.style.display = 'flex';
    }, 2000);
}

// ===== Chat Functions =====
function startNewChat() {
    AppState.currentChatId = generateId();
    AppState.messages = [];
    
    DOM.welcomeScreen.style.display = 'none';
    DOM.chatMessages.style.display = 'flex';
    DOM.inputArea.style.display = 'block';
    DOM.chatMessages.innerHTML = '';
    
    DOM.userInput.focus();
}

function startChatWithQuery(query) {
    startNewChat();
    DOM.userInput.value = query;
    handleSendMessage();
}

async function handleSendMessage() {
    const message = DOM.userInput.value.trim();
    
    if (!message || AppState.isProcessing) {
        return;
    }
    
    // Add user message to chat
    addMessage('user', message);
    
    // Clear input
    DOM.userInput.value = '';
    DOM.sendBtn.disabled = true;
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    // Set processing state
    AppState.isProcessing = true;
    
    try {
        // Send request to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                chat_id: AppState.currentChatId,
                history: AppState.messages.slice(-10) // Send last 10 messages for context
            })
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Add assistant message
        addMessage('assistant', data.response, data.metadata);
        
        // Update stats
        updateStats(data.stats);
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator(typingId);
        addMessage('assistant', 
            '❌ Lo siento, hubo un error al procesar tu consulta. Por favor intenta nuevamente.',
            { error: true }
        );
    } finally {
        AppState.isProcessing = false;
    }
}

function addMessage(sender, text, metadata = {}) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString('es', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    let contentHTML = `
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">
                    <i class="fas fa-${sender === 'user' ? 'user' : 'user-md'}"></i>
                    ${sender === 'user' ? 'Tú' : 'MedeX'}
                </span>
                <span class="message-time">${time}</span>
            </div>
    `;
    
    // Add detection info for assistant messages
    if (sender === 'assistant' && metadata.user_type) {
        const userTypeLabel = metadata.user_type === 'professional' ? 'PROFESIONAL' : 'PACIENTE';
        const userTypeIcon = metadata.user_type === 'professional' ? 'user-md' : 'user';
        
        contentHTML += `
            <div class="detection-info">
                <strong><i class="fas fa-${userTypeIcon}"></i> Usuario detectado:</strong> ${userTypeLabel}
                ${metadata.confidence ? ` (${(metadata.confidence * 100).toFixed(0)}% confianza)` : ''}
            </div>
        `;
        
        // Add emergency alert if applicable
        if (metadata.emergency_level === 'emergency') {
            contentHTML += `
                <div class="emergency-alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    ⚠️ EMERGENCIA MÉDICA DETECTADA - BUSQUE ATENCIÓN INMEDIATA
                </div>
            `;
        }
    }
    
    contentHTML += `
            <div class="message-text">${formatMessageText(text)}</div>
        </div>
    `;
    
    messageEl.innerHTML = contentHTML;
    DOM.chatMessages.appendChild(messageEl);
    
    // Store message in state
    AppState.messages.push({
        role: sender === 'user' ? 'user' : 'assistant',
        content: text,
        timestamp: new Date().toISOString(),
        metadata: metadata
    });
    
    // Scroll to bottom
    scrollToBottom();
}

function formatMessageText(text) {
    // Convert line breaks to <br>
    let formatted = text.replace(/\n/g, '<br>');
    
    // Make text bold between ** **
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Make text italic between * *
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert markdown-style lists
    formatted = formatted.replace(/^- (.*)/gm, '• $1');
    
    return formatted;
}

function addTypingIndicator() {
    const typingId = `typing-${Date.now()}`;
    const typingEl = document.createElement('div');
    typingEl.className = 'message assistant';
    typingEl.id = typingId;
    typingEl.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">
                    <i class="fas fa-user-md"></i>
                    MedeX
                </span>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    DOM.chatMessages.appendChild(typingEl);
    scrollToBottom();
    return typingId;
}

function removeTypingIndicator(typingId) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
        typingEl.remove();
    }
}

function scrollToBottom() {
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

// ===== Input Handlers =====
function handleInputChange() {
    const hasText = DOM.userInput.value.trim().length > 0;
    DOM.sendBtn.disabled = !hasText || AppState.isProcessing;
    
    // Auto-resize textarea
    DOM.userInput.style.height = 'auto';
    DOM.userInput.style.height = DOM.userInput.scrollHeight + 'px';
}

function handleInputKeydown(e) {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!DOM.sendBtn.disabled) {
            handleSendMessage();
        }
    }
}

// ===== Stats =====
function updateStats(stats) {
    if (stats) {
        AppState.sessionStats = stats;
        DOM.statQueries.textContent = stats.queries || 0;
        DOM.statEmergencies.textContent = stats.emergencies || 0;
    }
}

// ===== Modals =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ===== Utilities =====
function generateId() {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ===== System Status Check =====
async function checkSystemStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        const apiStatusEl = document.getElementById('api-status');
        if (apiStatusEl) {
            if (data.kimi_configured) {
                apiStatusEl.textContent = 'Conectado';
                apiStatusEl.className = 'status-badge online';
            } else {
                apiStatusEl.textContent = 'No configurado';
                apiStatusEl.className = 'status-badge offline';
            }
        }
    } catch (error) {
        console.error('Error checking system status:', error);
    }
}

// Check system status on load
setTimeout(checkSystemStatus, 2500);

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
