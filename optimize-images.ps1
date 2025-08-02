# Script de optimización de imágenes para la carpeta work
# Convierte JPG a WebP para mejor compresión

Write-Host "🖼️ Optimizando imágenes de la carpeta work..." -ForegroundColor Green

# Configuración
$inputDir = "public/work"
$outputDir = "public/work/optimized"

# Crear directorio de salida si no existe
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

# Función para optimizar imagen
function Optimize-Image {
    param($inputFile, $outputFile, $quality = 85)
    
    Write-Host "Optimizando: $inputFile -> $outputFile" -ForegroundColor Yellow
    
    # Comando para convertir a WebP (requiere cwebp de Google)
    $cwebpCmd = "cwebp -q $quality `"$inputFile`" -o `"$outputFile`""
    
    try {
        Invoke-Expression $cwebpCmd
        if ($LASTEXITCODE -eq 0) {
            $originalSize = (Get-Item $inputFile).Length / 1MB
            $optimizedSize = (Get-Item $outputFile).Length / 1MB
            $savings = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
            
            Write-Host "✅ Optimizado: $originalSize MB -> $optimizedSize MB (Ahorro: $savings%)" -ForegroundColor Green
        } else {
            Write-Host "❌ Error optimizando $inputFile" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ Error: $_" -ForegroundColor Red
        Write-Host "💡 Instala WebP tools: https://developers.google.com/speed/webp/download" -ForegroundColor Cyan
    }
}

# Lista de imágenes a optimizar
$imagesToOptimize = @(
    "guy.jpg",
    "win-infra.jpg", 
    "name.jpg"
)

# Optimizar cada imagen
foreach ($image in $imagesToOptimize) {
    $inputPath = Join-Path $inputDir $image
    $outputPath = Join-Path $outputDir ($image -replace "\.jpg$", ".webp")
    
    if (Test-Path $inputPath) {
        Optimize-Image -inputFile $inputPath -outputFile $outputPath -quality 85
    } else {
        Write-Host "⚠️ Archivo no encontrado: $inputPath" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 Optimización de imágenes completada!" -ForegroundColor Green
Write-Host "Las imágenes optimizadas están en: $outputDir" -ForegroundColor Cyan 