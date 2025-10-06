# 🔐 Configuración de Secrets para Hugging Face Spaces

## Secret Requerido: MOONSHOT_API_KEY

MedeX utiliza un único secret para funcionar en Hugging Face Spaces:

### Nombre del Secret
```
MOONSHOT_API_KEY
```

### ¿Qué es?
Es tu API key personal de Moonshot AI que permite a MedeX usar el modelo Kimi K2-0711-Preview.

### ¿Cómo configurarlo?

#### En Hugging Face Spaces:

1. Ve a tu Space en HuggingFace
2. Click en **Settings** (⚙️ icono de engranaje)
3. Scroll hasta la sección **Variables and secrets**
4. Click en **New secret**
5. Ingresa los siguientes datos:
   - **Name**: `MOONSHOT_API_KEY`
   - **Value**: Tu API key de Moonshot AI (ejemplo: `sk-xxxxxxxxxxxxx`)
6. Click en **Save**
7. **Reinicia tu Space** para que los cambios tomen efecto

#### Para desarrollo local:

```bash
export MOONSHOT_API_KEY="tu-api-key-aqui"
```

O crea un archivo `api_key.txt` en la raíz del proyecto con tu API key.

### Obtener tu API Key de Moonshot

1. Ve a [Moonshot AI Platform](https://platform.moonshot.ai/)
2. Regístrate o inicia sesión
3. Ve a la sección **API Keys**
4. Click en **Create new API key**
5. Copia la API key generada
6. ¡No compartas esta key con nadie!

### Verificar que está configurado correctamente

Una vez configurado el secret:

1. Reinicia tu Space
2. Verifica en los logs que veas:
   ```
   ✅ API key loaded from MOONSHOT_API_KEY environment variable
   ```
3. Prueba enviando una consulta en la interfaz web

### Solución de Problemas

#### Error: "API key no configurada"
- Verifica que el nombre del secret sea exactamente `MOONSHOT_API_KEY` (en mayúsculas)
- Asegúrate de haber reiniciado el Space después de añadir el secret
- Revisa que la API key no tenga espacios al inicio o al final

#### Error: "Unauthorized" o "Invalid API key"
- Verifica que la API key sea válida y activa en Moonshot AI
- Asegúrate de tener créditos disponibles en tu cuenta de Moonshot
- Verifica que hayas copiado la API key completa

#### El Space no inicia después de configurar el secret
- Revisa los logs del Space
- Verifica que no haya caracteres especiales raros en la API key
- Asegúrate de que la API key comience con `sk-`

### Seguridad

⚠️ **IMPORTANTE**: 
- **NUNCA** subas tu API key al repositorio
- **NUNCA** compartas tu API key públicamente
- **NUNCA** hagas commit de `api_key.txt`
- Usa siempre secrets/variables de entorno para producción

El archivo `.gitignore` ya está configurado para ignorar `api_key.txt`, pero siempre verifica antes de hacer commit.

### Variables de Entorno Adicionales (Opcionales)

Si necesitas configurar otros aspectos:

- `PORT`: Puerto del servidor (default: 7860)

Estas son opcionales y generalmente no necesitas cambiarlas.

---

## Resumen Rápido

**Nombre del Secret**: `MOONSHOT_API_KEY`  
**Valor**: Tu API key de Moonshot AI  
**Ubicación**: Settings → Variables and secrets en HF Spaces  
**Acción requerida**: Reiniciar el Space después de configurar  

¡Eso es todo! Con este único secret configurado, MedeX estará listo para funcionar. 🚀
