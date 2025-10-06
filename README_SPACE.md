---
title: MedeX v25.83
emoji: 🏥
colorFrom: blue
colorTo: purple
sdk: static
pinned: false
license: mit
---

# 🏥 MedeX v25.83 - Sistema Médico de IA

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Medical AI](https://img.shields.io/badge/Medical-AI-red.svg)](https://github.com/DeepRatAI/MedeX)

**Sistema Médico de Inteligencia Artificial con Detección Automática**

[GitHub Repository](https://github.com/DeepRatAI/MedeX) • [Documentación](https://github.com/DeepRatAI/MedeX/tree/main/docs)

</div>

---

## 🎯 Descripción

MedeX v25.83 es un sistema avanzado de inteligencia artificial médica que utiliza **Kimi K2-0711-Preview** con capacidades de RAG (Retrieval-Augmented Generation) para proporcionar asistencia médica inteligente.

### ✨ Características Principales

- **🧠 Detección Automática**: Distingue entre consultas profesionales y educativas automáticamente
- **🚨 Protocolo de Emergencias**: Reconocimiento inmediato de situaciones médicas urgentes
- **📚 Base RAG Médica**: Conocimiento médico actualizado con referencias científicas
- **⚡ Respuestas en Tiempo Real**: Procesamiento rápido y preciso de consultas
- **🎓 Modo Dual**: Adapta el nivel de respuesta según el tipo de usuario

---

## 🚀 Configuración en Hugging Face Spaces

### Secretos Requeridos

Para que MedeX funcione en Hugging Face Spaces, necesitas configurar el siguiente secreto:

#### `MOONSHOT_API_KEY`

Tu API key de Moonshot AI (Kimi) debe ser configurada como un secreto en Hugging Face Spaces:

1. Ve a **Settings** de tu Space
2. En la sección **Repository secrets**, haz clic en **New secret**
3. Nombre del secreto: `MOONSHOT_API_KEY`
4. Valor: Tu API key de [Moonshot AI](https://platform.moonshot.ai/)
5. Haz clic en **Save**

> 🔑 **Obtén tu API key**: Visita [platform.moonshot.ai](https://platform.moonshot.ai/), crea una cuenta y genera tu API key en la sección de configuración.

### Despliegue Automático

Una vez configurado el secreto `MOONSHOT_API_KEY`, el Space se iniciará automáticamente y estará listo para usar.

---

## 📖 Cómo Usar

### Consultas Profesionales

MedeX detecta automáticamente consultas profesionales basándose en:

- Presentación de casos clínicos estructurados
- Uso de terminología médica específica
- Parámetros vitales y laboratorios
- Formato tipo vigneta clínica

**Ejemplo:**
```
Paciente masculino de 45 años con dolor torácico opresivo de 2 horas 
de evolución, irradiado a brazo izquierdo y mandíbula. Diaforesis presente. 
TA: 150/95 mmHg, FC: 110 lpm.
```

### Consultas Educativas

Para consultas informativas y educativas, simplemente haz preguntas generales:

**Ejemplos:**
- "¿Qué son los antiinflamatorios no esteroideos (AINEs)?"
- "¿Cuáles son los criterios diagnósticos de diabetes mellitus?"
- "Explica el mecanismo de acción de la insulina"

### Emergencias Médicas

El sistema detecta automáticamente situaciones de emergencia y proporciona protocolos apropiados:

- Dolor torácico severo
- Dificultad respiratoria grave
- Pérdida de conciencia
- Hemorragias importantes
- Otros signos de alarma

---

## ⚠️ Disclaimer Importante

**MedeX es una herramienta de apoyo médico y educativo.**

- ❌ **NO reemplaza** la valoración médica presencial
- ❌ **NO sustituye** el juicio clínico profesional
- ❌ **NO debe usarse** para emergencias reales (llama al 911/112)
- ✅ **SÍ es útil** para consultas educativas y apoyo informativo
- ✅ **SÍ proporciona** referencias científicas actualizadas

> 🏥 **Siempre consulta con profesionales de la salud** para decisiones médicas importantes.

---

## 🛠️ Tecnología

### Motor de IA
- **Modelo**: Kimi K2-0711-Preview (Moonshot AI)
- **RAG**: Sistema de recuperación aumentada sobre base médica curada
- **Detección**: PLN avanzado para clasificación de consultas

### Frontend
- **HTML5** + **CSS3** moderno
- **JavaScript** vanilla (sin frameworks pesados)
- **Diseño Responsive** optimizado para móviles y desktop
- **UI/UX médica** profesional y accesible

### Backend
- **FastAPI** para API REST
- **Python 3.8+** con asyncio
- **Integración** directa con MedeX v25.83

---

## 📊 Capacidades del Sistema

| Característica | Descripción |
|----------------|-------------|
| **Detección de Usuario** | Automática: Profesional ↔ Educativo |
| **Emergencias** | Reconocimiento y protocolos inmediatos |
| **RAG Médico** | Base de conocimiento actualizada |
| **Conversacional** | Memoria de contexto en sesiones |
| **Multimodal** | Texto + Análisis de imágenes médicas* |
| **Streaming** | Respuestas progresivas en tiempo real |

*Análisis de imágenes: RX, TAC, RM, US

---

## 📚 Documentación Completa

Para más información sobre MedeX:

- **[GitHub Repository](https://github.com/DeepRatAI/MedeX)**: Código fuente completo
- **[Guía de Usuario](https://github.com/DeepRatAI/MedeX/blob/main/docs/guia_de_usuario.md)**: Manual detallado
- **[User Guide (English)](https://github.com/DeepRatAI/MedeX/blob/main/docs/user_guide.md)**: English documentation

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](https://github.com/DeepRatAI/MedeX/blob/main/LICENSE) para detalles.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📬 Contacto y Soporte

- **Proyecto**: MedeX Medical AI System
- **Versión**: v25.83 Production
- **Repositorio**: [github.com/DeepRatAI/MedeX](https://github.com/DeepRatAI/MedeX)
- **Issues**: [github.com/DeepRatAI/MedeX/issues](https://github.com/DeepRatAI/MedeX/issues)

---

<div align="center">

**🤖 Desarrollado con IA responsable para el futuro de la medicina digital**

Made with ❤️ by the MedeX Team

</div>
