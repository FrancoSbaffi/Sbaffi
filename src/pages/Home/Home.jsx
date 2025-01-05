import React from "react";
import Spline from "@splinetool/react-spline";
import "./home.css";

import { FaSquareFull } from "react-icons/fa";

import LiveClockUpdate from "../../components/LiveClockUpdate/LiveClockUpdate";

const Home = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Spline scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />
      </div>

      <div className="hero-header">
        <h1>Franco Sbaffi / Cyber Security Specialist</h1>
      </div>

      <div className="home-logo">
        <FaSquareFull size="16px" style={{ color: "#fff" }} />
      </div>

      <div className="live-clock">
        <LiveClockUpdate />
      </div>
    </>
  );
};

export default Home;
