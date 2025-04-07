import React, { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap";

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    // Efecto fade-in con GSAP al montar el componente
    gsap.to(pageRef.current, { opacity: 1, duration: 1, ease: "power2.out" });
  }, []);

  return (
    <div className="page-container" ref={pageRef}>
      <div className="about-container">
        <div className="left-col">
          <img 
            src="../public/me.jpg" 
            alt="Franco" 
            className="about-image"
          />
        </div>
        <div className="right-col">
          <h2>ABOUT</h2>
          <p>
            I’m Franco, a Cyber Security Enthusiast with hands-on experience in IT 
            gained through internships in IT Trainee and IT Security Operations Support.
            My background includes a solid foundation in IT infrastructure, with skills in 
            networking, system administration (Linux and Windows Server), and the use of 
            tools like SIEM (Splunk) for threat detection and initial incident response.
          </p>
          <p>
            My focus is on strengthening security frameworks through proactive threat detection, 
            task automation (using Python and Bash), and safeguarding organizational assets. 
            With knowledge of cloud security principles (Azure and AWS) and frameworks such as ISO 27001 
            and GDPR or NIST, I aim to implement cybersecurity strategies that prioritize data protection, 
            network security, and operational resilience.
          </p>
          <p>
            Driven by continuous learning and collaboration, my goal is to contribute to 
            security-oriented teams by providing innovative and effective solutions to 
            tackle today’s cybersecurity challenges.
          </p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="services-section">
        <div className="services-left">
          <h2>Experience</h2>
          <p className="experience-description">
            IT Security Intern at @FLL during 6 Months.
            <br />
            <span className="experience-details">
            During my first six months as an IT Security Intern at FLL, 
            I monitored and analyzed support tickets to spot security issues, 
            ensuring prompt resolutions and secure workflows. 
            I also provided both phone and in-person customer service while upholding 
            technical support and security protocols.
            </span>
          </p>
          </div>
        <div className="services-right">
          <p className="experience-description">
            IT Security Operations Support at @FLL during 6 Months.
            <br />
            <span className="experience-details">
            Evolving from my internship, I focused on IT security support for six months. 
            I managed vulnerabilities through OS updates, security patches (including on Linux), 
            proactive maintenance, and certificate management. I also used my networking skills to 
            troubleshoot security issues and collaborated with IT teams to implement secure 
            infrastructure solutions.
            </span>
          </p>
          </div>
      </div>

      <div className="divider"></div>


      <div className="services-section">
        <div className="services-left">
          <h2>CERTIFICATIONS</h2>
          <p>
            I love to continue training and developing in this world, so I constantly follow study 
            guides on professional certifications related to my areas of greatest interest and that 
            can help me in my daily work.
          </p>
        </div>
        <div className="services-right">
          <p>
            Network+, Security+, Certified Network Security Practitioner (CNSP), 
            Microsoft Certified: Azure Fundamentals, Certified in Cybersecurity (CC), 
            Cybersecurity Awareness Certified Associate
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
