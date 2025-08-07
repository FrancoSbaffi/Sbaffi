import React, { useState, useEffect } from "react";
import "./home.css";

import LiveClockUpdate from "../../components/LiveClockUpdate/LiveClockUpdate";
import Dock from "../../components/Dock/Dock";
import BlocksBackground from "../../components/BlocksBackground/BlocksBackground";

const Home = () => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(true);

  useEffect(() => {
    // Show everything immediately without animation
    setIsIconVisible(true);
    setIsDockVisible(true);
  }, []);

  useEffect(() => {
    // Blinking effect
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150); // Eyes closed for 150ms (more realistic)
    }, 4000); // Blink every 4 seconds (more natural frequency)

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <>
      <div className="home-container">
        {/* Blocks background */}
        <BlocksBackground />
        
        {/* White background */}
        <div className="home-background"></div>

        {/* Marquee text behind cyborg */}
        <div className={`marquee-container ${isMarqueeVisible ? 'visible' : ''}`}>
          <div className="marquee-content">
            <div className="marquee-text">
              <span className="name-text">* FRANCO SBAFFI *</span>
              <span className="title-text">* CYBERSECURITY SPECIALIST *</span>
            </div>
            <div className="marquee-text">
              <span className="name-text">* FRANCO SBAFFI *</span>
              <span className="title-text">* CYBERSECURITY SPECIALIST *</span>
            </div>
            <div className="marquee-text">
              <span className="name-text">* FRANCO SBAFFI *</span>
              <span className="title-text">* CYBERSECURITY SPECIALIST *</span>
            </div>
            <div className="marquee-text">
              <span className="name-text">* FRANCO SBAFFI *</span>
              <span className="title-text">* CYBERSECURITY SPECIALIST *</span>
            </div>
          </div>
        </div>

        {/* Cyborg Image - Centered and large */}
        <div className="cyborg-container">
          {/* Base cyborg image (eyes open) */}
          <img 
            src="/Cyborg.png" 
            alt="Cyborg" 
            className="cyborg-image base-image"
          />
          
          {/* Eyes-only overlay for blinking */}
          <img 
            src="/eyes.png" 
            alt="Closed Eyes" 
            className={`eyes-overlay ${isBlinking ? 'blinking' : ''}`}
          />
        </div>

        {/* Credentials text - Left side of cyborg */}
        <div className="credentials-text">
          <p>Cybersecurity Analyst and Security Engineer with one year in IT and 1% TryHackMe Worldwide</p>
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
