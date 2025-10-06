# 🚀 Quick Start - Deploy MedeX to Hugging Face Spaces

Esta es una guía rápida de 5 minutos para desplegar MedeX en Hugging Face Spaces.

## ⚡ Despliegue Rápido (5 minutos)

### Paso 1: Crear Space (1 min)
1. Ve a https://huggingface.co/new-space
2. Configura:
   - **Name**: `medex` (o tu preferencia)
   - **SDK**: **Static** ⚠️ IMPORTANTE
   - **License**: MIT
   - **Hardware**: CPU basic (gratis)
3. Click "Create Space"

### Paso 2: Subir Archivos (2 min)
Arrastra estos archivos a tu Space:
```
✅ index.html
✅ styles.css  
✅ script.js
✅ app.py
✅ MEDEX_FINAL.py
✅ requirements.txt
✅ banner.png
✅ medical_knowledge_base.py
✅ pharmaceutical_database.py
✅ medical_rag_system.py
```

Renombra: `README_SPACES.md` → `README.md`

### Paso 3: Configurar Secret (1 min)
1. Click en "Settings" ⚙️
2. Ve a "Repository secrets"
3. Click "New secret"
4. Configura:
   - **Name**: `MOONSHOT_API_KEY`
   - **Value**: [Tu API key de Moonshot]
   - **Public**: NO ❌
5. Click "Add secret"

### Paso 4: Obtener API Key (1 min)
Si no tienes API key:
1. Ve a https://platform.moonshot.ai/
2. Crea cuenta / Login
3. Ve a API Keys
4. Genera nueva key
5. Cópiala para el Paso 3

### Paso 5: ¡Listo! ✅
- El Space se construirá automáticamente
- Espera ~2-3 minutos
- Abre tu Space: `https://huggingface.co/spaces/TU_USUARIO/medex`
- ¡Disfruta de MedeX!

## 🎯 Verificación

✅ **Funcionando correctamente si ves:**
- Indicador "Conectado" en verde
- Botón "Iniciar Consulta" funcional
- Respuestas de MedeX al enviar mensajes

❌ **Si hay problemas:**
1. Revisa logs del Space
2. Verifica que el secret se llama exactamente `MOONSHOT_API_KEY`
3. Confirma que la API key es válida
4. Reinicia el Space (Settings → Factory reboot)

## 📝 Checklist

Antes de desplegar, asegúrate de tener:

- [ ] Cuenta en Hugging Face
- [ ] API key de Moonshot AI
- [ ] Archivos del repositorio descargados
- [ ] SDK configurado como "Static"
- [ ] Secret configurado con nombre correcto

## 🆘 Ayuda Rápida

**Error 503**: Secret no configurado → Ve a Settings y agrega `MOONSHOT_API_KEY`

**No responde**: API key inválida → Verifica tu key en platform.moonshot.ai

**UI no carga**: SDK incorrecto → Debe ser "Static", no "Gradio" ni "Streamlit"

**Otros errores**: Consulta [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🎉 ¡Éxito!

Si todo funcionó, tu MedeX está en línea en:
```
https://huggingface.co/spaces/TU_USUARIO/medex
```

Comparte el link y disfruta de tu asistente médico IA.

---

## 📚 Documentación Completa

Para más detalles:
- [Guía Completa de Despliegue](DEPLOYMENT_GUIDE.md)
- [Configuración de Secrets](SECRET_CONFIG.md)
- [README de HF Spaces](README_SPACES.md)

---

**MedeX v25.83 - Ready to Deploy! 🚀**
