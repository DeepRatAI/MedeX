FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project structure
COPY src/ ./src/
COPY templates/ ./templates/
COPY static/ ./static/
COPY app.py .
COPY README.md .

# Ensure the src module is in the Python path
ENV PYTHONPATH=/app:$PYTHONPATH

# Expose port
EXPOSE 7860

# Run the application
CMD ["python", "app.py"]
