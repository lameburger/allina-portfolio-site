import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const ImageGallery = () => {
    const images = [
        { src: 'works/1.mp4', heading: 'Paper Module' },
        { src: 'works/4.png', heading: 'Core' },
        { src: 'works/2.mp4', heading: 'Above, Subtracted' },
        { src: 'works/oops.jpg', heading: 'Corner' },
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

// Professional Experience Components
const DatacenterGallery = () => {
    const [currentImage, setCurrentImage] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => prev === 1 ? 2 : 1);
        }, 5000); // Auto transition every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleMouseEnter = () => {
        setCurrentImage(2);
    };

    const handleMouseLeave = () => {
        setCurrentImage(1);
    };

    return (
        <div className="datacenter-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '60px 20px 60px 20px',
            maxWidth: '900px',
            margin: '0 auto'
        }}>
            <div style={{
                marginBottom: '30px',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(2.5em, 5vw, 4em)',
                    fontWeight: 'bold',
                    color: '#333',
                    letterSpacing: '-0.05em',
                    margin: 0,
                    marginBottom: '15px',
                    textAlign: 'left'
                }}>
                    JHET Architects Internship
                </h1>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1.2em',
                    color: '#666',
                    margin: 0,
                    marginBottom: '8px',
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
                    marginBottom: '30px',
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
                    textAlign: 'left',
                    maxWidth: '800px'
                }}>
                    Respecting the confidentiality of clients and tenants within the Data Center sector makes it difficult to share work and visualizations. For the JHET Architects internship, I created quick nondescript sketches and collages to fill that gap with a goal of bringing warmth and familiarity to buildings traditionally viewed as intimidating.
                </p>
            </div>
        </div>
    );
};

const MuseumExperience = () => {
    return (
        <div className="museum-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '60px 20px 60px 20px',
            maxWidth: '900px',
            margin: '0 auto',
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '40px'
        }}>
            <div style={{
                marginBottom: '30px',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(2.5em, 5vw, 4em)',
                    fontWeight: 'bold',
                    color: '#333',
                    letterSpacing: '-0.05em',
                    margin: 0,
                    marginBottom: '15px',
                    textAlign: 'left'
                }}>
                    Spencer Museum of Art Student Ambassador/Educator
                </h1>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1.2em',
                    color: '#666',
                    margin: 0,
                    marginBottom: '8px',
                    textAlign: 'left'
                }}>
                    2025 - Ongoing
                </p>
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
                    textAlign: 'left',
                    maxWidth: '800px'
                }}>
                    I lead tours for elementary aged students through dedicated curriculum, encouraging engagement and critical thinking between the relationships between culture, history and art. It's a lot of fun :)
                </p>
            </div>
        </div>
    );
};

const UniversityScholar = () => {
    return (
        <div className="professional-item-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '60px 20px 60px 20px',
            maxWidth: '900px',
            margin: '0 auto',
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '40px'
        }}>
            <div style={{
                marginBottom: '30px',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(2em, 4.5vw, 3.5em)',
                    fontWeight: 'bold',
                    color: '#333',
                    letterSpacing: '-0.05em',
                    margin: 0,
                    marginBottom: '15px',
                    textAlign: 'left',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                }}>
                    University of Kansas University Scholar
                </h1>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1.2em',
                    color: '#666',
                    margin: 0,
                    marginBottom: '8px',
                    textAlign: 'left'
                }}>
                    Class of 2028 Cohort
                </p>
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
                    textAlign: 'left',
                    maxWidth: '800px'
                }}>
                    Created to recognize and encourage academically talented and motivated students, the University Scholars program provides scholarship, mentorship and enrollment in an interdisciplinary seminar.
                </p>
            </div>
        </div>
    );
};

