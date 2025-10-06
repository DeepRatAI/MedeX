import os
from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
import json
from datetime import datetime

# Import existing MedeX modules
from src.agents.diagnostic_specialist import DiagnosticSpecialist
from src.agents.treatment_planner import TreatmentPlanner
from src.agents.drug_interaction_checker import DrugInteractionChecker
from src.agents.clinical_guidelines_advisor import ClinicalGuidelinesAdvisor
from src.coordinator.medical_coordinator import MedicalCoordinator
from src.models.llm_manager import LLMManager
from src.utils.config import Config

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Initialize MedeX system with HF Spaces secrets
config = Config()
config.openai_api_key = os.environ.get('OPENAI_API_KEY', '')
config.anthropic_api_key = os.environ.get('ANTHROPIC_API_KEY', '')
config.groq_api_key = os.environ.get('GROQ_API_KEY', '')

# Initialize the medical system
llm_manager = LLMManager(config)
coordinator = MedicalCoordinator(llm_manager, config)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        patient_info = data.get('patient_info', {})
        query = data.get('query', '')
        
        # Process through MedeX system
        result = coordinator.process_query(query, patient_info)
        
        return jsonify({
            'status': 'success',
            'result': result,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'MedeX Medical Assistant'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    app.run(host='0.0.0.0', port=port, debug=False)
