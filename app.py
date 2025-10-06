#!/usr/bin/env python3
"""
🏥 MedeX v25.83 - API Backend for Hugging Face Spaces
FastAPI backend for static frontend deployment
"""

import os
import sys
import asyncio
import json
from typing import Optional, Dict, Any
from datetime import datetime

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse, JSONResponse, HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Import MedeX system
from MEDEX_FINAL import MedeXv2583

# ===================================
# Configuration
# ===================================

# Load API key from HF Spaces secrets or local file
API_KEY = os.environ.get('MOONSHOT_API_KEY')  # HF Spaces secret name: MOONSHOT_API_KEY

if not API_KEY:
    try:
        with open('api_key.txt', 'r') as f:
            API_KEY = f.read().strip()
    except FileNotFoundError:
        print("⚠️ Warning: No API key found. Set MOONSHOT_API_KEY secret in HF Spaces.")
        API_KEY = None

# ===================================
# FastAPI App Setup
# ===================================

app = FastAPI(
    title="MedeX API",
    description="Advanced Medical AI System API",
    version="25.83"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================================
# Global State
# ===================================

medex_instance = None
session_stats = {
    "total_queries": 0,
    "total_emergencies": 0,
    "total_professional": 0,
    "total_educational": 0,
    "uptime_start": datetime.now()
}

# ===================================
# Request/Response Models
# ===================================

class ChatRequest(BaseModel):
    message: str
    streaming: bool = True

class ChatResponse(BaseModel):
    response: str
    user_type: str
    is_emergency: bool
    stats: Dict[str, Any]

# ===================================
# Initialization
# ===================================

def initialize_medex():
    """Initialize MedeX system with API key"""
    global medex_instance
    
    if not API_KEY:
        print("❌ Cannot initialize MedeX: No API key available")
        return False
    
    try:
        # Temporarily write API key to file for MedeX initialization
        with open('api_key.txt', 'w') as f:
            f.write(API_KEY)
        
        medex_instance = MedeXv2583()
        print("✅ MedeX v25.83 initialized successfully")
        return True
    except Exception as e:
        print(f"❌ Error initializing MedeX: {e}")
        return False

@app.on_event("startup")
async def startup_event():
    """Initialize MedeX on startup"""
    print("🏥 Starting MedeX API v25.83...")
    initialize_medex()
    print("✅ MedeX API ready")

# ===================================
# API Endpoints
# ===================================

@app.get("/")
async def root():
    """Serve the main HTML page"""
    try:
        return FileResponse("index.html")
    except Exception as e:
        return HTMLResponse(content=f"<h1>MedeX v25.83</h1><p>Error loading page: {e}</p>")

@app.get("/styles.css")
async def get_styles():
    """Serve CSS file"""
    return FileResponse("styles.css", media_type="text/css")

@app.get("/script.js")
async def get_script():
    """Serve JavaScript file"""
    return FileResponse("script.js", media_type="application/javascript")

@app.get("/banner.png")
async def get_banner():
    """Serve banner image"""
    return FileResponse("banner.png", media_type="image/png")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "medex_available": medex_instance is not None,
        "version": "25.83",
        "uptime_seconds": (datetime.now() - session_stats["uptime_start"]).total_seconds()
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    """Main chat endpoint with streaming support"""
    
    if not medex_instance:
        raise HTTPException(
            status_code=503,
            detail="MedeX system not available. Please configure MOONSHOT_API_KEY."
        )
    
    try:
        # Update stats
        session_stats["total_queries"] += 1
        
        if request.streaming:
            # Return streaming response
            return StreamingResponse(
                generate_streaming_response(request.message),
                media_type="text/event-stream"
            )
        else:
            # Return complete response
            return await generate_complete_response(request.message)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def generate_streaming_response(message: str):
    """Generate streaming response with metadata"""
    try:
        # Detect user type and emergency
        user_type = medex_instance.detect_user_type(message)
        is_emergency = medex_instance.detect_emergency(message)
        
        # Update stats
        if is_emergency:
            session_stats["total_emergencies"] += 1
        
        if user_type == "Professional":
            session_stats["total_professional"] += 1
        else:
            session_stats["total_educational"] += 1
        
        # Send metadata first
        metadata = {
            "type": "metadata",
            "user_type": user_type,
            "is_emergency": is_emergency,
            "timestamp": datetime.now().isoformat()
        }
        yield f"data: {json.dumps(metadata)}\n\n"
        
        # Generate and stream response
        full_response = ""
        async for chunk in medex_instance.generate_response_stream(message):
            full_response += chunk
            data = {
                "type": "content",
                "content": chunk
            }
            yield f"data: {json.dumps(data)}\n\n"
        
        # Send completion signal
        done_data = {
            "type": "done",
            "full_response": full_response
        }
        yield f"data: {json.dumps(done_data)}\n\n"
        
    except Exception as e:
        error_data = {
            "type": "error",
            "error": str(e)
        }
        yield f"data: {json.dumps(error_data)}\n\n"

async def generate_complete_response(message: str) -> ChatResponse:
    """Generate complete response without streaming"""
    try:
        # Detect user type and emergency
        user_type = medex_instance.detect_user_type(message)
        is_emergency = medex_instance.detect_emergency(message)
        
        # Update stats
        if is_emergency:
            session_stats["total_emergencies"] += 1
        
        if user_type == "Professional":
            session_stats["total_professional"] += 1
        else:
            session_stats["total_educational"] += 1
        
        # Generate response
        response = await medex_instance.generate_response(message, use_streaming=False)
        
        # Get current stats
        stats = medex_instance.get_session_stats()
        
        return ChatResponse(
            response=response,
            user_type=user_type,
            is_emergency=is_emergency,
            stats=stats
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
async def get_stats():
    """Get system statistics"""
    uptime = datetime.now() - session_stats["uptime_start"]
    
    return {
        "session_stats": session_stats,
        "uptime": {
            "seconds": uptime.total_seconds(),
            "hours": uptime.total_seconds() / 3600,
            "days": uptime.days
        },
        "medex_instance": medex_instance is not None
    }

@app.post("/clear")
async def clear_conversation():
    """Clear conversation history"""
    if medex_instance:
        medex_instance.clear_history()
        return {"status": "cleared"}
    else:
        raise HTTPException(status_code=503, detail="MedeX not available")

# ===================================
# Static Files
# ===================================

# Serve static files (CSS, JS, images)
try:
    app.mount("/static", StaticFiles(directory="."), name="static")
except Exception as e:
    print(f"⚠️ Warning: Could not mount static files: {e}")

# ===================================
# Error Handlers
# ===================================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc),
            "path": str(request.url)
        }
    )

# ===================================
# Main Entry Point
# ===================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))  # HF Spaces uses port 7860
    
    print("=" * 60)
    print("🏥 MedeX v25.83 - Medical AI System")
    print("=" * 60)
    print(f"🚀 Starting server on port {port}")
    print(f"📡 API Key configured: {API_KEY is not None}")
    print(f"🌐 Access at: http://localhost:{port}")
    print("=" * 60)
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
