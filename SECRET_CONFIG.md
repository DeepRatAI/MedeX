# 🔐 Configuración de Secrets en Hugging Face Spaces

## Nombre del Secret Requerido

Para que MedeX funcione correctamente en Hugging Face Spaces, necesitas configurar el siguiente secret:

### Secret Name: `MOONSHOT_API_KEY`

Este es el nombre exacto que debes usar al configurar el secret en Hugging Face Spaces.

## ¿Cómo Obtener la API Key?

1. Ve a [platform.moonshot.ai](https://platform.moonshot.ai/)
2. Crea una cuenta o inicia sesión
3. Navega a tu dashboard o sección de API keys
4. Genera una nueva API key o copia una existente
5. Guarda la API key en un lugar seguro

## ¿Cómo Configurar el Secret en HF Spaces?

### Paso 1: Acceder a Settings
1. Ve a tu Space en Hugging Face
2. Haz clic en el ícono de configuración (⚙️) o en "Settings"

### Paso 2: Agregar el Secret
1. Busca la sección **"Repository secrets"** o **"Variables and secrets"**
2. Haz clic en **"New secret"**
3. Configura:
   - **Name**: `MOONSHOT_API_KEY` (exactamente este nombre)
   - **Value**: Pega tu API key de Moonshot AI
   - **Public**: Deja desmarcado (mantén el secret privado)
4. Haz clic en **"Add secret"** o **"Save"**

### Paso 3: Verificar
1. El Space se reiniciará automáticamente
2. Verifica en los logs que aparezca: `📡 API Key configured: True`
3. Abre la interfaz y prueba enviar un mensaje

## Verificación del Secret

Para verificar que el secret está configurado correctamente, puedes:

1. **Ver los logs del Space**: Busca el mensaje `✅ MedeX v25.83 initialized successfully`
2. **Probar el endpoint de salud**:
   ```bash
   curl https://TU_USUARIO-medex.hf.space/health
   ```
   Deberías ver: `"medex_available": true`

3. **Usar la interfaz**: Envía un mensaje de prueba y verifica que obtienes una respuesta real

## Solución de Problemas

### El Secret no funciona

**Problema**: Ves `❌ Cannot initialize MedeX: No API key available`

**Solución**:
1. Verifica que el nombre del secret es exactamente: `MOONSHOT_API_KEY`
2. Verifica que la API key es válida
3. Reinicia el Space (Settings → Factory reboot)
4. Revisa los logs para ver errores específicos

### Error 503 Service Unavailable

**Problema**: La API responde con error 503

**Causa**: El backend no pudo inicializar MedeX

**Solución**:
1. Verifica que el secret está configurado
2. Revisa los logs del Space
3. Asegúrate de que la API key de Moonshot es válida y tiene créditos

### La API Key es visible en los logs

**No te preocupes**: Los logs de HF Spaces son privados y no se muestran públicamente. Sin embargo, nunca debes hacer commit de la API key en el código.

## Desarrollo Local

Para desarrollo local, puedes usar el archivo `api_key.txt`:

1. Crea un archivo llamado `api_key.txt` en la raíz del proyecto
2. Pega tu API key en el archivo (una sola línea)
3. Guarda el archivo
4. El archivo está en `.gitignore` y no se subirá a GitHub

**IMPORTANTE**: El archivo `api_key.txt` es solo para desarrollo local. En HF Spaces se usa el secret `MOONSHOT_API_KEY`.

## Seguridad

### ✅ Buenas Prácticas

- **SIEMPRE** usa secrets en HF Spaces
- **NUNCA** hagas commit de tu API key en el código
- **MANTÉN** el secret como privado (no público)
- **REGENERA** la API key si se compromete
- **REVOCA** API keys que ya no uses

### ❌ Evita

- Compartir tu API key públicamente
- Incluir la API key en el código fuente
- Subir `api_key.txt` a GitHub
- Hacer screenshots que muestren la API key completa

## Información Adicional

### ¿Por qué este nombre específico?

El código de MedeX busca la API key en esta variable de entorno:

```python
API_KEY = os.environ.get('MOONSHOT_API_KEY')
```

Si cambias el nombre del secret, debes actualizar el código en `app.py`.

### ¿Puedo usar otro servicio de IA?

Actualmente, MedeX está configurado para usar Moonshot AI (Kimi K2). Para usar otro servicio, necesitarás modificar:
- `MEDEX_FINAL.py`: Cambiar el cliente y la base URL
- `app.py`: Actualizar la referencia al secret

---

## Resumen

**Nombre del Secret**: `MOONSHOT_API_KEY`

**Dónde configurarlo**: Settings → Repository secrets en tu Space de HF

**Dónde obtener la key**: [platform.moonshot.ai](https://platform.moonshot.ai/)

**¿Dudas?**: Consulta la [Guía de Despliegue](DEPLOYMENT_GUIDE.md) completa

---

*MedeX v25.83 - DeepRatAI*
