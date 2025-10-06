# 🚀 Guía de Deployment en Hugging Face Spaces

Esta guía te ayudará a desplegar MedeX v25.83 en Hugging Face Spaces utilizando el SDK estático.

## 📋 Requisitos Previos

1. **Cuenta en Hugging Face**: Crea una cuenta en [huggingface.co](https://huggingface.co/)
2. **API Key de Moonshot/Kimi**: Obtén tu API key en [platform.moonshot.ai](https://platform.moonshot.ai/)

## 🎯 Pasos para el Deployment

### 1. Crear un Nuevo Space

1. Ve a [huggingface.co/new-space](https://huggingface.co/new-space)
2. Configura tu Space:
   - **Space name**: `medex-ai` (o el nombre que prefieras)
   - **License**: MIT
   - **Select the Space SDK**: **Static** (¡Muy importante!)
   - **Space hardware**: CPU basic (gratis) es suficiente
   - **Visibility**: Public o Private según prefieras

### 2. Clonar el Repositorio de MedeX

```bash
# Clonar el repositorio
git clone https://github.com/DeepRatAI/MedeX.git
cd MedeX
```

### 3. Preparar los Archivos para HF Spaces

Los siguientes archivos ya están listos en el repositorio:

- ✅ `app.py` - Backend Flask
- ✅ `static/` - Frontend (HTML/CSS/JS)
- ✅ `requirements.txt` - Dependencias Python
- ✅ `README_SPACE.md` - README para el Space
- ✅ Sistema MedeX completo (MEDEX_FINAL.py, core/, etc.)

### 4. Subir a tu Space

#### Opción A: Via Git (Recomendado)

```bash
# Añadir remote de tu Space
git remote add space https://huggingface.co/spaces/[TU-USUARIO]/[TU-SPACE]

# Copiar README del Space
cp README_SPACE.md README.md

# Commit y push
git add .
git commit -m "Initial deployment to HF Spaces"
git push space main
```

#### Opción B: Via Interfaz Web

1. Ve a tu Space en HF
2. Haz clic en "Files and versions"
3. Sube los siguientes archivos/directorios:
   - `app.py`
   - `static/` (completo)
   - `requirements.txt`
   - `README_SPACE.md` (renombrar a `README.md`)
   - `MEDEX_FINAL.py`
   - `core/` (directorio completo)
   - `medical_knowledge_base.py`
   - `medical_rag_system.py`
   - `pharmaceutical_database.py`
   - Archivos en `data/` si existen

### 5. Configurar el Secret KIMI_API_KEY

⚠️ **¡CRÍTICO!** Este paso es obligatorio para que MedeX funcione:

1. Ve a tu Space en Hugging Face
2. Haz clic en **Settings** (⚙️)
3. Busca la sección **Repository secrets**
4. Haz clic en **New secret**
5. Configura:
   - **Name**: `KIMI_API_KEY`
   - **Value**: [Tu API Key de Moonshot/Kimi]
6. Haz clic en **Add**
7. Reinicia el Space (puede reiniciarse automáticamente)

### 6. Verificar el Deployment

1. Espera a que el Space termine de construir (1-3 minutos)
2. Una vez que muestre "Running", haz clic en el Space para abrirlo
3. Deberías ver la pantalla de bienvenida de MedeX
4. Prueba haciendo una consulta de ejemplo

## 🔧 Configuración del Space

### Archivo README.md del Space

El archivo `README_SPACE.md` incluye el YAML frontmatter necesario:

```yaml
---
title: MedeX - Sistema Avanzado de IA Médica
emoji: 🏥
colorFrom: purple
colorTo: blue
sdk: static
pinned: false
license: mit
---
```

### Variables de Entorno

El sistema utiliza automáticamente el secret `KIMI_API_KEY` configurado en HF Spaces.

En `app.py`, la configuración es:
```python
api_key = os.environ.get('KIMI_API_KEY', '')
```

## 🐛 Troubleshooting

### El Space no inicia

1. **Revisa los logs**: En la pestaña "Logs" de tu Space
2. **Verifica el secret**: Asegúrate de que `KIMI_API_KEY` esté configurado
3. **Revisa requirements.txt**: Todas las dependencias deben estar listadas

### Error "KIMI_API_KEY no configurado"

- Ve a Settings → Repository secrets
- Verifica que el secret se llame exactamente `KIMI_API_KEY`
- Reinicia el Space después de añadir el secret

### Error de conexión en consultas

- Verifica que tu API Key de Moonshot sea válida
- Comprueba que tengas créditos disponibles en tu cuenta de Moonshot
- Revisa los logs del Space para más detalles

### El frontend no carga

- Asegúrate de que el directorio `static/` esté completo
- Verifica que `app.py` esté en la raíz del Space
- Revisa que el puerto sea el correcto (7860 por defecto en HF)

## 📊 Monitoreo

### Ver Logs

1. Ve a tu Space
2. Haz clic en la pestaña "Logs"
3. Aquí verás todos los mensajes de inicio y errores

### Estadísticas de Uso

- Las estadísticas de sesión se muestran en el sidebar de la aplicación
- Consultas totales, emergencias detectadas, etc.

## 🔄 Actualización del Space

Para actualizar tu Space con cambios del repositorio:

```bash
# Desde el directorio de MedeX
git pull origin main
git push space main
```

El Space se reconstruirá automáticamente.

## 🎨 Personalización

### Cambiar el Título del Space

Edita el frontmatter en `README.md`:
```yaml
title: Tu Título Personalizado
```

### Cambiar el Emoji

```yaml
emoji: 🩺  # o cualquier otro emoji médico
```

### Cambiar los Colores

```yaml
colorFrom: green
colorTo: teal
```

## 📱 Compartir tu Space

Una vez desplegado, tu Space estará disponible en:
```
https://huggingface.co/spaces/[TU-USUARIO]/[TU-SPACE]
```

Puedes compartir este enlace con cualquiera para que use MedeX.

## 🔐 Seguridad

- ⚠️ **NUNCA** subas tu API key directamente en el código
- ✅ Usa siempre el sistema de secrets de HF Spaces
- 🔒 Si accidentalmente subes un secret, revócalo inmediatamente y genera uno nuevo

## 📚 Recursos Adicionales

- [Documentación de HF Spaces](https://huggingface.co/docs/hub/spaces)
- [SDK Estático de HF](https://huggingface.co/docs/hub/spaces-sdks-static)
- [Repositorio de MedeX](https://github.com/DeepRatAI/MedeX)
- [Moonshot AI Platform](https://platform.moonshot.ai/)

## 💡 Tips

1. **Uso del SDK Static**: El SDK estático es perfecto para MedeX porque permite control total sobre HTML/CSS/JS
2. **Performance**: El frontend estático carga muy rápido, la IA procesa en el backend
3. **Escalabilidad**: Para alto tráfico, considera usar un Space con más recursos
4. **Monitoreo**: Revisa los logs regularmente para detectar problemas temprano

## ✅ Checklist de Deployment

- [ ] Cuenta de Hugging Face creada
- [ ] API Key de Moonshot/Kimi obtenida
- [ ] Space creado con SDK Static
- [ ] Archivos subidos al Space
- [ ] Secret `KIMI_API_KEY` configurado
- [ ] Space iniciado y funcionando
- [ ] Prueba realizada con consulta de ejemplo
- [ ] README personalizado (opcional)

---

¿Necesitas ayuda? Abre un issue en el [repositorio de MedeX](https://github.com/DeepRatAI/MedeX/issues)
