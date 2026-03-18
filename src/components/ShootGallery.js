import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './ShootGallery.css';

const ShootGallery = ({ folderPath, goBack }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, folderPath);
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImages(urls);
      } catch (error) {
        console.error('Error loading shoot:', error);
      }
      setLoading(false);
    };

    fetchImages();
  }, [folderPath]);

  if (loading) return <p>Loading shoot...</p>;

  const gridClass = images.length === 1 ? 'grid single-item' : 'grid';

  return (
    <div className="shoot-gallery">
      <button onClick={goBack} className="cta-button">← Back to Overview</button>
      <div className={gridClass}>
        {images.map((url, idx) => (
          <div key={idx} className="grid-item">
            <img src={url} alt={`Shoot ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShootGallery;
