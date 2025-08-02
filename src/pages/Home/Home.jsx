import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import "./home.css";
import { useScramble } from "use-scramble";

import LiveClockUpdate from "../../components/LiveClockUpdate/LiveClockUpdate";
import Dock from "../../components/Dock/Dock";

const Home = () => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const { ref: titleRef, replay: replayTitle } = useScramble({
    text: "FRANCO SBAFFI - CYBERSECURITY SPECIALIST",
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  useEffect(() => {
    // Check if this is the first visit to Home page
    const hasVisitedHome = localStorage.getItem('hasVisitedHome');
    
    if (hasVisitedHome) {
      // If already visited, show everything immediately
      setIsIconVisible(true);
      setIsDockVisible(true);
      setShowTitle(true);
      replayTitle();
    } else {
      // First visit - show animations with delay
      const iconTimer = setTimeout(() => {
        setIsIconVisible(true);
        setIsDockVisible(true);
        setShowTitle(true);
        replayTitle();
      }, 2000);
      
      // Mark as visited
      localStorage.setItem('hasVisitedHome', 'true');
      
      return () => clearTimeout(iconTimer);
    }
  }, [replayTitle]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <Spline 
          scene="https://prod.spline.design/1UzNQVY7YvVg5b49/scene.splinecode" 
        />
        
        {/* Título con animación de scramble - Arriba del dock */}
        <div
          style={{
            position: "absolute",
            bottom: "140px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 0,
            textAlign: "center",
            pointerEvents: "none"
          }}
        >
          <p
            ref={titleRef}
            className="mono"
            style={{
              fontSize: "clamp(0.5rem, 1.2vw, 0.8rem)",
              fontWeight: "400",
              color: "rgba(0, 0, 0, 0.8)",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              margin: 0,
              userSelect: "none",
              textShadow: "1px 1px 4px rgba(255,255,255,0.5)",
              opacity: showTitle ? 1 : 0,
              transition: "opacity 0.5s ease-in-out"
            }}
          >
          </p>
        </div>
      </div>

      <div className="home-logo">
        <img 
          src="/icons/icon-black.png" 
          alt="Logo" 
          style={{ 
            width: "clamp(24px, 3vw, 40px)", 
            height: "clamp(24px, 3vw, 40px)",
            filter: "brightness(0.7)",
            opacity: isIconVisible ? 1 : 0,
            transition: "opacity 0.8s ease-in-out"
          }} 
        />
      </div>

      <div className="live-clock">
        <LiveClockUpdate />
      </div>

      <Dock isVisible={isDockVisible} />
    </>
  );
};

export default Home;
