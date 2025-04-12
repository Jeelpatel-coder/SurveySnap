import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/thank-you.css';

const ThankYou = () => {
  return (
    <div className="thank">
      <div className="thank-you-container">
        <div className="thank-you-content">
          <div className="checkmark">✓</div>
          <h1>Thank You!</h1>
          <p>Your response has been submitted successfully.</p>
          {/* <div className="thank-you-actions">
          <Link to="/" className="home-btn">Return to Home</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 