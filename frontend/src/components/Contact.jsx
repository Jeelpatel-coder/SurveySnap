import React from 'react';
import '../assets/contact.css';

const Contact = () => {
  return (
    <div className='con'>
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <div className="contact-info">
            <div className="contact-method">
              <h2>Email</h2>
              <p>support@surveysnap.com</p>
            </div>
            <div className="contact-method">
              <h2>Phone</h2>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-method">
              <h2>Address</h2>
              <p>123 Survey Street<br />San Francisco, CA 94105<br />United States</p>
            </div>
          </div>
          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 