const ResearchAssistant = () => {
    return (
        <div className="professional-item-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '60px 20px 60px 20px',
            maxWidth: '900px',
            margin: '0 auto',
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '40px'
        }}>
            <div style={{
                marginBottom: '30px',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(2em, 4.5vw, 3.5em)',
                    fontWeight: 'bold',
                    color: '#333',
                    letterSpacing: '-0.05em',
                    margin: 0,
                    marginBottom: '15px',
                    textAlign: 'left',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                }}>
                    Department of Architecture and Design Research Assistant
                </h1>
                <p style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1.2em',
                    color: '#666',
                    margin: 0,
                    marginBottom: '8px',
                    textAlign: 'left'
                }}>
                    Fall 2025 - Ongoing
                </p>
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
                    textAlign: 'left',
                    maxWidth: '800px'
                }}>
                    Analyzing "Chamber works" by Daniel Libeskind, aiding in the visual and conceptual interpretation of his work through the lens of art, architecture, and music theory. Further supporting efforts to dissect compositional methods and spatial relationships, exploring how rhythm, structure, and abstraction inform the architect's philosophy.
                </p>
            </div>
        </div>
    );
};

const ProfessionalSection = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingTop: '40px',
            paddingBottom: '40px'
        }}>
            <DatacenterGallery />
            <ResearchAssistant />
            <MuseumExperience />
            <UniversityScholar />
        </div>
    );
};

