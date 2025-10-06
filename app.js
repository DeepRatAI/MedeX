/**
 * MedeX v25.83 - Frontend Application
 * Modern Medical AI Interface
 */

class MedeXApp {
    constructor() {
        this.apiBaseUrl = window.location.origin;
        this.conversationId = this.generateConversationId();
        this.stats = {
            queries: 0,
            professional: 0,
            educational: 0,
            emergencies: 0
        };
        
        this.init();
    }
    
    generateConversationId() {
        return `medex_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    init() {
        this.setupEventListeners();
        this.checkApiStatus();
    }
    
    setupEventListeners() {
        // Send button
        document.getElementById('send-button').addEventListener('click', () => this.sendMessage());
        
        // Enter key to send (Shift+Enter for new line)
        document.getElementById('user-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Character count
        document.getElementById('user-input').addEventListener('input', (e) => {
            const count = e.target.value.length;
            document.getElementById('char-count').textContent = `${count} caracteres`;
        });
        
        // Clear chat
        document.getElementById('clear-chat').addEventListener('click', () => this.clearChat());
        
        // Export chat
        document.getElementById('export-chat').addEventListener('click', () => this.exportChat());
        
        // Example queries
        document.querySelectorAll('.example-query').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.currentTarget.getAttribute('data-query');
                document.getElementById('user-input').value = query;
                this.sendMessage();
            });
        });
    }
    
    async checkApiStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/health`);
            if (response.ok) {
                const data = await response.json();
                this.showToast('Sistema MedeX conectado correctamente', 'success');
            } else {
                this.showToast('Error al conectar con el servidor', 'error');
            }
        } catch (error) {
            console.error('API Health Check Error:', error);
            this.showToast('No se pudo conectar con el servidor MedeX', 'error');
        }
    }
    
    async sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        
        if (!message) {
            this.showToast('Por favor escribe una consulta', 'info');
            return;
        }
        
        // Hide welcome screen
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
        
        // Clear input
        input.value = '';
        document.getElementById('char-count').textContent = '0 caracteres';
        
        // Disable input while processing
        this.setInputState(false);
        
        // Add user message to chat
        this.addMessage('user', message);
        
        // Show loading modal
        this.showLoadingModal('Analizando consulta...');
        
        try {
            // Send to API
            const response = await fetch(`${this.apiBaseUrl}/api/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: message,
                    conversation_id: this.conversationId
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Hide loading modal
            this.hideLoadingModal();
            
            // Add assistant response
            this.addMessage('assistant', data.response, data.metadata);
            
            // Update stats
            this.updateStats(data.metadata);
            
            // Re-enable input
            this.setInputState(true);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.hideLoadingModal();
            this.showToast('Error al procesar la consulta. Por favor, intenta de nuevo.', 'error');
            this.addMessage('assistant', 
                '❌ Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo en unos momentos.',
                { user_type: 'system', is_emergency: false }
            );
            this.setInputState(true);
        }
    }
    
    addMessage(sender, content, metadata = {}) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        
        let avatar = sender === 'user' ? '👤' : '🤖';
        let senderName = sender === 'user' ? 'Usuario' : 'MedeX';
        
        let badgeHtml = '';
        if (sender === 'assistant' && metadata.user_type) {
            const type = metadata.user_type;
            const isEmergency = metadata.is_emergency;
            
            if (isEmergency) {
                badgeHtml = '<span class="message-badge badge-emergency">🚨 EMERGENCIA</span>';
            } else if (type === 'Professional') {
                badgeHtml = '<span class="message-badge badge-professional">👨‍⚕️ Profesional</span>';
            } else if (type === 'Educational') {
                badgeHtml = '<span class="message-badge badge-educational">🎓 Educativo</span>';
            }
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${senderName}</span>
                    ${badgeHtml}
                    <span class="message-time">${timeString}</span>
                </div>
                <div class="message-bubble">
                    ${this.formatMessage(content)}
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    formatMessage(content) {
        // Basic markdown-like formatting
        let formatted = content
            // Escape HTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Line breaks
            .replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    updateStats(metadata) {
        if (!metadata) return;
        
        this.stats.queries++;
        
        if (metadata.is_emergency) {
            this.stats.emergencies++;
        }
        
        if (metadata.user_type === 'Professional') {
            this.stats.professional++;
        } else if (metadata.user_type === 'Educational') {
            this.stats.educational++;
        }
        
        // Update UI
        document.getElementById('stat-queries').textContent = this.stats.queries;
        document.getElementById('stat-professional').textContent = this.stats.professional;
        document.getElementById('stat-educational').textContent = this.stats.educational;
        document.getElementById('stat-emergencies').textContent = this.stats.emergencies;
    }
    
    setInputState(enabled) {
        const input = document.getElementById('user-input');
        const button = document.getElementById('send-button');
        
        input.disabled = !enabled;
        button.disabled = !enabled;
        
        if (enabled) {
            input.focus();
        }
    }
    
    showLoadingModal(status) {
        const modal = document.getElementById('loading-modal');
        document.getElementById('loading-status').textContent = status;
        modal.classList.add('active');
    }
    
    hideLoadingModal() {
        const modal = document.getElementById('loading-modal');
        modal.classList.remove('active');
    }
    
    clearChat() {
        if (confirm('¿Estás seguro de que deseas limpiar el historial de la conversación?')) {
            const messagesContainer = document.getElementById('chat-messages');
            messagesContainer.innerHTML = '';
            
            // Show welcome screen again
            const welcomeScreen = document.getElementById('welcome-screen');
            if (welcomeScreen) {
                welcomeScreen.style.display = 'flex';
            }
            
            // Reset conversation ID
            this.conversationId = this.generateConversationId();
            
            this.showToast('Historial limpiado correctamente', 'success');
        }
    }
    
    exportChat() {
        const messages = document.querySelectorAll('.message');
        if (messages.length === 0) {
            this.showToast('No hay conversación para exportar', 'info');
            return;
        }
        
        let exportText = `MedeX v25.83 - Conversación Exportada\n`;
        exportText += `Fecha: ${new Date().toLocaleString('es-ES')}\n`;
        exportText += `ID de Conversación: ${this.conversationId}\n`;
        exportText += `${'='.repeat(80)}\n\n`;
        
        messages.forEach(msg => {
            const sender = msg.querySelector('.message-sender').textContent;
            const time = msg.querySelector('.message-time').textContent;
            const content = msg.querySelector('.message-bubble').textContent;
            const badge = msg.querySelector('.message-badge')?.textContent || '';
            
            exportText += `[${time}] ${sender} ${badge}\n`;
            exportText += `${content}\n\n`;
            exportText += `${'-'.repeat(80)}\n\n`;
        });
        
        // Create download
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `medex_conversacion_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Conversación exportada correctamente', 'success');
    }
    
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <span style="font-size: 1.25rem;">${icons[type]}</span>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.medexApp = new MedeXApp();
});
