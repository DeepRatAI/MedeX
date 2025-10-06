# 🚀 MedeX Web UI - Quick Reference Card

## 📌 Información Esencial

### Nombre del Secret (HF Spaces)
```
MOONSHOT_API_KEY
```
**¡Este es el ÚNICO secret que necesitas!**

---

## 🎯 Deploy Rápido (5 Pasos)

### 1️⃣ Crear Space
- Ve a: https://huggingface.co/spaces
- Click: "Create new Space"
- SDK: **Static** ⚠️ (Importante)
- Name: `medex` (o tu preferencia)

### 2️⃣ Subir Archivos
Necesitas subir estos archivos del repo MedeX:

**Obligatorios:**
```
static/               (toda la carpeta)
api_server.py
MEDEX_FINAL.py
medical_knowledge_base.py
medical_rag_system.py
pharmaceutical_database.py
requirements.txt
README_SPACE.md      → renombrar a README.md
core/                (toda la carpeta)
```

### 3️⃣ Configurar Secret
- Settings → Variables and secrets
- New secret
- Name: `MOONSHOT_API_KEY`
- Value: Tu API key de Moonshot
- Save

### 4️⃣ Obtener API Key
1. Ve a: https://platform.moonshot.ai/
2. Regístrate/Login
3. API Keys → Create new
4. Copia la key (empieza con `sk-`)

### 5️⃣ Reiniciar y Disfrutar
- El Space se reconstruye automáticamente
- Espera 2-3 minutos
- ¡Listo! 🎉

---

## 🧪 Test Local

```bash
# 1. Instalar deps
pip install aiohttp aiohttp-cors openai

# 2. Configurar key
export MOONSHOT_API_KEY="tu-api-key"

# 3. Iniciar
python api_server.py

# 4. Abrir
# http://localhost:7860
```

O simplemente:
```bash
./start_server.sh
```

---

## 📁 Archivos del Proyecto

### Frontend (Static)
```
static/
├── index.html       (9.5KB)  Estructura
├── css/
│   └── styles.css   (17.6KB) Estilos
└── js/
    └── app.js       (12.3KB) Lógica
```

### Backend
```
api_server.py        (5.8KB)  Servidor API
```

### Documentación (8 archivos, 50KB+)
```
DEPLOYMENT_GUIDE.md          Guía paso a paso
SECRET_CONFIG.md             Todo sobre el secret
WEB_INTERFACE_README.md      Docs técnicas
VISUAL_GUIDE.md              Diseño y UX
PROJECT_SUMMARY.md           Resumen completo
COMPLETION_REPORT.md         Reporte final
UI_PREVIEW.md                Vista previa
README_SPACE.md              Para HF Space
```

---

## 🎨 Características UI

