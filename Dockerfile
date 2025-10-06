# Dockerfile para MedeX v25.83 en Hugging Face Spaces
# SDK: Static
# Purpose: Sistema Médico de IA con UI moderna

FROM python:3.9-slim

# Configurar variables de entorno
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivo de requirements primero (para aprovechar cache de Docker)
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todos los archivos de la aplicación
COPY . .

# Crear directorios necesarios
RUN mkdir -p logs cache rag_cache

# Exponer puerto 7860 (puerto estándar de HF Spaces)
EXPOSE 7860

# Healthcheck para verificar que el servidor está funcionando
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:7860/api/health || exit 1

# Comando para iniciar la aplicación
CMD ["python", "api.py"]
