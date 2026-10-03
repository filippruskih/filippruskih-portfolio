import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './BookingForm.css';

const SHOOT_TYPES = ['Editorial', 'Runway', 'Commercial', 'Test Shoot', 'Other'];

const todayISO = () => new Date().toISOString().split('T')[0];

const BookingForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const sendBooking = (e) => {
    e.preventDefault();

    if (form.current.website.value) {
      // Honeypot field was filled in — silently drop the likely-bot submission.
      form.current.reset();
      return;
    }

    const data = new FormData(form.current);
    const message = [
      `Shoot type: ${data.get('shoot_type')}`,
      `Preferred date: ${data.get('preferred_date') || 'Not specified'}`,
      `Preferred time: ${data.get('preferred_time') || 'Not specified'}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      '',
      'Notes:',
      data.get('notes') || '(none)',
    ].join('\n');

    setSending(true);
    emailjs.send(
      'service_v63qa9g',        // same Service ID as the contact form
      'template_bowsomq',       // same Template ID as the contact form
      {
        from_name: data.get('from_name'),
        user_email: data.get('user_email'),
        message: `New booking request\n\n${message}`,
      },
      'zA5ES10eDHwL5yleO'       // same Public Key as the contact form
    )
      .then(() => {
        setStatus('✅ Booking request sent! You\'ll hear back shortly.');
        form.current.reset();
      })
      .catch((error) => {
        console.error('❌ EmailJS booking error:', error);
        setStatus('❌ Failed to send request. Please try again.');
      })
      .finally(() => setSending(false));
  };

  return (
    <section className="booking-form">
      <h2>Book a Shoot</h2>
      <p className="booking-intro">
        Interested in working together? Fill out the form below and I'll get back to you by email.
      </p>
      <form ref={form} onSubmit={sendBooking}>
        <input
          type="text"
          name="website"
          className="hp-field"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />

        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <input type="tel" name="phone" placeholder="Phone (optional)" />

        <select name="shoot_type" required defaultValue="">
          <option value="" disabled>Shoot Type</option>
          {SHOOT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="booking-datetime">
          <label>
            Preferred Date
            <input type="date" name="preferred_date" min={todayISO()} />
          </label>
          <label>
            Preferred Time
            <input type="time" name="preferred_time" />
          </label>
        </div>

        <textarea name="notes" rows="4" placeholder="Tell me about the shoot (location, concept, budget, etc.)"></textarea>

        <button type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Request Booking'}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
};

export default BookingForm;
