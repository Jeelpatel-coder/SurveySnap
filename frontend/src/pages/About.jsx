import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/about.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About SurveySnap</h1>
        <p style={{marginTop: "2rem"}}>Empowering businesses and individuals to make data-driven decisions through powerful survey tools.</p>
        <p style={{marginTop: "2rem"}}>We believe that data is only as valuable as your ability to use it, which is why we've built a platform that blends usability with flexibility. From customizable question types and interactive UI to secure storage and real-time analytics, every feature is crafted to give you control and clarity.</p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>At SurveySnap, we believe that everyone deserves access to powerful survey tools that help them gather insights and make informed decisions. Our mission is to democratize survey creation and data collection, making it accessible to businesses of all sizes and individuals alike.</p>
        </div>
        <div className="mission-stats">
          <div className="stat-card">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-card">
            <h3>1M+</h3>
            <p>Surveys Created</p>
          </div>
          <div className="stat-card">
            <h3>50M+</h3>
            <p>Responses Collected</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <h2>Our Story</h2>
        <div className="story-content">
          <p>Founded in 2025, SurveySnap emerged from a simple observation: creating and managing surveys was unnecessarily complicated. Our team of experienced developers and UX designers came together to build a solution that would make survey creation intuitive, powerful, and accessible to everyone.</p>
          <p>Today, SurveySnap is used by businesses, researchers, educators, and individuals worldwide to collect valuable insights and make data-driven decisions.</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image">👨‍💻</div>
            <h3>Jeel Patel</h3>
            <p className="member-role">Founder & CEO</p>
            <p className="member-bio">10+ years of experience in software development and product management.</p>
          </div>
          <div className="team-member">
            <div className="member-image">👨‍💻</div>
            <h3>Tanay Buch</h3>
            <p className="member-role">Head of Design</p>
            <p className="member-bio">Expert in user experience and interface design.</p>
          </div>
          <div className="team-member">
            <div className="member-image">👨‍💻</div>
            <h3>Anand Prajapati</h3>
            <p className="member-role">Lead Developer</p>
            <p className="member-bio">Full-stack developer with expertise in modern web technologies.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions or feedback? We'd love to hear from you!</p>
        <div className="contact-buttons">
          <Link to="/contact" className="btn btn-primary" href="mailto:jeelp0610@gmail.com">Contact Us</Link>
          <Link to="/support" className="btn btn-secondary">Support Center</Link>
        </div>
      </section>
    </div>
  );
};

export default About; 