import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Control from "./components/Control"; 
import Body from "./components/Body";
import Profile from "./components/Profile"; 
import Leaderboard from "./components/Leaderboard";

import "./App.css";



function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        {/* Make this container grow to fill space */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/controller" element={<Control />} />
            <Route path="/body" element={<Body />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
