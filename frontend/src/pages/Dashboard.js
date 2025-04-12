import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getSurveys, deleteSurvey } from '../services/surveyService';
import SurveyActions from '../components/SurveyActions';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const data = await getSurveys();
      setSurveys(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      toast.error('Failed to load surveys');
      setLoading(false);
    }
  };

  const handleDelete = async (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        await deleteSurvey(surveyId);
        toast.success('Survey deleted successfully');
        fetchSurveys();
      } catch (error) {
        console.error('Error deleting survey:', error);
        toast.error('Failed to delete survey');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Surveys</h1>
        <button
          onClick={() => navigate('/create-survey')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Survey
        </button>
      </div>

      {surveys.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">You haven't created any surveys yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {surveys.map((survey) => (
            <div key={survey._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">{survey.title}</h2>
                  <p className="text-gray-600 mt-2">{survey.description}</p>
                </div>
                <span className="text-sm text-gray-500">
                  Created: {new Date(survey.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <SurveyActions surveyId={survey._id} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 