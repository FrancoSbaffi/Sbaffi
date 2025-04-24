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
            src="/me.jpg" 
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
          <h2>Experience & Certifications</h2>
          <p className="experience-description">
            IT Support at @FLL during 1 year.
            <br />
            <span className="experience-details">
            Managed 8–10 support tickets per week while sustaining a 95 % SLA; authored a 
            knowledge-base article that cut repeat inquiries by 15 %; and wrote a Bash script to 
            automate monthly backup verifications, saving roughly one hour each month.
            </span>
          </p>
          </div>
        <div className="services-right">
          <p className="experience-description">
            <br />
            <span className="experience-details">
            Currently certified in networks with <b>CompTIA Network+</b>, <b>CompTIA Linux+</b>, 
            <b>Microsoft AZ-900</b>, <b>Splunk Core User</b> and <b>CompTIA Security+</b>, I want to continue expanding my knowledge 
            with more and better certifications.
            </span>
          </p>
          </div>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default About;
