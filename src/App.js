import { useState, useEffect, useRef, useCallback, useMemo, Fragment } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import AnimatedSequence from './AnimatedSequence';

// Project data structure with descriptions
const projects = [
  {
    id: 1,
    title: 'ARCH CENTER',
    introductionText:
      'Creating a Center for Architecture in Kansas City\'s Arts district required an educational space that removes barrier. This project takes an undefined courtyard as its starting condition, a built space and the unbuilt. Its theoretical ground draws on Anne Carson\'s reading of Eros, in which desire is structured around a void that never closes, both drawing force from that same absence. This becomes structural with a single stairwell pierces the courtyard, remains the sole passage between floors. Circulation moves in orbit around this void, pulled outward toward in quiet spaces such as the gallery and reading room. Only to then be drawn back into to carry visitors across the distance. The architecture withholds arrival, asking its occupants to want the space before they are given it.',
    subcategories: [
      {
        id: 'program',
        name: 'Program',
        images: ['/archcenter/graphic.png'],
        description: 'Axonometric massing diagram'
      },
      {
        id: 'site-axon-map',
        name: 'Site Axon',
        images: ['/archcenter/arteriemap.png', '/archcenter/ac1.png'],
        layout: 'side-by-side',
        description: 'Sharing space with the KCAI ceramics and foundations studios, the Center finds itself amidst a vibrant student body.',
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
          '/archcenter/fp1.png',
          '/archcenter/fp2.png',
        ],
        layout: 'side-by-side',
        description: 'A rectangular first floor evolves on the second, bending as the narrative of architecture reflects changing desires. Legibility and order give way for the fluid movements that fuel us',
      },
      {
        id: 'reading-room',
        name: 'Reading Room',
        images: ['/archcenter/ac2.5.jpg'],
        description: 'A curved wall hugs a space for study anchored in the suspension of space. It becomes the invitation of a breaths held to defer full satisfaction of exhalation.',
      },
      {
        id: 'gallery',
        name: 'Gallery',
        images: ['/archcenter/ac3.jpg'],
      },
      {
        id: 'auditorium',
        name: 'Auditorium',
        images: ['/archcenter/ac5.png'],
        description: 'Bring us to a corner, pushing a desire to look on',
      },
      {
        id: 'center',
        name: 'Center',
        images: ['/archcenter/center.png'],
        description: 'The courtyard is the void of desire, pierced only by movement. We move for pursuit. Driven by envy and wanting, we interact with space through the framework of getting closer to what we want.',
      },
    ],
  },
  {
    id: 5,
    title: 'ARTS PORCH',
    introductionText:
      "Arts porch and Cafe placed along Kansas City's Art Walk initiative. Boasting a terrace with installation capabilities, its point grid runs the course of the building growing and mapping an ever-changing art's landscape.",
    subcategories: [
      {
        id: 'axon',
        name: 'Axonometric',
        images: ['/artsporch/AXON.jpg'],
        description: "A cafe and pavilion presents itself as a place of rest on KC's Arterie Artswalk that connects KCAI and the Nelson Museum of Art to the streetcars.",
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
    id: 2,
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
        duration: '2 weeks',
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
    id: 3,
    title: 'MIXED USE',
    introductionText:
      'The project responds to a historic downtown context shaped by a masonry and the measured rhythm of brick storefronts along the street. The project treats movement as its primary subject rather than a byproduct of circulation. The ground floor holds a fine dining space in its most enclosed volume, opening itself under the framework of movement toward a public sculpture park anchored by a Richard Serra piece, collapsing the distance between private and shared ground. A single monumental stair reaches the gallery above, where light is calibrated to the art it falls on. The exterior holds the proportions of its historic neighbors, brick and punched window, even as the section behind the facade proposes something else: a building that returns light and motion to a downtown otherwise held by masonry.',
 
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
      { id: 'movement', name: 'Movement', images: ['/mixeduse/collage.jpg'], description: 'Historic masonry and processions of commerce frame movement behind storefronts. In between, energy peeling in through the live music scene and nightlife ' },
      { 
        id: 'site', 
        name: 'Site', 
        images: ['/mixeduse/asset-8.jpg'],
        description: '1 - Site\n2 - Watkins History Museum\n3 - Douglas Courthouse\n4 - Granada Music Venue'
      },
      { 
        id: 'floorplan', 
        name: 'Floor Plan', 
        images: ['/mixeduse/Asset 2.jpg'],
        description:'The answer was the transparent form, by placing something transparent next to the stoneworks, the historical forms remain accessible. A second form retreats to fulfill reveals in and out of the gallery and restaurant.'
      },
      { id: 'sections', name: 'Sections', images: ['/mixeduse/New Model.png'] },
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
        images: ['/mixeduse/asset-9.jpg'],
        isFinale: true
      },
    ],
  },
  {
    id: 4,
    title: 'HEALING',
    introductionText:
      "Set within Clinton Lake's oak forest and restored prairie, the project is a satellite therapy space built to host workshops, group sessions, and retreats while protecting the privacy that therapeutic practice requires. Its V-shaped massing runs from open to closed, so a visitor descending the nature trail, moves through a gradient rather than a single threshold. The roofline carries the argument. Low and heavy over limestone-wrapped private rooms, rising into glass where the shared space opens toward Clinton Lake and a shared dining space. Privacy is built through proportion and material rather than walls alone, leaving the surrounding landscape to do the restorative work the program depends on.",
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
      { id: 'site', name: 'Site', images: ['/healing/site.jpg'], description: 'Past Clinton Boat Ramp 3, the site sits on a secluded shore of Clinton Lake.'},
      { id: 'floorplans', name: 'Floor Plans', images: ['/healing/floorplan_1.png'] },
      { 
        id: 'process', 
        name: 'Process', 
        images: ['/healing/process_1.JPEG', '/healing/process_2.JPEG'],
        layout: 'side-by-side'
      },
      { id: 'sectioncuts', name: 'Section Cuts', images: ['/healing/sectioncut_1.png'], description: 'Low and heavy over limestone-wrapped private rooms, rising into glass where the shared space opens toward Clinton Lake.' },
      { 
        id: 'therapeutic', 
        name: 'Therapeutic Design', 
        images: ['/healing/preview_image_2.png'], 
        description: 'In conjoining the two spaces, the entry vestibule gives the therapist a chance to introduce visitors to the space. By providing a dedicated entry that transparently offers visual opportunities to understand what lies on either side of the building, visitors can acclimate.' 
      },
    ],
  },
  {
    id: 6,
    title: 'ENCLOSURE',
    // Hidden per request: this project (Roger Shimomura residence) is excluded
    // from the Spaces menu grid and the scrollable Spaces section below.
    hidden: true,
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
      { id: 'section', name: 'Section', images: ['/enclosure/section_1.png'] },
      { id: 'floorplan', name: 'Floor Plan', images: ['/enclosure/floorplan.png'] },
    ],
  },
];

