import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    if (!hasDigit) {
      return 'Password must contain at least one digit';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/users/signup', {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      });

      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='signup-div'>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Join SurveySnap to create and share surveys</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
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
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li className={formData.password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
                  <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>One uppercase letter</li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'valid' : ''}>One special character</li>
                  <li className={/[0-9]/.test(formData.password) ? 'valid' : ''}>One digit</li>
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className={`signup-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || passwordError}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="signup-footer">
            <p>Already have an account? <a href="/login">Sign in</a></p>
          </div>
          <div className="terms">
            By signing up, you agree to our{' '}
            <a href="/terms">Terms of Service</a> and{' '}
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 