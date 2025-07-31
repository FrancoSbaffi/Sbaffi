export const displacementConfig = {
  // Dimensiones del dock - más pequeño como antes
  width: 280,
  height: 70,
  radius: 20,
  
  // Parámetros del efecto de displacement - ajustados para mejor efecto
  border: 0.07,
  lightness: 50,
  alpha: 0.93,
  blur: 11,
  scale: -80, // Ajustado para el tamaño más pequeño
  
  // Canales de color para aberración cromática
  r: 0,    // Red channel displacement
  g: 10,   // Green channel displacement  
  b: 20,   // Blue channel displacement
  
  // Modo de mezcla
  blend: 'difference',
  
  // Efectos adicionales
  brightness: 0.9,
  saturation: 1.2,
  outputBlur: 0.7
};

// Configuraciones predefinidas
export const presets = {
  dock: {
    ...displacementConfig,
    width: 280,
    height: 70,
    scale: -80,
    r: 0,
    g: 10,
    b: 20,
  },
  pill: {
    ...displacementConfig,
    width: 200,
    height: 80,
    radius: 40,
    scale: -80,
    r: 0,
    g: 10,
    b: 20,
  },
  bubble: {
    ...displacementConfig,
    width: 140,
    height: 140,
    radius: 70,
    scale: -80,
    r: 0,
    g: 10,
    b: 20,
  }
}; 