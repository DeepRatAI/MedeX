# Despliegue en Hugging Face Spaces

## Configuración de Secrets

En tu Hugging Face Space, configura los siguientes secrets:

- `OPENAI_API_KEY`: Tu API key de OpenAI
- `ANTHROPIC_API_KEY`: Tu API key de Anthropic (opcional)
- `GROQ_API_KEY`: Tu API key de Groq (opcional)

## Configuración del Space

1. **SDK**: Static
2. **Python version**: 3.10
3. **Port**: 7860 (default)

## Archivos necesarios

El Space debe contener:
- `app.py` - Servidor Flask principal
- `templates/` - Archivos HTML
- `static/` - CSS y JavaScript
- `src/` - Todo el código de MedeX
- `requirements.txt` - Dependencias
- `README.md` - Documentación

## Comando de inicio

El Space ejecutará automáticamente:
```bash
python app.py
```

## Verificación

Una vez desplegado, verifica:
1. La ruta `/api/health` debe devolver status 200
2. La interfaz debe cargar correctamente
3. Los secrets están configurados (verificar en logs)
