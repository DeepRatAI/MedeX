# 🖼️ MedeX Web Interface - Visual Overview

## Interface Principal

### Header
```
┌────────────────────────────────────────────────────────────────────────┐
│  🏥 MedeX v25.83          [Limpiar Chat]  [Estadísticas]              │
└────────────────────────────────────────────────────────────────────────┘
```

### Banner de Bienvenida

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║    🏥  Bienvenido a MedeX                                           ║
║        Sistema de Inteligencia Artificial Médica Profesional        ║
║                                                                      ║
║    ┌──────────────────────────────────────────────────────────┐   ║
║    │  ✅ Motor de IA Médica                                    │   ║
║    │  ✅ Detección de Usuario                                  │   ║
║    │  ✅ Protocolos de Emergencia                              │   ║
║    └──────────────────────────────────────────────────────────┘   ║
║                                                                      ║
║    🧠 Kimi K2  📚 RAG  🔍 Detección  🚨 Emergencias                ║
║                                                                      ║
║    Ejemplos de Consultas:                                           ║
║    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           ║
║    │👨‍⚕️ Profesional│  │👤 Paciente   │  │💊 Medicamento│           ║
║    │ Caso clínico │  │ Consulta     │  │ Info farmaco │           ║
║    └──────────────┘  └──────────────┘  └──────────────┘           ║
║                                                                      ║
║    ⚠️ Disclaimer Médico: Información educativa únicamente          ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Chat Interface

```
╔══════════════════════════════════════════════════════════════════════╗
║                       CONVERSACIÓN                                   ║
║                                                                      ║
║  Usuario:                                                           ║
║  ┌──────────────────────────────────────────────────────────┐      ║
║  │ Paciente 65 años, diabético, dolor precordial 2h        │      ║
║  └──────────────────────────────────────────────────────────┘      ║
║                                                                      ║
║  🏥 MedeX:                                                          ║
║  ┌──────────────────────────────────────────────────────────┐      ║
║  │ [👨‍⚕️ Profesional] [🚨 EMERGENCIA] [📊 95% confianza]     │      ║
║  │                                                           │      ║
║  │ 🔍 ANÁLISIS INTELIGENTE DE CONSULTA:                     │      ║
║  │ • Usuario detectado: PROFESIONAL                         │      ║
║  │ • Nivel urgencia: EMERGENCIA                             │      ║
║  │                                                           │      ║
║  │ 📋 RESPUESTA MÉDICA:                                     │      ║
║  │ Sospecha de síndrome coronario agudo...                  │      ║
║  └──────────────────────────────────────────────────────────┘      ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Input Area

```
╔══════════════════════════════════════════════════════════════════════╗
║  ┌────────────────────────────────────────────────────────┐  [📤]  ║
║  │ Escribe tu consulta médica aquí...                     │         ║
║  └────────────────────────────────────────────────────────┘         ║
║  💡 Tip: Describe tu consulta con detalles para mejor respuesta    ║
╚══════════════════════════════════════════════════════════════════════╝
```

## Color Palette

### Colores Principales
```
Primary:      #2D7D6E  ████  (Verde médico)
Primary Dark: #1F5C51  ████  (Verde oscuro)
Primary Light:#3A9985  ████  (Verde claro)
Accent:       #FF6B6B  ████  (Rojo alerta)
Success:      #51CF66  ████  (Verde éxito)
Warning:      #FFA94D  ████  (Naranja advertencia)
Emergency:    #E03131  ████  (Rojo emergencia)
```

### Backgrounds
```
Primary:      #FFFFFF  ████  (Blanco)
Secondary:    #F8F9FA  ████  (Gris muy claro)
Tertiary:     #E9ECEF  ████  (Gris claro)
Dark:         #1A1A1A  ████  (Negro)
```

## Typography

- **Familia principal**: Inter (sans-serif moderna)
- **Familia monoespaciada**: JetBrains Mono
- **Tamaños**:
  - H1: 1.5rem (24px)
  - H2: 2rem (32px) en banner
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

## Components

### Badges

```
┌─────────────────┐
│ 👨‍⚕️ Profesional  │  (Azul claro)
└─────────────────┘

