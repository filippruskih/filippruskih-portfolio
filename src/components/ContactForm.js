import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle email logic or use a service like Formspree/EmailJS
  };

  return (
    <section id="contact" className="contact-form">
      <h2>Contact</h2>
      {submitted ? (
        <p>Thanks for reaching out! I’ll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      )}
    </section>
  );
};

export default ContactForm;
