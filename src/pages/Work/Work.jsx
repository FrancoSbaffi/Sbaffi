import React from "react";
import "./work.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import WorkItem from "./WorkItem";

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
          workName="Advent of Cyber '24"
          workDate="December 2024"
          type="blog"
          url="/post/advent-of-cyber-24"
        />
        <WorkItem
          videoUrl="/work/second-video.webm"
          containerHeight="200"
          workName="Biohazard"
          workDate="April 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/security.mp4"
          containerHeight="500"
          workName="Dockerized Multi-Service Application"
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
          workName="Monday Monitor"
          workDate="January 2025"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/win-infra.jpg"
          containerHeight="450"
          workName="Mr Robot CTF"
          workDate="April 2024"
          type="img"
          url="/post"
        />
      </div>

      <div className="col">
        <WorkItem
          videoUrl="/work/vanish-input.mp4"
          containerHeight="200"
          workName="Uranium CTF"
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
          workName="Jacob The Boss"
          workDate="June 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/wireframe.jpg"
          containerHeight="450"
          workName="NahamStore"
          workDate="December 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/fractional-slider.mp4"
          containerHeight="200"
          workName="Bounty Hacker"
          workDate="March 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/guy.jpg"
          containerHeight="450"
          workName="Attacktive Directory"
          workDate="October 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/buttons1.mp4"
          containerHeight="200"
          workName="Gatekeeper"
          workDate="February 2024"
          type="img"
          url="/post"
        />
      </div>

      <div className="col">
        <WorkItem
          imgUrl="/work/og-depth.webp"
          containerHeight="250"
          workName="Tropic Trooper Investigation"
          workDate="December 2024"
          type="article"
          url="/post/tropic-trooper"
        />
        <WorkItem
          videoUrl="/work/fifth-video.webm"
          containerHeight="350"
          workName="Python Port Scanner"
          workDate="April 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/gooey.mp4"
          containerHeight="400"
          workName="Anthem"
          workDate="May 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/flume.mp4"
          containerHeight="200"
          workName="hc0n Christmas CTF"
          workDate="August 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          imgUrl="/work/geist-illustration-light.webp"
          containerHeight="500"
          workName="Mother's Secret"
          workDate="January 2024"
          type="img"
          url="/post"
        />
        <WorkItem
          videoUrl="/work/stripes.mp4"
          containerHeight="450"
          workName="Develpy"
          workDate="February 2025"
          type="img"
          url="/post"
        />
      </div>
    </div>
  );
};

export default Work;
