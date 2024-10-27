import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState("paintings");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const galleryRef = useRef();
    const navigate = useNavigate();

    const categories = {
        paintings: [
            { src: '/works/fly.JPG', caption: 'fly guy' },
            { src: '/works/painting.jpg', caption: 'melodrama' },
            { src: '/works/painting4.jpg', caption: 'a cowboy' },
            { src: '/works/work1.png', caption: 'more melodrama' },
            { src: '/works/work2.png', caption: 'ghouly' },
            { src: '/works/work3.png', caption: 'this would look good in front of a garbage bin' },
            { src: '/works/work4.png', caption: 'shoulders' },
            { src: '/works/work5.png', caption: 'hollow' }
        ],
        spaces: [],
        projections: []
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }, { threshold: 0.3 });

        const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
        galleryItems.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, [selectedCategory]);

    const handleIconClick = () => {
        setIsTransitioning(true);
        setTimeout(() => navigate('/'), 500); // Redirect to home after transition
    };

    return (
        <>
            <div className={`portfolio-container ${isTransitioning ? 'transition-active' : ''}`}>
                <img
                    src="/images/eden.png"
                    alt="Home Icon"
                    className="corner-icon"
                    onClick={handleIconClick}
                    style={{ cursor: 'pointer' }}
                />
                
                {/* Horizontal scrollable section selector */}
                <div className="scroll-selector">
                    {["Paintings", "Spaces", "Projections"].map((category, index) => (
                        <button
                            key={index}
                            className={`scroll-tab ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.toLowerCase())}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="gallery" ref={galleryRef}>
                    {categories[selectedCategory].length > 0 ? (
                        categories[selectedCategory].map((item, index) => (
                            <div key={index} className="gallery-item">
                                <img src={item.src} alt={item.caption} className="gallery-image" />
                                <p className="image-caption">{item.caption}</p>
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">No content available in this section.</p>
                    )}
                </div>
            </div>

            {isTransitioning && <div className="black-transition"></div>}
        </>
    );
}

export default Portfolio;