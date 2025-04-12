import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { submitSurvey } from '../services/surveyService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const SurveySubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const isSharedSurvey = location.pathname.includes('/share');

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`/api/surveys/${id}`);
        setSurvey(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching survey:', error);
        toast.error('Failed to load survey');
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formattedResponses = Object.entries(responses).map(([questionId, value]) => ({
        questionId,
        answer: value
      }));

      await submitSurvey(id, formattedResponses, isSharedSurvey);
      toast.success('Survey submitted successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error(error.response?.data?.message || 'Failed to submit survey');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Survey not found</div>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto p-6 ${isSharedSurvey ? 'min-h-screen' : ''}`}>
      <h1 className="text-2xl font-bold mb-6">{survey.title}</h1>
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question) => (
          <div key={question._id} className="mb-6">
            <label className="block text-lg font-medium mb-2">
              {question.text}
            </label>
            {question.type === 'text' && (
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={responses[question._id] || ''}
                onChange={(e) => handleResponseChange(question._id, e.target.value)}
                required
              />
            )}
            {question.type === 'multiple-choice' && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      checked={responses[question._id] === option}
                      onChange={(e) => handleResponseChange(question._id, e.target.value)}
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </form>
    </div>
  );
};

export default SurveySubmission; 