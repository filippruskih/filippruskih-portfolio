import React, { useEffect } from 'react';
import './InstagramFeed.css';

const INSTAGRAM_HANDLE = 'filippruskih';

// Paste your SnapWidget widget ID here after creating a free widget at
// https://snapwidget.com for @filippruskih (select "Photos only" in its
// settings to exclude videos/reels). Leave empty to show the fallback link card.
const INSTAGRAM_WIDGET_ID = '1131615';

const InstagramFeed = () => {
  useEffect(() => {
    if (!INSTAGRAM_WIDGET_ID) return;

    const script = document.createElement('script');
    script.src = 'https://snapwidget.com/js/snapwidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="instagram-feed">
      <div className="instagram-feed-header">
        <svg viewBox="0 0 24 24" className="instagram-icon" aria-hidden="true">
          <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .2 2.4.4.6.2 1 .5 1.5.9.4.4.7.9.9 1.5.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 2-.4 2.4-.2.6-.5 1-.9 1.5-.4.4-.9.7-1.5.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.2-2.4-.4-.6-.2-1-.5-1.5-.9-.4-.4-.7-.9-.9-1.5-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-2 .4-2.4.2-.6.5-1 .9-1.5.4-.4.9-.7 1.5-.9.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-1.9.3-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.3-.3.9-.3 1.9C3 9.5 3 9.9 3 12s0 3.5.1 4.7c.1 1 .3 1.6.3 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.3.1.9.3 1.9.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.3 1.9-.3.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.3.3-.9.3-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.3-1.6-.3-1.9-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.3-.1-.9-.3-1.9-.3-1.2-.1-1.6-.1-4.7-.1zm0 4.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 1.8a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm6.2-2.3a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z"/>
        </svg>
        <div>
          <h2>From Instagram</h2>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="instagram-handle-link"
          >
            @{INSTAGRAM_HANDLE} ↗
          </a>
        </div>
      </div>

      {INSTAGRAM_WIDGET_ID ? (
        <iframe
          src={`https://snapwidget.com/embed/${INSTAGRAM_WIDGET_ID}`}
          className="snapwidget-widget"
          title={`@${INSTAGRAM_HANDLE} on Instagram`}
          loading="lazy"
          allowTransparency="true"
          frameBorder="0"
          scrolling="no"
        />
      ) : (
        <a
          href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
          target="_blank"
          rel="noreferrer"
          className="instagram-fallback-card"
        >
          <span>See the latest shoots on Instagram</span>
          <span className="instagram-fallback-cta">Visit @{INSTAGRAM_HANDLE} →</span>
        </a>
      )}
    </section>
  );
};

export default InstagramFeed;
