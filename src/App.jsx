
import React from "react";
import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import Dock from "./components/Dock/Dock";
import Home from "./pages/Home/Home";
import Labs from "./pages/Labs/Labs";
import Writings from "./pages/Writings/Writings";

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
        <Route path="/labs" element={<Labs />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/post/:id" element={<Post />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
