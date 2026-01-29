import { useState, useEffect, useRef } from 'react';
import './App.css';

// Project data structure with descriptions
const projects = [
  {
    id: 1,
    title: 'MIXED USE',
    subcategories: [
      { 
        id: 'celebration', 
        name: 'Celebration', 
        images: ['/mixeduse/Asset 1.jpg'],
        description: 'Fine dining connected to a sculpture garden below a contemporary art gallery.',
        meta: {
          client: 'Bryan Gross',
          location: 'Lawrence, Kansas',
          size: '8,725 sqft'
        }
      },
      { 
        id: 'site', 
        name: 'Site', 
        images: ['/mixeduse/Asset 3.jpg'],
        description: '1 - Site\n2 - Watkins History Museum\n3 - Douglas Courthouse\n4 - Granada Music Venue'
      },
      { 
        id: 'ideation', 
        name: 'Ideation', 
        images: ['/mixeduse/ideation.jpg']
      },
      { 
        id: 'floorplan', 
        name: 'Floor Plan', 
        images: ['/mixeduse/Asset 2.jpg'],
        description: 'Throughout the iterative design process, the relationship between the new structure and the preexisting historical context became central. Sat next to the heavy masonry courthouse and Watkins history building demanded a response. The answer was the removal of form, by placing something so transparent and formless next to the stoneworks. This allowed the historical forms to shine while still matching the precedents of storefronts so critical to the vernacular of Mass St.'
      },
      { id: 'sections', name: 'Sections', images: ['/mixeduse/sections.png'] },
      { 
        id: 'interiors', 
        name: 'Interiors', 
        images: ['/mixeduse/Asset 5.jpg', '/mixeduse/Asset 6.jpg'],
        layout: 'side-by-side',
        description: 'Understanding the transparent form as defining logic, the stairs become the central focus visually and structurally. Acting as a shelter for the outdoor dining and becoming the spotlit movement, the stairs act as the only intrusion to the pure rectangular form. As the stairs punch in, the motif of ascension becomes a hopeful guide to encourage visitors of the restaurant to pierce the boundary and travel up the stairs to the gallery.'
      },
      { 
        id: 'finale', 
        name: 'Finale', 
        images: ['/mixeduse/asset8.png'],
        isFinale: true
      },
    ],
  },
  {
    id: 2,
    title: 'HEALING',
    subcategories: [
      { 
        id: 'healing', 
        name: 'Healing', 
        images: ['/healing/preview_image.png'],
        description: 'A therapy space designed to provide comfort, clarity, and restoration through architecture that responds to both the landscape and the human need for sanctuary.',
        meta: {
          client: 'Bryan Gross',
          location: 'Lawrence, Kansas',
          size: '1,500 sqft',
          duration: '4 weeks'
        }
      },
      { id: 'site', name: 'Site', images: ['/healing/site.jpg'] },
      { id: 'floorplans', name: 'Floor Plans', images: ['/healing/floorplan_1.png'] },
      { 
        id: 'process', 
        name: 'Process', 
        images: ['/healing/process_1.JPEG', '/healing/process_2.JPEG'],
        layout: 'side-by-side'
      },
      { id: 'sectioncuts', name: 'Section Cuts', images: ['/healing/sectioncut_1.png'] },
      { 
        id: 'therapeutic', 
        name: 'Therapeutic Design', 
        images: ['/healing/preview_image_2.png'], 
        description: 'In conjoining the two spaces, the entry vestibule gives the therapist a chance to introduce visitors to the space. By providing a dedicated entry that transparently offers visual opportunities to understand what lies on either side of the building, visitors can acclimate, especially if they are unsure or weary of approaching therapy. The angle of the two buildings is designed to maximize lakeside views, enhancing the therapeutic experience in the public spaces. Simultaneously, the "V" shape promotes a natural guide to encourage visitors into the building\'s embrace.' 
      },
    ],
  },
  {
    id: 3,
    title: 'CHAPEL',
    subcategories: [
      { 
        id: 'reveal', 
        name: 'Chapel Reveal', 
        images: ['/contemplation/contemplation.png'],
        description: 'In creating an introspective non-denominational chapel space, heavy masonry lifts itself from the earth, reaching for the sky.',
        meta: {
          client: 'Bryan Gross',
          location: 'Lawrence, Kansas',
          size: '1,300 sqft',
          duration: '4 weeks'
        }
      },
      { id: 'site', name: 'Site', images: ['/contemplation/comtemplation2.png'] },
      { 
        id: 'ideation', 
        name: 'Iteration', 
        images: ['/contemplation/ideacontemp.JPEG'],
        description: 'First, the view lets in natural light, enabling passive heating. Second, the view serves to mitigate unproductive rumination, the view out provides an encouraging reminder of more. Finally, this lift connects the earth to the sky balancing basic elements we find daily.'
      },
      { 
        id: 'geometry', 
        name: 'Geometry', 
        images: ['/contemplation/contemplation3.png'], 
        description: 'Elliptical geometries define the programming and layout of the space. The ellipse was derived from the vegetation present on the site. Tall grass bends in perfect curves, reaching for the ground. In between hedges and through the leaves, light filters in through these curvilinear openings. Finding harmony with the site and the natural guidance of elliptical forms, the shape of the building is defined by one simple large movement.' 
      },
      { id: 'sunpath', name: 'Sun Path', images: ['/contemplation/contemplation4.png'] },
    ],
  },
  {
    id: 4,
    title: 'ENCLOSURE',
    subcategories: [
      { 
        id: 'ideation', 
        name: 'Ideation', 
        images: ['/enclosure/1.JPEG'],
        description: 'A gallery and small living studio for Roger Shimomura, a celebrated Japanese American artist.',
        meta: {
          client: 'Anne Patterson',
          location: 'Lawrence, Kansas',
          size: '1,150 sqft'
        }
      },
      { id: 'formexploration', name: 'Form Exploration', images: ['/enclosure/2.JPEG'] },
      { id: 'section', name: 'Section', images: ['/enclosure/section_1.png'] },
      { id: 'floorplan', name: 'Floor Plan', images: ['/enclosure/floorplan.png'] },
      { 
        id: 'model', 
        name: 'Model', 
        images: ['/enclosure/5.JPEG', '/enclosure/6.JPEG'],
        layout: 'side-by-side'
      },
    ],
  },
  {
    id: 5,
    title: 'MOTION',
    subcategories: [
      { 
        id: 'diagram', 
        name: 'Motion Diagram', 
        images: ['/motioncapture/first.png'],
        description: 'Motion Capture — an exploration of human movement translated into architectural form. By analyzing the rhythm and flow of the body, this project captures gesture and transforms it into spatial sequences.',
        meta: {
          client: 'Anne Patterson',
        }
      },
      { id: 'iteration', name: 'Iteration', images: ['/motioncapture/second.png', '/motioncapture/third.png'] },
      { id: 'bootcut', name: 'The Bootcut', images: ['/motioncapture/fourth.JPEG'] },
    ],
  },
];

