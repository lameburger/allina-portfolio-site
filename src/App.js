import { useState, useEffect, useRef, Fragment } from 'react';
import './App.css';

// Project data structure with descriptions
const projects = [
  {
    id: 1,
    title: 'ARCH CENTER',
    introductionText:
      'Ann Carson posits that movement is fueled by desire. Centering the bittersweet informs this Center For Architecture as a space to develop a more responsible and self-reflexive attitude.',
    subcategories: [
      {
        id: 'reading-room',
        name: 'Reading Room',
        images: ['/archcenter/ac2.5.jpg'],
      },
      {
        id: 'site-axon-map',
        name: 'Site Axon',
        images: ['/archcenter/arteriemap.png', '/archcenter/ac1.png'],
        layout: 'side-by-side',
        meta: {
          client: 'Peter Olshavsky',
          location: 'Museum District - Kansas City, MO',
          size: '27,000 sqft',
        },
      },
      {
        id: 'floorplans',
        name: 'Floor Plans',
        images: [
          '/archcenter/Screenshot 2026-07-03 191730.png',
          '/archcenter/Screenshot 2026-07-03 191751.png',
        ],
        layout: 'side-by-side',
      },
      {
        id: 'gallery',
        name: 'Gallery',
        images: ['/archcenter/ac3.jpg'],
      },
      {
        id: 'center',
        name: 'Center',
        images: ['/archcenter/center.png'],
      },
      {
        id: 'auditorium',
        name: 'Auditorium',
        images: ['/archcenter/ac5.png'],
      },
    ],
  },
  {
    id: 2,
    title: 'ARTS PORCH',
    introductionText:
      "Arts porch and Cafe placed along Kansas City's Art Walk initiative. Boasting a terrace with installation capablilites, it's point grid runs the course of the building growing and mapping an ever-changing art's landscape.",
    subcategories: [
      {
        id: 'axon',
        name: 'Axonometric',
        images: ['/artsporch/AXON.jpg'],
        description: "A cafe and pavillion presents itself as a place of rest on KC's Arterie Artswalk that connects KCAI and the Nelson Museum of Art to the streetcars.",
        meta: {
          client: 'Peter Olshavsky',
          location: 'Kansas City, MO',
          size: '1800 sqft'
        }
      },
      {
        id: 'floorplan',
        name: 'Floor Plan',
        images: ['/artsporch/floorplan.png'],
        description: 'Informed by a grid that acts as a form of logic and measurement, the building form is locked by formalization'
      },
      {
        id: 'sec',
        name: 'Section',
        images: ['/artsporch/sec.png']
      },
      {
        id: 'elev',
        name: 'North Entry Elevation',
        images: ['/artsporch/elev.png']
      },
      {
        id: 'side',
        name: 'Terrace',
        images: ['/artsporch/side.png']
      },
    ],
  },
  {
    id: 3,
    title: 'REVISITING BAD PRESS',
    introductionText:
      'When the shirt is worn, the residue of the orthogonal logic of efficiency registers on the surface of the body. The parallel creases and crisp, square corners of a clean, pressed shirt have become sought-after emblems of refinement. The byproduct of efficiency has become a new object of desire. But what if the practice of ironing could be freed from the aesthetics of efficiency altogether? Perhaps ironing could more aptly represent the postindustrial body by trading the image of the functional for that of the dysfunctional.',
    introductionCredits:
      'Diller Scofidio + Renfro\nElizabeth Diller, Ricardo Scofidio, John Bachus, Brendan Cotter, Heather Champ, and David Lindberg',
    subcategories: [
      {
        id: 't01',
        name: '01',
        images: ['/exhibtion/t01.JPEG'],
        meta: {
          client: 'Peter Olshavsky',
          location: 'University of Kansas',
        },
      },
      {
        id: 't02',
        name: '02',
        images: ['/exhibtion/t02.JPEG'],
      },
      {
        id: 'studio-reflection',
        name: 'Studio Reflection',
        isTextBlock: true,
        content: `As architectural education has become bureaucratic, hyper-professionalized, and increasingly corporatist in the last three decades, schooling's worth only seems to matter when pressed into service of these agendas. In this context, social critic Ivan Illich argues in Deschooling Society (1971), education becomes "the advertising agency which makes you believe that you need the society as it is." Yet this situation is not a closed issue. The nature of education, its roles, and one's place in it can be renegotiated ... whole educational domains are often left aside because they do not easily surrender to the instrumental accounting that underpins them. This motivates our studio's search for other historical possibilities ... It needs to be acknowledged that the promises of the "knowledge economy," which acted as the cultural context for the original work, have unsurprisingly come with intractable problems particularly for education. What arose was not by accident. The current culture of divided attention, distrustful surveillance, gradual de-skilling, and corporate subservience to mention only a few issues was designed. This creates a situation where there was a greater need to think about what Illich called "tools for conviviality" and their possibilities in education ... convivial tools run counter to the set of artifacts and relationships that demand escalation, create dependency, promote deskilling, and support "radical monopolies." Instead, they prioritize social needs in ways that are accessible and encourage individuals to exercise their own skills and creativity. While promoting this form of agency, they retain the ability to deflect power through the performance of a non-performance (e.g., opting out). As they accept limits, they aim to enrich social bonds through lively even joyful means ... For our studio, DS+R's dissident ironing pointed towards these kinds of convivial artifacts and relationships ... While the display may be of little use to someone untroubled by architectural speculation, the hope is that it conscripts an audience into a playful performance of ideas, feelings, and puzzlements. In fact, as Marie Kondo's opening quote wisely suggests, it was developed as an "act of caring," "an expression of love," and a giving thanks for modes of thinking and making out of sync with the supposedly "real world," wherever that begins and ends. Thus, even in our noisy times, perhaps an educational space that creates a genuinely humane and communicative setting might be glimpsed.

Faculty Advisor Peter Olshavsky, Ph.D, Associate Professor of Architecture

As a studio, (Vanessa Barni, Segan Bettenhausen, Will Blaisdell, Luke Brueggemann, Roman Cusumano, Karlos Escutia-Ruiz, Abigail Esparza, Maggie Foresman, Jackson Hoepner, Aubrey Jarecke, Andre Neal, Cristhian Reyes Molina, Amanda Ropers, Hope Schmelzle, Ethan Short, Abi Smith and myself) we found that the creation of a temporary exhibition enabled our own examine of the influences in our educations. In the measured practice of ironing our own shirts, we folded ourselves into the logic of what is predetermined for us. Resisting and aiming to create the most contorted, unrecognizable versions of what was handed to us, we found joy in iteration.`,
      },
      {
        id: 't03',
        name: '03',
        images: ['/exhibtion/t03.jpeg'],
      },
      {
        id: 't04',
        name: '04',
        images: ['/exhibtion/t04.jpeg'],
      },
      {
        id: 't05',
        name: '05',
        images: ['/exhibtion/t05.JPEG'],
      },
    ],
  },
  {
    id: 4,
    title: 'MIXED USE',
    introductionText:
      'Mixed use space with fine dining on the first floor with views out to a large sculpture garden and a second floor that hosts a contemporary art gallery. Surrounded by historic masonry of the downtown, the delicate void aims to complete rather than compete.',
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
    id: 5,
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
    id: 6,
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
    ],
  },
];

