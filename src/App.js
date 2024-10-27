import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Me from './pages/Me';

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </Router>
  );
}

export default App;