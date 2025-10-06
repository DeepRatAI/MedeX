# 🚀 Quick Start - MedeX en Hugging Face Spaces

## ⚡ Deployment Rápido (5 minutos)

### 1. Preparación (1 min)

```bash
# Verificar que todos los archivos estén listos
python3 prepare_deployment.py
```

### 2. Obtener API Key de Kimi (1 min)

1. Ve a [platform.moonshot.ai](https://platform.moonshot.ai/)
2. Inicia sesión / Regístrate
3. Ve a "API Keys"
4. Crea una nueva API key
5. **Cópiala** (no la compartas)

### 3. Crear Space en HF (2 mins)

1. Ve a [huggingface.co/new-space](https://huggingface.co/new-space)
2. Configura:
   - **Name**: `medex-ai`
   - **SDK**: **Static** ⚠️ ¡Importante!
   - **Hardware**: CPU basic (gratis)
3. Clic en "Create Space"

### 4. Subir Archivos (1 min)

**Opción A - Via Git:**
```bash
git remote add space https://huggingface.co/spaces/[TU-USUARIO]/medex-ai
cp README_SPACE.md README.md
git add .
git commit -m "Deploy MedeX to HF Spaces"
git push space main
```

**Opción B - Via Web:**
Arrastra y suelta en la interfaz de HF todos los archivos del proyecto.

### 5. Configurar Secret (1 min)

1. En tu Space → **Settings** ⚙️
2. **Repository secrets** → **New secret**
3. Name: `KIMI_API_KEY`
4. Value: [Tu API Key de paso 2]
5. **Add** → Reiniciar Space

### 6. ¡Listo! 🎉

Tu MedeX estará en: `https://huggingface.co/spaces/[TU-USUARIO]/medex-ai`

---

## 📝 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `app.py` | Backend Flask (API) |
| `static/index.html` | Frontend principal |
| `static/css/styles.css` | Estilos de la UI |
| `static/js/app.js` | Lógica frontend |
| `README_SPACE.md` | README para HF Space |
| `requirements.txt` | Dependencias Python |

## 🔑 Configuración del Secret

**Nombre del secret en HF Spaces:** `KIMI_API_KEY`

⚠️ **MUY IMPORTANTE**: El secret debe llamarse exactamente `KIMI_API_KEY` (sin espacios, todo mayúsculas).

## 🧪 Probar Localmente (Opcional)

```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar API key temporalmente
export KIMI_API_KEY="tu-api-key-aqui"

# Iniciar servidor
python3 app.py

# Abrir en navegador
open http://localhost:7860
```

## ❓ Problemas Comunes

### "KIMI_API_KEY no configurado"
- Verifica que el secret esté en Settings → Repository secrets
- Debe llamarse exactamente `KIMI_API_KEY`
- Reinicia el Space después de agregar el secret

### "Connection error"
- Verifica que tu API key sea válida
- Comprueba que tengas créditos en Moonshot
- Revisa los logs del Space

### El frontend no carga
- Verifica que elegiste SDK "Static"
- Asegúrate de que `static/` esté completo
- Revisa los logs del Space

## 📚 Más Información

- **Guía completa**: Ver `DEPLOYMENT_GUIDE.md`
- **Documentación**: Ver `README.md`
- **Issues**: [GitHub](https://github.com/DeepRatAI/MedeX/issues)

---

**¿Necesitas ayuda?** Abre un issue en GitHub con:
- Screenshot del error
- Logs del Space
- Pasos que seguiste
