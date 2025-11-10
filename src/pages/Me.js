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
            <img src="/images/me.JPEG" alt="Profile" className="profile-image" />
            <p className="description">
                {greeting}. My name is Allina and I am currently an Honors student at the University of Kansas studying architecture. My motivation and energy to create is fueled by a desire to share.
                <br /><br />
                I believe architecture, ideally, is an act of service. Creating living solutions for every possible user, architecture is a practice that flourishes in its application of interdisciplinary work. In the same vein, art and performance, first and foremost, is a shared experience that I believe is at its best in its intersections.
            </p>
            <hr className="divider" />
            <div className="description">
                <p>If you want to know me better I'd tell you I love making music with others, I spent a lot of my life playing with many orchestras, but now play at small venues with own emo grunge band. My favorite movies include <em>The Wind Rises</em>, <em>Minari</em>, and <em>Scott Pilgrim vs. the World</em>. I have too many baby photos.</p>
            </div>
            <div className="mom-image-container">
                <img src="/images/mom.jpg" alt="Baby with mom" className="mom-image" />
                <p className="mom-caption">(i love you mom)</p>
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
                <a href="https://pin.it/19YCoTnMq" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="pinterest-link">
                    <svg className="icon-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default Me;
