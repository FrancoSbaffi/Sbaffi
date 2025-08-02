import React, { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Matter from "matter-js";
import { useScramble } from "use-scramble";
import * as THREE from "three";

const About = () => {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  
  // Variables para Matter.js - deben estar en el scope del componente
  let engine = null;
  let runner = null;
  let bodies = [];

  // Variables para el efecto WebGL - optimizadas para evitar múltiples instancias
  let scene = null;
  let camera = null;
  let renderer = null;
  let uniforms = null;
  let radiusTween = null;
  let isMouseInside = false;
  let targetMouse = null;
  let lerpedMouse = null;
  let isWebGLInitialized = false;

  // Hooks para animaciones de scramble - inicialmente desactivadas
  const { ref: specsLoadedRef, replay: replaySpecsLoaded } = useScramble({
    text: "▶ SPECS LOADED",
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  const { ref: readmeRef, replay: replayReadme } = useScramble({
    text: "/ README.MD",
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  const { ref: provingGravityRef, replay: replayProvingGravity } = useScramble({
    text: "▶ Proving gravity applies to shells too",
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  const { ref: credsModeRef, replay: replayCredsMode } = useScramble({
    text: "▶ Creds Mode",
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  const { ref: snapshotsRef, replay: replaySnapshots } = useScramble({
    text: "/ Snapshots",
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  // Estados para controlar la visibilidad de los textos
  const [showSpecsLoaded, setShowSpecsLoaded] = React.useState(false);
  const [showReadme, setShowReadme] = React.useState(false);
  const [showProvingGravity, setShowProvingGravity] = React.useState(false);
  const [showCredsMode, setShowCredsMode] = React.useState(false);
  const [showSnapshots, setShowSnapshots] = React.useState(false);

  // Shaders para el efecto WebGL
  const vertexShader = `
    varying vec2 v_uv;
    
    void main() {
      v_uv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_radius;
    uniform float u_speed;
    uniform float u_imageAspect;
    uniform float u_turbulenceIntensity;

    varying vec2 v_uv;

    // Hash function for noise
    vec3 hash33(vec3 p) {
      p = fract(p * vec3(443.8975, 397.2973, 491.1871));
      p += dot(p.zxy, p.yxz + 19.27);
      return fract(vec3(p.x * p.y, p.z * p.x, p.y * p.z));
    }

    // Simplex noise
    float simplex_noise(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K2 * 2.0);
      vec3 d3 = d0 - (1.0 - 3.0 * K2);
      
      vec3 x0 = d0;
      vec3 x1 = d1;
      vec3 x2 = d2;
      vec3 x3 = d3;
      
      vec4 h = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(x0, hash33(i) * 2.0 - 1.0),
        dot(x1, hash33(i + i1) * 2.0 - 1.0),
        dot(x2, hash33(i + i2) * 2.0 - 1.0),
        dot(x3, hash33(i + 1.0) * 2.0 - 1.0)
      );
      
      return 0.5 + 0.5 * 31.0 * dot(n, vec4(1.0));
    }

    // Curl noise for fluid motion
    vec2 curl(vec2 p, float time) {
      const float epsilon = 0.001;
      
      float n1 = simplex_noise(vec3(p.x, p.y + epsilon, time));
      float n2 = simplex_noise(vec3(p.x, p.y - epsilon, time));
      float n3 = simplex_noise(vec3(p.x + epsilon, p.y, time));
      float n4 = simplex_noise(vec3(p.x - epsilon, p.y, time));
      
      float x = (n2 - n1) / (2.0 * epsilon);
      float y = (n4 - n3) / (2.0 * epsilon);
      
      return vec2(x, y);
    }

    // Ink marbling effect
    float inkMarbling(vec2 p, float time, float intensity) {
      float result = 0.0;
      
      // Base layer
      vec2 flow = curl(p * 1.5, time * 0.1) * intensity * 2.0;
      vec2 p1 = p + flow * 0.3;
      result += simplex_noise(vec3(p1 * 2.0, time * 0.15)) * 0.5;
      
      // Medium details
      vec2 flow2 = curl(p * 3.0 + vec2(sin(time * 0.2), cos(time * 0.15)), time * 0.2) * intensity;
      vec2 p2 = p + flow2 * 0.2;
      result += simplex_noise(vec3(p2 * 4.0, time * 0.25)) * 0.3;
      
      // Fine details
      vec2 flow3 = curl(p * 6.0 + vec2(cos(time * 0.3), sin(time * 0.25)), time * 0.3) * intensity * 0.5;
      vec2 p3 = p + flow3 * 0.1;
      result += simplex_noise(vec3(p3 * 8.0, time * 0.4)) * 0.2;
      
      // Spiral patterns
      float dist = length(p - vec2(0.5));
      float angle = atan(p.y - 0.5, p.x - 0.5);
      float spiral = sin(dist * 15.0 - angle * 2.0 + time * 0.3) * 0.5 + 0.5;
      
      result = mix(result, spiral, 0.3);
      result = result * 0.5 + 0.5;
      
      return result;
    }

    void main() {
      vec2 uv = v_uv;
      float screenAspect = u_resolution.x / u_resolution.y;
      float ratio = u_imageAspect / screenAspect;

      // Simular exactamente object-fit: cover de CSS
      vec2 texCoord;
      if (ratio > 1.0) {
        // Imagen más ancha que el contenedor - recortar horizontalmente
        float scale = 1.0 / ratio;
        texCoord = vec2(uv.x * scale + (1.0 - scale) * 0.5, uv.y);
      } else {
        // Imagen más alta que el contenedor - recortar verticalmente
        float scale = ratio;
        texCoord = vec2(uv.x, uv.y * scale + (1.0 - scale) * 0.5);
      }

      vec4 tex = texture2D(u_texture, texCoord);
      vec3 originalColor = tex.rgb;
      
      // Calculate ink marbling effect
      vec2 correctedUV = uv;
      vec2 correctedMouse = u_mouse;
      
      // Ajustar las coordenadas para el efecto según el aspect ratio
      if (ratio > 1.0) {
        // Para imágenes más anchas, el efecto debe ajustarse horizontalmente
        float scale = 1.0 / ratio;
        correctedUV.x = correctedUV.x * scale + (1.0 - scale) * 0.5;
        correctedMouse.x = correctedMouse.x * scale + (1.0 - scale) * 0.5;
      } else {
        // Para imágenes más altas, el efecto debe ajustarse verticalmente
        float scale = ratio;
        correctedUV.y = correctedUV.y * scale + (1.0 - scale) * 0.5;
        correctedMouse.y = correctedMouse.y * scale + (1.0 - scale) * 0.5;
      }

      float dist = distance(correctedUV, correctedMouse);
      
      float marbleEffect = inkMarbling(uv * 2.0 + u_time * u_speed * 0.1, u_time, u_turbulenceIntensity * 2.0);
      float jaggedDist = dist + (marbleEffect - 0.5) * u_turbulenceIntensity * 2.0;
      
      float mask = u_radius > 0.001 ? step(jaggedDist, u_radius) : 0.0;

      // Invert colors for the effect
      float gray = dot(originalColor, vec3(0.299, 0.587, 0.114));
      vec3 invertedColor = vec3(1.0 - gray);

      // Blend between original and inverted (inverse effect)
      vec3 finalColor = mix(originalColor, invertedColor, mask);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  // Configuración del efecto
  const effectConfig = {
    maskRadius: 0.35,
    maskSpeed: 0.75,
    turbulenceIntensity: 0.225,
    appearDuration: 0.4,
    disappearDuration: 0.3
  };

  // Función para inicializar el efecto WebGL - optimizada
  const initWebGLEffect = () => {
    if (!heroImgRef.current || isWebGLInitialized) return;

    const container = heroImgRef.current;
    const img = container.querySelector('img');
    
    if (!img) return;

    // Inicializar vectores Three.js solo una vez
    if (!targetMouse) {
      targetMouse = new THREE.Vector2(0.5, 0.5);
      lerpedMouse = new THREE.Vector2(0.5, 0.5);
    }

    // Crear escena Three.js
    scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Cargar textura
    const loader = new THREE.TextureLoader();
    loader.load(img.src, (texture) => {
      const imageAspect = texture.image.width / texture.image.height;
      
      // Configurar textura
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 8;
      texture.generateMipmaps = false;

      // Uniforms - reutilizar vectores existentes
      uniforms = {
        u_texture: { value: texture },
        u_mouse: { value: targetMouse },
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_radius: { value: 0.0 },
        u_speed: { value: effectConfig.maskSpeed },
        u_imageAspect: { value: imageAspect },
        u_turbulenceIntensity: { value: effectConfig.turbulenceIntensity }
      };

      // Material y geometría
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        depthTest: false,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "high-performance",
        alpha: true
      });
      renderer.setPixelRatio(1);
      renderer.setSize(width, height);
      
      // Ocultar imagen original y mostrar canvas
      img.style.display = 'none';
      container.appendChild(renderer.domElement);

      // Event listeners
      setupEventListeners(container);
      
      // Marcar como inicializado
      isWebGLInitialized = true;
      
      // Iniciar animación
      animate();
    });
  };

  // Función para configurar event listeners - optimizada
  const setupEventListeners = (container) => {
    // Evitar múltiples event listeners
    if (window.aboutMouseMoveHandler) {
      document.removeEventListener('mousemove', window.aboutMouseMoveHandler);
    }

    const handleMouseMove = (e) => {
      // Verificar que el WebGL esté inicializado
      if (!isWebGLInitialized || !uniforms || !targetMouse) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      
      if (isMouseInside !== inside) {
        isMouseInside = inside;
        
        if (radiusTween) {
          radiusTween.kill();
        }
        
        if (inside) {
          targetMouse.x = (x - rect.left) / rect.width;
          targetMouse.y = 1.0 - (y - rect.top) / rect.height;
          
          radiusTween = gsap.to(uniforms.u_radius, {
            value: effectConfig.maskRadius,
            duration: effectConfig.appearDuration,
            ease: "power2.out"
          });
        } else {
          radiusTween = gsap.to(uniforms.u_radius, {
            value: 0,
            duration: effectConfig.disappearDuration,
            ease: "power2.in"
          });
        }
      }
      
      if (inside) {
        targetMouse.x = (x - rect.left) / rect.width;
        targetMouse.y = 1.0 - (y - rect.top) / rect.height;
      }
    };

    // Guardar referencia para poder remover el listener
    window.aboutMouseMoveHandler = handleMouseMove;
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  };

  // Función de animación
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Solo actualizar si hay interacción del mouse
    if (uniforms && isMouseInside && lerpedMouse && targetMouse) {
      // Smooth mouse movement
      lerpedMouse.lerp(targetMouse, 0.1);
      uniforms.u_mouse.value.copy(lerpedMouse);
      
      // Update time solo cuando hay interacción
      uniforms.u_time.value += 0.01;
    }
    
    // Renderizar solo si todo está inicializado
    if (renderer && scene && camera && isWebGLInitialized) {
      renderer.render(scene, camera);
    }
  };

  useEffect(() => {
    
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Animación de entrada simple
    gsap.fromTo(pageRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Inicializar efecto WebGL después de un pequeño delay
    const webGLTimer = setTimeout(() => {
      initWebGLEffect();
    }, 1000);

    // Esperar un poco antes de inicializar las animaciones complejas
    const timer = setTimeout(() => {
      initAnimations();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(webGLTimer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up Matter.js
      if (runner) {
        Matter.Runner.stop(runner);
        runner = null;
      }
      if (engine) {
        Matter.Engine.clear(engine);
        engine = null;
      }

      // Clean up WebGL - optimizado
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }
      if (scene) {
        scene.clear();
        scene = null;
      }
      if (camera) {
        camera = null;
      }
      if (uniforms) {
        // Limpiar texturas
        if (uniforms.u_texture && uniforms.u_texture.value) {
          uniforms.u_texture.value.dispose();
        }
        uniforms = null;
      }
      if (radiusTween) {
        radiusTween.kill();
        radiusTween = null;
      }
      
      // Resetear estado
      isWebGLInitialized = false;
      isMouseInside = false;
      targetMouse = null;
      lerpedMouse = null;
      
      // Remover event listener
      if (window.aboutMouseMoveHandler) {
        document.removeEventListener('mousemove', window.aboutMouseMoveHandler);
        window.aboutMouseMoveHandler = null;
      }
    };
  }, []);

  const initAnimations = () => {
    // Verificar que los elementos existan antes de continuar
    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    
    if (animeTextParagraphs.length === 0) {
      console.warn("No se encontraron párrafos para animar");
      return;
    }
    
    const wordHighlightBgColor = "240, 242, 245";

    // Palabras clave para resaltar (solo las importantes)
    const keywords = [
      { text: "top 1%", class: "top-1-percent", color: "yellow" },
      { text: "TryHackMe", class: "tryhackme", color: "yellow" },
      { text: "degree", class: "degree", color: "blue" },
      { text: "CTFs", class: "ctfs", color: "yellow" },
      { text: "cybersecurity", class: "cybersecurity", color: "blue" },
    ];

    animeTextParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent;
      const words = text.split(/\s+/);
      paragraph.innerHTML = "";

      words.forEach((word) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          wordContainer.className = "word";

          const wordText = document.createElement("span");
          wordText.textContent = word;

          const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "");
          const matchedKeyword = keywords.find(kw => kw.text.toLowerCase().replace(/[.,!?;:"]/g, "") === normalizedWord);
          
          if (matchedKeyword) {
            wordContainer.classList.add("keyword-wrapper");
            wordText.classList.add("keyword", matchedKeyword.class);
          }

          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);
        }
      });
    });

    const animeTextContainers = document.querySelectorAll(".anime-text-container");
    
    if (animeTextContainers.length === 0) {
      console.warn("No se encontraron contenedores de texto");
      return;
    }

         animeTextContainers.forEach((container) => {
       ScrollTrigger.create({
         trigger: container,
         pin: container,
         start: "top top",
         end: `+=${window.innerHeight * 4}`,
         pinSpacing: true,
         onEnter: () => {
           // Asegurar que el texto esté centrado cuando se activa el trigger
           const copyContainer = container.querySelector('.copy-container');
           if (copyContainer) {
             copyContainer.style.display = 'flex';
             copyContainer.style.alignItems = 'center';
             copyContainer.style.justifyContent = 'center';
           }
           
                       // Activar animaciones de scramble para esta sección
            setTimeout(() => {
              setShowSpecsLoaded(true);
              replaySpecsLoaded();
            }, 200);
            setTimeout(() => {
              setShowReadme(true);
              replayReadme();
            }, 400);
         },
        onUpdate: (self) => {
          const progress = self.progress;
          const words = Array.from(container.querySelectorAll(".anime-text .word"));
          const totalWords = words.length;

          words.forEach((word, index) => {
            const wordText = word.querySelector("span");

            if (progress <= 0.7) {
              const progressTarget = 0.7;
              const revealProgress = Math.min(1, progress / progressTarget);

              const overlapWords = 15;
              const totalAnimationLength = 1 + overlapWords / totalWords;

              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;

              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                );

              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;
              const duration = adjustedEnd - adjustedStart;

              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;

              word.style.opacity = wordProgress;

              const backgroundFadeStart =
                wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
              const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

              const textRevealThreshold = 0.9;
              const textRevealProgress =
                wordProgress >= textRevealThreshold
                  ? (wordProgress - textRevealThreshold) /
                    (1 - textRevealThreshold)
                  : 0;
              wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
            } else {
              const reverseProgress = (progress - 0.7) / 0.3;
              word.style.opacity = 1;
              const targetTextOpacity = 1;

              const reverseOverlapWords = 5;
              const reverseWordStart = index / totalWords;
              const reverseWordEnd =
                reverseWordStart + reverseOverlapWords / totalWords;

              const reverseTimelineScale =
                1 /
                Math.max(
                  1,
                  (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
                );

              const reverseAdjustedStart =
                reverseWordStart * reverseTimelineScale;
              const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
              const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

              const reverseWordProgress =
                reverseProgress <= reverseAdjustedStart
                  ? 0
                  : reverseProgress >= reverseAdjustedEnd
                  ? 1
                  : (reverseProgress - reverseAdjustedStart) / reverseDuration;

              if (reverseWordProgress > 0) {
                wordText.style.opacity =
                  targetTextOpacity * (1 - reverseWordProgress);
                word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
              } else {
                wordText.style.opacity = targetTextOpacity;
                word.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
              }
            }
          });
        },
      });
    });

         // FÍSICA - Implementación CORREGIDA para mantener objetos dentro del contenedor
     function initPhysics(container) {
       
       const { Engine, Bodies, Composite } = Matter;
       
               // Crear motor con gravedad moderada para mejor acumulación
        engine = Engine.create({
          gravity: { x: 0, y: 1, scale: 0.001 }
        });
       
       // Obtener objetos
       const objects = container.querySelectorAll(".object");
       
       // Obtener dimensiones del contenedor
       const containerRect = container.getBoundingClientRect();
       const containerWidth = containerRect.width;
       const containerHeight = containerRect.height;
       
               // Crear paredes que coincidan exactamente con el contenedor
        const wallThickness = 50;
        const walls = [
          // Pared inferior - un par de píxeles más abajo
          Bodies.rectangle(containerWidth / 2, containerHeight - 30, containerWidth, wallThickness, { isStatic: true }),
          // Pared izquierda - dentro del contenedor
          Bodies.rectangle(wallThickness / 2, containerHeight / 2, wallThickness, containerHeight, { isStatic: true }),
          // Pared derecha - dentro del contenedor
          Bodies.rectangle(containerWidth - wallThickness / 2, containerHeight / 2, wallThickness, containerHeight, { isStatic: true })
        ];
       
       Composite.add(engine.world, walls);
       
       // Crear cuerpos para cada objeto
       objects.forEach((obj, index) => {
         // Obtener dimensiones reales del objeto
         const objRect = obj.getBoundingClientRect();
         const objWidth = objRect.width || 120; // Ancho por defecto si no se puede obtener
         const objHeight = objRect.height || 60; // Alto por defecto si no se puede obtener
         
         // Posición inicial aleatoria en la parte superior del contenedor
         const startX = wallThickness + objWidth/2 + Math.random() * (containerWidth - wallThickness * 2 - objWidth);
         const startY = -objHeight - Math.random() * 50; // Empezar justo arriba del contenedor
         
                   const body = Bodies.rectangle(startX, startY, objWidth, objHeight, {
            restitution: 0.1, // Muy poco rebote para mejor apilamiento
            friction: 0.3, // Más fricción para estabilidad
            density: 0.001
          });
         
         body.element = obj;
         body.objWidth = objWidth;
         body.objHeight = objHeight;
         Composite.add(engine.world, body);
         bodies.push(body);
         
         // Hacer visible el objeto inmediatamente
         obj.style.position = 'absolute';
         obj.style.left = '0';
         obj.style.top = '0';
         obj.style.opacity = '1';
         obj.style.zIndex = '100';
       });
       
       // Iniciar motor
       runner = Matter.Runner.create();
       Matter.Runner.run(runner, engine);
       
       // Actualizar posiciones con límites del contenedor
       Matter.Events.on(engine, 'afterUpdate', () => {
         bodies.forEach((body) => {
           if (body.element) {
             const pos = body.position;
             const angle = body.angle;
             
             // Calcular posición centrada del objeto
             const x = pos.x - body.objWidth / 2;
             const y = pos.y - body.objHeight / 2;
             
             // Aplicar transformación
             body.element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
           }
         });
       });
     }

         // Configurar ScrollTrigger para física - SIMPLE
     const skillsSection = document.querySelector(".about-skills");
     if (skillsSection) {
       const container = skillsSection.querySelector(".object-container");
       if (container) {
         // Inicializar física inmediatamente para debug
         setTimeout(() => {
           initPhysics(container);
         }, 1000);
         
                   ScrollTrigger.create({
            trigger: skillsSection,
            start: "top center",
            once: true,
            onEnter: () => {
              initPhysics(container);
              
              // Activar animación de scramble para esta sección
              setTimeout(() => {
                setShowProvingGravity(true);
                replayProvingGravity();
              }, 500);
            },
          });
       }
     }

    const galleryCards = gsap.utils.toArray(".gallery-card");
    
    const rotations = [-12, 10, -5, 5, -5, -2];

    galleryCards.forEach((galleryCard, index) => {
      gsap.set(galleryCard, {
        y: window.innerHeight,
        rotate: rotations[index],
      });
    });

    ScrollTrigger.create({
      trigger: ".about-skills",
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

                   ScrollTrigger.create({
        trigger: ".about-sticky-cards",
        start: "top top",
        end: `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
                 onEnter: () => {
                     // Activar animaciones de scramble para esta sección
            setTimeout(() => {
              setShowCredsMode(true);
              replayCredsMode();
            }, 200);
            setTimeout(() => {
              setShowSnapshots(true);
              replaySnapshots();
            }, 400);
         },
       onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = galleryCards.length;
        const progressPerCard = 1 / totalCards;

        galleryCards.forEach((galleryCard, index) => {
          const galleryCardStart = index * progressPerCard;
          let galleryCardProgress =
            (progress - galleryCardStart) / progressPerCard;
          galleryCardProgress = Math.min(Math.max(galleryCardProgress, 0), 1);

          let yPos = window.innerHeight * (1 - galleryCardProgress);
          let xPos = 0;

          if (galleryCardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (galleryCardStart + progressPerCard)) /
              (1 - (galleryCardStart + progressPerCard));
            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - index * 0.15;
              xPos =
                -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
              yPos =
                -window.innerHeight *
                0.3 *
                distanceMultiplier *
                remainingProgress;
            }
          }

          gsap.to(galleryCard, {
            y: yPos,
            x: xPos,
            duration: 0,
            ease: "none",
          });
        });
      },
    });

    // Outro section - Animación mejorada para imagen 2
    const outroHeader = document.querySelector(".outro h3");
    const outroStrips = document.querySelectorAll(".outro-strip");
    const stripSpeeds = [0.3, 0.4, 0.25, 0.35, 0.2, 0.25];
    
    let splitText = null;
    let words = null;
    
    if (outroHeader) {
      // Configurar SplitText para animación palabra por palabra
      splitText = new SplitText(outroHeader, { type: "words" });
      words = splitText.words;
      
      // Ocultar todas las palabras inicialmente
      gsap.set(words, { opacity: 0, y: 30 });
    }

    // ScrollTrigger principal para el outro con pin y animaciones
    ScrollTrigger.create({
      trigger: ".outro",
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Animación del texto del header
        if (outroHeader && words) {
          if (progress >= 0.1 && progress <= 0.6) {
            const textProgress = (progress - 0.1) / 0.5;
            const totalWords = words.length;
            const wordsToShow = Math.floor(textProgress * totalWords);
            
            // Mostrar palabras progresivamente con efecto de fade
            words.forEach((word, index) => {
              if (index < wordsToShow) {
                gsap.set(word, { opacity: 1, y: 0 });
              } else {
                gsap.set(word, { opacity: 0, y: 30 });
              }
            });
          } else if (progress < 0.1) {
            // Ocultar todas las palabras
            gsap.set(words, { opacity: 0, y: 30 });
          } else if (progress > 0.6) {
            // Mostrar todas las palabras
            gsap.set(words, { opacity: 1, y: 0 });
          }
        }

        // Animación del movimiento de las strips
        outroStrips.forEach((strip, index) => {
          if (stripSpeeds[index] !== undefined) {
            const speed = stripSpeeds[index];
            const movement = progress * 120 * speed; // Aumentado el rango de movimiento

            gsap.set(strip, {
              x: `${movement}%`,
            });
          }
        });
      },
    });
    
         // Animaciones de line-reveal para elementos con data-animate-type
     const lineRevealElements = document.querySelectorAll('[data-animate-type="line-reveal"]');
     
     lineRevealElements.forEach((element) => {
       const delay = parseFloat(element.getAttribute('data-animate-delay')) || 0;
       const animateOnScroll = element.getAttribute('data-animate-on-scroll') === 'true';
       
               // Obtener el texto original y preservar el HTML interno
        const originalHTML = element.innerHTML;
        const text = element.textContent;
        
        // Limpiar el elemento
        element.innerHTML = "";
        
        // Crear un contenedor para el texto animado
        const textContainer = document.createElement("div");
        textContainer.style.position = "relative";
        textContainer.style.overflow = "hidden";
        element.appendChild(textContainer);
        
        // Crear el texto original (invisible)
        const originalText = document.createElement("div");
        originalText.innerHTML = originalHTML;
        originalText.style.position = "absolute";
        originalText.style.top = "0";
        originalText.style.left = "0";
        originalText.style.opacity = "0";
        textContainer.appendChild(originalText);
        
        // Crear el texto animado (visible)
        const animatedText = document.createElement("div");
        animatedText.innerHTML = originalHTML;
        animatedText.style.position = "relative";
        animatedText.style.transform = "translateY(100%)";
        animatedText.style.opacity = "0";
        textContainer.appendChild(animatedText);
       
       if (animateOnScroll) {
         ScrollTrigger.create({
           trigger: element,
           start: "top 80%",
           once: true,
                       onEnter: () => {
              gsap.to(animatedText, {
                y: "0%",
                opacity: 1,
                duration: 0.8,
                delay: delay,
                ease: "power2.out"
              });
            }
         });
       } else {
                   // Animación inmediata
          gsap.to(animatedText, {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            delay: delay,
            ease: "power2.out"
          });
       }
     });
   };

  return (
    <div className="page about" ref={pageRef}>

      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-img" ref={heroImgRef}>
          <img src="/me.jpg" alt="Franco Sbaffi" />
        </div>
        <div className="container">
          <div className="about-header">
                         <h2 style={{
               fontFamily: "'Barlow Condensed', sans-serif",
               fontWeight: "700",
               textTransform: "uppercase",
               color: "#000000"
             }}>
               THE ROOT BEHIND IT
             </h2>
          </div>
        </div>
      </section>

      {/* Anime Text Container */}
      <section className="anime-text-container">
        <div className="home-spotlight-top-bar">
          <div className="symbols-container">
            <div className="symbol">
              <img src="/symbols/s1-dark.png" alt="Symbol" />
            </div>
          </div>
          <div className="symbols-container">
            <div className="symbol">
              <img src="/symbols/s1-dark.png" alt="Symbol" />
            </div>
          </div>
        </div>
                 <div className="home-spotlight-bottom-bar">
           <p
             ref={specsLoadedRef}
             className="mono"
             style={{ opacity: showSpecsLoaded ? 1 : 0 }}
           >
           </p>
           <p
             ref={readmeRef}
             className="mono"
             style={{ opacity: showReadme ? 1 : 0 }}
           >
           </p>
         </div>
        <div className="copy-container">
                     <div className="anime-text">
             <p>
               I excel in IT, with cybersecurity as my main focus.
               I'm ranked in the top 1% on TryHackMe worldwide.
               Backed by a college degree, I tackle technical problems with confidence.
             </p>
             <p>
               I keep my skills sharp through labs, CTFs, and open-source projects.
               Learning and improving is part of my routine.
               This helps me stay aligned with today's evolving cybersecurity landscape.
             </p>
           </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="about-skills">
        <div className="container">
          <div className="about-skills-col">
            <div className="symbols-container">
              <div className="symbol">
                <img src="/symbols/s1-light.png" alt="Symbol" />
              </div>
              <div className="symbol">
                <img src="/symbols/s2-light.png" alt="Symbol" />
              </div>
            </div>
            <div className="about-skills-copy-wrapper">
                             <div className="about-skills-callout">
                 <p
                   ref={provingGravityRef}
                   className="mono"
                   style={{ opacity: showProvingGravity ? 1 : 0 }}
                 >
                 </p>
               </div>
              <div className="about-skills-header">
                                 <h3
                   data-animate-type="line-reveal"
                   data-animate-delay="0.4"
                   data-animate-on-scroll="true"
                   style={{
                     fontFamily: "'Barlow Condensed', sans-serif",
                     fontWeight: "600"
                   }}
                 >
                   Some things I know that make systems stronger
                 </h3>
              </div>
            </div>
          </div>
          <div className="about-skills-col skills-playground">
            <div className="object-container">
              <div className="object os-1"><p className="mono">Wazuh</p></div>
              <div className="object os-2"><p className="mono">Splunk</p></div>
              <div className="object os-3"><p className="mono">AWS</p></div>
              <div className="object os-1"><p className="mono">Azure</p></div>
              <div className="object os-2"><p className="mono">Python</p></div>
              <div className="object os-3"><p className="mono">Burp Suite</p></div>
              <div className="object os-1"><p className="mono">Docker</p></div>
              <div className="object os-2"><p className="mono">Metasploit</p></div>
              <div className="object os-3"><p className="mono">Bash</p></div>
              <div className="object os-1"><p className="mono">Jenkins</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Cards Section */}
      <section className="about-sticky-cards">
                 <div className="sticky-cards-header">
                       <h3
              data-animate-type="line-reveal"
              data-animate-delay="0.2"
              data-animate-on-scroll="true"
                             style={{
                 color: "#000000",
                 textTransform: "uppercase",
                 fontWeight: "700",
                 fontSize: "5rem",
                 letterSpacing: "-0.05em",
                 wordSpacing: "-0.1em",
                 lineHeight: "0.9",
                 fontFamily: "'Barlow Condensed', sans-serif"
               }}
            >
              CERTIFIED LOGS FROM THE FIELD
            </h3>
         </div>
        <div className="home-spotlight-top-bar">
          <div className="container">
            <div className="symbols-container">
              <div className="symbol">
                <img src="/symbols/s1-dark.png" alt="Symbol" />
              </div>
              <div className="symbol">
                <img src="/symbols/s2-dark.png" alt="Symbol" />
              </div>
              <div className="symbol">
                <img src="/symbols/s3-dark.png" alt="Symbol" />
              </div>
            </div>
            <div className="symbols-container">
              <div className="symbol">
                <img src="/symbols/s1-dark.png" alt="Symbol" />
              </div>
              <div className="symbol">
                <img src="/symbols/s2-dark.png" alt="Symbol" />
              </div>
              <div className="symbol">
                <img src="/symbols/s3-dark.png" alt="Symbol" />
              </div>
            </div>
          </div>
        </div>
                 <div className="home-spotlight-bottom-bar">
           <div className="container">
             <p
               ref={credsModeRef}
               className="mono"
               style={{ opacity: showCredsMode ? 1 : 0 }}
             >
             </p>
             <p
               ref={snapshotsRef}
               className="mono"
               style={{ opacity: showSnapshots ? 1 : 0 }}
             >
             </p>
           </div>
         </div>
        <div className="gallery-card">
          <div className="gallery-card-img">
            <img src="/gallery-images/gallery-img-1.jpg" alt="" />
          </div>
          <div className="gallery-card-content"><p className="mono">SAL1</p></div>
        </div>
        <div className="gallery-card">
          <div className="gallery-card-img">
            <img src="/gallery-images/gallery-img-2.jpg" alt="" />
          </div>
          <div className="gallery-card-content"><p className="mono">IBM Cybersecurity Professional</p></div>
        </div>
        <div className="gallery-card">
          <div className="gallery-card-img">
            <img src="/gallery-images/gallery-img-3.jpg" alt="" />
          </div>
          <div className="gallery-card-content"><p className="mono">CompTIA Linux+</p></div>
        </div>
        <div className="gallery-card">
          <div className="gallery-card-img">
            <img src="/gallery-images/gallery-img-4.jpg" alt="" />
          </div>
          <div className="gallery-card-content"><p className="mono">CompTIA Network+</p></div>
        </div>
        <div className="gallery-card">
          <div className="gallery-card-img">
            <img src="/gallery-images/gallery-img-5.jpg" alt="" />
          </div>
          <div className="gallery-card-content"><p className="mono">Splunk Core Certified User</p></div>
        </div>
        <div className="gallery-card">
          <div className="gallery-card-img">
            <img src="/gallery-images/gallery-img-6.jpg" alt="" />
          </div>
          <div className="gallery-card-content"><p className="mono">AZ-900</p></div>
        </div>
      </section>

      {/* Outro Section */}
      <section className="outro">
        <div className="container">
          <h3>SCROLL ENDS BUT IDEAS DON'T</h3>
        </div>
        <div className="outro-strips">
          <div className="outro-strip os-1">
            <div className="skill skill-var-1"><p className="mono">Linux Ops</p></div>
            <div className="skill skill-var-2"><p className="mono">Windows Hardening</p></div>
            <div className="skill skill-var-3"><p className="mono">Command Flow</p></div>
            <div className="skill skill-var-1"><p className="mono">Secure Code</p></div>
            <div className="skill skill-var-3"><p className="mono">Recon Mindset</p></div>
            <div className="skill skill-var-1"><p className="mono">Log Precision</p></div>
          </div>
          <div className="outro-strip os-2">
            <div className="skill skill-var-2"><p className="mono">Flow Control</p></div>
            <div className="skill skill-var-3"><p className="mono">Operator Instinct</p></div>
            <div className="skill skill-var-1"><p className="mono">Protocol Chess</p></div>
          </div>
          <div className="outro-strip os-3">
            <div className="skill skill-var-2"><p className="mono">Packet Precision</p></div>
            <div className="skill skill-var-3"><p className="mono">Gaucho Core</p></div>
            <div className="skill skill-var-1"><p className="mono">Infra Builds</p></div>
            <div className="skill skill-var-2"><p className="mono">Case Logs</p></div>
            <div className="skill skill-var-3"><p className="mono">Scroll Discipline</p></div>
            <div className="skill skill-var-3"><p className="mono">Flow Craft</p></div>
            <div className="skill skill-var-1"><p className="mono">Root Mindset</p></div>
          </div>
          <div className="outro-strip os-4">
            <div className="skill skill-var-1"><p className="mono">Protocol Layers</p></div>
            <div className="skill skill-var-2"><p className="mono">Threat Timelines</p></div>
            <div className="skill skill-var-3">
              <p className="mono">Ops Lifecycle</p>
            </div>
          </div>
          <div className="outro-strip os-5">
            <div className="skill skill-var-1"><p className="mono">Side Missions</p></div>
            <div className="skill skill-var-2"><p className="mono">SOC Vibes</p></div>
            <div className="skill skill-var-3"><p className="mono">TShark Wizard</p></div>
            <div className="skill skill-var-1"><p className="mono">No Filler</p></div>
            <div className="skill skill-var-2"><p className="mono">Live Environments</p></div>
            <div className="skill skill-var-3"><p className="mono">Argentina Mode</p></div>
            <div className="skill skill-var-1"><p className="mono">Launch Ready</p></div>
            <div className="skill skill-var-2"><p className="mono">RootgridOPS</p></div>
          </div>
          <div className="outro-strip os-6">
            <div className="skill skill-var-3"><p className="mono">OS Nerd</p></div>
            <div className="skill skill-var-1"><p className="mono">Quietly Letal</p></div>
            <div className="skill skill-var-2"><p className="mono">Deployed</p></div>
            <div className="skill skill-var-3"><p className="mono">Real Python</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

