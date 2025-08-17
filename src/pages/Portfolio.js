import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const ImageGallery = () => {
    const [showDescription, setShowDescription] = useState(false);
    const images = [
        { src: 'works/1.mp4', heading: 'Paper Module' },
        { src: 'works/4.png', heading: 'Core' },
        { src: 'works/2.mp4', heading: 'Above, Subtracted' },
        { src: 'works/oops.jpg', heading: 'Corner' },
        { src: 'works/3.mp4', heading: 'Shoulder', pushDown: true },
        { src: 'works/1.png', heading: 'Above' },
        { src: 'works/4.mp4', heading: 'Inside' },
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                width: '100%',
            }}
        >
            {/* Image Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        data-image={image.heading}
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: 'auto',
                            maxWidth: '900px',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {image.src.endsWith('.mp4') ? (
                            <video
                                src={image.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    pointerEvents: 'none',
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
                                }}
                            />
                        )}

                        {/* Mobile-only overlay text */}
                        <h1
                            className="mobile-image-title"
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                transform: 'none',
                                color: '#272EF5',
                                fontSize: 'clamp(2em, 4vw, 3em)',
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

// DatacenterGallery Component
const DatacenterGallery = () => {
    const [currentImage, setCurrentImage] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => prev === 1 ? 2 : 1);
        }, 5000); // Auto transition every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setCurrentImage(2);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setCurrentImage(1);
    };

    return (
        <div className="datacenter-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 20px 0px 20px',
            maxWidth: '900px',
            margin: '0 auto'
        }}>
            <div style={{
                marginBottom: '5px',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(2.5em, 5vw, 4em)',
                    fontWeight: 'bold',
                    color: '#333',
                    letterSpacing: '-0.05em',
                    margin: 0,
                    marginBottom: '10px',
                    textAlign: 'left'
                }}>
                    JHET Architects Internship
                </h1>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1.2em',
                    color: '#666',
                    margin: 0,
                    marginBottom: '5px',
                    textAlign: 'left'
                }}>
                    Freshman Year Summer (2025)
                </p>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1em',
                    color: '#999',
                    margin: 0,
                    textAlign: 'left',
                    fontStyle: 'italic'
                }}>
                    Self-lead project
                </p>
            </div>
            
            <div 
                className="datacenter-image-container"
                style={{
                    position: 'relative',
                    width: '100%',
                    marginBottom: '0px',
                    cursor: window.innerWidth > 768 ? 'pointer' : 'default'
                }}
                onMouseEnter={window.innerWidth > 768 ? handleMouseEnter : undefined}
                onMouseLeave={window.innerWidth > 768 ? handleMouseLeave : undefined}
            >
                <img
                    src={`/datacenter/${currentImage}.jpg`}
                    alt={`Datacenter work ${currentImage}`}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        transition: 'opacity 0.5s ease-in-out'
                    }}
                />
            </div>

            <div style={{
                width: '100%'
            }}>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1em',
                    fontWeight: 'normal',
                    lineHeight: '1.6',
                    color: '#666',
                    margin: 0,
                    textAlign: 'left'
                }}>
                    Respecting the confidentiality of clients and tenants within the Data Center sector makes it difficult to share work and visualizations. For the JHET Architects internship, I created quick nondescript sketches and collages to fill that gap with a goal of bringing warmth and familiarity to buildings traditionally viewed as intimidating.
                </p>
            </div>
        </div>
    );
};

