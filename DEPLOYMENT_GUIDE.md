# 🚀 Guía de Despliegue en Hugging Face Spaces

Esta guía te ayudará a desplegar MedeX en Hugging Face Spaces usando el SDK estático.

## 📋 Prerequisitos

1. Cuenta en [Hugging Face](https://huggingface.co/)
2. API Key de [Moonshot AI](https://platform.moonshot.ai/)
3. Repositorio MedeX clonado

---

## 🔧 Pasos para el Despliegue

### 1. Crear un Nuevo Space

1. Ve a [huggingface.co/spaces](https://huggingface.co/spaces)
2. Haz clic en "Create new Space"
3. Configura:
   - **Space name**: `medex` (o el nombre que prefieras)
   - **License**: MIT
   - **Select SDK**: **Static**
   - **Space hardware**: CPU basic (suficiente)

### 2. Subir los Archivos

Sube los siguientes archivos a tu Space:

```
index.html
styles.css
script.js
app.py
MEDEX_FINAL.py
requirements.txt
README_SPACES.md (renombrar a README.md)
banner.png
```

**IMPORTANTE**: NO subas el archivo `api_key.txt` - esto se manejará con secrets.

### 3. Configurar el Secret de la API Key

1. En tu Space, ve a **Settings** (⚙️)
2. Busca la sección **Repository secrets**
3. Haz clic en **New secret**
4. Configura:
   - **Name**: `MOONSHOT_API_KEY`
   - **Value**: Tu API key de Moonshot AI
   - **Public**: NO (déjalo sin marcar)
5. Haz clic en **Add secret**

### 4. Configurar README

Renombra `README_SPACES.md` a `README.md` para que se muestre en tu Space:

```bash
mv README_SPACES.md README.md
```

### 5. Verificar Despliegue

Una vez que los archivos estén subidos:

1. HF Spaces detectará automáticamente el SDK estático
2. Instalará las dependencias de `requirements.txt`
3. Iniciará la aplicación con `app.py`
4. El Space estará disponible en: `https://huggingface.co/spaces/TU_USUARIO/medex`

---

## ✅ Verificación

Para verificar que todo funciona correctamente:

1. Abre tu Space
2. Deberías ver la interfaz de MedeX
3. El indicador de estado debería mostrar "Conectado" (punto verde)
4. Haz clic en "Iniciar Consulta"
5. Envía un mensaje de prueba como: "¿Qué son los AINEs?"
6. Deberías recibir una respuesta de MedeX

---

## 🔍 Solución de Problemas

### El Space no inicia

**Causa común**: El secret no está configurado correctamente.

**Solución**:
1. Verifica que el secret se llama exactamente `MOONSHOT_API_KEY`
2. Verifica que la API key es válida
3. Reinicia el Space (Settings → Factory reboot)

### Error "MedeX system not available"

**Causa**: La API key no se está cargando.

**Solución**:
1. Revisa los logs del Space (en la interfaz de HF)
2. Verifica que el secret está configurado
3. Asegúrate de que `app.py` tiene acceso a `os.environ.get('MOONSHOT_API_KEY')`

### La interfaz se ve pero no responde

**Causa**: Problema con el backend.

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña "Console"
3. Verifica que las peticiones a `/chat` lleguen correctamente
4. Revisa los logs del Space

### Error 503 Service Unavailable

**Causa**: El backend no pudo inicializar MedeX.

**Solución**:
1. Verifica que todas las dependencias están en `requirements.txt`
2. Revisa los logs del Space para ver el error específico
3. Asegúrate de que `MEDEX_FINAL.py` está presente

---

## 🎨 Personalización

### Cambiar el título del Space

Edita la sección `---` al inicio de `README.md`:

```yaml
---
title: TU_TITULO_AQUI
emoji: 🏥
colorFrom: blue
colorTo: purple
sdk: static
---
```

### Modificar la UI

Los archivos que puedes modificar:

- `index.html`: Estructura de la página
- `styles.css`: Estilos visuales
- `script.js`: Lógica del frontend

### Cambiar el puerto

Si necesitas cambiar el puerto (por defecto 7860):

En `app.py`, modifica:

```python
port = int(os.environ.get("PORT", TU_PUERTO))
```

---

## 📊 Monitoreo

### Ver logs en tiempo real

1. Ve a tu Space en HF
2. Haz clic en la pestaña "Logs"
3. Podrás ver:
   - Inicialización del sistema
   - Peticiones recibidas
   - Errores (si los hay)

### Estadísticas de uso

Puedes ver estadísticas en:
- Endpoint: `https://TU_SPACE_URL/stats`
- Retorna JSON con métricas del sistema

---

## 🔐 Seguridad

### Mejores prácticas

1. **NUNCA** subas tu API key directamente en el código
2. **SIEMPRE** usa secrets de HF Spaces
3. Mantén el secret marcado como privado
4. Regenera la API key si se compromete

### CORS

El backend está configurado para aceptar peticiones de cualquier origen (`allow_origins=["*"]`).

Para producción, es recomendable cambiar esto en `app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tudominio.com"],  # Tu dominio específico
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📚 Recursos Adicionales

- [Documentación de HF Spaces](https://huggingface.co/docs/hub/spaces)
- [Documentación de FastAPI](https://fastapi.tiangolo.com/)
- [Moonshot AI Platform](https://platform.moonshot.ai/)
- [Repositorio GitHub de MedeX](https://github.com/DeepRatAI/MedeX)

---

## 💡 Tips

1. **Cache**: HF Spaces mantiene caché, si haces cambios y no se reflejan, prueba "Factory reboot"
2. **Logs**: Los logs son tu mejor amigo para debugging
3. **Testing local**: Prueba primero localmente con `python app.py` antes de subir
4. **Recursos**: El tier gratuito de HF Spaces es suficiente para MedeX

---

## ✉️ Soporte

Si tienes problemas:

1. Revisa los logs del Space
2. Consulta la documentación de HF Spaces
3. Abre un issue en GitHub
4. Pregunta en la comunidad de HF

---

**🎉 ¡Listo! Tu instancia de MedeX debería estar funcionando en Hugging Face Spaces.**

---

*Última actualización: 2024*
*MedeX v25.83 - DeepRatAI*
