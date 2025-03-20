
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
        I’m Franco, a <span className="diffColor">Cyber Security Enthusiast</span> with hands-on experience in IT gained through internships in <span className="diffColor">Internship Trainee</span> and <span className="diffColor">Information Technology Technician</span>.
        My background includes a solid foundation in <span className="diffColor">IT infrastructure</span>, with skills in networking, system administration (Linux and Windows Server), and the use of tools like <span className="diffColor">SIEM</span> (Splunk, QRadar) for threat detection and initial incident response.
        <br />
        <br />
        My focus is on strengthening security frameworks through proactive threat detection, task automation (<span className="diffColor">using Python and Bash</span>), and safeguarding organizational assets. With knowledge of cloud security principles (<span className="diffColor">Azure</span>) and frameworks such as ISO 27001 and GDPR, I aim to implement cybersecurity strategies that prioritize data protection, network security, and operational resilience.
        <br />
        <br />
        Driven by continuous learning and collaboration, my goal is to contribute to security-oriented teams by providing innovative and effective solutions to tackle today’s cybersecurity challenges.
        </p>
        <br />
        <p className="title">EXPERIENCE</p>
        <p className="about-me-desc">
          <span className="diffColor">IT Technician - @FLL ( March 2024 - June 2024 )</span>
          <br />
          After demonstrating my capabilities during the initial internship, I transitioned into the role of IT Technician for the next 4 months. 
          In this role, I executed <span className="diffColor">IT operations</span> under supervision, including OS updates, patch management, and certificate management, 
          to improve system stability and performance. I managed <span className="diffColor">Linux environments</span>, performed routine maintenance, 
          and deployed security patches to ensure system integrity.
          <br />
          <br />
          Additionally, I applied basic <span className="diffColor">networking principles</span> to troubleshoot technical issues and supported system compatibility testing. 
          Collaborating with IT teams to address infrastructure challenges and implement solutions further enhanced my technical expertise 
          and teamwork skills. This experience deepened my passion for <span className="diffColor">IT operations</span> and revealed the importance of proactive maintenance 
          and collaboration in building a strong technical framework.
          <br />
          <br />
          <span className="diffColor">Internship Trainee – @FLL ( November 2023 - February 2024 )</span>
          <br />
          During my first 4 months as an Internship Trainee at FLL, I gained hands-on experience in <span className="diffColor">IT support</span> by monitoring, triaging, 
          and routing support tickets to ensure timely resolution and maintain an efficient workflow. I provided comprehensive customer 
          service through both phone and face-to-face interactions, ensuring a positive experience for end-users.
          <br />
          <br />
          This role allowed me to develop <span className="diffColor">foundational skills</span> in troubleshooting system problems and communicating technical 
          information clearly and professionally. I also contributed to quality control processes, which helped improve operational efficiency. 
          This experience deepened my understanding of IT support and highlighted the importance of clear communication 
          and proactive <span className="diffColor">problem-solving</span> in delivering excellent customer service.
        </p>
      </div>
    </div>
  );
};

export default About;
