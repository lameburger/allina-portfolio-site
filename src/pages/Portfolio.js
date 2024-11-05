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
            { src: '/works/fly.JPG', caption: 'Cycle', description: "Faced with imposing limits, the fly is an uncomfortable confrontation. With short life spans the life cycle of a fly inspired this hostile and uncomfortable presentation of a fly.", size: "29.5 x 40 inches", materials: "Acrylic on canvas", width: "40%" },
            { src: '/works/painting.jpg', caption: 'Pruning', description: "Inspired by Sylvia Plath's fig tree in the Bell Jar, Pruning is a vivid reimaging of limitations. With potential futures lying before, all with different landscapes depicted in contrasting textures, this piece wanted to capture the tension between deciding how we select our paths. While some choices may seem mutually exclusive, Pruning attempts to depict a vivid environment where they balance with each other and thrive off each other.", size: "32 x 18 inches", materials: "Acrylic on Canvas", width: "40%" },
            { src: '/works/painting4.jpg', caption: 'Cowboy', description: " Although cowboys may have found themselves obsolete with the invention of barbed wire, they live on the American zeitgeist. Existing beyond the bounds of their historical input, Cowboys and their culture have achieved a mythical status within pop culture. Capturing that energy required a exaggerated canvas spanning 48 inches by 36 inches.", size: "48 x 36 inches", materials: "Acrylic on canvas", width: "25%" },
            { src: '/works/work1.png', caption: 'Return', description: " A collage of sensations exaggerated by time. When memories return more vivid and vibrant upon recollection, Return calls a bright and wonderous sense.", size: "11.5 x 8 inches", materials: "Colored Pencil on Illustration Board", width: "40%" },
            { src: '/works/work2.png', caption: 'ghouly', description: "Waiting for Allina to send", size: "32 x 24 inches", materials: "Wax, cold water dye, muslin cloth", width: "40%" },
            { src: '/works/work3.png', caption: 'this would look good in front of a garbage bin', description: "Waiting for Allina to send", size: "12 x 24 inches", materials: "Acrylic on Canvas", width: "55%" },
            { src: '/works/work4.png', caption: 'shoulders', description: "Waiting for Allina to send", size: "11.5 x 8 inches", materials: "Colored Pencil on Paper", width: "50%" },
            { src: '/works/work5.png', caption: 'hollow', description: "Waiting for Allina to send", size: "18 x 12 inches", materials: "Linoleum Print, Speedball ink, Illustration Board", width: "50%" }
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
        }, { threshold: 0.5 });

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
                    {categories[selectedCategory].map((item, index) => (
                        <div key={index} className="gallery-item">
                            <img
                                src={item.src}
                                alt={item.caption}
                                className="gallery-image"
                                style={{ width: item.width || "80%" }} // Apply specified width or default to 80%
                            />
                            <div className="description-container">
                                <p className="image-caption">{item.caption}</p>
                                <p className="description-text">{item.description}</p>
                                <p className="details">
                                    <em>Size:</em> {item.size} <br />
                                    <em>Materials:</em> {item.materials}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isTransitioning && <div className="black-transition"></div>}
        </>
    );
}

export default Portfolio;
