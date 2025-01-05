import React from "react";
import "./projects.css";
import { Link } from "react-router-dom";
import { useScramble } from "use-scramble";

const useMultipleScrambles = (projects) => {
  return projects.map((project) => {
    const { ref: titleRef } = useScramble({
      text: project.title,
      speed: 1000,
    });
    const { ref: copyRef } = useScramble({
      text: project.copy,
      speed: 1000,
    });
    return { ...project, titleRef, copyRef };
  });
};

const Projects = () => {
  const projectData = [
    {
      id: "workstation",
      title: "My Workstations",
      copy: "Introduction to my workstations",
      year: "2025",
    },
    {
      id: "Compliance",
      title: "Compliance and Regulations",
      copy: "NIST CSF, ISO 27001",
      year: "2025",
    },
    {
      id: "red-blue",
      title: "Red Team vs. Blue Team",
      copy: "Differences and Similarities",
      year: "2025",
    },
    {
      id: "cyber-security-trends",
      title: "Trends in Cyber Security",
      copy: "Insights and Innovations",
      year: "2024",
    },
    {
      id: "windows-server",
      title: "Managing Windows Server",
      copy: "Setup, Roles, and Policies",
      year: "2024",
    },
    {
      id: "cloud-certifications",
      title: "Cloud Certifications",
      copy: "Decide the best one for you",
      year: "2024",
    },
    /*
    {
      title: "AI for Predictive Analysis",
      copy: "Integrating AI to predict trends",
      year: "2023",
    },
    {
      title: "Blockchain Development",
      copy: "Developing secure blockchain systems for applications",
      year: "2025",
    },
    {
      title: "Advanced Data Analytics",
      copy: "Utilizing big data to drive enterprise growth",
      year: "2022",
    },
    {
      title: "Virtual Reality Content Creation",
      copy: "Creating immersive VR for education",
      year: "2023",
    },
    {
      title: "E-commerce Optimization",
      copy: "Enhancing online shopping through tailored e-com",
      year: "2024",
    },
    {
      title: "Smart Technologies",
      copy: "Integrating smart technology",
      year: "2025",
    },
  */
  ];

  const scrambledProjects = useMultipleScrambles(projectData);

  return (
    <div className="container page-projects">
      {scrambledProjects.map((project, index) => (
        <Link to={`/post/${project.id}`} key={index}>
          <div className="project-item">
            <div className="project-title">
              <p ref={project.titleRef}>{project.title}</p>
            </div>
            <div className="project-copy">
              <p ref={project.copyRef}>{project.copy}</p>
            </div>
            <div className="project-divider"></div>
            <div className="project-year">
              <p>{project.year}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Projects;
