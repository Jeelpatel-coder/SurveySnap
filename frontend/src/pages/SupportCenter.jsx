import React from 'react';
import '../assets/support-center.css';

const SupportCenter = () => {
  return (
    <div className="support-container">
      <div className="support-content">
        <h1>Support Center</h1>
        <p className="support-intro">Welcome to our Support Center. Find answers to common questions or get in touch with our support team.</p>

        <div className="support-grid">
          {/* FAQ Section */}
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>How do I create a survey?</h3>
                <p>To create a survey, log in to your account and click on the "Create Survey" button. Follow the step-by-step process to add questions, customize the design, and publish your survey.</p>
              </div>
              <div className="faq-item">
                <h3>Can I customize the appearance of my surveys?</h3>
                <p>Yes! You can customize the colors, fonts, and layout of your surveys to match your brand. Premium users get access to additional customization options.</p>
              </div>
              <div className="faq-item">
                <h3>How do I share my survey?</h3>
                <p>Once your survey is ready, you can share it via email, social media, or by embedding it on your website. You'll receive a unique link for each survey.</p>
              </div>
              <div className="faq-item">
                <h3>What types of questions can I add?</h3>
                <p>We support multiple question types including multiple choice, text input, rating scales, and more. Premium users get access to additional question types.</p>
              </div>
            </div>
          </section>

          {/* Support Options */}
          <section className="support-options">
            <h2>Get Help</h2>
            <div className="support-cards">
              <div className="support-card">
                <h3>Email Support</h3>
                <p>Send us an email and we'll get back to you within 24 hours.</p>
                <a href="mailto:jeelp0610@gmail.com" className="support-btn">Email Us</a>
              </div>
              <div className="support-card">
                <h3>Live Chat</h3>
                <p>Chat with our support team in real-time during business hours.</p>
                <a className="support-btn" href="https://wa.me/9313160512" target='_blank'>Start Chat</a>
              </div>
              {/* <div className="support-card">
                <h3>Knowledge Base</h3>
                <p>Browse our comprehensive documentation and tutorials.</p>
                <a href="/docs" className="support-btn">View Docs</a>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter; 