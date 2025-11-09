import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Me from './pages/Me';
import './App.css'; // Add some styles for the navbar (see below)

function App() {
  return (
    <Router>
      <div className="app">
        
        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;