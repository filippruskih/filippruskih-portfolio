import React from 'react';
import './AboutCard.css';

const AboutCard = () => {
  return (
    <section className="about-card">
      <h2>About</h2>
      <p>
        Filipp Ruskih is a software engineer, model and creative based in Australia. With a strong visual presence and a modern editorial look, he brings energy and professionalism to every shoot, runway, and concept.
      </p>

      <div className="measurements">
        <h3>Current Measurements</h3>
        <ul>
          <li><strong>Height:</strong> 189 cm / 6ft 3in</li>
          <li><strong>Chest:</strong> - cm</li>
          <li><strong>Waist:</strong> 32</li>
          <li><strong>Leg Length:</strong> 34</li>
          <li><strong>Neck:</strong> 15.5</li>
          <li><strong>Suit Jacket:</strong> 40L</li>
          <li><strong>Shoe Size:</strong> 43 / 9 UK</li>
          <li><strong>Weight:</strong> 85 KG</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutCard;
