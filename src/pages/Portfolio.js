import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const ImageGallery = () => {
    const images = [
        { src: 'works/1.mp4', heading: 'Paper Module' },
        { src: 'works/1.png', heading: 'Above' },
        { src: 'works/2.mp4', heading: 'Above, Subtracted' },
        { src: 'works/oops.jpg', heading: 'Corner' },
        { src: 'works/3.mp4', heading: 'Shoulder', pushDown: true },
        { src: 'works/4.png', heading: 'Core' },
        { src: 'works/4.mp4', heading: 'Inside' },
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0',
                flexWrap: 'wrap', // Wrap content on smaller screens
            }}
        >
            
            {/* Image Section */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                    width: '100%', // Full width for smaller devices
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            width: '100%', // Responsive width
                            height: 'auto', // Let the height adjust proportionally
                            maxWidth: '900px', // Limit the maximum width
                            margin: '0 auto', // Center on mobile
                            padding: '0',
                            display: 'flex',
                            justifyContent: 'center', // Center horizontally
                        }}
                    >
                        {image.src.endsWith('.mp4') ? (
                            <video
                                src={image.src}
                                autoPlay
                                loop
                                muted
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    margin: '0',
                                    padding: '0',
                                    marginTop: image.pushDown ? '0px' : '0', // Push video down
                                }}
                            />
                        ) : (
                            <img
                                src={image.src}
                                alt={`Work ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    margin: '0',
                                    padding: '0',
                                }}
                            />
                        )}
                        <h1
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                color: '#FF8096',
                                fontSize: 'clamp(4em, 5vw, 5em)', // Scales with screen size
                                margin: 0,
                                borderRadius: '5px',
                                fontFamily: 'Aptos, sans-serif',
                            }}
                        >
                            {image.heading}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState("structures");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const galleryRef = useRef();
    const navigate = useNavigate();

    const categories = {
        structures: [
            //{ src: '/works/phone.png', caption: 'Collage model, ARCH 108', description: "", width: "40%" },
        ],
        art: [
            { src: '/works/fly.JPG', caption: 'Cycle', description: "Faced with imposing limits, the fly is an uncomfortable confrontation. With short life spans the life cycle of a fly inspired this hostile and uncomfortable presentation of a fly.", size: "Size: 29.5 x 40 inches", materials: "Acrylic on canvas", width: "40%" },
            { src: '/works/painting.jpg', caption: 'Pruning', description: "Inspired by Sylvia Plath's fig tree in the Bell Jar, Pruning is a vivid reimaging of limitations. With potential futures lying before, all with different landscapes depicted in contrasting textures, this piece wanted to capture the tension between deciding how we select our paths. While some choices may seem mutually exclusive, Pruning attempts to depict a vivid environment where they balance with each other and thrive off each other.", size: "Size: 32 x 18 inches", materials: "Materials: Acrylic on Canvas", width: "40%" },
            { src: '/works/painting4.jpg', caption: 'Cowboy', description: " Although cowboys may have found themselves obsolete with the invention of barbed wire, they live on the American zeitgeist. Existing beyond the bounds of their historical input, Cowboys and their culture have achieved a mythical status within pop culture. Capturing that energy required a exaggerated canvas spanning 48 inches by 36 inches.", size: "Size: 48 x 36 inches", materials: "Materials: Acrylic on canvas", width: "30%" },
            { src: '/works/pencil.png', caption: 'Return', description: " A collage of sensations exaggerated by time. When memories return more vivid and vibrant upon recollection, Return calls a bright and wonderous sense.", size: "11.5 x 8 inches", materials: "Materials: Colored Pencil on Illustration Board", width: "40%" },
            { src: '/works/work2.png', caption: 'Spill', description: "In environments that seem to be changing rapidly before our eyes, there is an unbound and reckless freedom. The force nature possesses is one that cannot be controlled nor contained. Utilizing wax to contain cold water fabric dyes to select sections of cloth, the dye continues to seep through. ", size: "Size: 32 x 24 inches", materials: "Materials: Wax, cold water dye, muslin cloth", width: "35%" },
            { src: '/works/work3.png', caption: 'Prairie Dreams', description: "Inspired by the living and almost breathing aspects of a prairie, “Prairie Dreams” mimics the movement of the Flint Hills. The unique and beautiful landscape holds a significant presence in the community of Manhattan, Kansas. Combining the movement of post-impressionist painters and the drama of stark contrasting colors, the vibrant image is an homage to a bright and enduring landscape. “Prairie Dreams” is now a temporary installation for the Anderson Knight Architecture Firm. After being selected from their 2023 art competition, this piece now lives in front of a trash enclosure, beautifying a previously looked over part of an office complex.", size: "Size: 12 x 24 inches", materials: "Materials: Acrylic on Canvas", width: "55%" },
            { src: '/works/work4.png', caption: 'Reactionary', description: "In the energy of a reaction, his sharp words pierce through the air. Overwhelmed with undefined emotions, a reaction is marked with outbursts lined with lingering memories of similar pain or joy.", size: "Size: 11.5 x 8 inches", materials: "Materials: Colored Pencil on Paper", width: "35%" },
            { src: '/works/work5.png', caption: 'Rings', description: "While seasons change, trees hold fast firmly watching everything around them change. Unmoving themselves, this removed experience of time and change inspired a hand carved linoleum print.", size: "Size: 18 x 12 inches", materials: "Materials: Linoleum Print, Speedball ink, Illustration Board", width: "30%" }
        ],
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
                    {["Structures", "Art", "Projections"].map((category, index) => (
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
                                    {item.size} <br />
                                    {item.materials}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Add the ImageGallery component here for the spaces category */}
                    {selectedCategory === 'structures' && <ImageGallery />}
                </div>
            </div>

            {isTransitioning && <div className="black-transition"></div>}
        </>
    );
}

export default Portfolio;