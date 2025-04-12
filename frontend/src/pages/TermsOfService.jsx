import React from 'react';
import '../assets/terms-of-service.css';

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using SurveySnap, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        </section>

        <section className="terms-section">
          <h2>2. Description of Service</h2>
          <p>SurveySnap provides an online platform for creating, distributing, and analyzing surveys. The service includes various features for survey creation, data collection, and analysis tools.</p>
        </section>

        <section className="terms-section">
          <h2>3. User Responsibilities</h2>
          <p>As a user of SurveySnap, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information when registering</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not use the service for any illegal or unauthorized purpose</li>
            <li>Not interfere with or disrupt the service or servers</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Intellectual Property</h2>
          <p>All content included on SurveySnap, such as text, graphics, logos, button icons, images, and software, is the property of SurveySnap or its content suppliers and protected by international copyright laws.</p>
        </section>

        <section className="terms-section">
          <h2>5. Limitation of Liability</h2>
          <p>SurveySnap shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
        </section>

        <section className="terms-section">
          <h2>6. Modifications to Service</h2>
          <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
        </section>

        <section className="terms-section">
          <h2>7. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p>Email: jeelp0610@gmail.com</p>
          <p>Phone: +91 9313160512</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 