// Display order for the Spaces section is driven by each project's id.
projects.sort((a, b) => a.id - b.id);

// Projects actually shown in the Spaces menu grid + scrollable Spaces section
// (excludes anything flagged `hidden`, e.g. the Shimomura residence).
const visibleProjects = projects.filter((project) => !project.hidden);

// Per-image size control for the Spaces section. Each entry in a
// subcategory's `images` array can stay a plain path string (renders at its
// normal 100% size, unchanged), or become `{ src, scale }` where `scale` is
// 1-100 and shrinks that one image from its anchored corner (bottom-left for
// standard slides, center for side-by-side/finale) — everything else about
// its layout/position is untouched. Example: images: [{ src: '/foo.jpg', scale: 70 }]
const getImageSrc = (image) => (typeof image === 'string' ? image : image.src);
const getImageScale = (image) => {
  if (typeof image === 'string') return 100;
  const scale = Number(image.scale);
  return Number.isFinite(scale) ? Math.min(100, Math.max(1, scale)) : 100;
};

// Visible artwork box of an <img>, in viewport coordinates. `object-fit:
// contain` letterboxes the picture inside its element, so the painted area is
// usually narrower than the element — and on standard slides it is pinned to
// the element's left edge rather than centred.
function getRenderedImageSpan(image) {
  const rect = image.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;

  const { naturalWidth, naturalHeight } = image;
  const style = window.getComputedStyle(image);
  // `cover` fills (and overflows) the element, so the element box *is* the
  // visible artwork; only `contain` leaves empty margins worth measuring.
  if (!naturalWidth || !naturalHeight || style.objectFit !== 'contain') {
    return { left: rect.left, right: rect.right };
  }

  const scale = Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
  const width = naturalWidth * scale;
  const slack = rect.width - width;
  const position = style.objectPosition.split(' ')[0] || '50%';
  const offset = position.endsWith('%')
    ? (parseFloat(position) / 100) * slack
    : parseFloat(position) || 0;

  return { left: rect.left + offset, right: rect.left + offset + width };
}

// Artwork span of a whole image group, as an offset/width relative to the
// group's own box. Side-by-side pairs span from the first image's left edge
// to the second's right edge.
function getArtworkSpan(group) {
  const groupRect = group.getBoundingClientRect();
  let left = Infinity;
  let right = -Infinity;

  group.querySelectorAll('img').forEach((image) => {
    const span = getRenderedImageSpan(image);
    if (!span) return;
    left = Math.min(left, span.left);
    right = Math.max(right, span.right);
  });

  if (!Number.isFinite(left) || !Number.isFinite(right)) return null;
  return { offset: left - groupRect.left, width: right - left };
}

