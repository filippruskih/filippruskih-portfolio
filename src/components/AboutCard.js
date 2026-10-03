import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import './AboutCard.css';

const COMP_CARD_PHOTO_PATH = 'images/2025/editorial/front.jpeg';

const MEASUREMENTS = [
  ['Height', '189 cm / 6ft 3in'],
  ['Chest', '- cm'],
  ['Waist', '32'],
  ['Leg Length', '34'],
  ['Neck', '15.5'],
  ['Suit Jacket', '40L'],
  ['Shoe Size', '43 / 9 UK'],
  ['Weight', '85 KG'],
];

const loadImageAsDataURL = (src) =>
  fetch(src)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const getImageDimensions = (dataUrl) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });

const AboutCard = () => {
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState('');

  const downloadCompCard = async () => {
    setGenerating(true);
    setStatus('');
    try {
      const [{ default: jsPDF }, photoUrl] = await Promise.all([
        import('jspdf'),
        getDownloadURL(ref(storage, COMP_CARD_PHOTO_PATH)),
      ]);
      const imageData = await loadImageAsDataURL(photoUrl);
      const { width: naturalWidth, height: naturalHeight } = await getImageDimensions(imageData);

      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      const gray = 130;
      const darkGray = 60;

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(17, 17, 17);
      doc.text('Filipp Ruskih', pageWidth / 2, 22, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(gray, gray, gray);
      doc.text('Model  |  Creative  |  Visionary', pageWidth / 2, 29, { align: 'center' });

      doc.setDrawColor(gray, gray, gray);
      doc.setLineWidth(0.3);
      doc.line(margin, 34, pageWidth - margin, 34);

      // Photo — sized from its real aspect ratio so it's never stretched/squished
      const maxPhotoHeight = 140;
      const maxPhotoWidth = 110;
      const ratio = naturalHeight / naturalWidth;
      let photoWidth = maxPhotoWidth;
      let photoHeight = photoWidth * ratio;
      if (photoHeight > maxPhotoHeight) {
        photoHeight = maxPhotoHeight;
        photoWidth = photoHeight / ratio;
      }
      const photoX = (pageWidth - photoWidth) / 2;
      const photoY = 42;

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.4);
      doc.rect(photoX - 1.5, photoY - 1.5, photoWidth + 3, photoHeight + 3);
      doc.addImage(imageData, 'JPEG', photoX, photoY, photoWidth, photoHeight);

      // Measurements
      let y = photoY + photoHeight + 16;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(17, 17, 17);
      doc.text('MEASUREMENTS', margin, y);
      doc.setDrawColor(gray, gray, gray);
      doc.setLineWidth(0.2);
      doc.line(margin, y + 2, pageWidth - margin, y + 2);
      y += 10;

      const rowHeight = 7.5;
      doc.setFontSize(10);
      MEASUREMENTS.forEach(([label, value], i) => {
        if (i % 2 === 0) {
          doc.setFillColor(246, 246, 246);
          doc.rect(margin, y - 5, contentWidth, rowHeight, 'F');
        }
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkGray, darkGray, darkGray);
        doc.text(label.toUpperCase(), margin + 2, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(17, 17, 17);
        doc.text(value, margin + 65, y);
        y += rowHeight;
      });

      // Contact
      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(17, 17, 17);
      doc.text('CONTACT', margin, y);
      doc.setDrawColor(gray, gray, gray);
      doc.line(margin, y + 2, pageWidth - margin, y + 2);
      y += 10;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(17, 17, 17);
      doc.text('Email', margin + 2, y);
      doc.text('filippruskih@gmail.com', margin + 65, y);
      y += rowHeight;
      doc.text('Instagram', margin + 2, y);
      doc.text('@filippruskih', margin + 65, y);

      // Footer
      doc.setFontSize(8.5);
      doc.setTextColor(gray, gray, gray);
      doc.text('Comp card generated from filippruskih.com', pageWidth / 2, pageHeight - 10, {
        align: 'center',
      });

      doc.save('Filipp-Ruskih-Comp-Card.pdf');
    } catch (error) {
      console.error('Failed to generate comp card PDF:', error);
      setStatus('❌ Failed to generate PDF. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="about-card">
      <h2>About</h2>
      <p>
        Filipp Ruskih is a software engineer, model and creative based in Australia. With a strong visual presence and a modern editorial look, he brings energy and professionalism to every shoot, runway, and concept.
      </p>

      <div className="measurements">
        <h3>Current Measurements</h3>
        <ul>
          {MEASUREMENTS.map(([label, value]) => (
            <li key={label}>
              <strong>{label}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="comp-card-button"
        onClick={downloadCompCard}
        disabled={generating}
      >
        {generating ? 'Preparing PDF…' : 'Download Comp Card (PDF)'}
      </button>
      {status && <p className="comp-card-status">{status}</p>}
    </section>
  );
};

export default AboutCard;
