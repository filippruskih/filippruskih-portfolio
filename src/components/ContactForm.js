import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_v63qa9g',        // ✅ your Service ID
      'template_bowsomq',       // ✅ your Template ID
      form.current,
      'zA5ES10eDHwL5yleO'       // ✅ your Public Key (User ID)
    )
    .then(() => {
      setStatus('✅ Message sent successfully!');
      form.current.reset();
    })
    .catch((error) => {
      console.error('❌ EmailJS error:', error);
      setStatus('❌ Failed to send message. Please try again.');
    });
  };

  return (
    <section className="contact-form">
      <h2>Contact Me</h2>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
};

export default ContactForm;