// Spaces menu page: descriptive titles + a representative thumbnail per project.
// Each entry links (by projectId) to the matching project in the Spaces section.
const spacesMenu = [
  { projectId: 1, title: 'ARCHITECTURAL CENTER FOR KANSAS CITY', image: '/archcenter/ac3.jpg' },
  { projectId: 2, title: 'REVISITING BAD PRESS MICRO EXHIBITION', image: '/exhibtion/t05.JPEG' },
  { projectId: 3, title: 'CONTEMPORARY GALLERY + FINE DINING', image: '/mixeduse/collage.jpg' },
  { projectId: 4, title: 'FIELDHOUSE WELLNESS RETREAT CENTER', image: '/healing/preview_image.png' },
  { projectId: 5, title: 'ARTS WALK CAFE PORCH WITH EXHIBITION', image: '/artsporch/AXON.jpg' },
  { projectId: 6, title: 'CAMPUS ARTIST RESIDENCE SHIMOMURA', image: '/enclosure/1.JPEG' },
].filter((item) => visibleProjects.some((project) => project.id === item.projectId));

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
    title: 'LIEBESKIND; SYSTEMS OF LOGIC',
    subtitle: 'mapping chamberworks, engaging musical annotations and algorithmic composition',
    image: '/images/libe.png',
    content: `
Daniel Libeskind published 28 ink drawings in 1983 titled Chamber Works: Architectural Meditation on Themes from Heraclitus.


Employing this bending and infinite analogy of musical composition, he engages the pre-Socratic thought of Heraclitus a dedication to the flux that defines the illogical condition of experience. 

As designers, legibility is the highest demand. There is no value in making something that cannot be understood. A clear message and image sells. So we deploy to fit needs.

This logic ignores what we cannot explain, what fails to make sense with our given systems of scale. There is no concise way to express condition. So how do we annotate the illogical to read? How do we embrace the struggle of understanding? 

Employing strategies of musician shorthand marks, I have been mapping the rules and logic of Libeskind framed by an engagement in the geometric rulings that define our value sets. Email me if you want to see the work.
    `
  },
  {
    id: 2,
    title: 'THE OBJECT AND THE MECHANISM',
    subtitle: 'a tale of two cities',
    layout: 'two-column',
    content: `
Every town is a diagram of what somebody, somewhere, decided a good life should look like. The Waltons and Mr. Miller

The Object

Everything you could want exists in one town in the Northwest Arkansas.

Moshe Safdie's Crystal Bridges is an cemented arts institutions placed delicately in a ring of nature trails you can bike. A Frank Lloyd Wright home was purchased and transplanted into the complex. Buckminster Fuller's Fly's Eye dome bought and stitched into the fabric of the museum. You'll find it not far from the 350 acre new Walmart Home Office. In fact, it's close enough for a Walmart employee to visit over lunch. And if art museums aren't for you, you'll find miles of trails that seem to sprout up overnight. Visiting any restaurant there you'll find the same Pinterest curated textures and patterns wallpapering popular and widely pleasing cuisine.

Bentonville places before you with a salon style gallery wall, a sea of frames, and asks only that you agree it is beautiful. They are daring you to complain in the face of its curation. The city is designing itself to eradicate anything that doesn't fit into its carefully calibrated utopia. But what do the Waltons think you want? What satisfaction is fulfilled when everything is built for you, without you? If every want is met, what is left for you to find? What is left to aspire for?

The Mechanism

Columbus has no single beautiful museum. No surrounding web of bike trails. Investments in flagships are disinteresting to this master plan. Irwin Miller funded the construction of various public works like the fire station, public library, and schools. The only stipulation is that they must select from a list of the great modernists. Across the street from I.M. Pei's Cleo Rogers Memorial Library sits Eliel Saarinen's First Christian Church, one of the first modern churches built in America. Richard Meier, Cesar Pelli, Kevin Roche, Harry Weese and Venturi all boast buildings within this township of 50,000. The density of 60+ landmark buildings situates the entire city as its own museum of modern architecture. Here, the design process is still based in a patron based system but invokes a different control. Miller curates a list of possible encounters that aren't predictable, even though his list is handpicked.

While my preferences may be clear, Bentonville and Columbus aren't radically different. Both still are paying to decide what you are allowed to want. It's the Waltons that curate the product while Miller curates the list of authors, letting them individually answer. Miller is letting each end result offer different theses for modernity.

That's the diagram. Each town decides what "good" means before you move in. Neither town answer well. Because neither answer whether you should want the thing or I want to keep wanting it?

Every set of drawings I make is a bet about which kind of town I want to build. I draw to disengage with the master planning set before me by a standardized architectural education. I believe an education that triumphs the student who professionalizes themselves into the monocrop of architectural graduates is an education that disengages with the necessity of wanting. A student who doesn't want more is a student who will fail to live and design creatively. A student who wants more risks not getting approved for the list.
    `
  },
];

