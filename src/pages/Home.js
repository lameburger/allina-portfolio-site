import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        setIsTransitioning(true);
        
        // Navigate after the transition
        setTimeout(() => {
            navigate(path);
        }, 800); // Adjust to match CSS animation duration
    };

    return (
        <div className="home-container">
            {isTransitioning && <div className="fade-transition"></div>}
            <div className="name-overlay"></div>
            <div className="centered-image"></div>
            <div className="link-container">
                <a href="/me" onClick={(e) => { e.preventDefault(); handleLinkClick('/me'); }}>Me</a>
                <a href="/portfolio" onClick={(e) => { e.preventDefault(); handleLinkClick('/portfolio'); }}>My Work</a>
            </div>
        </div>
    );
}

export default Home;