┌───────────┐
│ 👤 Paciente│  (Púrpura claro)
└───────────┘

┌─────────────┐
│ 🚨 EMERGENCIA│  (Rojo, pulsante)
└─────────────┘

┌────────────────┐
│ 📊 95% confianza│  (Gris)
└────────────────┘
```

### Buttons

```
┌──────────────────┐
│  Limpiar Chat    │  (Outline, hover: fill)
└──────────────────┘

┌──────────────────┐
│  Estadísticas    │  (Outline, hover: fill)
└──────────────────┘

┌───┐
│ 📤 │  (Primary solid, hover: dark + shadow)
└───┘
```

### Status Indicators

```
● ✅  (Verde con pulso - Activo)
● ⚪  (Gris - Inactivo)
```

## Modal - Estadísticas

```
╔════════════════════════════════════════════╗
║  📊 Estadísticas de Sesión            [✕] ║
╠════════════════════════════════════════════╣
║                                            ║
║  ⏱️  Duración de sesión        0h 15m     ║
║  💬  Total de consultas              12   ║
║  👨‍⚕️  Consultas profesionales        7    ║
║  👤  Consultas de pacientes          5    ║
║  🚨  Emergencias detectadas          2    ║
║                                            ║
╚════════════════════════════════════════════╝
```

## Animations

### Loading Indicator
```
  ┌─────┐
  │  ⟳  │  (Spinner giratorio)
  │     │
  │ Procesando con IA médica...
  └─────┘
```

### Typing Indicator
```
Analizando con IA médica ● ● ●
                        (Puntos animados)
```

### Message Animations
- **Entrada**: fadeInUp (0.3s)
- **Hover en ejemplos**: translateY(-2px) con shadow
- **Botones**: translateY(-1px) en hover

## Responsive Breakpoints

### Desktop (>768px)
- Layout completo
- Mensajes hasta 85% ancho
- Grid de 4 columnas para ejemplos

### Tablet (768px)
- Layout ajustado
- Mensajes hasta 90% ancho
- Grid adaptativo para ejemplos

### Mobile (<480px)
- Layout vertical
- Mensajes 90% ancho
- Grid de 1 columna
- Header vertical

## Icons

Se usan emojis nativos para:
- 🏥 Logo/Salud
- 👨‍⚕️ Profesional
- 👤 Paciente
- 💊 Medicamento
- 🔬 Educativo
- 🚨 Emergencia
- 📊 Estadísticas
- 🧠 IA
- 📚 Conocimiento
- 🔍 Detección

Y SVG para botones de UI (enviar, cerrar, etc.)

## User Flow

```
┌─────────────┐
│  Llegada    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Banner Bienvenida│ ◄─── Ejemplos clicables
└──────┬───────────┘
       │
       ▼
┌─────────────────┐
│  Escribir query │
└──────┬───────────┘
       │
       ▼
┌─────────────────┐
│   Enviar [📤]   │
└──────┬───────────┘
       │
       ▼
┌─────────────────┐
│ Typing indicator│ ◄─── Animación
└──────┬───────────┘
       │
       ▼
┌─────────────────┐
│  Respuesta con  │ ◄─── Badges + Formato
│     metadata    │
└──────┬───────────┘
       │
       ▼
┌─────────────────┐
│ Nueva consulta  │
│  o ver stats    │
└─────────────────┘
```

## Features Destacadas

1. **Auto-resize textarea**: Crece con el contenido hasta 200px
2. **Scroll automático**: Siempre muestra último mensaje
3. **Detección en tiempo real**: Muestra tipo de usuario detectado
4. **Alertas de emergencia**: Badge rojo pulsante para emergencias
5. **Ejemplos interactivos**: Click para llenar el input
6. **Historial persistente**: En memoria durante la sesión
7. **Estadísticas en vivo**: Modal con métricas de uso
8. **Validación de input**: Botón deshabilitado si no hay texto
9. **Keyboard shortcuts**: Enter (enviar), Shift+Enter (nueva línea)
10. **Feedback visual**: Loading overlay durante procesamiento

---

**Diseño profesional y moderno optimizado para aplicaciones médicas** ✨
