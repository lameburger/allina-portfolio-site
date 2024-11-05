import React, { useState, useEffect } from 'react';
import './Me.css';
import { useNavigate } from 'react-router-dom';

function Me() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [greeting, setGreeting] = useState('');
    const navigate = useNavigate();

    // Determine greeting based on the time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good morning');
        } else if (hour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }
    }, []);

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
                {greeting}. My name is Allina and I am currently an Honors student at the University of Kansas studying architecture. My motivation and energy to create is fueled by a desire to share.
                <br /><br />
                I believe architecture, ideally, is an act of service. Creating living solutions for every possible user, architecture is a practice that flourishes in its application of interdisciplinary work. In the same vein, art and performance, first and foremost, is a shared experience that I believe is at its best in its intersections.
            </p>
            <hr className="divider" />
            <div className="description">
                <p>If you want to know me better I'd tell you I love making music with others, I spent a lot of my life playing with many orchestras, but started my own indie rock band. My favorite movies include <em>Moonrise Kingdom</em>, <em>Minari</em>, and <em>Good Will Hunting</em>. I have too many baby photos (love you mom).</p>
            </div>
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