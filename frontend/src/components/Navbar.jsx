// import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'
import "../assets/navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  let user = null;
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user');
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><i class="ri-stack-fill"></i> SurveySnap</Link>
      </div>
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}><i class="ri-home-fill"></i> Home</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}><i class="ri-file-info-fill"></i> About</Link>
        {token ? (
          <>
            <Link to="/create-survey" onClick={() => setIsMenuOpen(false)}><i class="ri-bar-chart-fill"></i> Create Survey</Link>
            <Link to="/your-surveys" onClick={() => setIsMenuOpen(false)}><i class="ri-bookmark-3-fill"></i> Your Surveys</Link>
            <Link to="/profile" className="profile-link" onClick={() => setIsMenuOpen(false)}>
              <FaUser /> {user?.username || 'User'}
            </Link>
            <button onClick={() => {
              handleSignOut();
              setIsMenuOpen(false);
            }} className="sign-out-btn">
              <i class="ri-logout-box-fill"></i> Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}><i class="ri-login-circle-fill"></i> Sign In</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}><i class="ri-login-box-fill"></i> Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar