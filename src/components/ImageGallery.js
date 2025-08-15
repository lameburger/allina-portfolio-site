import React, { useState, useEffect, useRef } from 'react';

const ImageGallery = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef([]);
  const containerRef = useRef();

  const projects = [
    { 
      id: 'conceptual-models',
      src: 'works/1.png', 
      heading: 'Conceptual Models', 
      text: 'Exploring spatial relationships through iterative design processes. These conceptual models investigate the intersection of form, function, and human experience within architectural spaces. Each iteration builds upon previous discoveries, creating a dialogue between material and void.'
    },
    { 
      id: 'structural-systems',
      src: 'works/2.png', 
      heading: 'Structural Systems', 
      text: 'An investigation into load-bearing systems and their architectural expression. This project examines how structural elements can transcend their purely functional role to become defining features of spatial character and user experience.'
    },
    { 
      id: 'material-studies',
      src: 'works/3.png', 
      heading: 'Material Studies', 
      text: 'A comprehensive exploration of material properties and their impact on architectural design. Through hands-on experimentation, this work examines how different materials communicate ideas about permanence, transparency, and human interaction within built environments.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveProject(index);
            }
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToProject = (index) => {
    if (projectRefs.current[index]) {
      projectRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Structures Legend */}
      <div className="structures-legend">
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`structures-tab ${activeProject === index ? 'active' : ''}`}
            onClick={() => scrollToProject(index)}
          >
            {project.heading}
          </button>
        ))}
      </div>

      {/* Projects Container */}
      <div className="structures-container">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            ref={(el) => projectRefs.current[index] = el}
            className="structure-project"
            data-project={project.id}
          >
            <div className="structure-content">
              <div className="structure-image-container">
                <img
                  src={project.src}
                  alt={project.heading}
                  className="structure-image"
                />
                <h2 className="structure-heading">{project.heading}</h2>
              </div>
              <div className="structure-text">
                {project.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;