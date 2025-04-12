import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/survey-response.css';

const SurveyResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurvey(response.data);

      // Initialize answers object
      const initialAnswers = {};
      response.data.questions.forEach(question => {
        initialAnswers[question._id] = '';
      });
      setAnswers(initialAnswers);

      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching survey');
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required questions are answered
    const unansweredRequired = survey.questions.filter(
      q => q.required && !answers[q._id]
    );

    if (unansweredRequired.length > 0) {
      toast.error('Please answer all required questions');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      await axios.post(
        `http://localhost:5001/api/surveys/${id}/submit`,
        { answers: formattedAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Survey submitted successfully');
      navigate('/your-surveys');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting survey');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading survey...</div>;
  }

  if (!survey) {
    return <div className="error">Survey not found</div>;
  }

  return (
    <div className='main-div'>

      <div className="survey-response-container">
        <h2>{survey.title}</h2>
        <p className="survey-description">{survey.description}</p>

        <form onSubmit={handleSubmit}>
          {survey.questions.map((question, index) => (
            <div key={question._id} className="question-container">
              <label className="question-label">
                {index + 1}. {question.question}
                {question.required && <span className="required">*</span>}
              </label>

              {question.type === 'text' && (
                <input
                  type="text"
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  required={question.required}
                />
              )}

              {question.type === 'textarea' && (
                <textarea
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  required={question.required}
                />
              )}

              {question.type === 'radio' && (
                <div className="radio-options">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="radio-label">
                      <input
                        type="radio"
                        name={question._id}
                        value={option}
                        checked={answers[question._id] === option}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        required={question.required}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'select' && (
                <select
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  required={question.required}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {question.type === 'email' && (
                <input
                  type="email"
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  required={question.required}
                />
              )}

              {question.type === 'tel' && (
                <input
                  type="tel"
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  required={question.required}
                />
              )}

              {question.type === 'date' && (
                <input
                  type="date"
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  required={question.required}
                />
              )}

              {question.type === 'file' && (
                <div className="file-upload-container">
                  <input
                    type="file"
                    id={`file-${question._id}`}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleAnswerChange(question._id, {
                          fileName: file.name,
                          fileSize: file.size,
                          fileType: file.type
                        });
                      }
                    }}
                    required={question.required}
                  />
                  {answers[question._id] && (
                    <div className="file-info">
                      <p>Selected file: {answers[question._id].fileName}</p>
                      <p>Size: {(answers[question._id].fileSize / 1024).toFixed(2)} KB</p>
                    </div>
                  )}
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
    </div>
  );
};

export default SurveyResponse; 