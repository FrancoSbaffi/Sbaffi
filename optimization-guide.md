# 🚀 Guía de Optimización - Carpeta Work (12MB → ~3MB)

## 📊 **Análisis actual:**
- **Total**: ~12MB
- **Videos pesados**: gooey.mp4 (3.21MB), stripes.mp4 (1.83MB), peach.mp4 (1.81MB)
- **Objetivo**: Reducir a ~3MB (75% de ahorro)

## 🎯 **Opciones de optimización:**

### **Opción 1: Herramientas Online (Recomendado para empezar)**

#### **Videos:**
1. **CloudConvert** (https://cloudconvert.com/mp4-converter)
   - Sube los videos pesados
   - Convierte a MP4 con calidad "Good" o "Medium"
   - Esperado: 60-80% de ahorro

2. **FFmpeg Online** (https://ffmpeg-online.com/)
   - Sube video
   - Usa: `-crf 24 -preset slow`
   - Descarga optimizado

#### **Imágenes:**
1. **Squoosh** (https://squoosh.app/)
   - Sube JPG
   - Convierte a WebP
   - Calidad: 85%
   - Esperado: 40-60% de ahorro

### **Opción 2: Software Local**

#### **Instalar FFmpeg:**
```powershell
# Con Chocolatey
choco install ffmpeg

# O descargar de: https://ffmpeg.org/download.html
```

#### **Ejecutar optimización:**
```powershell
# Optimizar videos
.\optimize-videos.ps1

# Optimizar imágenes  
.\optimize-images.ps1
```

### **Opción 3: Optimización manual paso a paso**

#### **Videos críticos a optimizar:**
1. **gooey.mp4** (3.21MB → ~800KB)
2. **stripes.mp4** (1.83MB → ~450KB)  
3. **peach.mp4** (1.81MB → ~450KB)
4. **buttons1.mp4** (1.11MB → ~300KB)

#### **Configuración recomendada:**
- **CRF**: 24 (calidad media-alta)
- **Preset**: slow (mejor compresión)
- **Formato**: MP4 con H.264

## 📈 **Resultados esperados:**

### **Antes:**
- gooey.mp4: 3.21MB
- stripes.mp4: 1.83MB
- peach.mp4: 1.81MB
- buttons1.mp4: 1.11MB
- **Total videos**: ~8MB

### **Después (optimizado):**
- gooey.mp4: ~800KB
- stripes.mp4: ~450KB
- peach.mp4: ~450KB
- buttons1.mp4: ~300KB
- **Total videos**: ~2MB

### **Ahorro total esperado:**
- **Videos**: 8MB → 2MB (75% ahorro)
- **Imágenes**: 0.16MB → 0.08MB (50% ahorro)
- **Total**: 12MB → ~3MB (75% ahorro)

## 🔧 **Actualización del código después de optimizar:**

Una vez optimizados los archivos, actualizar las rutas en `Work.jsx`:

```jsx
// Cambiar de:
videoUrl="/work/gooey.mp4"

// A:
videoUrl="/work/optimized/gooey.mp4"
```

## ⚡ **Optimizaciones adicionales:**

### **Lazy Loading (ya implementado):**
- Videos se cargan solo cuando son visibles
- Reduce carga inicial

### **Formatos modernos:**
- WebP para imágenes
- MP4 optimizado para videos

### **CDN (opcional):**
- Subir a Cloudinary o similar
- URLs optimizadas automáticamente

## 🎯 **Próximos pasos:**

1. **Elegir opción de optimización**
2. **Optimizar archivos pesados**
3. **Actualizar rutas en el código**
4. **Probar rendimiento**
5. **Implementar CDN si es necesario**

¿Cuál opción prefieres para empezar? 