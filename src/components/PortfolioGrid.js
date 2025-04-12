import React, { useState } from 'react';
import Modal from 'react-modal';
import './PortfolioGrid.css';

const imageData = {
  2024: {
    runway: ['/images/2024/runway/portfolio4.jpg'],
    editorial: ['/images/2024/editorial/portfolio3.jpg'],
  },
  2025: {
    runway: ['/images/2025/runway/portfolio1.jpg', '/images/2025/runway/portfolio2.jpg', '/images/2025/runway/portfolio3.jpg', '/images/2025/runway/portfolio3.jpg', '/images/2025/runway/portfolio3.jpg'],
    editorial: ['/images/2025/editorial/portfolio2.jpg'],
  },
};

const PortfolioGrid = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedShoot, setSelectedShoot] = useState(null);

  const handleYearClick = (year) => {
    if (selectedYear === year) {
      setSelectedYear(null);
      setSelectedShoot(null);
    } else {
      setSelectedYear(year);
      setSelectedShoot(null);
    }
  };

  const handleShootClick = (shoot) => {
    setSelectedShoot(prev => (prev === shoot ? null : shoot));
  };

  const years = Object.keys(imageData);
  const shoots = selectedYear ? Object.keys(imageData[selectedYear]) : [];

  return (
    <section id="portfolio" className="portfolio-grid">
      <h2>Portfolio</h2>

      {/* Year Tabs */}
      <div className="tabs">
        {years.map((year) => (
          <button
            key={year}
            className={selectedYear === year ? 'active' : ''}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Shoot Tabs */}
      {selectedYear && (
        <div className="sub-tabs">
          {shoots.map((shoot) => (
            <button
              key={shoot}
              className={selectedShoot === shoot ? 'active' : ''}
              onClick={() => handleShootClick(shoot)}
            >
              {shoot.charAt(0).toUpperCase() + shoot.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Images */}
      {selectedShoot && selectedYear ? (
        <div className="grid">
          {imageData[selectedYear][selectedShoot].map((src, index) => (
            <div key={index} className="grid-item">
              <img src={src} alt={`${selectedYear} ${selectedShoot} ${index + 1}`} />
            </div>
          ))}
        </div>
      ) : selectedYear && (
        <p className="select-prompt">Select a shoot to view images from {selectedYear}.</p>
      )}
    </section>
  );
};


export default PortfolioGrid;
