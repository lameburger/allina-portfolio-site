import React from 'react';

const ImageGallery = () => {
  const images = [
    { src: 'works/1.png', heading: 'Work 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin suscipit interdum quam, a efficitur nunc.' },
    { src: 'works/2.png', heading: 'Work 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin suscipit interdum quam, a efficitur nunc.' },
    { src: 'works/3.png', heading: 'Work 3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin suscipit interdum quam, a efficitur nunc.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {images.map((image, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ position: 'relative', width: '300px', height: '200px' }}>
            <img
              src={image.src}
              alt={`Work ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            <h2
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '5px',
                fontSize: '1.5em',
                margin: 0,
                borderRadius: '5px',
              }}
            >
              {image.heading}a
            </h2>
          </div>
          <div
            style={{
              width: '400px',
              maxWidth: '100%',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.6',
              color: '#333',
              fontSize: '1.1em',
              columnCount: 2, // Creates a newspaper-like layout
              columnGap: '20px',
            }}
          >
            {image.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;