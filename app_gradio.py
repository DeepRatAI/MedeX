import os
import gradio as gr
from datetime import datetime

# Import existing MedeX modules
from src.agents.diagnostic_specialist import DiagnosticSpecialist
from src.agents.treatment_planner import TreatmentPlanner
from src.agents.drug_interaction_checker import DrugInteractionChecker
from src.agents.clinical_guidelines_advisor import ClinicalGuidelinesAdvisor
from src.coordinator.medical_coordinator import MedicalCoordinator
from src.models.llm_manager import LLMManager
from src.utils.config import Config

# Initialize MedeX system with HF Spaces secrets
config = Config()
config.openai_api_key = os.environ.get('OPENAI_API_KEY', '')
config.anthropic_api_key = os.environ.get('ANTHROPIC_API_KEY', '')
config.groq_api_key = os.environ.get('GROQ_API_KEY', '')

# Initialize the medical system
llm_manager = LLMManager(config)
coordinator = MedicalCoordinator(llm_manager, config)

def process_medical_query(query, patient_name, patient_age, patient_sex, medical_history):
    """Process medical query through MedeX system"""
    try:
        patient_info = {
            'name': patient_name or 'Paciente',
            'age': patient_age,
            'sex': patient_sex,
            'medical_history': medical_history
        }
        
        result = coordinator.process_query(query, patient_info)
        
        # Format result for display
        if isinstance(result, dict):
            output = "## 🔍 Análisis Médico\n\n"
            if 'diagnosis' in result:
                output += f"### 🩺 Diagnóstico\n{result['diagnosis']}\n\n"
            if 'treatment' in result:
                output += f"### 💊 Tratamiento\n{result['treatment']}\n\n"
            if 'recommendations' in result:
                output += "### 📋 Recomendaciones\n"
                for rec in result['recommendations']:
                    output += f"- {rec}\n"
                output += "\n"
            if 'warnings' in result:
                output += "### ⚠️ Advertencias\n"
                for warn in result['warnings']:
                    output += f"- {warn}\n"
            return output
        else:
            return str(result)
    except Exception as e:
        return f"❌ Error al procesar la consulta: {str(e)}"

# Create Gradio interface
with gr.Blocks(theme=gr.themes.Soft(), title="MedeX - Asistente Médico") as demo:
    gr.Markdown(
        """
        # 🏥 MedeX - Asistente Médico Inteligente
        
        Sistema avanzado de asistencia médica potenciado por IA para diagnósticos, 
        planes de tratamiento y verificación de interacciones medicamentosas.
        """
    )
    
    with gr.Row():
        with gr.Column(scale=1):
            gr.Markdown("### 👤 Información del Paciente")
            patient_name = gr.Textbox(label="Nombre", placeholder="Nombre completo del paciente")
            with gr.Row():
                patient_age = gr.Number(label="Edad", precision=0)
                patient_sex = gr.Dropdown(
                    label="Sexo", 
                    choices=["Masculino", "Femenino", "Otro"],
                    value=None
                )
            medical_history = gr.Textbox(
                label="Historial Médico",
                placeholder="Condiciones previas, alergias, medicamentos actuales...",
                lines=4
            )
            
            gr.Markdown("### 🚀 Plantillas Rápidas")
            with gr.Row():
                btn_diag = gr.Button("🩺 Diagnóstico", size="sm")
                btn_treat = gr.Button("💊 Tratamiento", size="sm")
            with gr.Row():
                btn_inter = gr.Button("⚠️ Interacciones", size="sm")
                btn_guide = gr.Button("📚 Guías", size="sm")
        
        with gr.Column(scale=2):
            gr.Markdown("### 💬 Consulta Médica")
            query_input = gr.Textbox(
                label="Describe los síntomas o realiza tu consulta",
                placeholder="Ejemplo: Paciente con dolor de cabeza intenso, náuseas y sensibilidad a la luz...",
                lines=5
            )
            
            submit_btn = gr.Button("🔍 Analizar Consulta", variant="primary", size="lg")
            
            output_area = gr.Markdown(label="Resultado del Análisis")
    
    # Quick action handlers
    def set_diagnostic_template():
        return "Necesito un diagnóstico basado en los siguientes síntomas: "
    
    def set_treatment_template():
        return "Solicito un plan de tratamiento para: "
    
    def set_interaction_template():
        return "Verificar interacciones medicamentosas para: "
    
    def set_guidelines_template():
        return "Consultar guías clínicas sobre: "
    
    btn_diag.click(set_diagnostic_template, outputs=query_input)
    btn_treat.click(set_treatment_template, outputs=query_input)
    btn_inter.click(set_interaction_template, outputs=query_input)
    btn_guide.click(set_guidelines_template, outputs=query_input)
    
    # Main submit action
    submit_btn.click(
        process_medical_query,
        inputs=[query_input, patient_name, patient_age, patient_sex, medical_history],
        outputs=output_area
    )
    
    gr.Markdown(
        """
        ---
        ⚠️ **Aviso Legal**: Este sistema es una herramienta de asistencia para profesionales médicos. 
        No reemplaza el juicio clínico profesional. Siempre consulte con un médico calificado.
        """
    )

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
