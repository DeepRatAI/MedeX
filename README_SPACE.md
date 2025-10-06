---
title: MedeX - Sistema Avanzado de IA Médica
emoji: 🏥
colorFrom: green
colorTo: blue
sdk: static
pinned: false
license: mit
---

# 🏥 MedeX v25.83 - Sistema Avanzado de IA Médica

Sistema de Inteligencia Artificial Médica con detección automática de usuarios, protocolos de emergencia y base de conocimiento médico integral.

## ✨ Características

- 🧠 **Motor de IA Médica**: Kimi K2-0711-Preview
- 📚 **RAG Integrado**: Base de conocimientos médicos curada
- 🔍 **Detección Automática**: Distingue entre profesionales y pacientes
- 🚨 **Protocolos de Emergencia**: Identificación automática de emergencias médicas
- 💬 **Interfaz Moderna**: UI de alta calidad para aplicaciones médicas

## 🚀 Configuración en Hugging Face Spaces

### Requisitos

Este Space requiere una API key de Moonshot AI para funcionar.

### Pasos de Configuración

1. **Clonar este Space** o crear uno nuevo con SDK "static"

2. **Configurar el Secret**:
   - Ve a Settings → Variables and secrets
   - Añade un nuevo secret:
     - Nombre: `MOONSHOT_API_KEY`
     - Valor: Tu API key de Moonshot AI

3. **Reiniciar el Space** para que los cambios tomen efecto

### Obtener API Key de Moonshot

1. Regístrate en [Moonshot AI Platform](https://platform.moonshot.ai/)
2. Ve a la sección de API Keys
3. Crea una nueva API key
4. Copia y pégala en el secret de HF Spaces

## 📋 Uso

Una vez configurado:

1. Abre el Space
2. Verás la interfaz web de MedeX
3. Escribe tu consulta médica
4. El sistema detectará automáticamente si eres profesional o paciente
5. Recibirás una respuesta adaptada a tu perfil

### Ejemplos de Consultas

**Profesional:**
```
Paciente masculino 65 años, diabético tipo 2, presenta dolor precordial opresivo de 2 horas de evolución
```

**Paciente:**
```
Me duele el pecho desde hace 1 hora y estoy preocupado, ¿qué debo hacer?
```

**Educativo:**
```
¿Qué es la diabetes tipo 2 y cuáles son sus criterios diagnósticos?
```

## ⚠️ Disclaimer Médico

MedeX proporciona información médica educativa y de apoyo únicamente. **NO reemplaza la evaluación médica profesional presencial**. En caso de emergencia médica, llame inmediatamente al 911 o acuda al servicio de urgencias más cercano.

## 🔧 Tecnologías

- **IA**: Kimi K2-0711-Preview (Moonshot AI)
- **Backend**: Python 3.8+ con aiohttp
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **SDK**: Static (Hugging Face Spaces)

## 📝 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request en el [repositorio de GitHub](https://github.com/DeepRatAI/MedeX).

---

Desarrollado con ❤️ por el equipo de MedeX