// Paintings data
const paintings = [
  {
    id: 1,
    title: 'RADIO TOWERS',
    displayTitle: 'RADIO TOWERS',
    images: ['/works/rt/1.JPG', '/works/rt/2.JPG', '/works/rt/3.JPG', '/works/rt/4.JPG', '/works/rt/5.JPG'],
    isMultiImage: true,
    description: "The red lights that radiate in the empty space of the sky as to shout, in a steady rhythm, as to say I am here. Still and forever. These silent reminders in a flattened midwest stand as the sole figure prolating out of the earth and far into the sky.",
    size: '29 x 48 inches',
    materials: 'Acrylic on Drop Cloth'
  },
  {
    id: 2,
    title: 'CYCLE',
    displayTitle: 'CYCLE',
    image: '/works/fly.JPG',
    description: "Faced with imposing limits, the fly is an uncomfortable confrontation. With short life spans the life cycle of a fly inspired this hostile and uncomfortable presentation of a fly.",
    size: '29.5 x 40 inches',
    materials: 'Acrylic on canvas'
  },
  {
    id: 3,
    title: 'COWBOY',
    displayTitle: 'COWBOY',
    image: '/works/painting4.jpg',
    description: "Although cowboys may have found themselves obsolete with the invention of barbed wire, they live on the American zeitgeist. Existing beyond the bounds of their historical input, Cowboys and their culture have achieved a mythical status within pop culture. Capturing that energy required a exaggerated canvas spanning 48 inches by 36 inches.",
    size: '48 x 36 inches',
    materials: 'Acrylic on canvas'
  },
  {
    id: 4,
    title: 'RETURN',
    displayTitle: 'RETURN',
    image: '/works/pencil.png',
    description: "A collage of sensations exaggerated by time. When memories return more vivid and vibrant upon recollection, Return calls a bright and wonderous sense.",
    size: '11.5 x 8 inches',
    materials: 'Colored Pencil on Illustration Board'
  },
  {
    id: 5,
    title: 'SPILL',
    displayTitle: 'SPILL',
    image: '/works/work2.png',
    description: "In environments that seem to be changing rapidly before our eyes, there is an unbound and reckless freedom. The force nature possesses is one that cannot be controlled nor contained. Utilizing wax to contain cold water fabric dyes to select sections of cloth, the dye continues to seep through.",
    size: '32 x 24 inches',
    materials: 'Wax, cold water dye, muslin cloth'
  },
  {
    id: 6,
    title: 'PRAIRIE DREAMS',
    displayTitle: 'PRAIRIE DREAMS',
    image: '/works/work3.png',
    description: "Inspired by the living and almost breathing aspects of a prairie, 'Prairie Dreams' mimics the movement of the Flint Hills. The unique and beautiful landscape holds a significant presence in the community of Manhattan, Kansas. Combining the movement of post-impressionist painters and the drama of stark contrasting colors, the vibrant image is an homage to a bright and enduring landscape. 'Prairie Dreams' is now a temporary installation for the Anderson Knight Architecture Firm. After being selected from their 2023 art competition, this piece now lives in front of a trash enclosure, beautifying a previously looked over part of an office complex.",
    size: '12 x 24 inches',
    materials: 'Acrylic on canvas'
  },
  {
    id: 7,
    title: 'RINGS',
    displayTitle: 'RINGS',
    image: '/works/work5.png',
    description: "While seasons change, trees hold fast firmly watching everything around them change. Unmoving themselves, this removed experience of time and change inspired a hand carved linoleum print.",
    size: '18 x 12 inches',
    materials: 'Linoleum Print, Speedball ink, Illustration Board'
  },
];

