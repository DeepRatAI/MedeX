#!/usr/bin/env python3
"""
MedeX Web Application - Flask Backend for HF Spaces
Modern medical AI interface with static HTML/CSS/JS frontend
"""

import os
import sys
import asyncio
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional
import json

from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Import MedeX system
from MEDEX_FINAL import MedeXv2583

# ===== Flask Application Setup =====
app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)

# ===== Global MedeX Instance =====
medex_instance = None
session_data = {
    "queries": 0,
    "emergencies": 0,
    "professional_queries": 0,
    "patient_queries": 0,
    "educational_queries": 0,
    "start_time": datetime.now()
}

def get_medex_instance():
    """Get or create MedeX instance"""
    global medex_instance
    
    if medex_instance is None:
        try:
            # Get API key from environment (HF Spaces secret)
            api_key = os.environ.get('KIMI_API_KEY', '')
            
            if not api_key:
                print("⚠️ KIMI_API_KEY no configurado en HF Spaces secrets")
                print("   Configura el secret 'KIMI_API_KEY' en tu HF Space")
                # Try to read from api_key.txt as fallback
                try:
                    with open('api_key.txt', 'r') as f:
                        api_key = f.read().strip()
                        if api_key:
                            print("✅ API key cargado desde api_key.txt")
                except:
                    pass
            
            # Create api_key.txt temporarily for MedeX initialization
            if api_key:
                with open('api_key.txt', 'w') as f:
                    f.write(api_key)
            
            medex_instance = MedeXv2583()
            print("✅ MedeX v25.83 inicializado correctamente")
            
        except Exception as e:
            print(f"❌ Error inicializando MedeX: {e}")
            medex_instance = None
    
    return medex_instance

# ===== Routes =====

@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_file('static/index.html')

@app.route('/api/status')
def status():
    """Get system status"""
    medex = get_medex_instance()
    
    return jsonify({
        "status": "online" if medex else "offline",
        "kimi_configured": bool(medex),
        "version": "25.83",
        "uptime": str(datetime.now() - session_data["start_time"]),
        "stats": {
            "queries": session_data["queries"],
            "emergencies": session_data["emergencies"],
            "professional_queries": session_data["professional_queries"],
            "patient_queries": session_data["patient_queries"],
            "educational_queries": session_data["educational_queries"]
        }
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Process medical consultation"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                "error": "Mensaje no proporcionado"
            }), 400
        
        message = data['message']
        chat_id = data.get('chat_id', 'default')
        
        # Get MedeX instance
        medex = get_medex_instance()
        
        if not medex:
            return jsonify({
                "error": "Sistema MedeX no disponible. Configure KIMI_API_KEY en HF Spaces secrets."
            }), 503
        
        # Process query with MedeX
        try:
            # Run async function in sync context
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            response_text = loop.run_until_complete(
                medex.generate_response(message, use_streaming=False)
            )
            loop.close()
            
        except Exception as e:
            print(f"Error en generate_response: {e}")
            return jsonify({
                "error": f"Error procesando consulta: {str(e)}"
            }), 500
        
        # Detect user type and emergency level
        user_type = medex.detect_user_type(message)
        is_emergency = medex.detect_emergency(message)
        
        # Update session stats
        session_data["queries"] += 1
        if is_emergency:
            session_data["emergencies"] += 1
        
        if user_type == "Professional":
            session_data["professional_queries"] += 1
        else:
            session_data["educational_queries"] += 1
        
        # Prepare response
        response_data = {
            "response": response_text,
            "chat_id": chat_id,
            "metadata": {
                "user_type": "professional" if user_type == "Professional" else "patient",
                "emergency_level": "emergency" if is_emergency else "routine",
                "confidence": 0.85,
                "timestamp": datetime.now().isoformat()
            },
            "stats": {
                "queries": session_data["queries"],
                "emergencies": session_data["emergencies"],
                "professional_queries": session_data["professional_queries"],
                "patient_queries": session_data["patient_queries"],
                "educational_queries": session_data["educational_queries"]
            }
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        print(f"❌ Error en endpoint /api/chat: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "error": f"Error interno del servidor: {str(e)}"
        }), 500

@app.route('/api/stats')
def get_stats():
    """Get session statistics"""
    return jsonify({
        "stats": {
            "queries": session_data["queries"],
            "emergencies": session_data["emergencies"],
            "professional_queries": session_data["professional_queries"],
            "patient_queries": session_data["patient_queries"],
            "educational_queries": session_data["educational_queries"]
        },
        "uptime": str(datetime.now() - session_data["start_time"])
    })

@app.route('/health')
def health():
    """Health check endpoint for HF Spaces"""
    medex = get_medex_instance()
    return jsonify({
        "status": "healthy" if medex else "degraded",
        "timestamp": datetime.now().isoformat()
    })

# ===== Error Handlers =====

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Endpoint no encontrado"}), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Error interno del servidor"}), 500

# ===== Main =====

if __name__ == '__main__':
    print("="*80)
    print("🏥 MedeX v25.83 - Web Application Starting")
    print("="*80)
    print(f"📅 Inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 Interfaz: HTML/CSS/JS estático + Flask API")
    print(f"🔧 Puerto: {os.environ.get('PORT', 7860)}")
    
    # Check for API key
    api_key = os.environ.get('KIMI_API_KEY', '')
    if api_key:
        print(f"✅ KIMI_API_KEY configurado (longitud: {len(api_key)})")
    else:
        print(f"⚠️  KIMI_API_KEY no configurado - Configure en HF Spaces secrets")
    
    print("="*80)
    
    # Initialize MedeX
    get_medex_instance()
    
    # Run Flask app
    port = int(os.environ.get('PORT', 7860))
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False,
        threaded=True
    )
