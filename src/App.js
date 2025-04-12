import React, { useState } from 'react';
import './App.css';
import PortfolioGrid from './components/PortfolioGrid';
import AboutCard from './components/AboutCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'App dark' : 'App'}>
      <button className="toggle-mode" onClick={toggleMode}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <header className="hero">
        <div className="overlay">
          <h1>Filipp Ruskih</h1>
          <p>Model | Creative | Visionary</p>
          <a href="#portfolio" className="cta-button">View Portfolio</a>
        </div>
      </header>

      <main>
        <PortfolioGrid />
        <AboutCard />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}

export default App;