// Writings data
const writings = [
  {
    id: 1,
    title: 'WEIGHT',
    subtitle: 'lessons from my second year of architecture',
    content: `Attachment is heavier than ambition.

It's one thing to remove your ego from the comments and critiques. That's important, necessary even. But the far more difficult task (arguably the quieter, lonelier one) is learning not to hold your work so preciously, not to confuse what you've made with who you are.

Over the past week, I've become increasingly comfortable throwing my own work away. Not because it's bad, and not because I've grown cynical, but because I'm trying to practice extracting only what matters and leave the rest behind. I'm beginning to understand that progress doesn't come from protecting every line I have drawn, but from trusting that I can make something better next.

It feels like running your hands through hair you've just cut for the first time in months. There's a brief, unsettling moment where something feels wrong—you expect more to be there. There was more there. But almost without noticing, what replaces the loss is a strange, unexpected weightless freedom.

I'm not writing to argue that work should be thrown away more often, only that it should be allowed to change. Iteration should never be erasure, rather just attention. Build on what you have, refine what serves you, and let go of what doesn't. In doing so, you make room for better work and stronger process.`
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activePainting, setActivePainting] = useState(null);
  const [activeWriting, setActiveWriting] = useState(null);
  const sectionRefs = useRef({});
  const subcategoryRefs = useRef({});
  const paintingRefs = useRef({});
  const writingRefs = useRef({});

  // Handle scroll to update active states
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check which section is active
      ['home', 'spaces', 'words', 'paintings', 'contact'].forEach((section) => {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });

      // Check which subcategory is active within spaces
      if (activeSection === 'spaces') {
        Object.keys(subcategoryRefs.current).forEach((key) => {
          const element = subcategoryRefs.current[key];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 3) {
              const [projectId, subId] = key.split('-');
              setActiveProject(parseInt(projectId));
              setActiveSubcategory(subId);
            }
          }
        });
      }

      // Check which painting is active
      if (activeSection === 'paintings') {
        Object.keys(paintingRefs.current).forEach((key) => {
          const element = paintingRefs.current[key];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 3) {
              setActivePainting(parseInt(key));
            }
          }
        });
      }

      // Check which writing is active
      if (activeSection === 'words') {
        Object.keys(writingRefs.current).forEach((key) => {
          const element = writingRefs.current[key];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 3) {
              setActiveWriting(parseInt(key));
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSubcategory = (projectId, subId) => {
    // Ensure we're working with spaces projects only
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const key = `${projectId}-${subId}`;
    const element = subcategoryRefs.current[key];
    
    if (!element) return;
    
    // Verify the element is actually in the spaces section
    const spacesSection = sectionRefs.current['spaces'];
    if (!spacesSection || !spacesSection.contains(element)) {
      return;
    }
    
    // Calculate scroll position relative to document
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    
    // Scroll to the element position with offset for header
    window.scrollTo({ 
      top: elementTop - 100, 
      behavior: 'smooth' 
    });
  };

  const scrollToPainting = (paintingId) => {
    const element = paintingRefs.current[paintingId];
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const scrollToWriting = (writingId) => {
    const element = writingRefs.current[writingId];
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const scrollToProject = (projectId) => {
    // Find the first subcategory of the project (excluding finale)
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const firstSub = project.subcategories.find(sub => !sub.isFinale);
      if (firstSub) {
        scrollToSubcategory(projectId, firstSub.id);
      }
    }
  };

  // Determine if title should be large (low opacity) or small (matching description)
  const shouldUseLargeTitle = (projectId, subId) => {
    // Mixed Use (id: 1): celebration, ideation, site, sections, interiors, finale
    if (projectId === 1 && ['celebration', 'ideation', 'site', 'sections', 'interiors', 'finale'].includes(subId)) {
      return true;
    }
    // Healing (id: 2): site, floorplans, process, sectioncuts
    if (projectId === 2 && ['site', 'floorplans', 'process', 'sectioncuts'].includes(subId)) {
      return true;
    }
    // Chapel (id: 3): site, ideation, sunpath
    if (projectId === 3 && ['site', 'ideation', 'sunpath'].includes(subId)) {
      return true;
    }
    // Enclosure (id: 4): ideation, formexploration, section, floorplan, model
    if (projectId === 4 && ['ideation', 'formexploration', 'section', 'floorplan', 'model'].includes(subId)) {
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      {/* Fixed Header */}
      <header className="fixed-header">
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <img src="/images/eden.png" alt="Eden" className="logo" />
        </a>
        <nav className={`main-nav ${activeSection === 'home' ? 'hidden' : ''}`}>
          <a 
            href="#spaces" 
            onClick={(e) => { e.preventDefault(); scrollToSection('spaces'); }}
            className={activeSection === 'spaces' ? 'active' : ''}
          >
            SPACES
          </a>
          <a 
            href="#words" 
            onClick={(e) => { e.preventDefault(); scrollToSection('words'); }}
            className={activeSection === 'words' ? 'active' : ''}
          >
            WORDS
          </a>
          <a 
            href="#paintings" 
            onClick={(e) => { e.preventDefault(); scrollToSection('paintings'); }}
            className={activeSection === 'paintings' ? 'active' : ''}
          >
            PAINTINGS
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            CONTACT
          </a>
        </nav>
      </header>

      {/* Fixed Footer */}
      <footer className="fixed-footer">
        <span className="email">ALLINADOUGHERTY[AT]KU[DOT]EDU</span>
      </footer>

      {/* Home Section */}
      <section 
        id="home" 
        className="section home-section"
        ref={(el) => (sectionRefs.current['home'] = el)}
      >
        <div className="home-content">
          <img src="/images/background.png" alt="Artwork" className="home-artwork" />
          <nav className="home-nav">
            <a href="#spaces" onClick={(e) => { e.preventDefault(); scrollToSection('spaces'); }}>SPACES</a>
            <a href="#words" onClick={(e) => { e.preventDefault(); scrollToSection('words'); }}>WORDS</a>
            <a href="#paintings" onClick={(e) => { e.preventDefault(); scrollToSection('paintings'); }}>PAINTINGS</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>CONTACT</a>
          </nav>
        </div>
      </section>

      {/* Spaces Section */}
      <section 
        id="spaces" 
        className="section spaces-section"
        ref={(el) => (sectionRefs.current['spaces'] = el)}
      >
        {/* Fixed Sidebar Index */}
        <aside className={`spaces-sidebar ${activeSection !== 'spaces' ? 'hidden' : ''}`}>
          {projects.map((project) => (
            <div key={project.id} className="project-index">
              <div className="project-header">
                <span className="project-number">{project.id}</span>
                <span 
                  className={`project-title ${activeProject === project.id ? 'active' : 'inactive'}`}
                  onClick={() => scrollToProject(project.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {project.title}
                </span>
              </div>
              <ul className="subcategory-list">
                {project.subcategories.filter(sub => !sub.isFinale).map((sub) => (
                  <li 
                    key={sub.id}
                    className={activeProject === project.id && activeSubcategory === sub.id ? 'active' : ''}
                    onClick={() => scrollToSubcategory(project.id, sub.id)}
                  >
                    <span className="indicator">•</span>
                    {sub.name.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <div className="spaces-content">
          {projects.map((project, projectIndex) => (
            <div key={project.id}>
              <div className="project-section">
                {project.subcategories.map((sub, subIndex) => (
                  <div 
                    key={sub.id}
                    className={`subcategory-section ${subIndex === 0 ? 'first-subcategory' : ''} ${sub.isFinale ? 'finale-section' : ''}`}
                    ref={(el) => (subcategoryRefs.current[`${project.id}-${sub.id}`] = el)}
                  >
                    <div className={`image-group ${sub.layout === 'side-by-side' ? 'side-by-side' : ''}`}>
                      {sub.images.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img} 
                          alt={`${project.title} - ${sub.name}`}
                          className="project-image"
                        />
                      ))}
                    </div>
                    
                    {/* Image Title Overlay */}
                    <div className={shouldUseLargeTitle(project.id, sub.id) ? "image-title-overlay" : "image-title-overlay-small"}>
                      {sub.name.toUpperCase()}
                    </div>
                    
                    {/* Show description if exists */}
                    {sub.description && (
                      <div className="description-block">
                        <p className="project-description">{sub.description}</p>
                      </div>
                    )}
                    
                    {/* Show meta info if exists (for preview sections) */}
                    {sub.meta && (
                      <div className="meta-block">
                        <p className="meta-item">{sub.meta.client}</p>
                        <p className="meta-item">{sub.meta.location}</p>
                        <p className="meta-item">{sub.meta.size}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* White space break between projects */}
              {projectIndex < projects.length - 1 && (
                <div className="project-spacer"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Words Section */}
      <section 
        id="words" 
        className="section words-section"
        ref={(el) => (sectionRefs.current['words'] = el)}
      >
        {/* Fixed Sidebar Index for Words */}
        <aside className={`words-sidebar ${activeSection !== 'words' ? 'hidden' : ''}`}>
          {writings.map((writing) => (
            <div 
              key={writing.id} 
              className={`writing-index ${activeWriting === writing.id ? 'active' : ''}`}
              onClick={() => scrollToWriting(writing.id)}
            >
              <div className="writing-header">
                <span className="writing-number">{writing.id}</span>
                <span className={`writing-title ${activeWriting === writing.id ? 'active' : 'inactive'}`}>{writing.title}</span>
              </div>
            </div>
          ))}
        </aside>

        {/* Words Content */}
        <div className="words-content">
          {writings.map((writing) => (
            <div 
              key={writing.id}
              className="writing-section"
              ref={(el) => (writingRefs.current[writing.id] = el)}
            >
              <div className="writing-layout">
                <div className="writing-info">
                  <h3 className="writing-display-title">{writing.title}</h3>
                  <p className="writing-subtitle">{writing.subtitle}</p>
                  <div className="writing-text">
                    {writing.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="writing-paragraph">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Paintings Section */}
      <section 
        id="paintings" 
        className="section paintings-section"
        ref={(el) => (sectionRefs.current['paintings'] = el)}
      >
        {/* Fixed Sidebar Index for Paintings */}
        <aside className={`paintings-sidebar ${activeSection !== 'paintings' ? 'hidden' : ''}`}>
          {paintings.map((painting) => (
            <div 
              key={painting.id} 
              className={`painting-index ${activePainting === painting.id ? 'active' : ''}`}
              onClick={() => scrollToPainting(painting.id)}
            >
              <div className="painting-header">
                <span className="painting-number">{painting.id}</span>
                <span className={`painting-title ${activePainting === painting.id ? 'active' : 'inactive'}`}>{painting.title}</span>
              </div>
              <div className="painting-meta">
                <span className="painting-size">{painting.size}</span>
                <span className="painting-materials">{painting.materials}</span>
              </div>
            </div>
          ))}
        </aside>

        {/* Paintings Content */}
        <div className="paintings-content">
          {paintings.map((painting) => (
            <div 
              key={painting.id}
              className={`painting-section ${painting.isMultiImage ? 'has-multi-image' : ''}`}
              ref={(el) => (paintingRefs.current[painting.id] = el)}
            >
              {painting.isMultiImage ? (
                <div className="multi-image-stack">
                  {painting.images.map((img, idx) => (
                    <div key={idx} className="painting-overlay-item">
                      <div className="painting-layout">
                        <img src={img} alt={`${painting.title} ${idx + 1}`} className="painting-image" />
                        {idx === 0 && (
                          <div className="painting-info">
                            <h3 className="painting-display-title">{painting.displayTitle}</h3>
                            {painting.description && <p className="painting-description">{painting.description}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="painting-layout">
                  <img 
                    src={painting.image} 
                    alt={painting.title}
                    className="painting-image"
                  />
                  <div className="painting-info">
                    <h3 className="painting-display-title">{painting.displayTitle}</h3>
                    {painting.description && <p className="painting-description">{painting.description}</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="section contact-section"
        ref={(el) => (sectionRefs.current['contact'] = el)}
      >
        <div className="contact-content">
          <img src="/images/yellowshirt.jpeg" alt="Allina" className="contact-photo" />
          <div className="contact-info">
            <p className="about-text">
              My name is Allina and I am currently an Honors student at the University of Kansas studying architecture. My motivation and energy to create is fueled by a desire to share.
            </p>
            <p className="about-text">
              I believe architecture, ideally, is an act of service. Creating living solutions for every possible user, architecture is a practice that flourishes in its application of interdisciplinary work. In the same vein, art and performance, first and foremost, is a shared experience that I believe is at its best in its intersections.
            </p>
            <p className="about-text personal">
              If you want to know me better I'd tell you I love making music with others, I spent a lot of my life playing with many orchestras, but now I play at small venues with my own emo grunge band. My favorite movies include <em>The Wind Rises</em>, <em>Minari</em>, and <em>Scott Pilgrim vs. the World</em>.
            </p>
            <span className="email">ALLINADOUGHERTY[AT]KU[DOT]EDU</span>
            <div className="social-links">
              <a href="https://www.instagram.com/allina.dough/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/icons/spot.png" alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/allina-dougherty-090398326/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/icons/linkedin.png" alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://open.spotify.com/user/shubs232?si=e45887de603a4ce7" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <img src="/icons/spotify.png" alt="Spotify" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
