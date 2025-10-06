# 📖 Guía de Uso - MedeX v25.83 Web UI

## 🎯 Introducción

Esta guía explica cómo usar la interfaz web de MedeX v25.83, el sistema médico de IA con detección automática.

---

## 🖥️ Interfaz de Usuario

### Componentes Principales

La interfaz está dividida en tres secciones principales:

#### 1. **Barra Superior (Header)**
- Logo de MedeX
- Versión actual (v25.83)
- Información del motor de IA (Kimi K2-0711-Preview)
- Indicador de estado del sistema

#### 2. **Panel Lateral Izquierdo (Sidebar)**
- **Modos de Operación**: Muestra el modo actual (Detección Automática)
- **Estadísticas de Sesión**: Contador de consultas, profesionales, educativas y emergencias
- **Acciones**: Botones para limpiar historial y exportar conversación
- **Disclaimer**: Recordatorio importante sobre el uso responsable

#### 3. **Área Principal (Chat)**
- **Pantalla de Bienvenida**: Se muestra al inicio con ejemplos de consultas
- **Área de Mensajes**: Donde aparecen las conversaciones
- **Campo de Entrada**: Caja de texto para escribir consultas
- **Botón Enviar**: Para enviar la consulta

---

## 🚀 Cómo Realizar Consultas

### Consultas Profesionales

MedeX detecta automáticamente consultas profesionales basándose en:

- **Formato de caso clínico** (vigneta médica)
- **Datos demográficos**: "Paciente masculino de X años..."
- **Signos vitales**: TA, FC, FR, Temp, etc.
- **Evolución temporal**: "2 horas de evolución", "desde hace 3 días"
- **Terminología médica específica**

**Ejemplo de consulta profesional:**

```
Paciente masculino de 45 años con dolor torácico opresivo de 2 horas 
de evolución, irradiado a brazo izquierdo y mandíbula. Antecedente de 
HTA y dislipidemia. Diaforesis presente. 
TA: 150/95 mmHg, FC: 110 lpm, FR: 20 rpm, SatO2: 96%
```

**Respuesta esperada:**
- Formato clínico estructurado
- Diagnósticos diferenciales jerarquizados
- Plan diagnóstico y terapéutico
- Criterios de internación
- Referencias médicas (RAG)

### Consultas Educativas

Para preguntas informativas, educativas o de aprendizaje:

**Ejemplos de consultas educativas:**

```
¿Qué son los antiinflamatorios no esteroideos (AINEs)?
```

```
Explica el mecanismo de acción de la insulina
```

```
¿Cuáles son los criterios diagnósticos de diabetes mellitus tipo 2?
```

```
Lista los tipos de shock y sus características principales
```

**Respuesta esperada:**
- Estilo pedagógico universitario
- Definiciones académicas precisas
- Fisiopatología avanzada
- Epidemiología con datos
- Referencias científicas

### Consultas de Emergencia

El sistema detecta automáticamente situaciones de emergencia:

**Palabras clave de emergencia:**
- Dolor torácico severo
- Dificultad respiratoria grave
- Pérdida de conciencia
- Convulsiones
- Hemorragia masiva
- Dolor de cabeza explosivo

**Respuesta esperada:**
- Alerta de emergencia visible (🚨)
- Protocolos de actuación inmediata
- Indicaciones de derivación urgente
- Medidas de soporte vital

---

## 🎨 Características de la Interfaz

### Badges (Etiquetas)

Los mensajes de MedeX incluyen badges que indican el tipo de consulta:

- 🚨 **EMERGENCIA**: Situación médica urgente detectada
- 👨‍⚕️ **Profesional**: Consulta de tipo profesional/clínico
- 🎓 **Educativo**: Consulta de tipo educativa/informativa

### Estadísticas en Tiempo Real

El panel lateral muestra estadísticas actualizadas:

- **Consultas**: Total de consultas realizadas
- **Profesionales**: Número de consultas profesionales
- **Educativas**: Número de consultas educativas
- **Emergencias**: Situaciones de emergencia detectadas

### Ejemplos Interactivos

En la pantalla de bienvenida, haz clic en cualquier ejemplo para:
- Cargar automáticamente la consulta en el campo de texto
- Enviar la consulta inmediatamente

---

## 🛠️ Funciones Avanzadas

### Limpiar Historial

Para iniciar una nueva sesión:

1. Haz clic en **"🧹 Limpiar Historial"** en el panel lateral
2. Confirma la acción
3. El historial se borrará y volverás a la pantalla de bienvenida

⚠️ **Nota**: Esta acción no se puede deshacer. Exporta la conversación antes si deseas guardarla.

### Exportar Conversación

Para guardar una copia de tu conversación:

1. Haz clic en **"💾 Exportar Conversación"** en el panel lateral
2. Se descargará un archivo `.txt` con toda la conversación
3. El archivo incluye:
   - Fecha y hora de exportación
   - ID de conversación
   - Todos los mensajes con timestamps
   - Badges y clasificaciones

### Formato del Texto

Puedes usar formato básico en tus consultas:

- **Negrita**: `**texto**` → **texto**
- *Cursiva*: `*texto*` → *cursiva*
- Saltos de línea: Presiona Enter o Shift+Enter

---

## ⌨️ Atajos de Teclado

- **Enter**: Enviar mensaje
- **Shift + Enter**: Nueva línea sin enviar

