import { useEffect, useRef } from 'react';
import { displacementConfig } from './displacementConfig';

export const useDisplacementEffect = () => {
  const filterRef = useRef(null);

  const buildDisplacementImage = () => {
    const config = displacementConfig;

    const border = Math.min(config.width, config.height) * (config.border * 0.5);
    
    const svgContent = `
      <svg class="displacement-image" viewBox="0 0 ${config.width} ${config.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <!-- backdrop -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="black"></rect>
        <!-- red linear -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#red)" />
        <!-- blue linear -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#blue)" style="mix-blend-mode: ${config.blend}" />
        <!-- block out distortion -->
        <rect x="${border}" y="${Math.min(config.width, config.height) * (config.border * 0.5)}" width="${config.width - border * 2}" height="${config.height - border * 2}" rx="${config.radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha}" style="filter:blur(${config.blur}px)" />
      </svg>
    `;

    // Crear un elemento SVG temporal para serializar
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgContent;
    const svgEl = tempDiv.querySelector('.displacement-image');
    
    const serialized = new XMLSerializer().serializeToString(svgEl);
    const encoded = encodeURIComponent(serialized);
    const dataUri = `data:image/svg+xml,${encoded}`;

    // Actualizar el feImage en el filter
    if (filterRef.current) {
      const feImage = filterRef.current.querySelector('feImage');
      if (feImage) {
        feImage.setAttribute('href', dataUri);
      }

      // Actualizar los valores de scale para los canales de color
      const redChannel = filterRef.current.querySelector('#redchannel');
      const greenChannel = filterRef.current.querySelector('#greenchannel');
      const blueChannel = filterRef.current.querySelector('#bluechannel');

      if (redChannel) redChannel.setAttribute('scale', config.scale + config.r);
      if (greenChannel) greenChannel.setAttribute('scale', config.scale + config.g);
      if (blueChannel) blueChannel.setAttribute('scale', config.scale + config.b);

      // Actualizar el blur de salida
      const gaussianBlur = filterRef.current.querySelector('feGaussianBlur');
      if (gaussianBlur) {
        gaussianBlur.setAttribute('stdDeviation', config.outputBlur);
      }
    }
  };

  useEffect(() => {
    // Establecer variables CSS
    const root = document.documentElement;
    root.style.setProperty('--dock-width', `${displacementConfig.width}px`);
    root.style.setProperty('--dock-height', `${displacementConfig.height}px`);
    root.style.setProperty('--dock-radius', `${displacementConfig.radius}px`);
    root.style.setProperty('--brightness', displacementConfig.brightness);
    root.style.setProperty('--saturation', displacementConfig.saturation);

    // Esperar un poco para que el DOM esté listo
    const timer = setTimeout(() => {
      buildDisplacementImage();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return { filterRef, buildDisplacementImage };
}; 