#!/usr/bin/env python3
"""
MedeX Web API Server
Backend API for the MedeX static web interface
Designed for Hugging Face Spaces deployment with static SDK
"""

import os
import asyncio
import json
from datetime import datetime
from typing import Dict, Any
from pathlib import Path

from aiohttp import web
import aiohttp_cors

# Import MedeX system
from MEDEX_FINAL import MedeXv2583


class MedeXWebAPI:
    """Web API server for MedeX system"""
    
    def __init__(self):
        # Initialize MedeX with API key from environment variable
        self.setup_api_key()
        self.medex = MedeXv2583()
        self.app = web.Application()
        self.setup_routes()
        self.setup_cors()
        
    def setup_api_key(self):
        """Setup API key from environment variable for HF Spaces"""
        # Check for HF Spaces secret
        api_key = os.environ.get('MOONSHOT_API_KEY')
        
        if api_key:
            # Create api_key.txt file for MedeX to read
            with open('api_key.txt', 'w') as f:
                f.write(api_key)
            print("✅ API key loaded from MOONSHOT_API_KEY environment variable")
        else:
            # Check if api_key.txt already exists
            if not os.path.exists('api_key.txt'):
                print("⚠️ Warning: MOONSHOT_API_KEY environment variable not set")
                print("💡 For Hugging Face Spaces, add MOONSHOT_API_KEY in Settings > Variables and secrets")
    
    def setup_routes(self):
        """Setup API routes"""
        self.app.router.add_post('/api/chat', self.handle_chat)
        self.app.router.add_get('/api/health', self.handle_health)
        self.app.router.add_get('/api/stats', self.handle_stats)
        
        # Serve static files
        static_path = Path(__file__).parent / 'static'
        self.app.router.add_static('/css', static_path / 'css')
        self.app.router.add_static('/js', static_path / 'js')
        self.app.router.add_get('/', self.handle_index)
    
    def setup_cors(self):
        """Setup CORS for development"""
        cors = aiohttp_cors.setup(self.app, defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
                allow_methods="*"
            )
        })
        
        # Configure CORS on all routes
        for route in list(self.app.router.routes()):
            if not route.resource:
                continue
            try:
                cors.add(route)
            except Exception:
                pass
    
    async def handle_index(self, request):
        """Serve the main HTML page"""
        static_path = Path(__file__).parent / 'static' / 'index.html'
        return web.FileResponse(static_path)
    
    async def handle_health(self, request):
        """Health check endpoint"""
        return web.json_response({
            'status': 'healthy',
            'service': 'MedeX Web API',
            'version': 'v25.83',
            'timestamp': datetime.now().isoformat()
        })
    
    async def handle_stats(self, request):
        """Get session statistics"""
        stats = self.medex.get_session_stats()
        return web.json_response(stats)
    
    async def handle_chat(self, request):
        """Handle chat requests"""
        try:
            data = await request.json()
            query = data.get('query', '').strip()
            
            if not query:
                return web.json_response({
                    'error': 'Query is required'
                }, status=400)
            
            # Process with MedeX (non-streaming for API)
            response_text = await self.medex.generate_response(query, use_streaming=False)
            
            # Get session stats for metadata
            stats = self.medex.get_session_stats()
            
            # Detect user type and emergency from the last detection log
            detection_log = stats.get('detection_log', [])
            user_type = 'patient'
            confidence = 0.5
            is_emergency = False
            
            if detection_log:
                last_detection = detection_log[-1]
                user_type = last_detection.get('user_type', 'patient').lower()
                confidence = last_detection.get('confidence', 0.5)
                is_emergency = last_detection.get('is_emergency', False)
            
            # Return structured response
            return web.json_response({
                'response': response_text,
                'userType': user_type,
                'confidence': confidence,
                'isEmergency': is_emergency,
                'timestamp': datetime.now().isoformat()
            })
            
        except Exception as e:
            print(f"❌ Error in chat handler: {e}")
            import traceback
            traceback.print_exc()
            
            return web.json_response({
                'error': 'Internal server error',
                'message': str(e)
            }, status=500)
    
    def run(self, host='0.0.0.0', port=7860):
        """Run the web server"""
        print("="*80)
        print("🏥 MedeX Web API Server")
        print("="*80)
        print(f"🚀 Starting server on http://{host}:{port}")
        print(f"📊 API Endpoint: http://{host}:{port}/api/chat")
        print(f"❤️ Health Check: http://{host}:{port}/api/health")
        print(f"🌐 Web Interface: http://{host}:{port}/")
        print("="*80)
        
        web.run_app(self.app, host=host, port=port)


def main():
    """Main entry point"""
    # Get port from environment (for HF Spaces)
    port = int(os.environ.get('PORT', 7860))
    
    # Create and run server
    api = MedeXWebAPI()
    api.run(port=port)


if __name__ == '__main__':
    main()
