#!/usr/bin/env python3
"""
🏥 MedeX v25.83 - API Server for Static UI
Backend API that wraps MedeX system for web interface
Configured for Hugging Face Spaces deployment
"""

import os
import asyncio
import json
from datetime import datetime
from typing import Dict, Optional
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Import MedeX system
from MEDEX_FINAL import MedeXv2583

# Initialize FastAPI app
app = FastAPI(
    title="MedeX v25.83 API",
    description="Sistema Médico de IA con detección automática",
    version="25.83"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class QueryRequest(BaseModel):
    query: str
    conversation_id: Optional[str] = None

class QueryResponse(BaseModel):
    response: str
    metadata: Dict
    conversation_id: str
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    version: str
    model: str
    timestamp: str

# Global MedeX instance
medex_instance = None

def get_api_key():
    """
    Get API key from Hugging Face Spaces secrets or file
    
    For HF Spaces: Set secret named 'MOONSHOT_API_KEY'
    For local: Use api_key.txt file
    """
    # Try to get from environment variable (HF Spaces secret)
    api_key = os.environ.get('MOONSHOT_API_KEY')
    
    if api_key:
        print("✅ API key loaded from HF Spaces secret: MOONSHOT_API_KEY")
        return api_key
    
    # Fallback to file for local development
    try:
        with open('api_key.txt', 'r') as f:
            api_key = f.read().strip()
            print("✅ API key loaded from api_key.txt file")
            return api_key
    except FileNotFoundError:
        print("❌ Error: No API key found!")
        print("💡 For HF Spaces: Set secret 'MOONSHOT_API_KEY'")
        print("💡 For local: Create api_key.txt file")
        return None

def init_medex():
    """Initialize MedeX system with API key configuration"""
    global medex_instance
    
    # Get API key
    api_key = get_api_key()
    
    if not api_key:
        raise Exception("API key not configured. Cannot initialize MedeX.")
    
    # Temporarily write API key to file for MedeX initialization
    # (MedeX reads from api_key.txt)
    temp_key_file = False
    if not os.path.exists('api_key.txt'):
        with open('api_key.txt', 'w') as f:
            f.write(api_key)
        temp_key_file = True
    
    try:
        # Initialize MedeX
        medex_instance = MedeXv2583()
        print("✅ MedeX v25.83 initialized successfully")
        print(f"🧠 Model: {medex_instance.client.base_url}")
        return True
    except Exception as e:
        print(f"❌ Error initializing MedeX: {e}")
        raise
    finally:
        # Clean up temp file if we created it
        if temp_key_file and os.path.exists('api_key.txt'):
            # Don't delete the temp file, leave it for MedeX to use
            pass

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize MedeX on startup"""
    try:
        init_medex()
        print("🚀 MedeX API Server started successfully")
    except Exception as e:
        print(f"❌ Failed to start MedeX API Server: {e}")
        # Don't fail completely, allow health endpoint to work
        pass

# API Endpoints

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy" if medex_instance else "unhealthy",
        version="25.83",
        model="Kimi K2-0711-Preview + RAG",
        timestamp=datetime.now().isoformat()
    )

@app.post("/api/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """
    Process medical query through MedeX
    
    The system automatically detects:
    - Professional vs Educational queries
    - Emergency situations
    - Appropriate response format
    """
    if not medex_instance:
        raise HTTPException(
            status_code=503,
            detail="MedeX system not initialized. Check API key configuration."
        )
    
    try:
        # Generate response using MedeX
        response = await medex_instance.generate_response(
            query=request.query,
            use_streaming=False  # Use direct mode for API
        )
        
        # Get query analysis metadata
        user_type = medex_instance.detect_user_type(request.query)
        is_emergency = medex_instance.detect_emergency(request.query)
        
        # Prepare metadata
        metadata = {
            "user_type": user_type,
            "is_emergency": is_emergency,
            "model": "kimi-k2-0711-preview",
            "rag_enabled": True
        }
        
        return QueryResponse(
            response=response,
            metadata=metadata,
            conversation_id=request.conversation_id or "default",
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        print(f"❌ Error processing query: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )

@app.get("/api/stats")
async def get_stats():
    """Get session statistics"""
    if not medex_instance:
        raise HTTPException(status_code=503, detail="MedeX not initialized")
    
    try:
        stats = medex_instance.get_session_stats()
        return JSONResponse(content=stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/clear-history")
async def clear_history():
    """Clear conversation history"""
    if not medex_instance:
        raise HTTPException(status_code=503, detail="MedeX not initialized")
    
    try:
        medex_instance.clear_history()
        return {"status": "success", "message": "History cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Serve static files (HTML, CSS, JS)
@app.get("/")
async def serve_index():
    """Serve the main HTML page"""
    return FileResponse("index.html")

@app.get("/style.css")
async def serve_css():
    """Serve CSS file"""
    return FileResponse("style.css")

@app.get("/app.js")
async def serve_js():
    """Serve JavaScript file"""
    return FileResponse("app.js")

@app.get("/banner.png")
async def serve_banner():
    """Serve banner image"""
    if os.path.exists("banner.png"):
        return FileResponse("banner.png")
    else:
        raise HTTPException(status_code=404, detail="Banner not found")

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Endpoint not found"}
    )

@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"}
    )

if __name__ == "__main__":
    print("=" * 80)
    print("🏥 MedeX v25.83 - API Server")
    print("=" * 80)
    print("📡 Starting server...")
    print("🌐 Access at: http://0.0.0.0:7860")
    print("=" * 80)
    
    # Start server
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=7860,  # HF Spaces default port
        log_level="info"
    )
