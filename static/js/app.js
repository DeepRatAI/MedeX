// MedeX Medical AI - Frontend Application

class MedeXApp {
    constructor() {
        this.apiEndpoint = '/api/chat';
        this.conversationHistory = [];
        this.sessionStats = {
            queries: 0,
            professionalQueries: 0,
            patientQueries: 0,
            emergencyQueries: 0,
            startTime: new Date()
        };
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.setupTextareaAutoResize();
    }
    
    cacheElements() {
        this.elements = {
            welcomeBanner: document.getElementById('welcomeBanner'),
            chatContainer: document.getElementById('chatContainer'),
            messagesContainer: document.getElementById('messagesContainer'),
            userInput: document.getElementById('userInput'),
            sendBtn: document.getElementById('sendBtn'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            statsBtn: document.getElementById('statsBtn'),
            statsModal: document.getElementById('statsModal'),
            closeStatsModal: document.getElementById('closeStatsModal'),
            statsContent: document.getElementById('statsContent'),
            loadingOverlay: document.getElementById('loadingOverlay')
        };
    }
    
    attachEventListeners() {
        // Send message
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Input validation
        this.elements.userInput.addEventListener('input', () => {
            this.elements.sendBtn.disabled = !this.elements.userInput.value.trim();
        });
        
        // Clear history
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        // Statistics
        this.elements.statsBtn.addEventListener('click', () => this.showStats());
        this.elements.closeStatsModal.addEventListener('click', () => this.hideStats());
        
        // Close modal on outside click
        this.elements.statsModal.addEventListener('click', (e) => {
            if (e.target === this.elements.statsModal) {
                this.hideStats();
            }
        });
        
        // Example cards
        document.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => {
                const query = card.dataset.query;
                this.elements.userInput.value = query;
                this.elements.sendBtn.disabled = false;
                this.elements.userInput.focus();
                // Scroll to input
                this.elements.userInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }
    
    setupTextareaAutoResize() {
        const textarea = this.elements.userInput;
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        });
    }
    
    async sendMessage() {
        const userMessage = this.elements.userInput.value.trim();
        if (!userMessage) return;
        
        // Hide welcome banner and show chat container
        this.elements.welcomeBanner.style.display = 'none';
        this.elements.chatContainer.classList.add('active');
        
        // Clear input
        this.elements.userInput.value = '';
        this.elements.userInput.style.height = 'auto';
        this.elements.sendBtn.disabled = true;
        
        // Add user message to chat
        this.addUserMessage(userMessage);
        
        // Show typing indicator
        const typingIndicator = this.addTypingIndicator();
        
        try {
            // Send to API
            const response = await this.callAPI(userMessage);
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add assistant response
            this.addAssistantMessage(response);
            
            // Update stats
            this.updateStats(response);
            
            // Save to history
            this.conversationHistory.push({
                user: userMessage,
                assistant: response,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('Error sending message:', error);
            typingIndicator.remove();
            this.addErrorMessage('Lo siento, hubo un error al procesar tu consulta. Por favor, intenta nuevamente.');
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-user';
        messageDiv.innerHTML = `
            <div class="message-content">
                ${this.escapeHtml(message)}
            </div>
        `;
        this.elements.messagesContainer.appendChild(messageDiv);
    }
    
    addAssistantMessage(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-assistant';
        
        const userTypeBadge = response.userType === 'professional' ? 
            '<span class="user-type-badge user-type-professional">👨‍⚕️ Profesional</span>' :
            '<span class="user-type-badge user-type-patient">👤 Paciente</span>';
        
        const emergencyBadge = response.isEmergency ? 
            '<span class="emergency-badge">🚨 EMERGENCIA</span>' : '';
        
        const confidenceBadge = `<span class="confidence-badge">📊 ${(response.confidence * 100).toFixed(0)}% confianza</span>`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">🏥</div>
            <div class="message-content">
                <div class="message-header">
                    ${userTypeBadge}
                    ${emergencyBadge}
                    ${confidenceBadge}
                </div>
                <div class="message-body">
                    ${this.formatResponse(response.response)}
                </div>
            </div>
        `;
        
        this.elements.messagesContainer.appendChild(messageDiv);
    }
    
    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message-assistant';
        typingDiv.innerHTML = `
            <div class="message-avatar">🏥</div>
            <div class="message-content">
                <div class="message-typing">
                    Analizando con IA médica
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        this.elements.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }
    
    addErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-assistant';
        messageDiv.innerHTML = `
            <div class="message-avatar">⚠️</div>
            <div class="message-content">
                <div class="message-body" style="color: var(--error-color);">
                    ${this.escapeHtml(message)}
                </div>
            </div>
        `;
        this.elements.messagesContainer.appendChild(messageDiv);
    }
    
    async callAPI(message) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: message,
                history: this.conversationHistory.slice(-3) // Last 3 interactions
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    formatResponse(text) {
        // Convert markdown-style formatting to HTML
        let formatted = this.escapeHtml(text);
        
        // Bold text
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Headers
        formatted = formatted.replace(/^### (.+)$/gm, '<h4>$1</h4>');
        
        // Lists
        formatted = formatted.replace(/^\* (.+)$/gm, '<li>$1</li>');
        formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
        
        // Wrap consecutive list items in ul
        formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
        
        // Paragraphs
        formatted = formatted.split('\n\n').map(para => {
            if (!para.startsWith('<') && para.trim()) {
                return `<p>${para}</p>`;
            }
            return para;
        }).join('');
        
        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    updateStats(response) {
        this.sessionStats.queries++;
        
        if (response.userType === 'professional') {
            this.sessionStats.professionalQueries++;
        } else {
            this.sessionStats.patientQueries++;
        }
        
        if (response.isEmergency) {
            this.sessionStats.emergencyQueries++;
        }
    }
    
    showStats() {
        const duration = new Date() - this.sessionStats.startTime;
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        
        this.elements.statsContent.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">⏱️ Duración de sesión</span>
                <span class="stat-value">${hours}h ${minutes}m</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">💬 Total de consultas</span>
                <span class="stat-value">${this.sessionStats.queries}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">👨‍⚕️ Consultas profesionales</span>
                <span class="stat-value">${this.sessionStats.professionalQueries}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">👤 Consultas de pacientes</span>
                <span class="stat-value">${this.sessionStats.patientQueries}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">🚨 Emergencias detectadas</span>
                <span class="stat-value">${this.sessionStats.emergencyQueries}</span>
            </div>
        `;
        
        this.elements.statsModal.classList.add('active');
    }
    
    hideStats() {
        this.elements.statsModal.classList.remove('active');
    }
    
    clearHistory() {
        if (confirm('¿Estás seguro de que deseas limpiar el historial del chat?')) {
            this.elements.messagesContainer.innerHTML = '';
            this.conversationHistory = [];
            this.elements.welcomeBanner.style.display = 'block';
            this.elements.chatContainer.classList.remove('active');
            
            // Reset some stats (keep session stats)
            // Don't reset sessionStats.queries, etc. as they track the whole session
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
        }, 100);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showLoading() {
        this.elements.loadingOverlay.classList.add('active');
    }
    
    hideLoading() {
        this.elements.loadingOverlay.classList.remove('active');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.medexApp = new MedeXApp();
});
