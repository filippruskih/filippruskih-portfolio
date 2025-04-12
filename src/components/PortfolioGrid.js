import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './PortfolioGrid.css';

const PortfolioGrid = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedShoot, setSelectedShoot] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define years and shoots structure
  const imageDataStructure = {
    2024: ['runway'],
    2025: ['runway', 'editorial'],
  };

  const years = Object.keys(imageDataStructure);
  const shoots = selectedYear ? imageDataStructure[selectedYear] : [];

  // Fetch images when year & shoot are selected
  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedYear || !selectedShoot) return;

      setLoading(true);
      const folderPath = `images/${selectedYear}/${selectedShoot}`;
      const folderRef = ref(storage, folderPath);

      try {
        console.log('📁 Fetching from:', folderPath);

        const result = await listAll(folderRef);
        console.log(`📸 Found ${result.items.length} image(s)`);

        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );

        setImageUrls(urls);
      } catch (error) {
        console.error('🔥 Error fetching images from Firebase:', error);
        setImageUrls([]);
      }

      setLoading(false);
    };

    fetchImages();
  }, [selectedYear, selectedShoot]);

  const handleYearClick = (year) => {
    if (selectedYear === year) {
      setSelectedYear(null);
      setSelectedShoot(null);
      setImageUrls([]);
    } else {
      setSelectedYear(year);
      setSelectedShoot(null);
      setImageUrls([]);
    }
  };

  const handleShootClick = (shoot) => {
    setSelectedShoot(prev => (prev === shoot ? null : shoot));
    if (selectedShoot === shoot) setImageUrls([]); // Toggle off
  };

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

      {/* Image Grid */}
      {loading ? (
        <p>Loading images...</p>
      ) : selectedShoot && imageUrls.length > 0 ? (
        <div className="grid">
          {imageUrls.map((url, index) => (
            <div key={index} className="grid-item">
              <img src={url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      ) : selectedShoot ? (
        <p>No images found for {selectedShoot} in {selectedYear}.</p>
      ) : selectedYear ? (
        <p className="select-prompt">Select a shoot to view images.</p>
      ) : (
        <p className="select-prompt">Please select a year to view portfolio images.</p>
      )}
    </section>
  );
};

export default PortfolioGrid;
