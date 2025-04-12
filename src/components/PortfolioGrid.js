import React from 'react';
import './PortfolioGrid.css';

const images = [
  '/public/images/portfolio1.jpg',
  '/public/images/portfolio2.jpg',
  '/public/images/portfolio3.jpg',
  '/public/images/portfolio4.jpg',
  // Add more image paths in public/ folder
];

const PortfolioGrid = () => {
  return (
    <section id="portfolio" className="portfolio-grid">
      <h2>Portfolio</h2>
      <div className="grid">
        {images.map((src, index) => (
          <div key={index} className="grid-item">
            <img src={src} alt={`Portfolio ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
