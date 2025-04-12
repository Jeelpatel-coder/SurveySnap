import React, { useState } from 'react';
import '../assets/contact-us.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='con'>
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <p className="contact-intro">Have questions or feedback? We'd love to hear from you!</p>

          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="info-item">
                <h3>Email</h3>
                <p>jeelp0610@gmail.com</p>
              </div>
              <div className="info-item">
                <h3>Phone</h3>
                <p>+91 9313160512</p>
              </div>
              <div className="info-item">
                <h3>Address</h3>
                <p>60, Satyam Row House<br />Chandkheda, Ahmedabad<br />India</p>
              </div>
              <div className="info-item">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />Saturday - Sunday: Closed</p>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn"><a href="mailto:jeelp0610@gmail.com" className='submit-a'>Send Message</a></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 