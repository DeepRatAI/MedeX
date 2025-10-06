# 🚀 Guía de Despliegue en Hugging Face Spaces

Esta guía te ayudará a desplegar MedeX en Hugging Face Spaces usando SDK Static.

## 📋 Requisitos Previos

1. **Cuenta en Hugging Face**: [Regístrate aquí](https://huggingface.co/join)
2. **API Key de Moonshot AI**: [Obtén tu API key aquí](https://platform.moonshot.ai/)

## 🎯 Pasos de Despliegue

### 1. Crear el Space

1. Ve a [Hugging Face Spaces](https://huggingface.co/spaces)
2. Click en "Create new Space"
3. Completa la información:
   - **Space name**: `medex` (o el nombre que prefieras)
   - **License**: MIT
   - **Select the Space SDK**: **Static**
   - **Space hardware**: CPU basic (gratuito)
4. Click en "Create Space"

### 2. Subir los Archivos

Tienes dos opciones:

#### Opción A: Usando Git (Recomendado)

```bash
# Clonar el repositorio del Space
git clone https://huggingface.co/spaces/TU_USUARIO/medex
cd medex

# Copiar los archivos necesarios de MedeX
# Desde tu directorio de MedeX:
cp -r static/ ../medex/
cp api_server.py ../medex/
cp MEDEX_FINAL.py ../medex/
cp medical_knowledge_base.py ../medex/
cp medical_rag_system.py ../medex/
cp pharmaceutical_database.py ../medex/
cp requirements.txt ../medex/
cp README_SPACE.md ../medex/README.md
cp -r core/ ../medex/

# Añadir y subir
git add .
git commit -m "Initial MedeX deployment"
git push
```

#### Opción B: Usando la Interfaz Web

1. En tu Space, ve a "Files and versions"
2. Click en "Add file" → "Upload files"
3. Sube los siguientes archivos y carpetas:
   - `static/` (toda la carpeta)
   - `core/` (toda la carpeta)
   - `api_server.py`
   - `MEDEX_FINAL.py`
   - `medical_knowledge_base.py`
   - `medical_rag_system.py`
   - `pharmaceutical_database.py`
   - `requirements.txt`
   - `README_SPACE.md` (renombrar a `README.md`)

### 3. Configurar el Secret (API Key)

**IMPORTANTE**: Este paso es esencial para que MedeX funcione.

1. En tu Space, ve a **Settings** (engranaje en la parte superior)
2. Scroll hasta **Variables and secrets**
3. Click en **New secret**
4. Configura el secret:
   - **Name**: `MOONSHOT_API_KEY`
   - **Value**: Pega tu API key de Moonshot AI
5. Click en **Save**

### 4. Crear el Archivo README.md

Copia el contenido de `README_SPACE.md` a `README.md` en tu Space. Este README se mostrará en la página principal del Space.

### 5. Verificar el Despliegue

1. Espera a que el Space termine de construirse (puede tomar 2-3 minutos)
2. Una vez listo, verás el estado "Running"
3. Abre el Space y verás la interfaz web de MedeX
4. Prueba con una consulta de ejemplo para verificar que funciona

## 🔧 Configuración del Space

### Archivo `.space` (Opcional)

Para configuración avanzada, puedes crear un archivo `.space` en la raíz:

```yaml
---
title: MedeX - Sistema Avanzado de IA Médica
emoji: 🏥
colorFrom: green
colorTo: blue
sdk: static
app_file: api_server.py
pinned: false
license: mit
python_version: 3.10
---
```

### Variables de Entorno Adicionales (Opcional)

Si necesitas configurar el puerto u otras variables:

1. Ve a Settings → Variables and secrets
2. Añade variables según sea necesario:
   - `PORT`: 7860 (por defecto)

## 🧪 Probar Localmente

Antes de desplegar, puedes probar localmente:

```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar API key
export MOONSHOT_API_KEY="tu_api_key_aqui"

# Ejecutar el servidor
python api_server.py
```

Abre tu navegador en `http://localhost:7860`

## 📊 Monitoreo

Para ver logs y monitorear tu Space:

1. Ve a tu Space
2. Click en "Logs" en la parte superior
3. Aquí verás todos los logs del servidor

## 🐛 Solución de Problemas

### El Space no inicia

- Verifica que todos los archivos necesarios estén subidos
- Revisa los logs en la pestaña "Logs"
- Asegúrate de que `requirements.txt` esté correcto

### Error de API Key

- Verifica que el secret `MOONSHOT_API_KEY` esté configurado correctamente
- Asegúrate de que la API key sea válida
- Reinicia el Space después de añadir el secret

### Errores de Importación

- Verifica que todos los archivos de la carpeta `core/` estén subidos
- Verifica que `medical_knowledge_base.py`, `medical_rag_system.py` y `pharmaceutical_database.py` estén presentes

### La UI no se carga

- Verifica que la carpeta `static/` completa esté subida
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de que los archivos `index.html`, `css/styles.css` y `js/app.js` existan

## 🔄 Actualizar el Space

Para actualizar tu Space:

```bash
# Hacer cambios en tu código local
# Luego subir los cambios

git add .
git commit -m "Descripción de los cambios"
git push
```

El Space se reconstruirá automáticamente.

## 🌐 Compartir tu Space

Una vez desplegado, tu Space estará disponible en:

```
https://huggingface.co/spaces/TU_USUARIO/medex
```

Puedes compartir este enlace con cualquier persona.

## 💡 Consejos

1. **Nombra bien tu Space**: Usa un nombre descriptivo y fácil de recordar
2. **Añade un buen README**: El README se mostrará en la página principal
3. **Configura el emoji y colores**: Esto hace que tu Space sea más atractivo
4. **Prueba localmente primero**: Siempre prueba los cambios localmente antes de desplegar
5. **Usa Git para versioning**: Es más fácil manejar cambios con Git

## 📚 Recursos Adicionales

- [Documentación de HF Spaces](https://huggingface.co/docs/hub/spaces)
- [Documentación de Static SDK](https://huggingface.co/docs/hub/spaces-sdks-static)
- [Moonshot AI Docs](https://platform.moonshot.ai/docs)
- [Repositorio de MedeX](https://github.com/DeepRatAI/MedeX)

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar un modelo diferente?**
R: Sí, pero necesitarás modificar `MEDEX_FINAL.py` para usar otro proveedor de IA.

**P: ¿Es gratis?**
R: Sí, Hugging Face Spaces ofrece un tier gratuito. Solo pagas por los llamados a la API de Moonshot.

**P: ¿Puedo hacer el Space privado?**
R: Sí, en Settings puedes cambiar la visibilidad a "Private".

**P: ¿Cómo escalo para más usuarios?**
R: Puedes actualizar el hardware del Space en Settings → Hardware.

## 🤝 Soporte

Si tienes problemas:

1. Revisa esta guía nuevamente
2. Consulta los logs del Space
3. Abre un issue en [GitHub](https://github.com/DeepRatAI/MedeX/issues)

---

¡Buena suerte con tu despliegue! 🚀
