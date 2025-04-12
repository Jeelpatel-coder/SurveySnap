import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/survey-respond.css';

const SurveyRespond = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchSurvey();
    checkAuthStatus();
  }, [id]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/surveys/${id}`);
      setSurvey(response.data);
      // Initialize answers object with empty values
      const initialAnswers = {};
      response.data.questions.forEach((question, index) => {
        initialAnswers[index] = '';
      });
      setAnswers(initialAnswers);
      setLoading(false);
    } catch (error) {
      toast.error('Error loading survey');
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please log in to submit your response');
      return;
    }
    
    setSubmitting(true);

    try {
      // Check if all required questions are answered
      const unansweredRequired = survey.questions.filter((question, index) => 
        question.required && !answers[index]
      );

      if (unansweredRequired.length > 0) {
        toast.error('Please answer all required questions');
        setSubmitting(false);
        return;
      }

      // Format answers for submission
      const formattedAnswers = Object.entries(answers).map(([index, answer]) => ({
        questionId: survey.questions[index]._id,
        answer
      }));

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        navigate('/login');
        return;
      }

      await axios.post(`http://localhost:5001/api/surveys/${id}/submit`, {
        answers: formattedAnswers
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Survey submitted successfully!');
      navigate('/thank-you');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Authentication failed. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Error submitting survey');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = () => {
    // Store the current URL to redirect back after login
    localStorage.setItem('redirectAfterLogin', `/survey/${id}/respond`);
    navigate('/login');
  };

  const handleSignup = () => {
    // Store the current URL to redirect back after signup
    localStorage.setItem('redirectAfterLogin', `/survey/${id}/respond`);
    navigate('/signup');
  };

  if (loading) {
    return <div className="loading">Loading survey...</div>;
  }

  if (!survey) {
    return <div className="error">Survey not found</div>;
  }

  return (
    <div className="survey-respond-container">
      <div className="survey-header">
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>
      </div>

      {!isAuthenticated && (
        <div className="auth-notice">
          <p>You need to be logged in to submit your response.</p>
          <div className="auth-buttons">
            <button onClick={handleLogin} className="auth-button login">Log In</button>
            <button onClick={handleSignup} className="auth-button signup">Sign Up</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="survey-form">
        {survey.questions.map((question, index) => (
          <div key={index} className="question-container">
            <label className="question-label">
              {question.question}
              {question.required && <span className="required">*</span>}
            </label>

            {question.type === 'text' && (
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required={question.required}
              />
            )}

            {question.type === 'textarea' && (
              <textarea
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required={question.required}
              />
            )}

            {question.type === 'email' && (
              <input
                type="email"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required={question.required}
              />
            )}

            {question.type === 'tel' && (
              <input
                type="tel"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required={question.required}
              />
            )}

            {question.type === 'date' && (
              <input
                type="date"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required={question.required}
              />
            )}

            {question.type === 'file' && (
              <div className="file-upload-container">
                <input
                  type="file"
                  id={`file-${index}`}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleAnswerChange(index, {
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type
                      });
                    }
                  }}
                  required={question.required}
                />
                {answers[index] && (
                  <div className="file-info">
                    <p>Selected file: {answers[index].fileName}</p>
                    <p>Size: {(answers[index].fileSize / 1024).toFixed(2)} KB</p>
                  </div>
                )}
              </div>
            )}

            {(question.type === 'radio' || question.type === 'select') && (
              <div className="options-container">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-item">
                    <input
                      type={question.type === 'radio' ? 'radio' : 'checkbox'}
                      id={`${index}-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      required={question.required}
                    />
                    <label htmlFor={`${index}-${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </form>
    </div>
  );
};

export default SurveyRespond; 