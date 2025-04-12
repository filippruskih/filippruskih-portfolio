import React from 'react';
import './AboutCard.css';

const AboutCard = () => {
  return (
    <section id="about" className="about-card">
      <img src="/public/images/about.jpg" alt="Filipp Ruskih" />
      <div>
        <h2>About Me</h2>
        <p>
          I'm a professional model specializing in editorial, fashion, and commercial work. I love working with creatives and bringing ideas to life through visual storytelling.
        </p>
      </div>
    </section>
  );
};

export default AboutCard;