function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState("structures");
    const [activeProject, setActiveProject] = useState("structural-narrative");
    const [activeImage, setActiveImage] = useState("Paper Module");
    const [visitedProjects, setVisitedProjects] = useState(new Set(["structural-narrative"]));
    const [visitedImages, setVisitedImages] = useState(new Set(["Paper Module"]));
    const [showDescription, setShowDescription] = useState(false);
    const [showMotionDescription, setShowMotionDescription] = useState(false);
    const [showEnclosureDescription, setShowEnclosureDescription] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const galleryRef = useRef();
    const navigate = useNavigate();

    const projects = [
        { 
            id: 'structural-narrative', 
            title: 'Structural Narrative',
            images: ['Paper Module', 'Core', 'Above, Subtracted', 'Corner', 'Shoulder', 'Above', 'Inside']
        },
        { 
            id: 'motion-capture', 
            title: 'Motion Capture',
            images: ['Motion Diagram', 'Iteration', 'Final Diagram', 'The Bootcut', 'The Bootcut, Continued']
        },
        { 
            id: 'enclosure', 
            title: 'Enclosure',
            images: ['For Roger', 'Ideation', 'The Bowtie', 'Up Close', 'Aerial', 'Walking Down']
        },
        { 
            id: 'tiny-home', 
            title: 'Tiny Home',
            images: ['Tiny Render']
        }
    ];

    const categories = {
        structures: [
            // Additional structure items can be added here.
        ],
        art: [
            { src: '/works/grids.png', caption: 'Study', description: "Inspired by Korean Pojagi, quiltwork that utilizes the discarded, I explored where we find new and reconnection in what is abandoned. Finding beauty and new mutations in joining of fabrics cut from different cloths, the pojagi become obscured by new forms meshing into new shapes. This quick exploration is just a small study in a greater series.", size: "Size: 5 x 7 inches", materials: "Acrylic on canvas", width: "30%" },
            { src: '/works/fly.JPG', caption: 'Cycle', description: "Faced with imposing limits, the fly is an uncomfortable confrontation. With short life spans the life cycle of a fly inspired this hostile and uncomfortable presentation of a fly.", size: "Size: 29.5 x 40 inches", materials: "Acrylic on canvas", width: "40%" },
            { src: '/works/painting.jpg', caption: 'Pruning', description: "Inspired by Sylvia Plath's fig tree in the Bell Jar, Pruning is a vivid reimaging of limitations. With potential futures lying before, all with different landscapes depicted in contrasting textures, this piece wanted to capture the tension between deciding how we select our paths. While some choices may seem mutually exclusive, Pruning attempts to depict a vivid environment where they balance with each other and thrive off each other.", size: "Size: 32 x 18 inches", materials: "Materials: Acrylic on Canvas", width: "40%" },
            { src: '/works/painting4.jpg', caption: 'Cowboy', description: "Although cowboys may have found themselves obsolete with the invention of barbed wire, they live on the American zeitgeist. Existing beyond the bounds of their historical input, Cowboys and their culture have achieved a mythical status within pop culture. Capturing that energy required a exaggerated canvas spanning 48 inches by 36 inches.", size: "Size: 48 x 36 inches", materials: "Materials: Acrylic on canvas", width: "30%" },
            { src: '/works/pencil.png', caption: 'Return', description: "A collage of sensations exaggerated by time. When memories return more vivid and vibrant upon recollection, Return calls a bright and wonderous sense.", size: "11.5 x 8 inches", materials: "Materials: Colored Pencil on Illustration Board", width: "40%" },
            { src: '/works/work2.png', caption: 'Spill', description: "In environments that seem to be changing rapidly before our eyes, there is an unbound and reckless freedom. The force nature possesses is one that cannot be controlled nor contained. Utilizing wax to contain cold water fabric dyes to select sections of cloth, the dye continues to seep through.", size: "Size: 32 x 24 inches", materials: "Materials: Wax, cold water dye, muslin cloth", width: "35%" },
            { src: '/works/work3.png', caption: 'Prairie Dreams', description: "Inspired by the living and almost breathing aspects of a prairie, “Prairie Dreams” mimics the movement of the Flint Hills. The unique and beautiful landscape holds a significant presence in the community of Manhattan, Kansas. Combining the movement of post-impressionist painters and the drama of stark contrasting colors, the vibrant image is an homage to a bright and enduring landscape. “Prairie Dreams” is now a temporary installation for the Anderson Knight Architecture Firm. After being selected from their 2023 art competition, this piece now lives in front of a trash enclosure, beautifying a previously looked over part of an office complex.", size: "Size: 12 x 24 inches", materials: "Materials: Acrylic on Canvas", width: "55%" },
            { src: '/works/work4.png', caption: 'Reactionary', description: "In the energy of a reaction, his sharp words pierce through the air. Overwhelmed with undefined emotions, a reaction is marked with outbursts lined with lingering memories of similar pain or joy.", size: "Size: 11.5 x 8 inches", materials: "Materials: Colored Pencil on Paper", width: "35%" },
            { src: '/works/work5.png', caption: 'Rings', description: "While seasons change, trees hold fast firmly watching everything around them change. Unmoving themselves, this removed experience of time and change inspired a hand carved linoleum print.", size: "Size: 18 x 12 inches", materials: "Materials: Linoleum Print, Speedball ink, Illustration Board", width: "30%" }
        ],
        projections: [
            // Projections items can be added here.
        ],
        professional: [
            // Professional work items will be handled with custom component
        ]
    };

    useEffect(() => {
        const updateImageStates = () => {
            // Get all images with data-image attributes
            const imageElements = Array.from(galleryRef.current?.querySelectorAll('[data-image]') || []);
            const currentVisited = new Set();
            let currentActive = null;
            
            imageElements.forEach((element) => {
                const imageTitle = element.getAttribute('data-image');
                if (!imageTitle) return;
                
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Check if element is in viewport
                if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
                    currentActive = imageTitle;
                    currentVisited.add(imageTitle);
                }
                // Check if element has been scrolled past (is above viewport)
                else if (rect.bottom < windowHeight * 0.4) {
                    currentVisited.add(imageTitle);
                }
            });
            
            setActiveImage(currentActive);
            setVisitedImages(currentVisited);
            
            // Auto-scroll navigation to active item
            if (currentActive) {
                const navElement = document.querySelector(`[data-nav-item="${currentActive}"]`);
                if (navElement) {
                    navElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    
                    // Check for project sections and update active project
                    const projectId = entry.target.getAttribute('data-project');
                    if (projectId) {
                        setActiveProject(projectId);
                        setVisitedProjects(prev => new Set([...prev, projectId]));
                    }
                }
                
                // Update image states whenever any element intersects
                updateImageStates();
            });
        }, { threshold: 0.1 });

        // Also update on scroll for more responsive highlighting
        const handleScroll = () => {
            updateImageStates();
        };

        const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item, .project-section, [data-image]');
        galleryItems?.forEach((item) => observer.observe(item));
        
        window.addEventListener('scroll', handleScroll);
        
        // Initial update
        updateImageStates();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedCategory]);

    const handleIconClick = () => {
        setIsTransitioning(true);
        setTimeout(() => navigate('/'), 500); // Redirect to home after transition
    };

    const scrollToImage = (imageTitle) => {
        const imageElement = document.querySelector(`[data-image="${imageTitle}"]`);
        if (imageElement) {
            imageElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
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
                    {[
                        { display: "Coursework", value: "structures" },
                        { display: "Art", value: "art" },
                        { display: "Projections", value: "projections" },
                        { display: "Professional", value: "professional" }
                    ].map((category, index) => (
                        <button
                            key={index}
                            className={`scroll-tab ${selectedCategory === category.value ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.value)}
                        >
                            {category.display}
                        </button>
                    ))}
                </div>

                {/* Project Navigation - only show for structures */}
                {selectedCategory === 'structures' && (
                    <div className="project-selector">
                        {projects.map((project) => (
                            <div key={project.id} className="project-nav-item">
                                <h3 className={`project-title ${
                                    visitedProjects.has(project.id) ? 'visited' : 
                                    activeProject === project.id ? '' : 'inactive'
                                }`}>
                                    {project.title}
                                </h3>
                                {project.images.map((imageTitle) => (
                                    <p 
                                        key={imageTitle} 
                                        data-nav-item={imageTitle}
                                        className={`image-title ${
                                            (activeImage === imageTitle && activeProject === project.id) || 
                                            visitedImages.has(imageTitle) ? 'active' : ''
                                        }`}
                                        onClick={() => scrollToImage(imageTitle)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {imageTitle}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                <div className={`gallery ${selectedCategory === 'structures' ? 'structures-gallery' : ''}`} ref={galleryRef}>
                    {selectedCategory === 'projections' ? (
                        <div className="projections-container">
                            <div className="projection-info">
                                <h2>Prairie Tide</h2>
                                <p>
                                    Imposing movement reminiscent of the ocean that once covered Kansas, a permeable reflection into the history of the prairie.
                                </p>
                            </div>
                            <video
                                src="/works/projection.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="projection-video"
                            />
                        </div>
                    ) : selectedCategory === 'professional' ? (
                        <DatacenterGallery />
                    ) : (
                        <>

                            
                            {categories[selectedCategory].map((item, index) => (
                                <div key={index} className="gallery-item">
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="gallery-image"
                                        style={{ width: item.width || "80%" }}
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

                            {selectedCategory === 'structures' && (
                                <>
                                    {/* Structural Narrative Project */}
                                    <div className="project-section" data-project="structural-narrative">
                                        <ImageGallery />
                                    </div>
                                    
                                    {/* Description Button and Divider */}
                                    <div className="project-divider">
                                        <div className="project-divider-content">
                                            <button
                                                className="divider-toggle-btn"
                                                onClick={() => setShowDescription(!showDescription)}
                                                style={{
                                                    textDecoration: 'none',
                                                    position: 'absolute',
                                                    left: '0px',
                                                    top: '-25px'
                                                }}
                                            >
                                                {showDescription ? "Hide Description" : "Description"}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Motion Capture Project */}
                                    <div className="project-section" data-project="motion-capture">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '40px 20px'
                                        }}>
                                            {/* Figure Study Header */}
                                            <div 
                                                data-image="Motion Diagram"
                                                className="figure-study-header"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '40px',
                                                    width: '100%',
                                                    marginBottom: '10px',
                                                    paddingBottom: '60px'
                                                }}
                                            >
                                                <img
                                                    src="/motioncapture/start.png"
                                                    alt="Figure Study"
                                                    style={{
                                                        width: '300px',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <h1 style={{
                                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                                    fontSize: 'clamp(3em, 6vw, 5em)',
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    letterSpacing: '-0.08em',
                                                    margin: 0,
                                                    textAlign: 'left',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    Figure Study
                                                </h1>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>
                                                {/* Motion Diagram */}
                                                <div 
                                                    data-image="Motion Diagram"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Motion Diagram</h3>
                                                    <img
                                                        src="/motioncapture/first.png"
                                                        alt="Motion Diagram"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>

                                                {/* Iteration */}
                                                <div 
                                                    data-image="Iteration"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Iteration</h3>
                                                    <img
                                                        src="/motioncapture/second.png"
                                                        alt="Iteration"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>

                                                {/* Final Diagram */}
                                                <div 
                                                    data-image="Final Diagram"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Final Diagram</h3>
                                                    <img
                                                        src="/motioncapture/third.png"
                                                        alt="Final Diagram"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>

                                                {/* The Bootcut */}
                                                <div 
                                                    data-image="The Bootcut"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%',
                                                        gap: '10px'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>The Bootcut</h3>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '500px',
                                                        overflow: 'hidden',
                                                        position: 'relative'
                                                    }}>
                                                        <img
                                                            src="/motioncapture/fourth.JPEG"
                                                            alt="The Bootcut"
                                                            style={{
                                                                width: '100%',
                                                                height: '500px',
                                                                objectFit: 'cover',
                                                                objectPosition: 'center bottom',
                                                                display: 'block'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* The Bootcut, Continued */}
                                                <div 
                                                    data-image="The Bootcut, Continued"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%',
                                                        gap: '10px'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>The Bootcut, Continued</h3>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '800px',
                                                        overflow: 'hidden',
                                                        position: 'relative'
                                                    }}>
                                                        <img
                                                            src="/motioncapture/fifth.JPEG"
                                                            alt="The Bootcut, Continued"
                                                            style={{
                                                                width: '100%',
                                                                height: '800px',
                                                                objectFit: 'cover',
                                                                objectPosition: 'center bottom',
                                                                display: 'block'
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <img
                                                            src="/motioncapture/sixth.JPEG"
                                                            alt="Sixth Image"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain',
                                                                display: 'block'
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <img
                                                            src="/motioncapture/seventh.JPEG"
                                                            alt="Seventh Image"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain',
                                                                display: 'block'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Motion Capture Description Button and Divider */}
                                    <div className="project-divider">
                                        <div className="project-divider-content">
                                            <button
                                                className="divider-toggle-btn"
                                                onClick={() => setShowMotionDescription(!showMotionDescription)}
                                                style={{
                                                    textDecoration: 'none',
                                                    position: 'absolute',
                                                    left: '0px',
                                                    top: '-25px'
                                                }}
                                            >
                                                {showMotionDescription ? "Hide Description" : "Description"}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Enclosure Project */}
                                    <div className="project-section" data-project="enclosure">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '40px 20px'
                                        }}>
                                            {/* For Roger Header */}
                                            <div 
                                                data-image="For Roger"
                                                className="figure-study-header"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '40px',
                                                    width: '100%',
                                                    marginBottom: '60px',
                                                    paddingBottom: '60px'
                                                }}
                                            >
                                                <img
                                                    src="/enclosure/roger.webp"
                                                    alt="For Roger"
                                                    style={{
                                                        width: '300px',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <h1 style={{
                                                        fontFamily: 'Helvetica, Arial, sans-serif',
                                                        fontSize: 'clamp(3em, 6vw, 5em)',
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        letterSpacing: '-0.08em',
                                                        margin: 0,
                                                        textAlign: 'left',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        For Roger
                                                    </h1>
                                                    <div style={{
                                                        marginTop: '20px',
                                                        maxWidth: '500px'
                                                    }}>
                                                        <p style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: '0.8em',
                                                            fontWeight: 300,
                                                            color: '#666',
                                                            lineHeight: '1.4',
                                                            margin: 0,
                                                            textAlign: 'left'
                                                        }}>
                                                            Roger Shimomura is an American artist and Lawrence local. While designing a studio and gallery to host an hypothetical artist in residence for him I based my design on what I believed he would value most.
                                                            <br/><br/>
                                                            Roger Shimomura's childhood was interrupted by his internment at the Minidoka Camp. His perceptions of belonging and home have always been estranged throughout his life. Feeling foreign in every setting, Roger Shimomura was often defined by his appearance and inflated stereotypes of his people, villainized by wartime propaganda. While every system fought to make him smaller, he found the energy to create boldly in spite of it all. Roger Shimomura is not a passive man, he is one who takes action. A space for Roger Shimomura is one that must be unrestrictive and open to discussion.
                                                            <br/><br/>
                                                            In designing a space to house Roger Shimomura as an artist in residence at the University of Kansas, one thing remained at the top of mind: a bold sense of identity.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '60px',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>
                                                {/* Ideation - 2x2 Grid */}
                                                <div 
                                                    data-image="Ideation"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic'
                                                    }}>Ideation</h3>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: '10px',
                                                        width: '100%',
                                                        marginBottom: '30px'
                                                    }}>
                                                        <img
                                                            src="/enclosure/1.JPEG"
                                                            alt="Ideation 1"
                                                            style={{
                                                                width: '100%',
                                                                height: '250px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <img
                                                            src="/enclosure/2.JPEG"
                                                            alt="Ideation 2"
                                                            style={{
                                                                width: '100%',
                                                                height: '250px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <img
                                                            src="/enclosure/3.JPEG"
                                                            alt="Ideation 3"
                                                            style={{
                                                                width: '100%',
                                                                height: '250px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <img
                                                            src="/enclosure/4.JPEG"
                                                            alt="Ideation 4"
                                                            style={{
                                                                width: '100%',
                                                                height: '250px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    </div>
                                                    
                                                    <div style={{
                                                        width: '100%',
                                                        textAlign: 'left'
                                                    }}>
                                                        <p style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: '0.85em',
                                                            fontWeight: 300,
                                                            color: '#666',
                                                            lineHeight: '1.5',
                                                            margin: 0,
                                                            textAlign: 'left'
                                                        }}>
                                                            As a medium of investigating Roger Shimomura's work, I invested in the principle of Molecular diffusion, whereas molecules move from restricted spaces to more open ones. When things are tense and we feel compacted, as Roger experienced at the Minidoka Camp, I wanted an optimistic outcome; to break free. Visitors entering in the smallest point in the building would be guided into the open space of the gallery to allow for a narrative and optimistic viewing experience. In a quiet, humble approach, a visitor is propelled onward into the art. Through this intention, <strong>I found my bowtie motif</strong>.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* The Bowtie */}
                                                <div 
                                                    data-image="The Bowtie"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {/* THE BOWTIE Header with overlaid text */}
                                                    <div className="bowtie-header" style={{
                                                        position: 'relative',
                                                        width: '100%',
                                                        paddingBottom: '60px',
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <img
                                                            src="/enclosure/5.JPEG"
                                                            alt="The Bowtie"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                        <h1 style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: 'clamp(2.5em, 5vw, 4.5em)',
                                                            fontWeight: 'bold',
                                                            color: '#000',
                                                            letterSpacing: '-0.05em',
                                                            margin: 0,
                                                            whiteSpace: 'nowrap',
                                                            position: 'absolute',
                                                            top: '20px',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                            zIndex: 2
                                                        }}>
                                                            THE BOWTIE
                                                        </h1>
                                                    </div>

                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>The Bowtie</h3>
                                                </div>

                                                {/* Up Close */}
                                                <div 
                                                    data-image="Aerial"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Aerial</h3>
                                                    <img
                                                        src="/enclosure/6.JPEG"
                                                        alt="Aerial"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>

                                                {/* Aerial */}
                                                <div 
                                                    data-image="Up Close"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Up Close</h3>
                                                    <img
                                                        src="/enclosure/7.JPEG"
                                                        alt="Up Close"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>

                                                {/* Walking Down */}
                                                <div 
                                                    data-image="Walking Down"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Walking Down</h3>
                                                    <img
                                                        src="/enclosure/8.JPEG"
                                                        alt="Walking Down"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Enclosure Description Button and Divider */}
                                    <div className="project-divider">
                                        <div className="project-divider-content">
                                            <button
                                                className="divider-toggle-btn"
                                                onClick={() => setShowEnclosureDescription(!showEnclosureDescription)}
                                                style={{
                                                    textDecoration: 'none',
                                                    position: 'absolute',
                                                    left: '0px',
                                                    top: '-25px'
                                                }}
                                            >
                                                {showEnclosureDescription ? "Hide Description" : "Description"}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Tiny Home Project */}
                                    <div className="project-section" data-project="tiny-home">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '40px 20px'
                                        }}>
                                            {/* Tiny Home Header */}
                                            <div 
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    marginBottom: '60px',
                                                    paddingBottom: '60px'
                                                }}
                                            >
                                                <h1 style={{
                                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                                    fontSize: 'clamp(2em, 4vw, 3.5em)',
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    letterSpacing: '-0.08em',
                                                    margin: 0,
                                                    textAlign: 'center',
                                                    marginBottom: '20px'
                                                }}>
                                                    Tiny Home Render
                                                </h1>
                                                <div style={{
                                                    maxWidth: '500px',
                                                    textAlign: 'center'
                                                }}>
                                                    <p style={{
                                                        fontFamily: 'Helvetica, Arial, sans-serif',
                                                        fontSize: '0.8em',
                                                        fontWeight: 300,
                                                        color: '#666',
                                                        lineHeight: '1.4',
                                                        margin: 0
                                                    }}>
                                                        <em style={{ fontSize: '0.9em', color: '#999' }}>Rhino, Spring 2025</em><br/><br/>
                                                        Developing and practicing 3-D visualization skills with a Tiny Home accessorized with an elevated front porch and garage.
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '60px',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>
                                                {/* Tiny Render */}
                                                <div 
                                                    data-image="Tiny Render"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <h3 className="mobile-only-heading" style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                        marginBottom: '20px',
                                                        fontStyle: 'italic',
                                                        display: 'none'
                                                    }}>Tiny Render</h3>
                                                    <img
                                                        src="/tinyhome/tinyhome.png"
                                                        alt="Tiny Render"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Hidden Text Section */}
                            {showDescription && (
                                <div className="description-overlay">
                                    <div className="description-content">
                                        <button 
                                            className="close-description"
                                            onClick={() => setShowDescription(false)}
                                        >
                                            ×
                                        </button>
                                        <div className="description-text">
                                            <p>
                                                Forming a structural narrative, through the translation of the rudimentary forms originating from a rotary phone.
                                            </p>
                                            <p>
                                                Compiling selections of textures and form, I created a collage. Hoping to create a wild and erratic pattern to inspire my structure, I rearranged excerpts from each photo until I discovered a grasshopper-inspired arrangement. The collage was then translated into a 3D model, with 14 internal walls creating a monoplaner grid to support each piece of the collage at its designated height.
                                            </p>
                                            <p>
                                                This structure was then prescribed a cage, something to house and contain its form and spirit. With a desire to create a passive "hedge" that might mimic a canopy allowing air and light to travel through, I began a process of creating a paper form to repeat and create modules for each face of this cage. Using a 5"x 7" piece of paper, I made cuts and folds, encouraging the paper to mimic the bends of the coils on a rotary phone. This form generated the desired path for air and light to travel through in expected and unexpected ways.
                                            </p>
                                            <p>
                                                With a finalized paper module, I wanted to create a wooden frame that would impose the most minimal impact while showcasing the natural and organic shapes of the paper form. Creating a form with triangles and diamonds provided the most desirable result in showcasing the form of the paper first and the wooden frame as a backdrop to it. The top half of the diamond meets its bottom half at an angle allowing gravity to do the heavy lifting while still promoting more diversity in the form. The diamond shape is imposed upon its inverse in negative space, allowing further passivity, in its cage.
                                            </p>
                                            <p>
                                                All that was left to finish the enclosure was a roof. In order to challenge myself to learn the basics of Rhino with greater depth, I first made a repeating scale-inspired pattern, furthering the original coil motif from the phone. After completing the texture, I wanted to create an interruption that would draw the eye to the center to bring the focus to the center of the paper collage model within it. This interruption in the pattern would serve to promote a second look. The flat piece needed dimension, and wanting to maintain a low profile, I carried previous motifs from the paper model to create elongated crescents that would push the overall direction and movement of the piece. From different angles, the roof provides a new experience and shape, promoting the regenerative and energized forms that first inspired my model.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Motion Capture Description Overlay */}
                            {showMotionDescription && (
                                <div className="description-overlay">
                                    <div className="description-content">
                                        <button 
                                            className="close-description"
                                            onClick={() => setShowMotionDescription(false)}
                                        >
                                            ×
                                        </button>
                                        <div className="description-text">
                                            <p>
                                                A nickname I brandished this model with is "The Bootcut" a title dedicated to it's shear size, roughly matching the length of my own pant leg.
                                            </p>
                                            <p>
                                                Playing into the boot cut the dramatic flare at the end matches that of a boot cut jean. In mapping this motion, I became all too aware of the relationships of space created by our own bodies, and to a larger scale how those exist within the limitations of a larger architectural space.
                                            </p>
                                            <p>
                                                Hoping to create a sense of ease, I subtracted unnecessary information to create a space for the bold movement of the ribbon to define the narrative and direction of the viewer.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Enclosure Description Overlay */}
                            {showEnclosureDescription && (
                                <div className="description-overlay">
                                    <div className="description-content">
                                        <button 
                                            className="close-description"
                                            onClick={() => setShowEnclosureDescription(false)}
                                        >
                                            ×
                                        </button>
                                        <div className="description-text">
                                            <p>
                                                With a sculptural roof that draws our attention to a landmark in the landscape, this gallery and residence provides a strong sense of place on the dropping landscape. Utilizing the influence of the principle of diffusion, visitors follow a path on the side of the building that brings them the momentum. Carrying them through following the only solid wall in the room, the gallery wall provides a singular viewing experience. Reaching the ends of the gallery glass holds us yet from the patio and the elements that await in the enclosed garden. A long and sidewalk shadows the retaining wall that holds the earth, creating this second space that provides a gentle return to our world.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {isTransitioning && <div className="black-transition"></div>}
        </>
    );
}

export default Portfolio;
