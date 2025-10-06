# 🌐 MedeX Web Interface

Interfaz web moderna y profesional para el Sistema de IA Médica MedeX v25.83.

## 📋 Descripción

Esta es una interfaz web de alta calidad diseñada específicamente para aplicaciones médicas, optimizada para deployment en Hugging Face Spaces usando SDK Static.

## ✨ Características de la UI

### 🎨 Diseño Profesional
- **Tema Médico**: Colores y estética apropiada para aplicaciones de salud
- **Responsive**: Funciona perfectamente en desktop, tablet y móvil
- **Accesible**: Diseño inclusivo siguiendo mejores prácticas de UX
- **Moderno**: Uso de gradientes, sombras y animaciones sutiles

### 🧠 Funcionalidades Inteligentes
- **Detección Automática**: Muestra badges según el tipo de usuario detectado
- **Indicadores de Emergencia**: Alertas visuales para situaciones críticas
- **Ejemplos Interactivos**: Click en tarjetas de ejemplo para probar el sistema
- **Streaming de Respuestas**: Indicador de escritura en tiempo real
- **Historial de Chat**: Mantiene el contexto de la conversación

### 📊 Estadísticas
- Duración de sesión
- Total de consultas
- Consultas profesionales vs pacientes
- Emergencias detectadas

### 🎯 Experiencia de Usuario
- **Auto-resize del textarea**: Se adapta al contenido
- **Scroll automático**: Siempre muestra el mensaje más reciente
- **Validación de entrada**: Deshabilita envío si no hay texto
- **Feedback visual**: Loading states y transiciones suaves
- **Keyboard shortcuts**: Enter para enviar, Shift+Enter para nueva línea

## 🗂️ Estructura de Archivos

```
static/
├── index.html          # Estructura HTML principal
├── css/
│   └── styles.css      # Estilos CSS completos
└── js/
    └── app.js          # Lógica de la aplicación

api_server.py           # Servidor backend API
MEDEX_FINAL.py         # Sistema core de MedeX
```

## 🚀 Cómo Usar

### Opción 1: Hugging Face Spaces (Recomendado)

Ver [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) para instrucciones completas.

### Opción 2: Local

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Configurar API key
export MOONSHOT_API_KEY="tu-api-key-aqui"

# 3. Ejecutar servidor
python api_server.py

# 4. Abrir en navegador
# http://localhost:7860
```

O usar el script de inicio rápido:

```bash
./start_server.sh
```

## 🎨 Personalización

### Colores

Los colores principales se definen en `static/css/styles.css`:

```css
:root {
    --primary-color: #2D7D6E;    /* Verde médico principal */
    --primary-dark: #1F5C51;     /* Verde oscuro */
    --primary-light: #3A9985;    /* Verde claro */
    --accent-color: #FF6B6B;     /* Rojo de acento */
    /* ... más variables */
}
```

### Fuentes

La interfaz usa:
- **Inter**: Para texto general (sans-serif moderna)
- **JetBrains Mono**: Para código y monoespaciado

Estas se cargan desde Google Fonts automáticamente.

### Logo

El logo SVG está definido directamente en el HTML. Para cambiarlo:

1. Abre `static/index.html`
2. Busca el elemento `<svg>` en el `.logo`
3. Reemplaza con tu propio SVG

## 📱 Responsive Design

La interfaz se adapta a diferentes tamaños de pantalla:

- **Desktop** (>768px): Layout completo con todas las características
- **Tablet** (768px): Layout ajustado, columnas adaptativas
- **Mobile** (<480px): Layout vertical optimizado para móviles

## 🔧 API Endpoints

### POST `/api/chat`

Procesa consultas médicas.

**Request:**
```json
{
  "query": "Texto de la consulta",
  "history": []
}
```

**Response:**
```json
{
  "response": "Respuesta de MedeX",
  "userType": "professional|patient",
  "confidence": 0.95,
  "isEmergency": false,
  "timestamp": "2024-01-01T12:00:00"
}
```

### GET `/api/health`

Health check del servidor.

**Response:**
```json
{
  "status": "healthy",
  "service": "MedeX Web API",
  "version": "v25.83",
  "timestamp": "2024-01-01T12:00:00"
}
```

### GET `/api/stats`

Estadísticas de sesión.

**Response:**
```json
{
  "queries": 10,
  "emergencies": 1,
  "professional_queries": 5,
  "educational_queries": 5
}
```

## 🎯 Ejemplos de Consulta

La interfaz incluye 4 ejemplos predefinidos:

1. **Profesional**: Caso clínico estructurado
2. **Paciente**: Consulta de síntomas
3. **Medicamento**: Información farmacológica
4. **Educativo**: Consulta académica

Click en cualquier ejemplo para auto-completar el input.

## 🔐 Seguridad

- **API Key**: Nunca expuesta al cliente, solo en el backend
- **CORS**: Configurado para desarrollo, ajustar en producción
- **Input Sanitization**: Escape de HTML para prevenir XSS
- **Rate Limiting**: Considerar implementar en producción

## 🐛 Debugging

### Ver logs del servidor

```bash
# Logs en consola al ejecutar
python api_server.py
```

### Ver logs del cliente

Abre las DevTools del navegador (F12) y ve a la pestaña Console.

### Problemas comunes

**La UI no carga:**
- Verifica que `api_server.py` esté corriendo
- Revisa la consola del navegador para errores
- Asegúrate de que los archivos estáticos existan

**No responde a consultas:**
- Verifica que la API key esté configurada
- Revisa los logs del servidor
- Verifica la conexión a Internet

**Estilo roto:**
- Asegúrate de que `static/css/styles.css` exista
- Limpia la caché del navegador (Ctrl+Shift+R)

## 📊 Performance

### Optimizaciones implementadas

- **CSS**: Un solo archivo minificable
- **JavaScript**: Vanilla JS sin dependencias pesadas
- **Fonts**: Preconnect a Google Fonts
- **Images**: Logo en SVG (escalable sin pérdida)
- **Lazy Loading**: Historial carga solo mensajes visibles

### Métricas esperadas

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 90+ en todas las categorías

## 🔄 Actualizaciones Futuras

Posibles mejoras:

- [ ] Modo oscuro
- [ ] Exportar conversación (PDF/Markdown)
- [ ] Historial persistente (localStorage)
- [ ] Multi-lenguaje (i18n)
- [ ] Síntesis de voz
- [ ] Upload de imágenes médicas
- [ ] Integración con APIs de laboratorio

## 📚 Recursos

- [Documentación de MedeX](../README.md)
- [Guía de Deployment](DEPLOYMENT_GUIDE.md)
- [Configuración de Secrets](SECRET_CONFIG.md)
- [Hugging Face Spaces Docs](https://huggingface.co/docs/hub/spaces)

## 🤝 Contribuir

Para contribuir a la interfaz web:

1. Haz cambios en `static/`
2. Prueba localmente
3. Verifica responsive design
4. Crea un pull request

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE)

---

**Desarrollado con ❤️ para mejorar el acceso a información médica de calidad**
