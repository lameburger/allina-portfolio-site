import React, { useState } from 'react';
import './Me.css';
import { useNavigate } from 'react-router-dom';

function Me() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();

    const handleIconClick = () => {
        setIsTransitioning(true);

        // Navigate to the home page after the transition animation completes
        setTimeout(() => {
            navigate('/');
        }, 800); // Match this duration to the CSS animation time
    };

    return (
        <div className="me-container">
            {isTransitioning && <div className="fade-transition"></div>}
            <img
                src="/images/eden.png"
                alt="Profile Icon"
                className="corner-icon"
                onClick={handleIconClick}
                style={{ cursor: 'pointer' }}
            />
            <img src="/images/allina.png" alt="Profile" className="profile-image" />
            <p className="description">
                So sorry if this looks like this. I'm going for this colorlessness, and I think it gives it this static and constant feel. Can change it to however you like though:) Anyways, give me some pretentious stuff to write here so you sound really cool (which you are).
            </p>
            <div className="social-links">
                <a href="https://www.instagram.com/allina.dough/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <img src="/icons/spot.png" alt="Instagram" className="icon-image" />
                </a>
                <a href="https://www.linkedin.com/in/allina-dougherty-090398326/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <img src="/icons/linkedin.png" alt="LinkedIn" className="icon-image" />
                </a>
                <a href="https://open.spotify.com/user/shubs232?si=e45887de603a4ce7" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                    <img src="/icons/spotify.png" alt="Spotify" className="icon-image" />
                </a>
            </div>
        </div>
    );
}

export default Me;