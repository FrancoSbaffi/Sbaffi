import React from "react";
import { Link } from "react-router-dom";
import "./dock.css";
import { useDisplacementEffect } from "./useDisplacementEffect";
import {
  FaHome,
  FaInfoCircle,
  FaPalette,
  FaFlask,
  FaPen,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";

const DockItem = ({
  IconComponent,
  path,
  external,
}) => {
  return (
    <div className="dock-item">
      {external ? (
        <a 
          href={path} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dock-item-link-wrap">
            <IconComponent size="14px" />
          </div>
        </a>
      ) : (
        <Link 
          to={path}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dock-item-link-wrap">
            <IconComponent size="14px" />
          </div>
        </Link>
      )}
    </div>
  );
};

// Dock component
const Dock = ({ isVisible = true }) => {
  const { filterRef } = useDisplacementEffect();

  const icons = [
    { icon: FaHome, path: "/" },
    { icon: FaInfoCircle, path: "/about" },
            { icon: FaFlask, path: "/labs" },
    { icon: FaPen, path: "/writings" },
    {
      icon: FaLinkedin,
      path: "https://www.linkedin.com/in/franco-sbaffi/",
      external: true,
    },
    { icon: SiTryhackme, path: "https://tryhackme.com/p/sb4ff1", external: true },
  ];

  return (
    <div 
      className={`dock-container ${isVisible ? 'dock-visible' : 'dock-hidden'}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
        transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out'
      }}
    >
      <div className="dock">
        <div className="nav-wrap">
          <nav>
            {icons.map((item, index) => (
              <DockItem
                key={index}
                IconComponent={item.icon}
                path={item.path}
                external={item.external}
              />
            ))}
          </nav>
        </div>
      </div>
      
      {/* SVG Filter para el efecto de displacement */}
      <svg ref={filterRef} className="filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="filter" colorInterpolationFilters="sRGB">
            {/* the input displacement image */}
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="map"
            ></feImage>
            {/* RED channel with strongest displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            {/* GREEN channel (reference / least displaced) */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />
            {/* BLUE channel with medium displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="bluechannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />
            {/* Blend channels back together */}
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            {/* output blend */}
            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Dock;