// Contact data
// Contact data — one array per column, each holding groups. A group is a
// heading plus either social links (the identity block) or a list of entries.
// An entry is a title, optional italic meta lines (organisation, years, or a
// role), and an optional note. Meta lines may be a plain string or
// `{ text, url }` to link one out.
const contact = {
  columns: [
    [
      {
        heading: 'ALLINA DOUGHERTY',
        links: [
          { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/allina-dougherty-090398326/' },
          { label: 'PINTEREST', url: 'https://www.pinterest.com/allinaeden/_created' },
        ],
      },
      {
        heading: 'CURRENTLY,',
        entries: [
          {
            title: 'HONORS M.ARCH, GRADUATE RESEARCH ASSISTANT, STUDIO MENTOR',
            meta: ['THE UNIVERSITY OF KANSAS'],
          },
        ],
      },
      {
        heading: 'EXPERIENCE,',
        entries: [
          {
            title: 'STUDENT EDUCATOR+ AMBASSADOR',
            meta: [
              { text: 'THE SPENCER MUSEUM OF ART', url: 'https://spencerart.ku.edu/' },
              '2025-',
            ],
            note: 'Presenting tours for K-12 students, adapting and engaging through storytelling to create an inclusive and discovery-driven environment.',
          },
          {
            title: 'ARCHITECTURAL INTERN',
            meta: ['JHET ARCHITECTS, DALLAS, TX', '2025, 2026'],
            note: 'Aiding in Construction Documentation/Administration in Revit, contributing to 19 projects, across 3 states, totaling over 2,500,000 sq ft.',
          },
        ],
      },
    ],
    [
      {
        heading: 'MERITS, AWARDS+',
        entries: [
          {
            title: 'UNIVERSITY SCHOLAR',
            url: 'https://news.ku.edu/news/article/2026-cohort-of-university-scholars-announced',
            meta: ['2026'],
            note: '1 of 20 students selected for participation in mentorship and an interdisciplinary seminar.',
          },
          {
            title: 'UNDERGRADUATE RESEARCH AWARD RECIPIENT',
            url: 'https://engr.ku.edu/news/article/20-ku-students-receive-undergraduate-research-awards-for-summer-and-fall-2026',
            meta: ['2026, CURF INSTITUTE'],
          },
          {
            title: "UNIVERSITY OF KANSAS SCHOOL OF ARCHITECTURE DEAN'S LIST",
            meta: ['2024, 2025, 2026'],
          },
          {
            title: 'FIRST ROBOTICS DEANS LIST',
            url: 'https://www.thebluealliance.com/team/5968/history',
            meta: ['2023'],
            note: 'Built a $45,000 sponsorship pipeline from corporate and private donors, reversing a 10-year losing streak and qualifying my robotics team for international competition.',
          },
          {
            title: 'ANDERSON KNIGHT PRAIRIE DREAMS MURAL COMPETITION',
            url: 'https://www.linkedin.com/posts/akarchitects_work-students-illustration-activity-7080210181816516608-FTgq/',
            meta: ['2023'],
            note: 'My work was selected for a permanent mural at the Anderson Knight Architecture office.',
          },
        ],
      },
    ],
    [
      {
        heading: 'ENGAGEMENTS',
        entries: [
          {
            title: 'KULTURA PUBLICATION',
            url: 'https://www.instagram.com/ku.ltura/',
            meta: ['2026-'],
            note: "Founding member, grade level representative of KU's architecture student publication, primarily aiding in visuals and graphic development.",
          },
          {
            title: 'INTERVIEW COACHING',
            url: 'https://www.thebluealliance.com/team/5968/history',
            meta: ['2024-'],
            note: 'After my success, I began coaching awards nominees. I did prep sessions with two students helping them earn invitations to international competition in back to back years.',
          },
          {
            title: 'TAEJO',
            url: 'https://www.instagram.com/taejo400ppi/',
            meta: ['2025-'],
            note: 'I play guitar, bass, and sing in an emo grunge band. We write and record original music. I also really enjoy screen printing my own merch in my kitchen.',
          },
        ],
      },
    ],
    [
      {
        heading: 'DIGITAL SKILLS',
        entries: [
          { title: 'ADOBE SUITE, FIGMA, CANVA', meta: ['Graphics'] },
          { title: 'RHINO, REVIT, SKETCHUP', meta: ['3D Modeling'] },
          { title: 'ENSCAPE, D5', meta: ['Rendering'] },
        ],
      },
      {
        heading: 'REFERENCES',
        entries: [
          {
            title: 'PETER OLSHAVSKY, PH.D, ASSOCIATE PROFESSOR OF ARCHITECTURE',
            url: 'https://www.linkedin.com/in/peter-olshavsky-ph-d-5131a6159/',
            meta: ['polshavsky[at]ku[dot]edu'],
          },
          {
            title: 'ELYSE TUCKER, CEO, JHET ARCHITECTS',
            url: "https://www.linkedin.com/in/elyse-tucker-b1346b29/",
            meta: ['elyse.tucker[at]jhetarchitects[dot]com'],

          
          },
        ],
      },
    ],
  ],
};

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

function ContactExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
      {children}
    </a>
  );
}

// A single contact entry: title, then any italic meta lines, then a note.
function ContactEntry({ entry }) {
  return (
    <li className="contact-entry">
      <p className="contact-entry-title">
        {entry.url ? (
          <ContactExternalLink href={entry.url}>{entry.title}</ContactExternalLink>
        ) : (
          entry.title
        )}
      </p>
      {entry.meta?.map((line) => (
        <p key={typeof line === 'string' ? line : line.text} className="contact-entry-meta">
          {typeof line === 'string' ? (
            line
          ) : (
            <ContactExternalLink href={line.url}>{line.text}</ContactExternalLink>
          )}
        </p>
      ))}
      {entry.note && <p className="contact-entry-note">{entry.note}</p>}
    </li>
  );
}

