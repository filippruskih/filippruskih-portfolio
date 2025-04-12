import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Connect with me:</p>
      <div className="socials">
        <a href="https://instagram.com/filippruskih" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/filippruskih/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="mailto:filippruskih@gmail.com">Email</a>
      </div>
      <p className="credit">© {new Date().getFullYear()} Filipp Ruskih</p>
    </footer>
  );
};

export default Footer;
