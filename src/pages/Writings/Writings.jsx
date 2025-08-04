import React from "react";
import "./writings.css";
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

const Writings = () => {
  const projectData = [
    {
      id: "cybersecurity-roles",
      title: "Understanding Cybersecurity Roles",
      copy: "Where Should Juniors Start and Specialize?",
      year: "2025",
    },
    {
      id: "workstation",
      title: "Workstation",
      copy: "What you need?",
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
    <div className="container page-writings">
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

export default Writings;
