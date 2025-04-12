import React from 'react';
import '../assets/privacy-policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>Welcome to SurveySnap. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
          <ul>
            <li>Identity Data (name, username)</li>
            <li>Contact Data (email address, phone number)</li>
            <li>Technical Data (IP address, browser type)</li>
            <li>Usage Data (how you use our website)</li>
            <li>Survey Data (responses to surveys you create or participate in)</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Data Security</h2>
          <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>
        </section>

        <section className="policy-section">
          <h2>5. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: jeelp0610@gmail.com</p>
          <p>Phone: +91 9313160512</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 