import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './PortfolioGrid.css';

const PortfolioGrid = () => {
  const [folders, setFolders] = useState([]); // auto-detected folders
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 Get folders under /images/
  useEffect(() => {
    const fetchFolders = async () => {
      const baseRef = ref(storage, 'images');
      try {
        const result = await listAll(baseRef);
        const years = result.prefixes;

        const subfolderPromises = years.map(async (yearRef) => {
          const shoots = await listAll(yearRef);
          return shoots.prefixes.map((shootRef) => shootRef.fullPath); // e.g. images/2025/runway
        });

        const subfoldersNested = await Promise.all(subfolderPromises);
        const allSubfolders = subfoldersNested.flat();
        setFolders(allSubfolders);
      } catch (error) {
        console.error("🔥 Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  // 🔁 Fetch images when a folder is selected
  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedFolder) return;

      setLoading(true);
      const folderRef = ref(storage, selectedFolder);
      try {
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImageUrls(urls);
      } catch (error) {
        console.error('🔥 Error fetching images:', error);
        setImageUrls([]);
      }
      setLoading(false);
    };

    fetchImages();
  }, [selectedFolder]);

  return (
    <section id="portfolio" className="portfolio-grid">
      <h2>Portfolio</h2>

      {/* Folder Tabs */}
      <div className="tabs">
        {folders.map((folder) => (
          <button
            key={folder}
            className={selectedFolder === folder ? 'active' : ''}
            onClick={() => setSelectedFolder(prev => (prev === folder ? null : folder))}
          >
            {folder.replace('images/', '').replace('/', ' - ')}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <p>Loading images...</p>
      ) : selectedFolder && imageUrls.length > 0 ? (
        <div className="grid">
          {imageUrls.map((url, index) => (
            <div key={index} className="grid-item">
              <img src={url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      ) : selectedFolder ? (
        <p>No images found in <strong>{selectedFolder}</strong>.</p>
      ) : (
        <p className="select-prompt">Please select a folder to view portfolio images.</p>
      )}
    </section>
  );
};

export default PortfolioGrid;