// Paintings data
const paintings = [
  {
    id: 1,
    title: 'RADIO TOWERS',
    displayTitle: 'RADIO TOWERS',
    images: ['/works/rt/1.JPG', '/works/rt/3.JPG', '/works/rt/5.JPG'],
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
    content: `
Attachment is heavier than ambition.

The removal of ego must be supplemented by a removal of reverence in order to create. Holding work preciously removes the agency necessary for creativity.

Over the past week, I’ve become increasingly comfortable throwing my own work away. Not because I believe it to be subpar, and not because I’ve grown cynical, but because I'm learning how to extract what matters and leave the rest behind. Protecting your work is a waste of energy, defending things that fail to constitute your work.

Running your hands through your hair you’ve just cut for the first time, there’s a brief, unsettling moment where something feels wrong. When you expect more to be there as there was more there. But almost without noticing, what replaces the loss is a strange, unexpected freedom.

I’m not writing to argue that work should be thrown away more often, only that it should be allowed to change. Iteration should never be erasure, rather just attention. Build on what you have, refine what serves you, and let go of what doesn’t. In doing so, you make room for better work and stronger process.
    `
  },
];

function getScrollAnchor() {
  return window.scrollY + window.innerHeight / 3;
}

function getScrollLinkedState(items, sectionRefs, getId) {
  if (!items.length) return { activeId: null, progress: 0 };

  const anchor = getScrollAnchor();
  let activeId = getId(items[0]);
  let progress = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const el = sectionRefs.current[getId(item)];
    if (!el) continue;

    const top = el.getBoundingClientRect().top + window.scrollY;
    const bottom = top + el.offsetHeight;

    if (anchor < top) {
      activeId = i > 0 ? getId(items[i - 1]) : getId(item);
      progress = i > 0 ? 1 : 0;
      return { activeId, progress };
    }

    if (anchor >= top && anchor <= bottom) {
      activeId = getId(item);
      const range = bottom - top;
      progress = range > 0 ? Math.min(1, Math.max(0, (anchor - top) / range)) : 0;
      return { activeId, progress };
    }

    if (i === items.length - 1 && anchor > bottom) {
      activeId = getId(item);
      progress = 1;
      return { activeId, progress };
    }
  }

  return { activeId, progress };
}

