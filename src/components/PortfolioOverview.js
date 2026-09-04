import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './PortfolioOverview.css';

const RESIZED_SUFFIX = '_200x200';

const getResizedPath = (fullPath) => {
  const lastSlash = fullPath.lastIndexOf('/');
  const dir = fullPath.substring(0, lastSlash + 1);
  const filename = fullPath.substring(lastSlash + 1);
  const dotIndex = filename.lastIndexOf('.');
  const name = filename.substring(0, dotIndex);
  const ext = filename.substring(dotIndex + 1);
  return `${dir}${name}${RESIZED_SUFFIX}.${ext}`;
};

const PortfolioOverview = ({ onSelect }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setError(false);
        const baseRef = ref(storage, 'images/');
        const yearResult = await listAll(baseRef);

        const shootsByYear = await Promise.all(
          yearResult.prefixes.map((yearPrefix) => listAll(yearPrefix))
        );

        const shootEntries = shootsByYear.flatMap((shoots, i) =>
          shoots.prefixes.map((shootPrefix) => ({
            year: yearResult.prefixes[i].name,
            shootPrefix,
          }))
        );

        const folderResults = await Promise.all(
          shootEntries.map(async ({ year, shootPrefix }) => {
            const images = await listAll(shootPrefix);
            if (images.items.length === 0) return null;
            const original = images.items[0];
            let coverUrl;
            try {
              const resizedRef = ref(storage, getResizedPath(original.fullPath));
              coverUrl = await getDownloadURL(resizedRef);
            } catch {
              coverUrl = await getDownloadURL(original);
            }
            return {
              name: `${year} / ${shootPrefix.name}`,
              path: shootPrefix.fullPath,
              coverUrl,
            };
          })
        );

        setFolders(folderResults.filter(Boolean));
      } catch (error) {
        console.error('Error loading folders:', error);
        setError(true);
      }
      setLoading(false);
    };

    fetchFolders();
  }, []);

  if (loading) return <p>Loading portfolio...</p>;

  if (error) {
    return (
      <div className="portfolio-error">
        <p>Couldn't load the portfolio. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="portfolio-overview">
      {folders.map((folder, index) => (
        <div
          className="portfolio-card"
          key={index}
          onClick={() => onSelect(folder.path)}
        >
          <img src={folder.coverUrl} alt={folder.name} loading="lazy" />
          <h3>{folder.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PortfolioOverview;
