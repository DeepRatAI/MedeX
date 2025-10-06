# 🚀 Guía de Despliegue en Hugging Face Spaces

Esta guía te ayudará a desplegar MedeX v25.83 en Hugging Face Spaces con SDK estático.

## 📋 Prerrequisitos

1. **Cuenta en Hugging Face**: [Crear cuenta](https://huggingface.co/join)
2. **API Key de Moonshot AI**: [Obtener API key](https://platform.moonshot.ai/)

---

## 🎯 Paso 1: Crear el Space

1. Ve a [Hugging Face Spaces](https://huggingface.co/spaces)
2. Haz clic en **"Create new Space"**
3. Configura el Space:
   - **Owner**: Tu usuario u organización
   - **Space name**: `medex` (o el nombre que prefieras)
   - **License**: MIT
   - **SDK**: Selecciona **"Static"** ⚠️ ¡Importante!
   - **Space hardware**: CPU basic (gratuito)
4. Haz clic en **"Create Space"**

---

## 📂 Paso 2: Subir los Archivos

Hay dos formas de subir los archivos:

### Opción A: Mediante Git (Recomendado)

```bash
# Clonar el repositorio del Space
git clone https://huggingface.co/spaces/<tu-usuario>/medex
cd medex

# Copiar los archivos necesarios desde MedeX
cp /path/to/MedeX/index.html .
cp /path/to/MedeX/style.css .
cp /path/to/MedeX/app.js .
cp /path/to/MedeX/api.py .
cp /path/to/MedeX/MEDEX_FINAL.py .
cp /path/to/MedeX/medical_*.py .
cp /path/to/MedeX/pharmaceutical_database.py .
cp /path/to/MedeX/requirements.txt .
cp /path/to/MedeX/README_SPACE.md ./README.md
cp /path/to/MedeX/banner.png .

# Si tienes la carpeta core/
cp -r /path/to/MedeX/core .

# Si tienes la carpeta rag_cache/
cp -r /path/to/MedeX/rag_cache .

# Commit y push
git add .
git commit -m "Initial MedeX deployment"
git push
```

### Opción B: Mediante la Interfaz Web

1. En tu Space, ve a la pestaña **"Files"**
2. Haz clic en **"Add file"** → **"Upload files"**
3. Arrastra y suelta los siguientes archivos:
   - `index.html`
   - `style.css`
   - `app.js`
   - `api.py`
   - `MEDEX_FINAL.py`
   - `medical_knowledge_base.py`
   - `medical_rag_system.py`
   - `pharmaceutical_database.py`
   - `requirements.txt`
   - `banner.png`
   - Carpeta `core/` (si existe)
   - Carpeta `rag_cache/` (si existe)
4. Renombra `README_SPACE.md` a `README.md`

---

## 🔐 Paso 3: Configurar el Secret (API Key)

⚠️ **Paso Crítico**: Sin este paso, MedeX no funcionará.

1. En tu Space, ve a **"Settings"**
2. Busca la sección **"Repository secrets"**
3. Haz clic en **"New secret"**
4. Configura el secret:
   - **Name**: `MOONSHOT_API_KEY` ⚠️ Debe ser exactamente este nombre
   - **Value**: Pega tu API key de Moonshot AI
   - **Description** (opcional): "API key for Moonshot Kimi AI"
5. Haz clic en **"Add secret"**

### 📝 Cómo obtener tu API Key de Moonshot

1. Ve a [platform.moonshot.ai](https://platform.moonshot.ai/)
2. Inicia sesión o crea una cuenta
3. Ve a **"API Keys"** en el panel de control
4. Haz clic en **"Create new secret key"**
5. Copia la key y guárdala de forma segura
6. Úsala en el paso anterior

---

## 🏗️ Paso 4: Crear Dockerfile (Para SDK Static)

Como estamos usando SDK **Static**, necesitamos un Dockerfile personalizado.

Crea un archivo llamado `Dockerfile` en la raíz del Space:

```dockerfile
# Dockerfile para MedeX en HF Spaces con SDK Static
FROM python:3.9-slim

# Configurar directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivos de requirements
COPY requirements.txt .

# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todos los archivos de la aplicación
COPY . .

# Exponer puerto 7860 (puerto por defecto de HF Spaces)
EXPOSE 7860

# Comando para iniciar el servidor
CMD ["python", "api.py"]
```

---

## ✅ Paso 5: Verificar el Deployment

1. El Space se reconstruirá automáticamente
2. Espera unos 2-5 minutos mientras se instalan las dependencias
3. Una vez completado, verás:
   - 🟢 **Status**: Running
   - Tu UI de MedeX cargada
4. Haz clic en el Space para abrirlo

### 🧪 Prueba el Sistema

Prueba con estas consultas:

**Consulta Profesional:**
```
Paciente masculino de 45 años con dolor torácico opresivo de 2 horas 
de evolución, irradiado a brazo izquierdo. Diaforesis presente. 
TA: 150/95 mmHg, FC: 110 lpm.
```

**Consulta Educativa:**
```
¿Qué son los antiinflamatorios no esteroideos (AINEs) y cuál es su mecanismo de acción?
```

---

## 🐛 Solución de Problemas

### Error: "MedeX system not initialized"

**Causa**: El secret `MOONSHOT_API_KEY` no está configurado correctamente.

**Solución**:
1. Ve a Settings → Repository secrets
2. Verifica que el secret se llame exactamente `MOONSHOT_API_KEY`
3. Verifica que la API key sea válida
4. Reinicia el Space

### Error: "ModuleNotFoundError"

**Causa**: Falta alguna dependencia en `requirements.txt`.

**Solución**:
1. Verifica que `requirements.txt` incluya:
   ```
   openai>=1.3.0
   fastapi>=0.104.0
   uvicorn[standard]>=0.24.0
   pydantic>=2.0.0
   ```
2. Haz commit y push de los cambios

### El Space no inicia

**Solución**:
1. Ve a **"Logs"** en tu Space
2. Revisa los errores de construcción
3. Asegúrate de que todos los archivos estén presentes
4. Verifica que el Dockerfile esté correctamente configurado

### Error: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

**Causa**: Extensiones del navegador (adblockers) bloquean recursos.

**Solución**:
- Desactiva adblockers en la página del Space
- Esto es solo visual y no afecta la funcionalidad

---

## 🎨 Personalización

### Cambiar el Nombre del Space

Edita el archivo `README.md` en tu Space y actualiza el campo `title`:

```yaml
---
title: Tu Nombre Personalizado
emoji: 🏥
colorFrom: blue
colorTo: purple
sdk: static
---
```

### Modificar la Interfaz

Los archivos que puedes modificar:

- `index.html`: Estructura HTML
- `style.css`: Estilos visuales
- `app.js`: Lógica del frontend

### Agregar Analytics

Puedes agregar Google Analytics u otros servicios añadiendo el código en `index.html`.

---

## 📊 Configuración de Visibilidad

### Hacer el Space Público

1. Ve a **"Settings"**
2. En **"Visibility"**, selecciona **"Public"**
3. Haz clic en **"Save"**

### Hacer el Space Privado

1. Ve a **"Settings"**
2. En **"Visibility"**, selecciona **"Private"**
3. Solo tú (y colaboradores) podrán acceder

---

## 🔄 Actualizar el Space

Para actualizar MedeX en el futuro:

```bash
# Ir al directorio del Space
cd /path/to/space/medex

# Obtener actualizaciones del repositorio MedeX
# (copiar los archivos actualizados)

# Commit y push
git add .
git commit -m "Update MedeX to latest version"
git push
```

El Space se reconstruirá automáticamente.

---

## 💡 Mejores Prácticas

1. **Seguridad**:
   - ❌ Nunca subas la API key en los archivos
   - ✅ Usa siempre Secrets para datos sensibles
   - ✅ Mantén el repositorio privado si contiene datos sensibles

2. **Performance**:
   - ✅ Usa imágenes optimizadas (banner.png)
   - ✅ Minimiza el CSS/JS si es posible
   - ✅ Considera usar un CDN para archivos estáticos grandes

3. **Mantenimiento**:
   - ✅ Revisa los logs regularmente
   - ✅ Actualiza las dependencias periódicamente
   - ✅ Prueba antes de desplegar cambios importantes

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa los Logs**: Settings → Logs
2. **Community**: [HF Community Forums](https://discuss.huggingface.co/)
3. **GitHub Issues**: [MedeX Issues](https://github.com/DeepRatAI/MedeX/issues)
4. **Documentación HF**: [HF Spaces Docs](https://huggingface.co/docs/hub/spaces)

---

## 📚 Recursos Adicionales

- [Documentación de Spaces](https://huggingface.co/docs/hub/spaces)
- [Guía de Secrets](https://huggingface.co/docs/hub/spaces-overview#managing-secrets)
- [Documentación de FastAPI](https://fastapi.tiangolo.com/)
- [Moonshot AI Docs](https://platform.moonshot.ai/docs)

---

¡Listo! Ahora tienes MedeX funcionando en Hugging Face Spaces con una UI moderna y profesional. 🎉
