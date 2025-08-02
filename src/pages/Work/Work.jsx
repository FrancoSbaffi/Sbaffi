import React from "react";
import "./work.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import WorkItem from "./WorkItem";
import WorkImage1 from "../../assets/work/work-1.jpg";
import WorkImage2 from "../../assets/work/work-2.jpg";
import WorkImage3 from "../../assets/work/work-3.jpg";
import WorkImage4 from "../../assets/work/work-4.jpg";
import WorkImage5 from "../../assets/work/work-5.jpg";
import WorkImage6 from "../../assets/work/work-6.jpg";
import WorkImage7 from "../../assets/work/work-7.jpg";
import WorkImage8 from "../../assets/work/work-8.jpg";
import WorkImage9 from "../../assets/work/work-9.jpg";
import WorkImage10 from "../../assets/work/work-10.jpg";
import WorkImage11 from "../../assets/work/work-11.jpg";
import WorkImage12 from "../../assets/work/work-12.jpg";
import WorkImage13 from "../../assets/work/work-13.jpg";
import WorkImage14 from "../../assets/work/work-14.jpg";
import WorkImage15 from "../../assets/work/work-15.jpg";
import WorkImage16 from "../../assets/work/work-16.jpg";
import WorkImage17 from "../../assets/work/work-17.jpg";
import WorkImage18 from "../../assets/work/work-18.jpg";
import WorkImage19 from "../../assets/work/work-19.jpg";
import WorkImage20 from "../../assets/work/work-20.jpg";
import WorkImage21 from "../../assets/work/work-21.jpg";
import WorkImage22 from "../../assets/work/work-22.jpg";
import WorkImage23 from "../../assets/work/work-23.jpg";
import WorkImage24 from "../../assets/work/work-24.jpg";
import WorkImage25 from "../../assets/work/work-25.jpg";
import WorkImage26 from "../../assets/work/work-26.jpg";
import WorkImage27 from "../../assets/work/work-27.jpg";
import WorkImage28 from "../../assets/work/work-28.jpg";
import WorkImage29 from "../../assets/work/work-29.jpg";
import WorkImage30 from "../../assets/work/work-30.jpg";
import WorkImage31 from "../../assets/work/work-31.jpg";
import WorkImage32 from "../../assets/work/work-32.jpg";
import WorkImage33 from "../../assets/work/work-33.jpg";
import WorkImage34 from "../../assets/work/work-34.jpg";
import WorkImage35 from "../../assets/work/work-35.jpg";
import WorkImage36 from "../../assets/work/work-36.jpg";
import WorkImage37 from "../../assets/work/work-37.jpg";
import WorkImage38 from "../../assets/work/work-38.jpg";
import WorkImage39 from "../../assets/work/work-39.jpg";
import WorkImage40 from "../../assets/work/work-40.jpg";
import WorkImage41 from "../../assets/work/work-41.jpg";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".col .work-item", { y: 300, stagger: 0.025, opacity: 0 });
    },
    { scope: container }
  );

  return (
    <div className="container page-work" ref={container}>
      <div className="col">
        <WorkItem
          videoUrl="/work/flume.mp4"
          containerHeight="300"
          workName="Friday Overtime"
          workDate="December 2024"
          type="blog"
          url="/post/friday-overtime"
        />
        <WorkItem
          videoUrl="/work/second-video.webm"
          containerHeight="200"
          workName="Password Policy Assessment"
          workDate="April 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/security.mp4"
          containerHeight="500"
          workName="Incident Response Playbook"
          workDate="July 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/graph-slider-2.mp4"
          containerHeight="350"
          workName="Network Traffic Analysis"
          workDate="January 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/peach.mp4"
          containerHeight="250"
          workName="Honeypot Deployment"
          workDate="January 2025"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/win-infra.jpg"
          containerHeight="450"
          workName="Security Policy Creation"
          workDate="April 2024"
          type="img"
          url="/post"
        />
      </div>

      <div className="col">
        <WorkItem
          videoUrl="/work/vanish-input.mp4"
          containerHeight="200"
          workName="Secure API Testing"
          workDate="November 2024"
          type="img"
          url="/post"
          playbackRate={0.5}
        />
        <WorkItem
          imgUrl="/work/name.jpg"
          containerHeight="350"
          workName="Windows Server Administration"
          workDate="February 2024"
          type="article"
          url="/post/pentesting"
        />
        <WorkItem
          videoUrl="/work/shell.mp4"
          containerHeight="300"
          workName="Dark Web Monitoring"
          workDate="June 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/wireframe.jpg"
          containerHeight="450"
          workName="DNS Security Configuration"
          workDate="December 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/fractional-slider.mp4"
          containerHeight="200"
          workName="Security Policy Gap Analysis"
          workDate="March 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/guy.jpg"
          containerHeight="450"
          workName="Wi-Fi Security Assessment"
          workDate="October 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/buttons1.mp4"
          containerHeight="200"
          workName="Botnet Simulation"
          workDate="February 2024"
          type="img"
          url="/post"
        />
      </div>

      <div className="col">
        <WorkItem
          imgUrl="/work/og-depth.webp"
          containerHeight="250"
          workName="Log File Analyzer"
          workDate="December 2024"
          type="article"
          url="/post/log-file-analyzer"
        />
        <WorkItem
          videoUrl="/work/fifth-video.webm"
          containerHeight="350"
          workName="Network Packet Sniffer"
          workDate="April 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/gooey.mp4"
          containerHeight="400"
          workName="Port Scanner"
          workDate="May 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/flume.mp4"
          containerHeight="200"
          workName="Security Automation Script"
          workDate="August 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/geist-illustration-light.webp"
          containerHeight="500"
          workName="Cybersecurity Quiz Bot"
          workDate="January 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/stripes.mp4"
          containerHeight="450"
          workName="Browser History Analyzer"
          workDate="February 2025"
          type="img"
          url="/post"
        />
      </div>
    </div>
  );
};

export default Work;
