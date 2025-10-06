#!/bin/bash
# Quick start script for MedeX Web Interface

echo "🏥 MedeX Web Interface - Quick Start"
echo "======================================"
echo ""

# Check if API key is configured
if [ ! -f "api_key.txt" ] && [ -z "$MOONSHOT_API_KEY" ]; then
    echo "❌ Error: API key not configured"
    echo ""
    echo "Please do one of the following:"
    echo "  1. Create api_key.txt file with your Moonshot API key"
    echo "  2. Set MOONSHOT_API_KEY environment variable"
    echo ""
    echo "Example:"
    echo "  export MOONSHOT_API_KEY='your-api-key-here'"
    echo ""
    exit 1
fi

# Check if dependencies are installed
echo "📦 Checking dependencies..."
python3 -c "import aiohttp, aiohttp_cors, openai" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ Missing dependencies. Installing..."
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo "✅ Dependencies OK"
echo ""

# Start the server
echo "🚀 Starting MedeX Web Server..."
echo "   Server will be available at: http://localhost:7860"
echo "   Press Ctrl+C to stop"
echo ""

python3 api_server.py
