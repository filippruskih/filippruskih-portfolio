import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './PortfolioOverview.css';

const PortfolioOverview = ({ onSelect }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const baseRef = ref(storage, 'images/');
        const yearResult = await listAll(baseRef);
        let allFolders = [];

        for (const yearPrefix of yearResult.prefixes) {
          const year = yearPrefix.name;
          const shoots = await listAll(yearPrefix);
          for (const shootPrefix of shoots.prefixes) {
            const folderPath = shootPrefix.fullPath;
            const images = await listAll(shootPrefix);
            if (images.items.length > 0) {
              const coverUrl = await getDownloadURL(images.items[0]);
              allFolders.push({
                name: `${year} / ${shootPrefix.name}`,
                path: folderPath,
                coverUrl,
              });
            }
          }
        }

        setFolders(allFolders);
      } catch (error) {
        console.error('Error loading folders:', error);
      }
      setLoading(false);
    };

    fetchFolders();
  }, []);

  if (loading) return <p>Loading portfolio...</p>;

  return (
    <div className="portfolio-overview">
      {folders.map((folder, index) => (
        <div
          className="portfolio-card"
          key={index}
          onClick={() => onSelect(folder.path)}
        >
          <img src={folder.coverUrl} alt={folder.name} />
          <h3>{folder.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PortfolioOverview;