---

## 📊 Interpretando las Respuestas

### Respuestas Profesionales

Las respuestas profesionales incluyen:

1. **Síntesis del Caso**
   - Datos demográficos
   - Motivo de consulta
   - Hallazgos relevantes

2. **Diagnósticos Diferenciales**
   - Jerarquizados por probabilidad
   - Con criterios de apoyo
   - Estudios confirmatorios

3. **Plan Diagnóstico**
   - Estudios de laboratorio
   - Imagenología
   - Procedimientos

4. **Plan Terapéutico**
   - Medidas farmacológicas (sugeridas)
   - Medidas no farmacológicas
   - Criterios de derivación

5. **Referencias RAG**
   - Guías clínicas
   - Consensos médicos
   - Literatura científica

### Respuestas Educativas

Las respuestas educativas incluyen:

1. **Marco Conceptual**
   - Definición académica
   - Clasificaciones
   - Epidemiología

2. **Fisiopatología**
   - Mecanismos moleculares
   - Cascadas bioquímicas
   - Bases genéticas

3. **Manifestaciones Clínicas**
   - Signos y síntomas
   - Fases de evolución
   - Complicaciones

4. **Enfoque Diagnóstico**
   - Criterios diagnósticos
   - Estudios auxiliares
   - Algoritmos

5. **Manejo Terapéutico**
   - Opciones farmacológicas
   - Medidas no farmacológicas
   - Seguimiento

---

## ⚠️ Limitaciones y Advertencias

### Limitaciones del Sistema

MedeX **NO**:
- ❌ Reemplaza la valoración médica presencial
- ❌ Sustituye el juicio clínico profesional
- ❌ Debe usarse para emergencias reales (llama al 911/112)
- ❌ Garantiza diagnósticos 100% precisos
- ❌ Prescribe tratamientos definitivos

MedeX **SÍ**:
- ✅ Proporciona información médica de calidad
- ✅ Apoya el proceso de aprendizaje médico
- ✅ Ofrece referencias científicas actualizadas
- ✅ Ayuda en el razonamiento clínico
- ✅ Facilita la búsqueda de información médica

### Uso Responsable

**Para Profesionales de la Salud:**
- Usa MedeX como herramienta de apoyo, no como única fuente
- Verifica siempre con guías clínicas locales
- Adapta las recomendaciones al contexto del paciente
- Considera las contraindicaciones y comorbilidades

**Para Estudiantes:**
- Usa MedeX como complemento al estudio formal
- Verifica la información con fuentes académicas oficiales
- Consulta con profesores ante dudas
- No uses MedeX para autodiagnóstico o automedicación

**Para Público General:**
- Usa MedeX solo con fines informativos
- Consulta siempre con profesionales de la salud
- No uses MedeX para emergencias médicas reales
- No automediques basándose en las respuestas

---

## 🐛 Resolución de Problemas

### El sistema no responde

**Posibles causas:**
- Conexión a internet interrumpida
- Servidor temporalmente no disponible
- Consulta demasiado larga

**Soluciones:**
- Verifica tu conexión a internet
- Espera unos minutos e intenta de nuevo
- Acorta la consulta si es muy extensa

### Error al conectar con el servidor

**Causas:**
- API key no configurada (en deployment)
- Servidor en mantenimiento

**Soluciones:**
- Si eres el administrador, verifica la configuración de secrets
- Intenta recargar la página
- Contacta al soporte técnico

### Las respuestas están cortadas

**Causa:**
- Límite de tokens alcanzado

**Solución:**
- Haz consultas más específicas
- Divide consultas complejas en varias simples

---

## 💡 Mejores Prácticas

### Para Consultas Profesionales

1. **Usa formato estructurado**: Similar a vignetas clínicas
2. **Incluye datos relevantes**: Signos vitales, antecedentes, tiempo de evolución
3. **Sé específico**: Describe síntomas con precisión
4. **Incluye contexto**: Edad, sexo, antecedentes patológicos

### Para Consultas Educativas

1. **Haz preguntas claras**: Define exactamente qué quieres aprender
2. **Usa términos médicos cuando sea apropiado**
3. **Pide ejemplos**: "Dame ejemplos de...", "Explica con un caso..."
4. **Solicita profundidad**: "Explica en detalle...", "A nivel molecular..."

### Organización

1. **Usa sesiones lógicas**: Limpia el historial entre temas diferentes
2. **Exporta conversaciones importantes**: Guarda las consultas valiosas
3. **Revisa las estadísticas**: Monitorea tu uso del sistema

---

## 📚 Recursos Adicionales

- **Documentación Completa**: [GitHub MedeX](https://github.com/DeepRatAI/MedeX)
- **Guía de Usuario Detallada**: [docs/guia_de_usuario.md](https://github.com/DeepRatAI/MedeX/blob/main/docs/guia_de_usuario.md)
- **User Guide (English)**: [docs/user_guide.md](https://github.com/DeepRatAI/MedeX/blob/main/docs/user_guide.md)

---

## 📞 Soporte

¿Tienes preguntas o problemas?

- **GitHub Issues**: [MedeX Issues](https://github.com/DeepRatAI/MedeX/issues)
- **Documentación**: [MedeX Docs](https://github.com/DeepRatAI/MedeX/tree/main/docs)

---

¡Disfruta usando MedeX v25.83! 🏥✨