// A heading plus its contents. The identity group leads with the name and
// social links; every other group is a list of entries.
function ContactGroup({ group }) {
  return (
    <div className="contact-group">
      {group.links ? (
        <>
          <h2 className="contact-name">{group.heading}</h2>
          <ul className="contact-links">
            {group.links.map((link) => (
              <li key={link.label}>
                <ContactExternalLink href={link.url}>{link.label}</ContactExternalLink>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h3 className="contact-group-heading">{group.heading}</h3>
      )}
      {group.entries && (
        <ul className="contact-entry-list">
          {group.entries.map((entry) => (
            <ContactEntry key={entry.title} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ===== SPACES SCROLL GATE =====
   The landing page scrolls freely until the Spaces menu comes into view. At
   that point the page eases into the menu and stops: the only way forward is
   clicking a space or a nav item. Scrolling back up is always allowed, and
   returning to the landing page re-arms the gate for the next approach.

   armed    -> waiting for the user to scroll down toward the menu
   snapping -> easing into the menu's locked position
   locked   -> pinned on the menu until a selection is made
   released -> a selection was made; normal scrolling                        */
const GATE_ARMED = 'armed';
const GATE_SNAPPING = 'snapping';
const GATE_LOCKED = 'locked';
const GATE_RELEASED = 'released';

// How much of the menu must be in view before the page eases into it.
const GATE_APPROACH_RATIO = 0.55;
// Deltas below these are trackpad/momentum noise, not an intent to move on.
const GATE_MIN_DOWN_DELTA = 2;
const GATE_TOUCH_THRESHOLD = 6;
// Distance back above the menu that counts as "returned to the landing page".
const GATE_REARM_RATIO = 0.9;
const GATE_FORWARD_KEYS = new Set(['ArrowDown', 'PageDown', 'End', ' ', 'Spacebar']);
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [contenteditable]';

// The focused single-project view is a desktop refinement: below this width the
// sidebars are hidden entirely and Spaces stays the full scrollable stack.
const DESKTOP_QUERY = '(min-width: 769px)';

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function scrollWindowTo(top, smooth) {
  window.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
}

// Calls back once window scrolling has come to rest, and returns a canceller.
// Frame-based rather than a fixed timeout so it tracks however long the
// browser's own smooth-scroll animation happens to take.
function watchScrollSettled(onSettled) {
  const STABLE_FRAMES = 4;
  const MIN_FRAMES = 8;
  let lastY = window.scrollY;
  let stableFrames = 0;
  let frames = 0;
  let rafId = 0;

  const tick = () => {
    const y = window.scrollY;
    stableFrames = Math.abs(y - lastY) < 0.5 ? stableFrames + 1 : 0;
    lastY = y;
    frames += 1;

    if (frames >= MIN_FRAMES && stableFrames >= STABLE_FRAMES) {
      rafId = 0;
      onSettled();
      return;
    }
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };
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

  // The project opened from the Spaces menu. On desktop, Spaces then shows
  // only this project (and its index) until SPACES is clicked in the nav.
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const sync = (event) => setIsDesktop(event.matches);
    setIsDesktop(media.matches);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  // Drives both the sidebar index and the content column, so the two can never
  // disagree about what's on screen.
  const shownProjects = useMemo(() => {
    if (!isDesktop || selectedProjectId === null) return visibleProjects;
    const focused = visibleProjects.find((project) => project.id === selectedProjectId);
    return focused ? [focused] : visibleProjects;
  }, [isDesktop, selectedProjectId]);

  const isProjectFocused = shownProjects !== visibleProjects;

  // Mirrored for the scroll gate's listeners, which run outside React's
  // render cycle and must not be rebound every time these change.
  const focusedProjectIdRef = useRef(null);
  const activeSectionRef = useRef('home');

  // Measured artwork spans, keyed `${projectId}-${subId}`, used to sit each
  // description centred under its image instead of across the content column.
  const [descriptionBoxes, setDescriptionBoxes] = useState({});
  const imageGroupRefs = useRef({});
  const measureFrameRef = useRef(0);

  const [spacesGate, setSpacesGate] = useState(GATE_ARMED);
  // Mirrored in a ref so the (once-installed) scroll/wheel/key listeners can
  // read the current phase without being torn down and rebound on every change.
  const spacesGateRef = useRef(GATE_ARMED);
  const programmaticScrollRef = useRef(false);
  const cancelSettleRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const touchStartYRef = useRef(0);

  const measureDescriptionBoxes = useCallback(() => {
    setDescriptionBoxes((previous) => {
      const next = {};
      let changed = false;

      Object.entries(imageGroupRefs.current).forEach(([key, group]) => {
        const span = group ? getArtworkSpan(group) : null;
        if (!span) return;
        next[key] = span;
        const before = previous[key];
        if (
          !before ||
          Math.abs(before.offset - span.offset) > 0.5 ||
          Math.abs(before.width - span.width) > 0.5
        ) {
          changed = true;
        }
      });

      const sameCount = Object.keys(next).length === Object.keys(previous).length;
      return !changed && sameCount ? previous : next;
    });
  }, []);

  // Images arrive at different times and every re-measure reads layout, so
  // batch requests into a single frame.
  const scheduleDescriptionMeasure = useCallback(() => {
    if (measureFrameRef.current) return;
    measureFrameRef.current = requestAnimationFrame(() => {
      measureFrameRef.current = 0;
      measureDescriptionBoxes();
    });
  }, [measureDescriptionBoxes]);

  useEffect(() => {
    scheduleDescriptionMeasure();
    window.addEventListener('resize', scheduleDescriptionMeasure);
    // Backstop for images already decoded before their onLoad was attached.
    window.addEventListener('load', scheduleDescriptionMeasure);

    return () => {
      window.removeEventListener('resize', scheduleDescriptionMeasure);
      window.removeEventListener('load', scheduleDescriptionMeasure);
      if (measureFrameRef.current) cancelAnimationFrame(measureFrameRef.current);
    };
  }, [scheduleDescriptionMeasure]);

  useEffect(() => {
    focusedProjectIdRef.current = isProjectFocused ? selectedProjectId : null;
    activeSectionRef.current = activeSection;
  }, [activeSection, isProjectFocused, selectedProjectId]);

  const setSpacesGateState = useCallback((next) => {
    if (spacesGateRef.current === next) return;
    spacesGateRef.current = next;
    setSpacesGate(next);
  }, []);

  // Where the menu holds the page: its top edge, plus any height that spills
  // past the viewport so short screens can still reach the bottom of the grid.
  const getSpacesMenuBounds = useCallback(() => {
    const element = sectionRefs.current['spacesMenu'];
    if (!element) return null;
    const top = element.offsetTop;
    return { top, maxY: top + Math.max(0, element.offsetHeight - window.innerHeight) };
  }, []);

  const cancelSettleWatch = useCallback(() => {
    if (!cancelSettleRef.current) return;
    cancelSettleRef.current();
    cancelSettleRef.current = null;
  }, []);

  // Every programmatic scroll (nav, menu tiles, sidebars) runs through here so
  // the gate ignores the movement it causes and settles in the right phase.
  const runGuidedScroll = useCallback(
    (scrollAction, nextGate, onSettled) => {
      if (nextGate) setSpacesGateState(nextGate);
      programmaticScrollRef.current = true;
      cancelSettleWatch();
      scrollAction();
      cancelSettleRef.current = watchScrollSettled(() => {
        cancelSettleRef.current = null;
        programmaticScrollRef.current = false;
        lastScrollYRef.current = window.scrollY;
        if (onSettled) onSettled();
      });
    },
    [cancelSettleWatch, setSpacesGateState]
  );

  // Handle scroll to update active states
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const spacesMenuEl = sectionRefs.current['spacesMenu'];
      const spacesEl = sectionRefs.current['spaces'];
      const paintingsEl = sectionRefs.current['paintings'];
      const wordsEl = sectionRefs.current['words'];
      const homeEl = sectionRefs.current['home'];
      const contactEl = sectionRefs.current['contact'];

      let currentSection;
      if (homeEl && scrollPosition < homeEl.offsetTop + homeEl.offsetHeight) {
        currentSection = 'home';
      } else if (spacesMenuEl && spacesEl && scrollPosition >= spacesMenuEl.offsetTop && scrollPosition < spacesEl.offsetTop) {
        // Spaces menu page: header nav is visible but the project sidebar is not.
        currentSection = 'spacesMenu';
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
          shownProjects,
          projectSectionRefs,
          (project) => project.id
        );
        setActiveProject(activeId);

        const project = shownProjects.find((p) => p.id === activeId);
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
  }, [shownProjects]);

  // Spaces scroll gate. Blocks only *forward* scroll intent at the menu, so
  // reverse scrolling, clicking, hovering and focus all keep working normally.
  useEffect(() => {
    // A focused project is a dead end: the last slide is as far as scrolling
    // goes, and the way onward is the header nav. Only
    // applies while the reader is actually in Spaces, so a nav jump to Words
    // isn't dragged back afterwards.
    const getProjectStop = () => {
      const projectId = focusedProjectIdRef.current;
      if (projectId === null || activeSectionRef.current !== 'spaces') return null;
      const section = projectSectionRefs.current[projectId];
      if (!section) return null;
      // Stop with the final slide filling the viewport.
      return Math.max(0, section.offsetTop + section.offsetHeight - window.innerHeight);
    };

    // Furthest the reader may scroll right now, or null when unrestricted.
    const getForwardStop = () => {
      const gate = spacesGateRef.current;
      if (gate === GATE_LOCKED || gate === GATE_SNAPPING) {
        const bounds = getSpacesMenuBounds();
        return bounds ? bounds.maxY : null;
      }
      return getProjectStop();
    };

    const isAtForwardStop = () => {
      const stop = getForwardStop();
      return stop !== null && window.scrollY >= stop - 1;
    };

    const startSnap = (bounds) => {
      setSpacesGateState(GATE_SNAPPING);
      cancelSettleWatch();
      scrollWindowTo(bounds.top, true);
      cancelSettleRef.current = watchScrollSettled(() => {
        cancelSettleRef.current = null;
        // An upward scroll during the ease-in cancels it; don't re-grab them.
        if (spacesGateRef.current !== GATE_SNAPPING) return;
        const settled = getSpacesMenuBounds();
        if (settled && Math.abs(window.scrollY - settled.top) > 2) {
          scrollWindowTo(settled.top, false);
        }
        setSpacesGateState(GATE_LOCKED);
      });
    };

    const cancelSnap = () => {
      if (spacesGateRef.current !== GATE_SNAPPING) return;
      cancelSettleWatch();
      scrollWindowTo(window.scrollY, false); // stops the in-flight smooth scroll
      setSpacesGateState(GATE_ARMED);
    };

    const handleGateScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;
      lastScrollYRef.current = y;

      const bounds = getSpacesMenuBounds();
      if (!bounds) return;

      const gate = spacesGateRef.current;
      if (gate === GATE_SNAPPING) return;

      if (gate === GATE_LOCKED) {
        // Safety net for anything the input handlers can't intercept, e.g.
        // dragging the scrollbar or momentum carried in from a fast flick.
        if (y > bounds.maxY + 1) scrollWindowTo(bounds.maxY, false);
        else if (y < bounds.top - 1) setSpacesGateState(GATE_ARMED);
        return;
      }

      if (programmaticScrollRef.current) return;

      if (gate === GATE_ARMED) {
        if (y > bounds.maxY) {
          // Overshot the menu entirely (scrollbar drag / hash jump).
          scrollWindowTo(bounds.maxY, false);
          setSpacesGateState(GATE_LOCKED);
        } else if (
          delta >= GATE_MIN_DOWN_DELTA &&
          y >= bounds.top - window.innerHeight * GATE_APPROACH_RATIO
        ) {
          startSnap(bounds);
        }
        return;
      }

      if (gate === GATE_RELEASED) {
        if (y < bounds.top - window.innerHeight * GATE_REARM_RATIO) {
          setSpacesGateState(GATE_ARMED);
          return;
        }
        // Backstop for momentum or a scrollbar drag past the last slide.
        const stop = getProjectStop();
        if (stop !== null && delta > 0 && y > stop + 1) scrollWindowTo(stop, false);
      }
    };

    const handleWheel = (event) => {
      const gate = spacesGateRef.current;
      if (gate === GATE_SNAPPING) {
        if (event.deltaY < 0) cancelSnap();
        else event.preventDefault();
        return;
      }
      if (event.deltaY > 0 && isAtForwardStop()) event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (!GATE_FORWARD_KEYS.has(event.key)) return;
      // Links and buttons own their own keys — Space/Enter must still activate
      // a focused menu tile rather than being swallowed as a scroll attempt.
      if (event.target?.closest?.(INTERACTIVE_SELECTOR)) return;
      if (spacesGateRef.current === GATE_SNAPPING || isAtForwardStop()) event.preventDefault();
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event) => {
      const gate = spacesGateRef.current;
      // Finger travelling up moves the page forward; down scrolls back.
      const forward = touchStartYRef.current - (event.touches[0]?.clientY ?? 0);
      if (forward > GATE_TOUCH_THRESHOLD) {
        if (gate === GATE_SNAPPING || isAtForwardStop()) event.preventDefault();
      } else if (forward < -GATE_TOUCH_THRESHOLD && gate === GATE_SNAPPING) {
        cancelSnap();
      }
    };

    const handleResize = () => {
      const stop = getForwardStop();
      if (stop !== null && window.scrollY > stop) scrollWindowTo(stop, false);
    };

    // Reloading part-way down the page shouldn't yank the reader backwards.
    lastScrollYRef.current = window.scrollY;
    const initialBounds = getSpacesMenuBounds();
    if (initialBounds) {
      if (window.scrollY > initialBounds.maxY) setSpacesGateState(GATE_RELEASED);
      else if (window.scrollY >= initialBounds.top) setSpacesGateState(GATE_LOCKED);
    }

    window.addEventListener('scroll', handleGateScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleGateScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelSettleWatch();
    };
  }, [cancelSettleWatch, getSpacesMenuBounds, setSpacesGateState]);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (!element) return;
    // A nav choice is an intentional selection, so it releases the gate —
    // except the logo and SPACES, which head back above the Spaces
    // content and re-arm it instead. Dropping the focused project is deferred
    // until the return scroll lands, so the content doesn't re-expand mid-flight.
    const backToMenu = sectionId === 'spacesMenu';
    runGuidedScroll(
      () => element.scrollIntoView({ behavior: 'smooth' }),
      backToMenu || sectionId === 'home' ? GATE_ARMED : GATE_RELEASED,
      backToMenu
        ? () => {
            setSelectedProjectId(null);
            setSpacesGateState(GATE_LOCKED);
          }
        : undefined
    );
  };

  // The landing page is one big invitation to move on: a click anywhere on it
  // (or on the white space that follows) carries the reader to the Spaces menu,
  // where the gate takes over and holds until they choose a project. Dragging
  // out a text selection isn't a click, so it doesn't count.
  const handleLandingClick = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) return;
    scrollToSection('spacesMenu');
  };

  // Scroll a plain (non-sticky) anchor element to the top of the viewport.
  // We deliberately target the interleaved 1px anchor divs rather than the
  // .subcategory-section elements: those are position:sticky, and calling
  // scrollIntoView/getBoundingClientRect on a stuck sticky element uses its
  // pinned position, not its real flow position, which lands on the wrong one.
  const scrollToAnchor = (element) => {
    if (!element) return;
    // Picking a space (or any sidebar entry) is the intentional selection that
    // lets the page move past the menu.
    runGuidedScroll(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), GATE_RELEASED);
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
    // Commit the selection before measuring: on desktop this drops the other
    // projects from the column, so the anchor has to be read after that
    // relayout or the scroll lands at the pre-filter position.
    flushSync(() => setSelectedProjectId(projectId));
    scrollToAnchor(projectAnchorRefs.current[projectId]);
  };

  // Pins a description to the measured artwork above it. Falls back to the
  // full content column until the image has loaded and been measured.
  const getDescriptionStyle = (projectId, subId) => {
    const box = descriptionBoxes[`${projectId}-${subId}`];
    if (!box) return undefined;
    return { width: `${box.width}px`, marginLeft: `${box.offset}px` };
  };

  // While the menu holds the page, everything below it is off-limits: `inert`
  // keeps Tab from walking into content the user can't scroll to yet (which
  // would otherwise fight the lock by scrolling the focused element into view).
  const isSpacesGateHolding = spacesGate === GATE_LOCKED || spacesGate === GATE_SNAPPING;
  const belowMenuInert = isSpacesGateHolding ? '' : undefined;

  return (
    <div className="App">
      {/* Fixed Header */}
      <header className="fixed-header">
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <img src="/images/eden.png" alt="Eden" className="logo" />
        </a>
        <nav className={`main-nav ${activeSection === 'home' ? 'hidden' : ''}`}>
          <a 
            href="#spaces-menu" 
            onClick={(e) => { e.preventDefault(); scrollToSection('spacesMenu'); }}
            className={activeSection === 'spaces' || activeSection === 'spacesMenu' ? 'active' : ''}
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
            href="#profile" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            PROFILE
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
        onClick={handleLandingClick}
      >
        <div className="home-content">
          {/* Frame-sequence hero: autoplay in view, seamless ping-pong loop,
              preloaded + downscaled for smooth high-DPI playback. */}
          <AnimatedSequence
            className="home-animation"
            frameFolder="/animation"
            frameCount={5}
            startIndex={10}
            prefix="frame-"
            ext="jpg"
            fps={3}
            pingPong
            loop
            autoplay
            objectFit="contain"
            ariaLabel="Allina Dougherty animated illustration"
            cropTop={0.32}
            cropBottom={0.3}
          />
          {/* Handwritten identity lockup (reuses the existing signed name asset). */}
          <div className="home-identity">
            <img src="/images/signed.png" alt="Allina Dougherty" className="home-name" />
            <p className="home-tagline">A STUDENT ARCHITECTURAL DESIGNER + RESEARCHER</p>
          </div>
        </div>
      </section>

      {/* Full-screen white space so the hero clears out before any other
          content or navigation appears while scrolling to Spaces. */}
      <div className="home-spacer" aria-hidden="true" onClick={handleLandingClick} />

      {/* Spaces Menu Page — thumbnail index that links into the Spaces section */}
      <section
        id="spaces-menu"
        className="section spaces-menu-section"
        ref={(el) => (sectionRefs.current['spacesMenu'] = el)}
      >
        <div className="spaces-menu-grid">
          {spacesMenu.map((item) => (
            <button
              key={item.projectId}
              type="button"
              className="spaces-menu-item"
              onClick={() => scrollToProject(item.projectId)}
              aria-label={`Go to project: ${item.title}`}
            >
              <div className="spaces-menu-thumb">
                <img src={item.image} alt={item.title} className="spaces-menu-image" />
              </div>
              <div className="spaces-menu-caption">
                <span className="spaces-menu-title">{item.title}</span>
                <span className="spaces-menu-number">{item.projectId}.</span>
              </div>
            </button>
          ))}
        </div>
        {/* The page deliberately stops here, so say what moves it on. */}
        <p
          className={`spaces-menu-hint ${isSpacesGateHolding ? 'is-visible' : ''}`}
          aria-hidden={!isSpacesGateHolding}
        >
          Select a space to continue
        </p>
      </section>

      {/* Spaces Section */}
      <section 
        id="spaces" 
        className="section spaces-section"
        ref={(el) => (sectionRefs.current['spaces'] = el)}
        inert={belowMenuInert}
      >
        {/* Fixed Sidebar Index */}
        <ScrollLinkedSidebar
          className="spaces-sidebar"
          hidden={activeSection !== 'spaces'}
          activeId={activeProject}
          items={shownProjects}
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
          {shownProjects.map((project, projectIndex) => (
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
                      className={`subcategory-section ${subIndex === 0 && !project.introductionText ? 'first-subcategory' : ''} ${sub.isFinale ? 'finale-section' : ''} ${sub.isTextBlock ? 'text-block-section' : ''} ${!sub.isFinale && !sub.isTextBlock && sub.layout !== 'side-by-side' ? 'anchor-bottom-left' : ''}`}
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
                          <div
                            className={`image-group ${sub.layout === 'side-by-side' ? 'side-by-side' : ''}`}
                            ref={(el) => {
                              if (sub.description) {
                                imageGroupRefs.current[`${project.id}-${sub.id}`] = el;
                              }
                            }}
                          >
                            {sub.images.map((img, idx) => {
                              const scale = getImageScale(img);
                              return (
                                <img
                                  key={idx}
                                  src={getImageSrc(img)}
                                  alt={`${project.title} - ${sub.name}`}
                                  className="project-image"
                                  style={scale < 100 ? { transform: `scale(${scale / 100})` } : undefined}
                                  onLoad={scheduleDescriptionMeasure}
                                />
                              );
                            })}
                          </div>

                          {/* Show description if exists */}
                          {sub.description && (
                            <div
                              className="description-block"
                              style={getDescriptionStyle(project.id, sub.id)}
                            >
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
              {projectIndex < shownProjects.length - 1 && (
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
        inert={belowMenuInert}
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
                <div className={`writing-layout ${writing.layout === 'two-column' ? 'two-column' : ''}`}>
                  <div className="writing-info">
                    <h3 className="writing-display-title">{writing.title}</h3>
                    <p className="writing-subtitle">{writing.subtitle}</p>
                    <div className="writing-text">
                      {writing.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="writing-paragraph">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  {writing.image && (
                    <div className="writing-figure">
                      <img
                        src={writing.image}
                        alt={writing.title}
                        className="writing-image"
                      />
                    </div>
                  )}
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
        inert={belowMenuInert}
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

      {/* Profile Section — labelled PROFILE in the nav; the internal key and
          styles stay `contact`, as this is the contact/CV page. */}
      <section 
        id="profile" 
        className="section contact-section"
        ref={(el) => (sectionRefs.current['contact'] = el)}
        inert={belowMenuInert}
      >
        <div className="contact-content">
          {contact.columns.map((groups) => (
            <div key={groups[0].heading} className="contact-column">
              {groups.map((group) => (
                <ContactGroup key={group.heading} group={group} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
