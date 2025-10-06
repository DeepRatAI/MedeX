import os
import sys

# Add the app directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Verificar estructura de directorios
print(f"Current working directory: {os.getcwd()}")
print(f"Directory contents: {os.listdir('.')}")
if os.path.exists('src'):
    print(f"src/ contents: {os.listdir('src')}")

from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
import json
from datetime import datetime

try:
    # Import existing MedeX modules
    from src.agents.diagnostic_specialist import DiagnosticSpecialist
    from src.agents.treatment_planner import TreatmentPlanner
    from src.agents.drug_interaction_checker import DrugInteractionChecker
    from src.agents.clinical_guidelines_advisor import ClinicalGuidelinesAdvisor
    from src.coordinator.medical_coordinator import MedicalCoordinator
    from src.models.llm_manager import LLMManager
    from src.utils.config import Config
    
    MEDEX_AVAILABLE = True
except ImportError as e:
    print(f"Warning: MedeX modules not available: {e}")
    MEDEX_AVAILABLE = False
    
    # Create dummy classes for testing
    class Config:
        def __init__(self):
            self.openai_api_key = ""
            self.anthropic_api_key = ""
            self.groq_api_key = ""
    
    class LLMManager:
        def __init__(self, config):
            pass
    
    class MedicalCoordinator:
        def __init__(self, llm_manager, config):
            pass
        
        def process_query(self, query, patient_info):
            return {
                "status": "demo",
                "message": "MedeX system not fully configured. This is a demo response.",
                "diagnosis": "Demo diagnosis for: " + query,
                "treatment": "Demo treatment plan",
                "recommendations": ["Configure API keys", "Upload complete src/ directory"]
            }

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Initialize MedeX system with HF Spaces secrets
config = Config()
config.openai_api_key = os.environ.get('OPENAI_API_KEY', '')
config.anthropic_api_key = os.environ.get('ANTHROPIC_API_KEY', '')
config.groq_api_key = os.environ.get('GROQ_API_KEY', '')

# Check API keys
if not any([config.openai_api_key, config.anthropic_api_key, config.groq_api_key]):
    print("Warning: No API keys configured. Please set OPENAI_API_KEY, ANTHROPIC_API_KEY, or GROQ_API_KEY in Hugging Face Spaces secrets.")

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
        
        if not MEDEX_AVAILABLE:
            return jsonify({
                'status': 'warning',
                'result': {
                    'message': 'MedeX system is in demo mode. Please ensure all src/ files are uploaded.',
                    'diagnosis': f'Demo diagnosis for: {query}',
                    'treatment': 'Demo treatment plan',
                    'recommendations': ['Upload complete src/ directory', 'Configure API keys in HF Spaces secrets']
                },
                'timestamp': datetime.now().isoformat()
            })
        
        # Process through MedeX system
        result = coordinator.process_query(query, patient_info)
        
        return jsonify({
            'status': 'success',
            'result': result,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'MedeX Medical Assistant',
        'medex_available': MEDEX_AVAILABLE,
        'api_keys_configured': bool(config.openai_api_key or config.anthropic_api_key or config.groq_api_key)
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    print(f"Starting MedeX server on port {port}")
    print(f"MedeX modules available: {MEDEX_AVAILABLE}")
    app.run(host='0.0.0.0', port=port, debug=False)
