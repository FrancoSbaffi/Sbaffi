# Script de optimización de videos para la carpeta work
# Requiere FFmpeg instalado

Write-Host "🎬 Optimizando videos de la carpeta work..." -ForegroundColor Green

# Configuración de optimización
$inputDir = "public/work"
$outputDir = "public/work/optimized"

# Crear directorio de salida si no existe
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

# Función para optimizar video
function Optimize-Video {
    param($inputFile, $outputFile, $quality = "medium")
    
    $qualitySettings = @{
        "low" = "-crf 28 -preset slow"
        "medium" = "-crf 24 -preset slow"
        "high" = "-crf 20 -preset slow"
    }
    
    $settings = $qualitySettings[$quality]
    
    Write-Host "Optimizando: $inputFile -> $outputFile" -ForegroundColor Yellow
    
    # Comando FFmpeg para optimización
    $ffmpegCmd = "ffmpeg -i `"$inputFile`" $settings -movflags +faststart -y `"$outputFile`""
    
    try {
        Invoke-Expression $ffmpegCmd
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
    }
}

# Lista de videos a optimizar con calidad específica
$videosToOptimize = @(
    @{File="gooey.mp4"; Quality="medium"},
    @{File="stripes.mp4"; Quality="medium"},
    @{File="peach.mp4"; Quality="medium"},
    @{File="buttons1.mp4"; Quality="medium"},
    @{File="staggered-text.mp4"; Quality="low"}
)

# Optimizar cada video
foreach ($video in $videosToOptimize) {
    $inputPath = Join-Path $inputDir $video.File
    $outputPath = Join-Path $outputDir $video.File
    
    if (Test-Path $inputPath) {
        Optimize-Video -inputFile $inputPath -outputFile $outputPath -quality $video.Quality
    } else {
        Write-Host "⚠️ Archivo no encontrado: $inputPath" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 Optimización completada!" -ForegroundColor Green
Write-Host "Los videos optimizados están en: $outputDir" -ForegroundColor Cyan 