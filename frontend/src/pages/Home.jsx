import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import ImageCarousel from '../components/ImageCarousel';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Create Professional Surveys in Minutes</h1>
          <p>Design, distribute, and analyze surveys with ease. Get started for free today!</p>
          <div className="cta-buttons">
            {isAuthenticated ? (
              <Link to="/create-survey" className="btn cta-primary">Create Survey</Link>
            ) : (
              <>
                <Link to="/create-survey" className="btn cta-primary">Create Your First Survey</Link>
                <Link to="/login" className="btn cta-secondary">Sign In</Link>
              </>
            )}
          </div>
        </div>
        <ImageCarousel />
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">1M+</span>
            <span className="stat-label">Surveys Created</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50M+</span>
            <span className="stat-label">Responses Collected</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose SurveySnap?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Easy to Use</h3>
            <p>Create professional surveys in minutes with our intuitive interface.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Powerful Analytics</h3>
            <p>Get detailed insights and analytics for your survey responses.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is protected with enterprise-grade security.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Survey</h3>
            <p>Choose from our templates or start from scratch.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Share with Your Audience</h3>
            <p>Distribute your survey via email, social media, or embed it on your website.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Analyze Results</h3>
            <p>View real-time responses and generate reports.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" style={{backgroundColor: "#e7f3f6"}}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Is SurveySnap free to use?</h3>
            <p>Yes! We offer a free plan with basic features. Upgrade to our Pro plan for advanced features.</p>
          </div>
          <div className="faq-item">
            <h3>Can I customize my survey?</h3>
            <p>Yes! You can customize your survey based on your sectors and preferences.</p>
          </div>
          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>We use industry-standard encryption and security measures to protect your data.</p>
          </div>
          <div className="faq-item">
            <h3>What types of questions can I add?</h3>
            <p>We support various question types including multiple choice, rating scales, open-ended, and more.</p>
          </div>
          <div className="faq-item">
            <h3>How do I manage my survey responses?</h3>
            <p>Our dashboard provides real-time response tracking, filtering options.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a limit to how many surveys I can create?</h3>
            <p>No, there is no limit. You can create Unlimited surveys.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="contact-section">
        <h2>Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Have questions? We're here to help!</h3>
            <p>Our support team is available 24/7 to assist you with any questions or concerns.</p>
            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-icon">📧</span>
                <span className='important'>jeelp0610@gmail.com</span>
              </div>
              <div className="contact-method">
                <span className="method-icon">📞</span>
                <span className='important'>+91 9313160512</span>
              </div>
            </div>
          </div>
          <div className='form'>

            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <a type="submit" className="btn contact-btn" href="mailto:jeelp0610@gmail.com">Send Message</a>
            </form>
          </div>
        </div>
      </section> */}
      
      <section className="testimonials-section">
        <h2>Trusted by Organizations Worldwide</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">❝</div>
            <p>"SurveySnap has transformed how we collect customer feedback. The platform is intuitive and the analytics are incredibly powerful."</p>
            <div className="testimonial-author">
              <strong>Sarah Johnson</strong>
              <span>Product Manager, TechCorp</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">❝</div>
            <p>"The best survey tool we've used. The templates save us hours of work, and our response rates have increased significantly."</p>
            <div className="testimonial-author">
              <strong>Michael Chen</strong>
              <span>Research Analyst, DataCo</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">❝</div>
            <p>"Outstanding customer support and constant platform improvements. SurveySnap is our go-to solution for all survey needs."</p>
            <div className="testimonial-author">
              <strong>Emily Rodriguez</strong>
              <span>Marketing Director, GrowthLabs</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 