### Diseño
- 🏥 Tema médico profesional
- 🎨 Verde médico (#2D7D6E)
- 📱 Responsive (mobile-first)
- ✨ Animaciones suaves

### Funcionalidades
- 💬 Chat con historial
- 🔍 Detección automática
- 🚨 Alertas emergencia
- 📊 Estadísticas tiempo real
- 🎯 Ejemplos interactivos
- ⌨️ Keyboard shortcuts

### Componentes
- Header fijo
- Banner bienvenida
- Chat container
- Input auto-resize
- Modal estadísticas
- Loading states

---

## 🔧 Configuración

### Variables de Entorno
```bash
MOONSHOT_API_KEY=tu_api_key  # Obligatorio
PORT=7860                    # Opcional
```

### Para HF Spaces
Solo configura el secret: `MOONSHOT_API_KEY`

### Para Local
Opción A: Variable de entorno
```bash
export MOONSHOT_API_KEY="sk-xxxxx"
```

Opción B: Archivo api_key.txt
```bash
echo "sk-xxxxx" > api_key.txt
```

---

## 🎯 Endpoints API

### POST `/api/chat`
Procesa consultas médicas
```json
Request:
{
  "query": "texto consulta",
  "history": []
}

Response:
{
  "response": "respuesta",
  "userType": "professional|patient",
  "confidence": 0.95,
  "isEmergency": false,
  "timestamp": "2024-01-01T12:00:00"
}
```

### GET `/api/health`
Health check
```json
{
  "status": "healthy",
  "service": "MedeX Web API",
  "version": "v25.83"
}
```

### GET `/api/stats`
Estadísticas sesión
```json
{
  "queries": 10,
  "emergencies": 1,
  "professional_queries": 5,
  "educational_queries": 5
}
```

---

## 🐛 Troubleshooting

### Space no inicia
✅ Verifica SDK = Static
✅ Todos archivos subidos
✅ requirements.txt presente

### Error API Key
✅ Secret = `MOONSHOT_API_KEY`
✅ Key válida y activa
✅ Reinicia Space después de configurar

### UI no carga
✅ Carpeta `static/` completa
✅ Archivos CSS y JS presentes
✅ Revisa logs del Space

### No responde
✅ Secret configurado correctamente
✅ API key tiene créditos
✅ Moonshot API disponible

---

## 📊 Checklist Deployment

Pre-deployment:
- [ ] API key de Moonshot obtenida
- [ ] Cuenta HF Spaces creada
- [ ] Archivos listos para subir

Durante deployment:
- [ ] Space creado (SDK Static)
- [ ] Archivos subidos
- [ ] Secret configurado
- [ ] Space reiniciado

Post-deployment:
- [ ] Health check OK
- [ ] UI carga correctamente
- [ ] Consulta de prueba funciona
- [ ] Estadísticas se actualizan

---

## 💡 Tips Rápidos

### Git Push a HF Space
```bash
git clone https://huggingface.co/spaces/USER/medex
cd medex
# copiar archivos
git add .
git commit -m "Initial deployment"
git push
```

### Actualizar Space
```bash
# hacer cambios
git add .
git commit -m "Update"
git push
# Space se reconstruye automáticamente
```

### Ver Logs
- Space → Logs (parte superior)
- Útil para debugging

### Cambiar Hardware
- Settings → Hardware
- CPU basic (gratis) es suficiente

---

## 🎨 Paleta de Colores

```
Primary:    #2D7D6E ████ Verde médico
Accent:     #FF6B6B ████ Rojo alerta
Success:    #51CF66 ████ Verde éxito
Warning:    #FFA94D ████ Naranja
Emergency:  #E03131 ████ Rojo emergencia
```

---

## 📚 Recursos

### Links
- HF Spaces: https://huggingface.co/spaces
- Moonshot AI: https://platform.moonshot.ai/
- Repo MedeX: https://github.com/DeepRatAI/MedeX

### Documentación
- `DEPLOYMENT_GUIDE.md` - Deploy completo
- `SECRET_CONFIG.md` - Config secret
- `WEB_INTERFACE_README.md` - Docs técnicas

### Soporte
- GitHub Issues para bugs
- GitHub Discussions para preguntas

---

## ✅ Checklist Rápido

Antes de deployar:
- [ ] Tengo API key de Moonshot
- [ ] Tengo cuenta en HF Spaces
- [ ] Archivos descargados

Para deployar:
- [ ] Space creado (SDK Static)
- [ ] Archivos subidos
- [ ] Secret: `MOONSHOT_API_KEY` configurado
- [ ] Space reiniciado

Para verificar:
- [ ] `/api/health` responde
- [ ] UI carga
- [ ] Consulta funciona
- [ ] Stats se actualizan

---

## 🎉 ¡Listo!

Con esta tarjeta tienes todo lo necesario para deployar MedeX en HF Spaces.

**Recuerda**: El secret se llama **`MOONSHOT_API_KEY`**

**Tiempo total**: 10-15 minutos

**¡Buena suerte! 🚀**

---

_Quick Reference Card v1.0_  
_MedeX Web UI Project_  
_2024_
