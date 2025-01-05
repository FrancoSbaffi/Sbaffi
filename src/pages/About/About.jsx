// src/pages/About/About.jsx

import React, { useEffect, useRef } from "react";
import "./About.css"; 
import gsap from "gsap";

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.to(aboutRef.current, { opacity: 1, duration: 1, ease: "power2.out" });
  }, []);

  return (
    <div className="about-container" ref={aboutRef}>
      <div className="about-item">
        <p className="title">ABOUT ME</p>
        <p className="about-me-desc">
          I'm Franco, a <span className="diffColor">Cyber Security Specialist</span> with 3 years of experience in IT and degree with deep focus on IT Infraestructure. <br />
          I enhance security operations through threat detection, incident response, and automation.
          My goal is to apply Advanced Cybersecurity practices, focusing on <span className="diffColor">threat detection</span>, <span className="diffColor">incident response</span>, and <span className="diffColor">network security</span>, to ensure data protection, and secure operations..
        </p>
        <br />
        <p className="title">EXPERIENCE</p>
        <p className="about-me-desc">
          <span className="diffColor">Self-Taught Journey (2018)</span>
          <br />
          My journey began in 2018 during school, where I self-taught programming and spent six months learning various technologies. I worked on small projects for people in my network, helping me gain hands-on experience and develop a passion for IT.
          <br />
          <br />
          <span className="diffColor">Software Developer – @EX Squared LATAM (2020–2022)</span>
          <br />
          In 2020, I landed my first job as a Software Developer at EX Squared LATAM. Over two years, I honed my programming and development skills, working on diverse projects that strengthened my understanding of software design and implementation.
          <br />
          <br />
          <span className="diffColor">System Administrator – @Kraken (2022–2024)</span>
          <br />
          My most recent role was as a System Administrator at Kraken. This position allowed me to dive deeper into IT infrastructure, gaining valuable hands-on experience in system management and network administration. It was a pivotal step toward achieving my ultimate goal of specializing in cybersecurity, as it bridged my knowledge of systems and security practices.
        </p>
        <br />
        <p className="title">CERTIFICATIONS</p>
        <p className="about-me-desc">
          I want to continue getting certified, I usually constantly follow the complete study guides for the certifications that interest me, I have done it with <span className="diffColor">Network+</span>, <span className="diffColor">Linux+</span> and <span className="diffColor">Security+</span>, also with Cloud Computing and Splunk certifications.
        </p>
      </div>
    </div>
  );
};

export default About;