function ScrollLinkedSidebar({ className, hidden, activeId, items, getId, renderItem }) {
  const resolvedActiveId = activeId ?? (items.length ? getId(items[0]) : null);

  return (
    <aside className={`${className} scroll-linked-sidebar ${hidden ? 'hidden' : ''}`}>
      <div className="sidebar-reel">
        {items.map((item) => {
          const id = getId(item);
          const variant =
            id === resolvedActiveId ? 'current' : id < resolvedActiveId ? 'passed' : 'upcoming';
          return <Fragment key={id}>{renderItem(item, { variant })}</Fragment>;
        })}
      </div>
    </aside>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activePainting, setActivePainting] = useState(null);
  const [activeWriting, setActiveWriting] = useState(null);
  const sectionRefs = useRef({});
  const projectSectionRefs = useRef({});
  const projectAnchorRefs = useRef({});
  const subcategoryRefs = useRef({});
  const paintingRefs = useRef({});
  const paintingAnchorRefs = useRef({});
  const writingRefs = useRef({});
  const writingAnchorRefs = useRef({});
  const anchorRefs = useRef({});

  // Handle scroll to update active states
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const spacesEl = sectionRefs.current['spaces'];
      const paintingsEl = sectionRefs.current['paintings'];
      const wordsEl = sectionRefs.current['words'];
      const homeEl = sectionRefs.current['home'];
      const contactEl = sectionRefs.current['contact'];

      let currentSection;
      if (homeEl && scrollPosition < homeEl.offsetTop + homeEl.offsetHeight) {
        currentSection = 'home';
      } else if (spacesEl && wordsEl && scrollPosition >= spacesEl.offsetTop && scrollPosition < wordsEl.offsetTop) {
        currentSection = 'spaces';
      } else if (wordsEl && paintingsEl && scrollPosition >= wordsEl.offsetTop && scrollPosition < paintingsEl.offsetTop) {
        currentSection = 'words';
      } else if (paintingsEl && contactEl && scrollPosition >= paintingsEl.offsetTop && scrollPosition < contactEl.offsetTop) {
        currentSection = 'paintings';
      } else if (contactEl && scrollPosition >= contactEl.offsetTop) {
        currentSection = 'contact';
      }
      if (currentSection !== undefined) {
        setActiveSection(currentSection);
      }

      // Spaces scroll-linked nav
      if (currentSection === 'spaces') {
        const { activeId } = getScrollLinkedState(
          projects,
          projectSectionRefs,
          (project) => project.id
        );
        setActiveProject(activeId);

        const project = projects.find((p) => p.id === activeId);
        if (project) {
          let matchedSub = null;
          for (const sub of project.subcategories.filter((s) => !s.isFinale)) {
            const element = subcategoryRefs.current[`${project.id}-${sub.id}`];
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 3) {
                matchedSub = sub.id;
              }
            }
          }
          setActiveSubcategory(matchedSub);
        }
      }

      // Paintings scroll-linked nav
      if (currentSection === 'paintings') {
        const { activeId } = getScrollLinkedState(
          paintings,
          paintingRefs,
          (painting) => painting.id
        );
        setActivePainting(activeId);
      }

      // Words scroll-linked nav
      if (currentSection === 'words') {
        const { activeId } = getScrollLinkedState(
          writings,
          writingRefs,
          (writing) => writing.id
        );
        setActiveWriting(activeId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll a plain (non-sticky) anchor element to the top of the viewport.
  // We deliberately target the interleaved 1px anchor divs rather than the
  // .subcategory-section elements: those are position:sticky, and calling
  // scrollIntoView/getBoundingClientRect on a stuck sticky element uses its
  // pinned position, not its real flow position, which lands on the wrong one.
  const scrollToAnchor = (element) => {
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSubcategory = (projectId, subId) => {
    scrollToAnchor(anchorRefs.current[`${projectId}-${subId}`]);
  };

  const scrollToPainting = (paintingId) => {
    scrollToAnchor(paintingAnchorRefs.current[paintingId]);
  };

  const scrollToWriting = (writingId) => {
    scrollToAnchor(writingAnchorRefs.current[writingId]);
  };

  const scrollToProject = (projectId) => {
    scrollToAnchor(projectAnchorRefs.current[projectId]);
  };

  // Determine if title should be large (low opacity) or small (matching description)
  const shouldUseLargeTitle = (projectId, subId) => {
    // Ann Carson Design (id: 1)
    // Arch Center (id: 1)
    if (projectId === 1 && ['site-axon-map', 'reading-room', 'floorplans', 'gallery', 'center', 'auditorium'].includes(subId)) {
      return true;
    }
    // ARTS PORCH (id: 2)
    if (projectId === 2 && ['axon', 'floorplan', 'sec', 'elev', 'side'].includes(subId)) {
      return true;
    }
    // Revisiting Bad Press (id: 3): exhibition images
    if (projectId === 3 && ['t01', 't02', 't03', 't04', 't05'].includes(subId)) {
      return true;
    }
    // Mixed Use (id: 4): celebration, site, sections, interiors, finale
    if (projectId === 4 && ['celebration', 'site', 'sections', 'interiors', 'finale'].includes(subId)) {
      return true;
    }
    // Healing (id: 5): site, floorplans, process, sectioncuts
    if (projectId === 5 && ['site', 'floorplans', 'process', 'sectioncuts'].includes(subId)) {
      return true;
    }
    // Enclosure (id: 6): ideation, formexploration, section, floorplan
    if (projectId === 6 && ['ideation', 'formexploration', 'section', 'floorplan'].includes(subId)) {
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
        <ScrollLinkedSidebar
          className="spaces-sidebar"
          hidden={activeSection !== 'spaces'}
          activeId={activeProject}
          items={projects}
          getId={(project) => project.id}
          renderItem={(project, { variant }) => (
            <div className={`project-index ${variant === 'current' ? 'active-project' : ''}`}>
              <div className="project-header">
                <span className="project-number">{project.id}</span>
                <span
                  className={`project-title ${variant === 'current' ? 'active' : 'inactive'}`}
                  onClick={() => scrollToProject(project.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {project.title}
                </span>
              </div>
              <ul className={`subcategory-list ${variant === 'current' ? 'expanded' : 'collapsed'}`}>
                {project.subcategories.filter((sub) => !sub.isFinale).map((sub) => (
                  <li
                    key={sub.id}
                    className={activeSubcategory === sub.id ? 'active' : ''}
                    onClick={() => scrollToSubcategory(project.id, sub.id)}
                  >
                    <span className="indicator">•</span>
                    {sub.name.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        />

        {/* Main Content */}
        <div className="spaces-content">
          {projects.map((project, projectIndex) => (
            <div key={project.id}>
              <div
                className="scroll-anchor"
                ref={(el) => (projectAnchorRefs.current[project.id] = el)}
              />
              <div
                className="project-section"
                ref={(el) => (projectSectionRefs.current[project.id] = el)}
              >
                {project.introductionText && (
                  <div className="subcategory-section project-introduction first-subcategory">
                    <p className="project-introduction-copy">{project.introductionText}</p>
                    {project.introductionCredits && (
                      <p className="project-introduction-credits">{project.introductionCredits}</p>
                    )}
                  </div>
                )}
                {project.subcategories.map((sub, subIndex) => (
                  <Fragment key={sub.id}>
                    <div
                      className="scroll-anchor"
                      ref={(el) => (anchorRefs.current[`${project.id}-${sub.id}`] = el)}
                    />
                    <div
                      className={`subcategory-section ${subIndex === 0 && !project.introductionText ? 'first-subcategory' : ''} ${sub.isFinale ? 'finale-section' : ''} ${sub.isTextBlock ? 'text-block-section' : ''}`}
                      ref={(el) => (subcategoryRefs.current[`${project.id}-${sub.id}`] = el)}
                    >
                      {sub.isTextBlock ? (
                        <div className="spaces-text-block">
                          <h3 className="spaces-text-block-title">{sub.name.toUpperCase()}</h3>
                          <div className="spaces-text-block-body">
                            {sub.content.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className="spaces-text-block-paragraph">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
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
                              {sub.meta.size && <p className="meta-item">{sub.meta.size}</p>}
                              {sub.meta.duration && <p className="meta-item">{sub.meta.duration}</p>}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Fragment>
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
        <ScrollLinkedSidebar
          className="words-sidebar"
          hidden={activeSection !== 'words'}
          activeId={activeWriting}
          items={writings}
          getId={(writing) => writing.id}
          renderItem={(writing, { variant }) => (
            <div
              className={`writing-index ${variant === 'current' ? 'active' : ''}`}
              onClick={() => scrollToWriting(writing.id)}
            >
              <div className="writing-header">
                <span className="writing-number">{writing.id}</span>
                <span className={`writing-title ${variant === 'current' ? 'active' : 'inactive'}`}>
                  {writing.title}
                </span>
              </div>
            </div>
          )}
        />

        {/* Words Content */}
        <div className="words-content">
          {writings.map((writing) => (
            <div key={writing.id}>
              <div
                className="scroll-anchor"
                ref={(el) => (writingAnchorRefs.current[writing.id] = el)}
              />
              <div
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
        <ScrollLinkedSidebar
          className="paintings-sidebar"
          hidden={activeSection !== 'paintings'}
          activeId={activePainting}
          items={paintings}
          getId={(painting) => painting.id}
          renderItem={(painting, { variant }) => (
            <div
              className={`painting-index ${variant === 'current' ? 'active' : ''}`}
              onClick={() => scrollToPainting(painting.id)}
            >
              <div className="painting-header">
                <span className="painting-number">{painting.id}</span>
                <span className={`painting-title ${variant === 'current' ? 'active' : 'inactive'}`}>
                  {painting.title}
                </span>
              </div>
              <div className="painting-meta">
                <span className="painting-size">{painting.size}</span>
                <span className="painting-materials">{painting.materials}</span>
              </div>
            </div>
          )}
        />

        {/* Paintings Content */}
        <div className="paintings-content">
          {paintings.map((painting) => (
            <div key={painting.id}>
              <div
                className="scroll-anchor"
                ref={(el) => (paintingAnchorRefs.current[painting.id] = el)}
              />
              <div
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
          <img src="/images/greenjacket.jpeg" alt="Allina" className="contact-photo" />
          <div className="contact-info">
            <p className="about-text">
              My name is Allina and I am currently an Honors student at the University of Kansas studying architecture. My motivation and energy to create is fueled by a desire to share.
            </p>
            <p className="about-text">
              I believe architecture, ideally, is an act of service. Creating living solutions for every possible user, architecture is a practice that flourishes in its application of interdisciplinary work. In the same vein, art and performance, first and foremost, is a shared experience that I believe is at its best in its intersections.
            </p>
            <p className="about-text personal">
              If you want to know me better I'd tell you I love making music with others, I spent a lot of my life playing with many orchestras, but now I play at small venues with my own emo grunge band. My favorite movies include <em>The Wind Rises</em>, <em>Minari</em>, and <em>Ex Machina</em>.
            </p>
            <span className="email">ALLINADOUGHERTY[AT]KU[DOT]EDU</span>
            <div className="social-links">
              <a href="https://www.instagram.com/allina.dough/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/icons/spot.png" alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/allina-dougherty-090398326/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/icons/linkedin.png" alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://www.pinterest.com/allinaeden/_created" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <img src="/icons/pinterest.svg" alt="Pinterest" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
