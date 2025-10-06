---
title: MedeX - Sistema Avanzado de IA Médica
emoji: 🏥
colorFrom: purple
colorTo: blue
sdk: static
pinned: false
license: mit
---

# 🏥 MedeX v25.83 - Sistema Avanzado de IA Médica

![MedeX Banner](https://github.com/DeepRatAI/MedeX/raw/main/banner.png)

> **Sistema de Inteligencia Artificial Médica con detección inteligente de usuarios, protocolos de emergencia y base de conocimiento médico integral**

## 🎯 ¿Qué es MedeX?

MedeX v25.83 es un asistente de IA médica avanzado que combina:

- **🧠 Detección Inteligente**: Identifica automáticamente si eres un profesional de la salud o un paciente
- **⚡ Respuestas Adaptadas**: Ajusta el nivel de detalle y terminología según tu perfil
- **🚨 Protocolos de Emergencia**: Reconoce situaciones críticas y proporciona guías inmediatas
- **📚 Base de Conocimiento**: Información médica verificada con códigos ICD-10
- **💊 Información Farmacológica**: Datos sobre medicamentos, dosis e interacciones

## ✨ Características Principales

### Para Profesionales de la Salud
- Análisis de casos clínicos estructurados
- Protocolos de tratamiento basados en evidencia
- Diagnósticos diferenciales
- Información farmacológica detallada
- Referencias de guías clínicas

### Para Pacientes
- Explicaciones en lenguaje claro y comprensible
- Orientación sobre cuándo buscar atención médica
- Información educativa sobre condiciones comunes
- Recomendaciones de prevención y cuidado

### Características Técnicas
- **IA**: Powered by Kimi K2-0711-Preview
- **Interfaz**: HTML5 + CSS3 + JavaScript moderno
- **Backend**: Python + Flask
- **Diseño**: Responsivo y accesible
- **Performance**: Respuestas en tiempo real

## 🚀 Cómo Usar

1. **Inicia una consulta**: Haz clic en "Nueva Consulta" o selecciona un ejemplo
2. **Escribe tu pregunta**: Describe tu consulta médica de forma natural
3. **Recibe respuesta personalizada**: MedeX detectará automáticamente tu perfil y adaptará la respuesta

### Ejemplos de Consultas

**👨‍⚕️ Profesional:**
```
Paciente masculino 65 años, diabético, presenta dolor precordial opresivo de 2 horas de evolución
```

**👤 Paciente:**
```
Me duele el pecho y estoy preocupado, ¿es grave?
```

**🎓 Educativa:**
```
¿Qué es la diabetes tipo 2 y cuáles son sus complicaciones?
```

## ⚙️ Configuración (Para Deployment)

### Secrets Requeridos en HF Spaces

Configure el siguiente secret en su Hugging Face Space:

- **`KIMI_API_KEY`**: Su API key de Moonshot AI (Kimi)
  - Obtenga su API key en: https://platform.moonshot.ai/

### Pasos para Configurar

1. Vaya a Settings de su Space
2. En la sección "Repository secrets", agregue:
   - Name: `KIMI_API_KEY`
   - Value: [Su API Key de Moonshot]
3. Guarde y reinicie el Space

## ⚠️ Disclaimer Médico Importante

**Este sistema es una herramienta de apoyo educativo y NO reemplaza la evaluación médica profesional.**

- ✅ Use para: Información educativa, orientación general, apoyo a decisiones clínicas
- ❌ NO use para: Diagnósticos definitivos, tratamientos sin supervisión, emergencias reales

**En caso de emergencia médica real, llame al 911 o acuda al servicio de urgencias más cercano inmediatamente.**

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python 3.8+, Flask
- **IA**: Kimi K2-0711-Preview (Moonshot AI)
- **Base de Conocimiento**: ICD-10, Protocolos clínicos, Base farmacológica
- **Deployment**: Hugging Face Spaces (Static SDK)

## 📊 Capacidades del Sistema

- ✅ Detección automática de tipo de usuario
- ✅ Reconocimiento de emergencias médicas
- ✅ Búsqueda en base de conocimiento médico
- ✅ Información farmacológica integrada
- ✅ Protocolos clínicos actualizados
- ✅ Respuestas en tiempo real
- ✅ Interfaz moderna y accesible

## 🔒 Seguridad y Privacidad

- No se almacenan datos personales de salud
- Las conversaciones no son persistentes
- No se comparten datos con terceros
- Cumple con mejores prácticas de seguridad web

## 📖 Documentación Completa

Para documentación técnica completa, visite:
- GitHub: https://github.com/DeepRatAI/MedeX
- README: https://github.com/DeepRatAI/MedeX/blob/main/README.md

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Visite el repositorio en GitHub para más información.

## 📄 Licencia

MIT License - Ver LICENSE para más detalles

---

**Desarrollado con ❤️ para mejorar el acceso a información médica de calidad**

*MedeX v25.83 - Sistema Avanzado de IA Médica*
