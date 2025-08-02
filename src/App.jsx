
import React from "react";
import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import Dock from "./components/Dock/Dock";
import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import Projects from "./pages/Projects/Projects";

import Post from "./pages/Post/Post";
import About from "./pages/About/About";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <>
      {!isHomePage && <Dock />}
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:id" element={<Post />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
