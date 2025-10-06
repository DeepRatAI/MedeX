#!/usr/bin/env python3
"""
Script de preparación para deployment en Hugging Face Spaces
Verifica que todos los archivos necesarios estén presentes
"""

import os
import sys
from pathlib import Path

def check_file(filepath, required=True):
    """Verifica si un archivo existe"""
    exists = os.path.exists(filepath)
    status = "✅" if exists else ("❌" if required else "⚠️")
    req_text = "(requerido)" if required else "(opcional)"
    print(f"{status} {filepath} {req_text}")
    return exists

def check_directory(dirpath, required=True):
    """Verifica si un directorio existe"""
    exists = os.path.isdir(dirpath)
    status = "✅" if exists else ("❌" if required else "⚠️")
    req_text = "(requerido)" if required else "(opcional)"
    print(f"{status} {dirpath}/ {req_text}")
    return exists

def main():
    print("="*80)
    print("🏥 MedeX - Verificación de Archivos para HF Spaces Deployment")
    print("="*80)
    print()
    
    all_required_present = True
    
    # Archivos principales
    print("📄 Archivos principales:")
    all_required_present &= check_file("app.py", required=True)
    all_required_present &= check_file("requirements.txt", required=True)
    all_required_present &= check_file("README_SPACE.md", required=True)
    all_required_present &= check_file("DEPLOYMENT_GUIDE.md", required=False)
    print()
    
    # Sistema MedeX
    print("🧠 Sistema MedeX:")
    all_required_present &= check_file("MEDEX_FINAL.py", required=True)
    all_required_present &= check_file("medical_knowledge_base.py", required=True)
    all_required_present &= check_file("medical_rag_system.py", required=True)
    all_required_present &= check_file("pharmaceutical_database.py", required=True)
    print()
    
    # Directorio core
    print("📁 Directorio core/:")
    core_exists = check_directory("core", required=True)
    if core_exists:
        check_file("core/ai_engine.py", required=True)
        check_file("core/enhanced_ai_engine.py", required=False)
        check_file("core/real_kimi_client.py", required=False)
    all_required_present &= core_exists
    print()
    
    # Frontend estático
    print("🎨 Frontend estático:")
    static_exists = check_directory("static", required=True)
    if static_exists:
        check_file("static/index.html", required=True)
        check_directory("static/css", required=True)
        check_file("static/css/styles.css", required=True)
        check_directory("static/js", required=True)
        check_file("static/js/app.js", required=True)
        check_directory("static/images", required=False)
    all_required_present &= static_exists
    print()
    
    # Verificar estructura de datos (opcional)
    print("📚 Datos (opcional):")
    check_directory("data", required=False)
    if os.path.isdir("data"):
        check_directory("data/medical_conditions", required=False)
        check_directory("data/medications", required=False)
        check_directory("data/protocols", required=False)
    print()
    
    # Verificar api_key.txt
    print("🔑 Configuración:")
    api_key_exists = check_file("api_key.txt", required=False)
    if api_key_exists:
        print("   ℹ️  api_key.txt detectado - NO lo subas a HF Spaces")
        print("   ℹ️  Usa el secret KIMI_API_KEY en HF Spaces en su lugar")
    else:
        print("   ℹ️  No hay api_key.txt local (está bien)")
    print()
    
    # Resumen
    print("="*80)
    if all_required_present:
        print("✅ ¡Todos los archivos requeridos están presentes!")
        print()
        print("📋 Próximos pasos:")
        print("1. Crea un Space en HuggingFace con SDK 'static'")
        print("2. Sube todos los archivos verificados")
        print("3. Renombra README_SPACE.md a README.md en el Space")
        print("4. Configura el secret KIMI_API_KEY en Settings del Space")
        print("5. ¡Tu MedeX estará listo!")
        print()
        print("📖 Lee DEPLOYMENT_GUIDE.md para instrucciones detalladas")
    else:
        print("❌ Faltan algunos archivos requeridos")
        print("   Por favor verifica los archivos marcados con ❌")
        sys.exit(1)
    print("="*80)

if __name__ == "__main__":
    main()
