import { useEffect, useRef } from 'react';

export const useVideoOptimization = (videoUrl) => {
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    // Detectar velocidad de conexión (como rauno.me/craft)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' || 
      connection.effectiveType === '3g'
    );

    // Crear Intersection Observer optimizado
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          
          if (entry.isIntersecting) {
            // Cargar video solo cuando es visible
            if (!video.src) {
              video.src = video.dataset.src;
              video.load();
            }
            
            // Reproducir solo si no es conexión lenta
            if (!isSlowConnection) {
              video.play().catch(() => {
                console.log('Video loaded but autoplay blocked');
              });
            }
          } else {
            // Optimización: pausar cuando no es visible
            video.pause();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: isSlowConnection ? '0px' : '100px' // Menos precarga en conexiones lentas
      }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videoUrl]);

  return videoRef;
}; 