function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState("structures");
    const [activeProject, setActiveProject] = useState("healing-space");
    const [activeImage, setActiveImage] = useState("Preview");
    const [visitedProjects, setVisitedProjects] = useState(new Set(["healing-space"]));
    const [visitedImages, setVisitedImages] = useState(new Set(["Preview"]));
    const [showDescription, setShowDescription] = useState(false);
    const [showMotionDescription, setShowMotionDescription] = useState(false);
    const [showHealingDescription, setShowHealingDescription] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const galleryRef = useRef();
    const navigate = useNavigate();

    const projects = [
        { 
            id: 'healing-space', 
            title: 'A Space for Healing',
            images: ['Preview', 'Floor Plans', 'Section Cuts', 'Therapeutic Design']
        },
        { 
            id: 'contemplation-space', 
            title: 'Contemplation',
            images: ['Chapel Reveal', 'Site', 'Geometry', 'Sun Path', 'Copper Core']
        },
        { 
            id: 'structural-narrative', 
            title: 'Structural Narrative',
            images: ['Paper Module', 'Core', 'Above, Subtracted', 'Corner', 'Inside']
        },
        { 
            id: 'motion-capture', 
            title: 'Motion Capture',
            images: ['Motion Diagram', 'Iteration', 'Final Diagram', 'The Bootcut']
        },
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
                                style={{
                                    maxWidth: '800px',
                                    width: '100%',
                                    height: 'auto'
                                }}
                            />
                        </div>
                    ) : selectedCategory === 'professional' ? (
                        <ProfessionalSection />
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
                                    <div className="project-section" data-project="healing-space">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '40px 20px'
                                        }}>
                                            {/* Healing Space Header */}
                                            <div 
                                                data-image="Preview"
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
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                <h1 style={{
                                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                                        fontSize: 'clamp(2.5em, 5vw, 4.5em)',
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    letterSpacing: '-0.08em',
                                                    margin: 0,
                                                    textAlign: 'left',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                        A Space for Healing
                                                </h1>
                                                    <div style={{
                                                        marginTop: '20px',
                                                        maxWidth: '600px'
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
                                                            Tasked with creating a therapy retreat space that embraces the calming properties of the natural landscape of Clinton Lake. Utilizing mass timber construction as well as limestone, natural materials that make up the structure of the building also help to ground patients in the simple beauty.
                                                            <br/><br/>
                                                            In programming, it was clear that having two distinct spaces offers significant benefits. This provides the visitor and therapist an opportunity to enter a new space and begin again, especially if a patient is experiencing immense stress. Understanding this need for two spaces, I used two guiding principles in shaping their form.
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
                                                {/* Preview Images */}
                                                <div 
                                                    data-image="Preview"
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
                                                    }}>Preview</h3>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: '20px',
                                                        width: '100%',
                                                        marginBottom: '30px'
                                                    }}>
                                                        <img
                                                            src="/healing/preview_image.png"
                                                            alt="Preview 1"
                                                        style={{
                                                            width: '100%',
                                                                height: '300px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <img
                                                            src="/healing/preview_image_2.png"
                                                            alt="Preview 2"
                                                            style={{
                                                                width: '100%',
                                                                height: '300px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Floor Plans */}
                                                <div 
                                                    data-image="Floor Plans"
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
                                                    }}>Floor Plans</h3>
                                                    <img
                                                        src="/healing/floorplan_1.png"
                                                        alt="Floor Plans"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            marginBottom: '20px'
                                                        }}
                                                    />
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
                                                            <strong>1. Limestone walls would ground, hide, and support the served, private spaces.</strong> The bathroom, HVAC/Utilities, office, and kitchen would be stabilized by strong limestone walls, while the open shared spaces feature expansive glass views of the lake. The buildings reflect each other's limestone location, creating a sort of "S" shape that brings connection back to the two spaces.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Section Cuts */}
                                                <div 
                                                    data-image="Section Cuts"
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
                                                    }}>Section Cuts</h3>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr',
                                                        gap: '20px',
                                                        width: '100%',
                                                        marginBottom: '30px'
                                                    }}>
                                                        <img
                                                            src="/healing/sectioncut_1.png"
                                                            alt="Section Cut 1"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                        <img
                                                            src="/healing/sectioncut_2.png"
                                                            alt="Section Cut 2"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
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
                                                            <strong>2. The roof hierarchy also brings a stronger sense of certainty to the spaces.</strong> The tallest spaces are the public spaces, where many should gather, while the shortest spaces are the most intimate served spaces.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Therapeutic Design */}
                                                <div 
                                                    data-image="Therapeutic Design"
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
                                                    }}>Therapeutic Design</h3>
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
                                                            In conjoining the two spaces, the entry vestibule gives the therapist a chance to introduce visitors to the space. By providing a dedicated entry that transparently offers visual opportunities to understand what lies on either side of the building, visitors can acclimate, especially if they are unsure or weary of approaching therapy.
                                                            <br/><br/>
                                                            The angle of the two buildings is designed to maximize lakeside views, enhancing the therapeutic experience in the public spaces. Simultaneously, the "V" shape promotes a natural guide to encourage visitors into the building's embrace.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Healing Space Description Button and Divider */}
                                    <div className="project-divider">
                                        <div className="project-divider-content">
                                            <button
                                                className="divider-toggle-btn"
                                                onClick={() => setShowHealingDescription(!showHealingDescription)}
                                                style={{
                                                    textDecoration: 'none',
                                                    position: 'absolute',
                                                    left: '0px',
                                                    top: '-25px'
                                                }}
                                            >
                                                {showHealingDescription ? "Hide Description" : "Description"}
                                            </button>
                                        </div>
                                    </div>
                                    {/* A Space for Contemplation Project */}
                                    <div className="project-section" data-project="contemplation-space">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '40px 20px'
                                        }}>
                                            {/* Chapel Header */}
                                            <div 
                                                data-image="Chapel Reveal"
                                                className="figure-study-header"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    gap: '40px',
                                                    width: '100%',
                                                    marginBottom: '40px',
                                                    paddingBottom: '40px'
                                                }}
                                            >
                                                    <h1 style={{
                                                        fontFamily: 'Helvetica, Arial, sans-serif',
                                                        fontSize: 'clamp(2.5em, 5vw, 4.5em)',
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        letterSpacing: '-0.08em',
                                                        margin: 0,
                                                    textAlign: 'center'
                                                    }}>
                                                    A Space for Contemplation
                                                    </h1>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '60px',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>
                                                {/* Chapel Reveal Image */}
                                                <div 
                                                    data-image="Chapel Reveal"
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
                                                    }}>Chapel Reveal</h3>
                                                    <img
                                                        src="/contemplation/contemplation.png"
                                                        alt="Chapel Reveal"
                                                            style={{
                                                                width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            marginBottom: '30px'
                                                            }}
                                                        />
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
                                                            In creating an introspective non-denominational chapel space, simple clean forms revealed themselves. Heavy masonry lifts itself from the earth, reaching for the sky. This reveal in the chapel space answers three critical goals for the chapel space. First, the view lets in natural light and enables selective passive heating. Second, the view serves as a reminder that the world is much larger, and much more beautiful than what is just within the bounds of space. To prevent and mitigate unproductive rumination, the view out provides a desirable and encouraging reminder of more. Finally, this lift connects the earth to the sky creating harmony and balance with basic elements we find daily.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Site Section */}
                                                <div 
                                                    data-image="Site"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        maxWidth: '900px',
                                                        width: '100%',
                                                        gap: '30px'
                                                    }}
                                                    className="site-section"
                                                >
                                                    <div style={{
                                                        flex: '1',
                                                        textAlign: 'left'
                                                    }}>
                                                    <h3 style={{
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: '1.5em',
                                                        color: '#333',
                                                            marginBottom: '15px',
                                                        fontStyle: 'italic'
                                                        }}>Site</h3>
                                                        <p style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: '0.85em',
                                                            fontWeight: 300,
                                                            color: '#666',
                                                            lineHeight: '1.5',
                                                            margin: 0
                                                        }}>
                                                            The project revitalizes a neglected cemetery with centuries of critical state history and legacy. With many abolitionists from the Bleeding Kansas era buried here, the site carries significant knowledge and power. To draw more visitors and to provide new services, the chapel is intended for meditation and small memorials. Just a short walk from many dormitories on the University of Kansas's campus, this space provides a space for breathing and reorientation.
                                                        </p>
                                                    </div>
                                                    <div style={{
                                                        flex: '0 0 50%',
                                                        maxWidth: '50%'
                                                    }}>
                                                        <img
                                                            src="/contemplation/comtemplation2.png"
                                                            alt="Site"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Geometry Section */}
                                                <div 
                                                    data-image="Geometry"
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
                                                        marginBottom: '15px',
                                                        fontStyle: 'italic',
                                                        alignSelf: 'flex-start'
                                                    }}>Geometry</h3>
                                                    <div style={{
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        marginBottom: '20px'
                                                    }}>
                                                        <p style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: '0.85em',
                                                            fontWeight: 300,
                                                            color: '#666',
                                                            lineHeight: '1.5',
                                                            margin: 0
                                                        }}>
                                                            Elliptical geometries define the programming and layout of the space. The ellipse was derived from the vegetation present on the site. Tall grass bends in perfect curves, reaching for the ground. In between hedges and through the leaves, light filters in through these curvilinear openings. Finding harmony with the site and the natural guidance of elliptical forms, the shape of the building is defined by one simple large movement.
                                                        </p>
                                                    </div>
                                                    <img
                                                        src="/contemplation/contemplation3.png"
                                                        alt="Geometry"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>

                                                {/* Sun Path Section */}
                                                <div 
                                                    data-image="Sun Path"
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
                                                        marginBottom: '15px',
                                                        fontStyle: 'italic',
                                                        alignSelf: 'flex-start'
                                                    }}>Sun Path</h3>
                                                    <div style={{
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        marginBottom: '20px'
                                                    }}>
                                                        <p style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: '0.85em',
                                                            fontWeight: 300,
                                                            color: '#666',
                                                            lineHeight: '1.5',
                                                            margin: 0
                                                        }}>
                                                            The sun engages with every tangible form in the space. Notes from sundials are imbued in the daily cycle of light within the space. In the morning, the quality of light is diffused and variable due to the surrounding vegetation. As the morning rises, the light in the space awakens. By noon, light floods from the thin skylight in rectangular frames falling down the wall behind the altar. As the sun sets, light shines diffused by the front doors but reaching down the aisle of the chapel, illuminating the altar.
                                                        </p>
                                                    </div>
                                                    <img
                                                        src="/contemplation/contemplation4.png"
                                                        alt="Sun Path"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                </div>

                                                {/* Copper Core Section */}
                                                <div 
                                                    data-image="Copper Core"
                                                            style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'flex-start',
                                                        maxWidth: '900px',
                                                                width: '100%',
                                                        gap: '30px'
                                                            }}
                                                    className="copper-section"
                                                >
                                                    <div style={{
                                                        flex: '1',
                                                        textAlign: 'left'
                                                    }}>
                                                        <h3 style={{
                                                            fontFamily: 'Cormorant Garamond, serif',
                                                            fontSize: '1.5em',
                                                            color: '#333',
                                                            marginBottom: '15px',
                                                            fontStyle: 'italic'
                                                        }}>Copper Core</h3>
                                                        <p style={{
                                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                                            fontSize: '0.85em',
                                                            fontWeight: 300,
                                                            color: '#666',
                                                            lineHeight: '1.5',
                                                            margin: 0
                                                        }}>
                                                            Copper roofs are intrinsic to our understanding of longevity, used throughout history for its durability. With the intention of creating something that felt monumental and larger than the individual visitor, design conflict arose in trying to avoid feeling like the building was dead or of another time. To carry motifs of change and evolution a copper roof and detailing throughout the building would allow the appearance of the building to change over time, unevenly, reflecting the imperfect timing of internal change within ourselves.
                                                        </p>
                                                    </div>
                                                    <div style={{
                                                        flex: '0 0 50%',
                                                        maxWidth: '50%'
                                                    }}>
                                                        <img
                                                            src="/contemplation/contemplation5.png"
                                                            alt="Copper Core"
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
                                                </div>

                                    {/* Contemplation Space Divider */}
                                    <div className="project-divider">
                                        <div className="project-divider-content"></div>
                                    </div>
                                    
                                    {/* Structural Narrative Project */}
                                    <div className="project-section" data-project="structural-narrative">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '40px 20px'
                                        }}>
                                            {/* Structural Narrative Header */}
                                            <div 
                                                data-image="Paper Module"
                                                className="figure-study-header"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    gap: '40px',
                                                    width: '100%',
                                                    marginBottom: '40px',
                                                    paddingBottom: '40px'
                                                }}
                                            >
                                                <h1 style={{
                                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                                    fontSize: 'clamp(2.5em, 5vw, 4.5em)',
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    letterSpacing: '-0.08em',
                                                    margin: 0,
                                                    textAlign: 'center'
                                                }}>
                                                    Structural Narrative
                                                </h1>
                                            </div>
                                            
                                            <ImageGallery />
                                        </div>
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
                                    
                                    {/* A Space for Healing Project */}
                                    
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

                            {/* Healing Space Description Overlay */}
                            {showHealingDescription && (
                                <div className="description-overlay">
                                    <div className="description-content">
                                        <button 
                                            className="close-description"
                                            onClick={() => setShowHealingDescription(false)}
                                        >
                                            ×
                                        </button>
                                        <div className="description-text">
                                            <p>
                                                This therapy retreat demonstrates how thoughtful architectural design can support healing and therapeutic processes. The dual-building approach creates distinct yet connected spaces that allow for therapeutic flexibility and patient comfort.
                                            </p>
                                            <p>
                                                The strategic use of limestone walls provides both structural support and psychological grounding, creating intimate private spaces while maintaining expansive views of the natural landscape through glass walls in public areas.
                                            </p>
                                            <p>
                                                The varying roof heights create a clear hierarchy that guides visitors intuitively through the space, while the V-shaped configuration maximizes therapeutic lakeside views and creates a welcoming embrace for those approaching the facility.
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
