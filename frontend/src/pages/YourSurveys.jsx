import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/your-surveys.css';

const YourSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://surveysnap.onrender.com/api/surveys', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurveys(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching surveys');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/surveys/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Survey deleted successfully');
        fetchSurveys();
      } catch (error) {
        toast.error('Error deleting survey');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/survey/${id}/edit`);
  };

  const handleViewResponses = (id) => {
    navigate(`/survey/${id}/responses`);
  };

  const handleSubmitResponses = (id) => {
    navigate(`/survey/${id}/submit`);
  };

  const handleViewAnalytics = (id) => {
    navigate(`/survey/${id}/analytics`);
  };

  const generateShareableLink = (surveyId) => {
    // Get the current origin (domain) of the application
    const origin = window.location.origin;
    return `${origin}/survey/${surveyId}/respond`;
  };

  const handleShare = async (surveyId) => {
    const shareableLink = generateShareableLink(surveyId);
    
    // Share via email
    const emailSubject = 'Survey Invitation';
    const emailBody = `Please take a moment to fill out this survey: ${shareableLink}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Share via WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Please take a moment to fill out this survey: ${shareableLink}`)}`;
    
    // Create a modal for sharing options
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-content">
        <h3>Share Survey</h3>
        <div class="share-link">
          <input type="text" value="${shareableLink}" readonly />
          <button onclick="navigator.clipboard.writeText('${shareableLink}')">Copy</button>
        </div>
        <div class="share-buttons">
          <a href="${emailUrl}" target="_blank" class="share-button email">
            Share via Email
          </a>
          <a href="${whatsappUrl}" target="_blank" class="share-button whatsapp">
            Share via WhatsApp
          </a>
        </div>
        <button class="close-modal" onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    
    document.body.appendChild(modal);
  };

  if (loading) {
    return <div className="loading">Loading surveys...</div>;
  }

  return (
    <div className="your-surveys-container">
      <h2>Your Surveys</h2>
      <div className="surveys-grid">
        {surveys.map((survey) => (
          <div key={survey._id} className="survey-card">
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <div className="survey-actions">
              <button onClick={() => handleEdit(survey._id)} className="edit-btn">
                Edit Survey
              </button>
              <button onClick={() => handleShare(survey._id)} className="share-btn">
                Share Survey
              </button>
              <button onClick={() => handleViewResponses(survey._id)} className="view-btn">
                View Responses
              </button>
              <button onClick={() => handleDelete(survey._id)} className="delete-btn">
                Delete Survey
              </button>
              <button onClick={() => handleSubmitResponses(survey._id)} className="submit-button">
                Submit Responses
              </button>
              <button onClick={() => handleViewAnalytics(survey._id)} className="analytics-btn">
                View Analytics
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourSurveys; 