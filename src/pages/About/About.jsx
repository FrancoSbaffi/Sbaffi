import React, { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap";

const About = () => {
  const pageRef = useRef(null);

  
  useEffect(() => {
    gsap.to(pageRef.current, { opacity: 1, duration: 1, ease: "power2.out" });
  }, []);

  return (
    <div className="page about" ref={pageRef}>
      
      <section className="about-header">
        <h1>MEET</h1>
        <h1>FRAN</h1>
      </section>

      
      <section className="about-hero">
        <div className="about-hero-img">
          <img src="/About/about-hero.jpg" alt="Hero" />
        </div>
      </section>

      
      <section className="about-me-copy">
        <div className="about-me-copy-wrapper">
          <h3>
            I'm&nbsp;Franco&nbsp;Sbaffi — a Cybersecurity Specialist attuned to human
            behavior, silent system anomalies, and the hidden narratives in
            network traffic. My work spans log analysis, vulnerability
            assessments, and incident response.
          </h3>
          <h3>
            For me, cybersecurity isn’t just about logs — it’s about what those
            signals reveal. I believe in subtle patterns, layered defenses, and
            integrity in every protection.
          </h3>
          <h3>
            Each security challenge is an invitation to outsmart threats; a
            puzzle whose pieces form trust. When an attack is thwarted —
            that’s the story I live to tell.
          </h3>
        </div>
      </section>

      
      <section className="services">
        {/* Banner lateral */}
        <div className="services-col">
          <div className="services-banner">
            <img src="/About/services-banner.jpg" alt="Services banner" />
          </div>
          <p className="primary">Fortified&nbsp;with&nbsp;Intent</p>
        </div>

        
        <div className="services-col">
          <h4>
            Every engagement is a chance to chart new threat landscapes and push
            defensive boundaries. I tackle each assessment with care, precision,
            and purpose.
          </h4>

          <div className="services-list">
            <div className="service-list-row">
              <div className="service-list-col">
                <h5>EXPERIENCE</h5>
              </div>
              <div className="service-list-col">
                <p>
                  Managed 8-10 support tickets per week while sustaining a 95 %
                  SLA; authored a knowledge-base article that cut repeat
                  inquiries by 15 %; and wrote a Bash script to automate monthly
                  backup verifications, saving roughly one hour each month.
                </p>
              </div>
            </div>

            
            <div className="service-list-row">
              <div className="service-list-col">
                <h5>EDUCATION</h5>
              </div>
              <div className="service-list-col">
                <p>
                  Associate of Science in Information Technology (ISTEA,
                  GPA 9.2/10). Complemented by Coursera cybersecurity
                  specializations and hands-on labs in TryHackMe.
                </p>
              </div>
            </div>

      
            <div className="service-list-row">
              <div className="service-list-col">
                <h5>CERTIFICATIONS</h5>
              </div>
              <div className="service-list-col">
                <p>
                  CompTIA Network+, CompTIA Linux+, CompTIA Security+, Microsoft AZ-900
                  and Splunk Core User. Always eager for the next one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="about-banner-img">
        <div className="about-banner-img-wrapper">
          <img src="/About/about-banner.jpg" alt="Banner" />
        </div>
      </section>

      
      <section className="fav-tools">
        <div className="fav-tools-header">
          <p className="primary sm">Daily Stack</p>
          <h2 className="title-stack">Some Tools</h2>
          <p className="secondary">
            Linux, Wireshark and other cutting-edge technologies keep my
            defensive toolkit nimble and effective.
          </p>
        </div>

        
        <div className="fav-tools-list">
          <div className="fav-tools-list-row">
            <ToolCard img="/About/tool-1.jpg" title="Linux" subtitle="Operating System" />
            <ToolCard img="/About/tool-2.jpg" title="Wireshark" subtitle="Traffic Analyzer" />
            <ToolCard img="/About/tool-3.jpg" title="Nmap" subtitle="Network Scanner" />
          </div>
          <div className="fav-tools-list-row">
            <ToolCard img="/About/tool-4.jpg" title="Splunk" subtitle="SIEM" />
            <ToolCard img="/About/tool-5.jpg" title="Python" subtitle="Scripting" />
            <ToolCard img="/About/tool-6.jpg" title="Azure" subtitle="Cloud Platform" />
          </div>
        </div>
      </section>
    </div>
  );
};

const ToolCard = ({ img, title, subtitle }) => (
  <div className="fav-tool">
    <div className="fav-tool-img">
      <img src={img} alt={title} />
    </div>
    <h4>{title}</h4>
    <p className="primary sm">{subtitle}</p>
  </div>
);

export default About;

