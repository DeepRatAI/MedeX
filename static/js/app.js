class MedeXApp {
    constructor() {
        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        this.chatMessages = document.getElementById('chat-messages');
        this.queryInput = document.getElementById('query-input');
        this.sendBtn = document.getElementById('send-btn');
        this.loading = document.getElementById('loading');
        this.patientName = document.getElementById('patient-name');
        this.patientAge = document.getElementById('patient-age');
        this.patientSex = document.getElementById('patient-sex');
        this.medicalHistory = document.getElementById('medical-history');
        this.quickBtns = document.querySelectorAll('.quick-btn');
    }

    attachEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendQuery());
        this.queryInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendQuery();
            }
        });

        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    handleQuickAction(action) {
        const templates = {
            diagnostic: 'Necesito un diagnóstico basado en los siguientes síntomas: ',
            treatment: 'Solicito un plan de tratamiento para: ',
            interactions: 'Verificar interacciones medicamentosas para: ',
            guidelines: 'Consultar guías clínicas sobre: '
        };

        if (templates[action]) {
            this.queryInput.value = templates[action];
            this.queryInput.focus();
        }
    }

    getPatientInfo() {
        return {
            name: this.patientName.value || 'Paciente',
            age: this.patientAge.value || null,
            sex: this.patientSex.value || null,
            medical_history: this.medicalHistory.value || null
        };
    }

    async sendQuery() {
        const query = this.queryInput.value.trim();
        if (!query) return;

        // Disable input
        this.sendBtn.disabled = true;
        this.queryInput.disabled = true;

        // Add user message
        this.addMessage(query, 'user');

        // Clear input
        this.queryInput.value = '';

        // Show loading
        this.loading.classList.add('active');

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    patient_info: this.getPatientInfo()
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                this.displayResult(data.result);
            } else {
                this.addMessage('Error: ' + (data.message || 'Error desconocido'), 'assistant');
            }
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('Error de conexión. Por favor, intenta nuevamente.', 'assistant');
        } finally {
            // Hide loading
            this.loading.classList.remove('active');
            
            // Enable input
            this.sendBtn.disabled = false;
            this.queryInput.disabled = false;
            this.queryInput.focus();
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        // Remove welcome message if exists
        const welcome = this.chatMessages.querySelector('.welcome-message');
        if (welcome) {
            welcome.remove();
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    displayResult(result) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Format the result based on its structure
        if (typeof result === 'string') {
            contentDiv.textContent = result;
        } else if (typeof result === 'object') {
            contentDiv.innerHTML = this.formatComplexResult(result);
        }
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    formatComplexResult(result) {
        let html = '';
        
        if (result.diagnosis) {
            html += `
                <div class="result-card">
                    <h4><i class="fas fa-stethoscope"></i> Diagnóstico</h4>
                    <p>${result.diagnosis}</p>
                </div>
            `;
        }
        
        if (result.treatment) {
            html += `
                <div class="result-card">
                    <h4><i class="fas fa-pills"></i> Tratamiento</h4>
                    <p>${result.treatment}</p>
                </div>
            `;
        }
        
        if (result.recommendations) {
            html += `
                <div class="result-card">
                    <h4><i class="fas fa-clipboard-list"></i> Recomendaciones</h4>
                    <ul>
                        ${result.recommendations.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (result.warnings) {
            html += `
                <div class="result-card" style="border-left-color: var(--warning-color);">
                    <h4 style="color: var(--warning-color);"><i class="fas fa-exclamation-triangle"></i> Advertencias</h4>
                    <ul>
                        ${result.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Default formatting if no specific fields
        if (!html) {
            html = `<div class="result-card">${JSON.stringify(result, null, 2)}</div>`;
        }
        
        return html;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MedeXApp();
});
