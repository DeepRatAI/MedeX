# ✅ Checklist de Despliegue MedeX en HF Spaces

Sigue esta lista paso a paso para desplegar MedeX sin problemas.

## 📋 Antes de Comenzar

### Pre-requisitos
- [ ] Cuenta creada en [Hugging Face](https://huggingface.co/)
- [ ] Cuenta creada en [Moonshot AI](https://platform.moonshot.ai/)
- [ ] API key de Moonshot generada y guardada
- [ ] Repositorio MedeX descargado/clonado

---

## 🚀 Paso 1: Crear Space en HF

- [ ] Ir a https://huggingface.co/new-space
- [ ] Configurar nombre del Space (ej: `medex`)
- [ ] **IMPORTANTE**: Seleccionar SDK → **Static** ⚠️
- [ ] Seleccionar License → MIT
- [ ] Seleccionar Hardware → CPU basic (gratis)
- [ ] Click en "Create Space"

**Resultado**: Space creado vacío

---

## 📤 Paso 2: Subir Archivos

### Archivos Principales (OBLIGATORIOS)
- [ ] `index.html` - Interfaz principal
- [ ] `styles.css` - Estilos
- [ ] `script.js` - Lógica frontend
- [ ] `app.py` - Backend API
- [ ] `MEDEX_FINAL.py` - Sistema MedeX core
- [ ] `requirements.txt` - Dependencias
- [ ] `banner.png` - Logo/imagen

### Archivos de Conocimiento Médico (OBLIGATORIOS)
- [ ] `medical_knowledge_base.py`
- [ ] `pharmaceutical_database.py`
- [ ] `medical_rag_system.py`

### Archivos Opcionales (recomendados)
- [ ] `README_SPACES.md` → Renombrar a `README.md`
- [ ] Otros archivos `.py` del core si los hay

### ⚠️ NO Subir
- [ ] ❌ `api_key.txt` - Esto va en secrets
- [ ] ❌ `rag_cache/` - Se genera automáticamente
- [ ] ❌ `__pycache__/` - Archivos temporales
- [ ] ❌ `.git/` - No es necesario

**Resultado**: Archivos subidos al Space

---

## 🔐 Paso 3: Configurar Secret

- [ ] Click en "Settings" ⚙️ en tu Space
- [ ] Buscar sección "Repository secrets"
- [ ] Click en "New secret"
- [ ] Configurar:
  - **Name**: `MOONSHOT_API_KEY` (exactamente así)
  - **Value**: [Pegar tu API key aquí]
  - **Public**: ❌ NO marcar (mantener privado)
- [ ] Click en "Add secret"
- [ ] Verificar que aparece en la lista de secrets

**Resultado**: Secret configurado correctamente

---

## ⏳ Paso 4: Esperar Build

- [ ] El Space empezará a construirse automáticamente
- [ ] Esperar 2-3 minutos mientras instala dependencias
- [ ] Ver logs para confirmar que no hay errores
- [ ] Buscar mensaje: `✅ MedeX API ready`

**Resultado**: Space construido y corriendo

---

## ✅ Paso 5: Verificar Funcionamiento

### Verificación Visual
- [ ] Abrir tu Space: `https://huggingface.co/spaces/TU_USUARIO/medex`
- [ ] Ver pantalla de bienvenida de MedeX
- [ ] Indicador de estado muestra "Conectado" (punto verde)
- [ ] Botón "Iniciar Consulta" es clickeable

### Verificación Funcional
- [ ] Click en "Iniciar Consulta"
- [ ] Ver interfaz de chat
- [ ] Escribir mensaje de prueba: "¿Qué son los AINEs?"
- [ ] Click en enviar
- [ ] Recibir respuesta de MedeX

### Verificación API (opcional)
- [ ] Abrir en nueva pestaña: `https://TU_USUARIO-medex.hf.space/health`
- [ ] Ver JSON con: `"medex_available": true`
- [ ] Ver: `"version": "25.83"`

**Resultado**: MedeX funcionando correctamente

---

## 🐛 Troubleshooting

### Si el indicador muestra "Modo Demo"
- [ ] Revisar que el secret se llama exactamente `MOONSHOT_API_KEY`
- [ ] Verificar que la API key es correcta
- [ ] Reiniciar Space: Settings → Factory reboot

### Si hay error 503
- [ ] Ver logs del Space
- [ ] Verificar que todos los archivos están subidos
- [ ] Confirmar que el secret está configurado
- [ ] Validar API key en platform.moonshot.ai

### Si la UI no carga
- [ ] Verificar que SDK es "Static"
- [ ] Confirmar que `index.html` está en la raíz
- [ ] Ver logs para errores específicos
- [ ] Limpiar caché del navegador

**Solución**: Si persisten problemas, ver [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎉 Paso 6: Compartir

Una vez que todo funciona:

- [ ] Copiar URL de tu Space
- [ ] Compartir con colegas/estudiantes
- [ ] Opcionalmente: Hacer el Space público en Settings
- [ ] Agregar descripción y tags si deseas

**URL de tu MedeX**:
```
https://huggingface.co/spaces/TU_USUARIO/medex
```

---

## 📊 Resumen de Estados

### ✅ Configuración Correcta
```
✓ SDK: Static
✓ Secret: MOONSHOT_API_KEY configurado
✓ Archivos: Todos subidos
✓ Build: Exitoso
✓ API: Respondiendo
✓ UI: Funcional
```

### ⚠️ Necesita Atención
```
⚠ SDK: No es Static
⚠ Secret: No configurado o nombre incorrecto
⚠ Archivos: Faltan archivos core
⚠ Build: Con errores
⚠ API: No disponible
⚠ UI: Errores en consola
```

---

## 📚 Documentación de Referencia

Si necesitas más ayuda:

- [ ] [QUICKSTART.md](QUICKSTART.md) - Guía rápida
- [ ] [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Guía detallada
- [ ] [SECRET_CONFIG.md](SECRET_CONFIG.md) - Configuración de API key
- [ ] [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Resumen técnico

---

## 🎯 Tiempo Estimado

- Crear Space: **1 minuto**
- Subir archivos: **2 minutos**
- Configurar secret: **1 minuto**
- Build de HF: **2-3 minutos**
- Verificar: **1 minuto**

**Total**: ~7-8 minutos

---

## ✉️ ¿Necesitas Ayuda?

Si algo no funciona:

1. Revisar logs del Space
2. Consultar sección Troubleshooting arriba
3. Ver [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
4. Abrir issue en GitHub

---

## 🏆 ¡Felicitaciones!

Si completaste todos los checks ✅, ¡tu MedeX está en línea!

**Disfruta tu asistente médico de IA** 🏥

---

*MedeX v25.83 - Checklist de Despliegue*
*Última actualización: 2024*
