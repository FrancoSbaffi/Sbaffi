import React, { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Matter from "matter-js";
import { useScramble } from "use-scramble";

const About = () => {
  const pageRef = useRef(null);
  
  // Variables para Matter.js - deben estar en el scope del componente
  let engine = null;
  let runner = null;
  let bodies = [];

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

  useEffect(() => {
    
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Animación de entrada simple
    gsap.fromTo(pageRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Esperar un poco antes de inicializar las animaciones complejas
    const timer = setTimeout(() => {
      initAnimations();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up Matter.js
      if (runner) {
        Matter.Runner.stop(runner);
      }
      if (engine) {
        Matter.Engine.clear(engine);
      }
    };
  }, []);

  const initAnimations = () => {
    console.log("Iniciando animaciones del About page...");
    
    // Verificar que los elementos existan antes de continuar
    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    console.log("Párrafos encontrados:", animeTextParagraphs.length);
    
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
    console.log("Contenedores de texto encontrados:", animeTextContainers.length);
    
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
       console.log("🚀 Inicializando física CORREGIDA para:", container);
       
       const { Engine, Bodies, Composite } = Matter;
       
               // Crear motor con gravedad moderada para mejor acumulación
        engine = Engine.create({
          gravity: { x: 0, y: 1, scale: 0.001 }
        });
       
       // Obtener objetos
       const objects = container.querySelectorAll(".object");
       console.log("🎯 Objetos encontrados:", objects.length);
       
       // Obtener dimensiones del contenedor
       const containerRect = container.getBoundingClientRect();
       const containerWidth = containerRect.width;
       const containerHeight = containerRect.height;
       
       console.log("📏 Dimensiones del contenedor:", containerWidth, "x", containerHeight);
       
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
         
         console.log(`📦 Objeto ${index}: ${obj.textContent} - Posición inicial: (${startX}, ${startY})`);
         
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
       
       console.log("✅ Física iniciada correctamente con límites del contenedor");
     }

         // Configurar ScrollTrigger para física - SIMPLE
     console.log("🔍 Configurando ScrollTrigger SIMPLE para física...");
     const skillsSection = document.querySelector(".about-skills");
     if (skillsSection) {
       const container = skillsSection.querySelector(".object-container");
       if (container) {
         console.log("✅ Contenedor encontrado, creando ScrollTrigger simple...");
         
         // Inicializar física inmediatamente para debug
         setTimeout(() => {
           console.log("🚀 Inicializando física inmediatamente...");
           initPhysics(container);
         }, 1000);
         
                   ScrollTrigger.create({
            trigger: skillsSection,
            start: "top center",
            once: true,
            onEnter: () => {
              console.log("🎯 ScrollTrigger activado - inicializando física...");
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
    console.log("Tarjetas de galería encontradas:", galleryCards.length);
    
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

    // Outro section - Con scroll aplicado y animación palabra por palabra
    const outroHeader = document.querySelector(".outro h3");
    if (outroHeader) {
      // Configurar SplitText para animación palabra por palabra
      const splitText = new SplitText(outroHeader, { type: "words" });
      const words = splitText.words;
      
      // Ocultar todas las palabras inicialmente
      gsap.set(words, { opacity: 0, y: 50 });
    }

    const outroStrips = document.querySelectorAll(".outro-strip");
    const stripSpeeds = [0.3, 0.4, 0.25, 0.35, 0.2, 0.25];

    // ScrollTrigger para el header del outro con animación palabra por palabra
    ScrollTrigger.create({
      trigger: ".outro",
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (outroHeader && words) {
          if (progress >= 0.2 && progress <= 0.8) {
            const textProgress = (progress - 0.2) / 0.6;
            const totalWords = words.length;
            const wordsToShow = Math.floor(textProgress * totalWords);
            
            // Mostrar palabras progresivamente
            words.forEach((word, index) => {
              if (index < wordsToShow) {
                gsap.set(word, { opacity: 1, y: 0 });
              } else {
                gsap.set(word, { opacity: 0, y: 50 });
              }
            });
          } else if (progress < 0.2) {
            // Ocultar todas las palabras
            gsap.set(words, { opacity: 0, y: 50 });
          } else if (progress > 0.8) {
            // Mostrar todas las palabras
            gsap.set(words, { opacity: 1, y: 0 });
          }
        }
      },
    });

    // ScrollTrigger para el movimiento de las strips
    ScrollTrigger.create({
      trigger: ".outro",
      start: "top bottom",
      end: `+=${window.innerHeight * 6}px`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        outroStrips.forEach((strip, index) => {
          if (stripSpeeds[index] !== undefined) {
            const speed = stripSpeeds[index];
            const movement = progress * 100 * speed;

            gsap.set(strip, {
              x: `${movement}%`,
            });
          }
        });
      },
    });
    
         // Animaciones de line-reveal para elementos con data-animate-type
     const lineRevealElements = document.querySelectorAll('[data-animate-type="line-reveal"]');
     console.log("Elementos line-reveal encontrados:", lineRevealElements.length);
     
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
     
     console.log("✅ Todas las animaciones del About page han sido inicializadas correctamente");
   };

  return (
    <div className="page about" ref={pageRef}>

      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-img">
          <img src="/me.jpg" alt="Franco Sbaffi" />
        </div>
        <div className="container">
          <div className="about-header">
                         <h2 style={{
               fontFamily: "'Barlow Condensed', sans-serif",
               fontWeight: "700",
               textTransform: "uppercase"
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
          <h3>Thank You for your time</h3>
        </div>
        <div className="outro-strips">
          <div className="outro-strip os-1">
            <div className="skill skill-var-2"><p className="mono">WINDOWS HARDENING</p></div>
            <div className="skill skill-var-3"><p className="mono">COMMAND FLOW</p></div>
            <div className="skill skill-var-1"><p className="mono">SECURE CODE</p></div>
            <div className="skill skill-var-3"><p className="mono">RECON MINDSET</p></div>
            <div className="skill skill-var-1"><p className="mono">LOG PRECISION</p></div>
            <div className="skill skill-var-3"><p className="mono">FLOW CONTROL</p></div>
            <div className="skill skill-var-2"><p className="mono">OPERATOR INSTINCT</p></div>
          </div>
          <div className="outro-strip os-2">
            <div className="skill skill-var-1"><p className="mono">LINUX OPS</p></div>
            <div className="skill skill-var-3"><p className="mono">PACKET PRECISION</p></div>
            <div className="skill skill-var-2"><p className="mono">GAUCHO CORE</p></div>
            <div className="skill skill-var-1"><p className="mono">INFRA BUILDS</p></div>
            <div className="skill skill-var-3"><p className="mono">CASE LOGS</p></div>
            <div className="skill skill-var-2"><p className="mono">SCROLL DISCIPLINE</p></div>
            <div className="skill skill-var-3"><p className="mono">FLOW CRAFT</p></div>
            <div className="skill skill-var-1"><p className="mono">ROOT MINDSET</p></div>
          </div>
          <div className="outro-strip os-3">
            <div className="skill skill-var-3"><p className="mono">SOC VIBES</p></div>
            <div className="skill skill-var-2"><p className="mono">TSHARK WIZARD</p></div>
            <div className="skill skill-var-1"><p className="mono">NO FILLER</p></div>
            <div className="skill skill-var-3"><p className="mono">LIVE ENVIRONMENTS</p></div>
            <div className="skill skill-var-2"><p className="mono">ARGENTINA MODE</p></div>
            <div className="skill skill-var-1"><p className="mono">LAUNCH READY</p></div>
            <div className="skill skill-var-2"><p className="mono">ROOTGRIDOPS</p></div>
          </div>
          <div className="outro-strip os-4">
            <div className="skill skill-var-1"><p className="mono">PROTOCOL LAYERS</p></div>
            <div className="skill skill-var-3"><p className="mono">THREAT TIMELINES</p></div>
            <div className="skill skill-var-2"><p className="mono">OS NERD</p></div>
            <div className="skill skill-var-1"><p className="mono">QUIETLY LETAL</p></div>
            <div className="skill skill-var-3"><p className="mono">DEPLOYED</p></div>
          </div>
          <div className="outro-strip os-5">
            <div className="skill skill-var-1"><p className="mono">MISSIONS</p></div>
            <div className="skill skill-var-2"><p className="mono">PROTOCOL CHESS</p></div>
            <div className="skill skill-var-3"><p className="mono">PACKET PRECISION</p></div>
            <div className="skill skill-var-1"><p className="mono">SECURE CODE</p></div>
            <div className="skill skill-var-2"><p className="mono">OPERATOR INSTINCT</p></div>
            <div className="skill skill-var-3"><p className="mono">SCROLL DISCIPLINE</p></div>
          </div>
          <div className="outro-strip os-6">
            <div className="skill skill-var-2"><p className="mono">GAUCHO CORE</p></div>
            <div className="skill skill-var-1"><p className="mono">INFRA BUILDS</p></div>
            <div className="skill skill-var-3"><p className="mono">CASE LOGS</p></div>
            <div className="skill skill-var-2"><p className="mono">FLOW CRAFT</p></div>
            <div className="skill skill-var-1"><p className="mono">ROOT MINDSET</p></div>
            <div className="skill skill-var-3"><p className="mono">PROTOCOL LAYERS</p></div>
            <div className="skill skill-var-2"><p className="mono">NO FILLER</p></div>
            <div className="skill skill-var-1"><p className="mono">QUIETLY LETAL</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

