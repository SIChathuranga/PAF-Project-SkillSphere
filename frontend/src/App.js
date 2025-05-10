// src/App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Comments from './pages/Comments';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  // Sample posts data

  return (

      <Router>
      <div className="w-full min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
