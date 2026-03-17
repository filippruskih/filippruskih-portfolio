import React, { useState } from 'react';
import './App.css';
import PortfolioOverview from './components/PortfolioOverview';
import ShootGallery from './components/ShootGallery';
import AboutCard from './components/AboutCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>Filipp Ruskih</h1>
            <p className="tagline">Model | Creative | Visionary</p>
          </div>
          <ul className="navbar-links">
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="portfolio">
          {selectedFolder ? (
            <ShootGallery folderPath={selectedFolder} goBack={() => setSelectedFolder(null)} />
          ) : (
            <PortfolioOverview onSelect={setSelectedFolder} />
          )}
        </section>

        <section id="about">
          <AboutCard />
        </section>

        <section id="contact">
          <ContactForm />
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default App;
