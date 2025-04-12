import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/survey-responses.css';

const SurveyResponses = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveyResponses();
  }, [id]);

  const fetchSurveyResponses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurvey(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching survey responses');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading responses...</div>;
  }

  if (!survey) {
    return <div className="error">Survey not found</div>;
  }

  return (
    <div className="survey-responses-container">
      <h2 style={{color: "lightgray", marginTop:"7vh"}}>Responses for: {survey.title}</h2>
      <p className="survey-description" style={{color: "white"}}>{survey.description}</p>
      
      {survey.responses && survey.responses.length > 0 ? (
        <div className="responses-list">
          {survey.responses.map((response, index) => (
            <div key={index} className="response-card">
              <h3>Response #{index + 1}</h3>
              <div className="response-answers">
                {response.answers.map((answer, answerIndex) => {
                  const question = survey.questions.find(q => q._id === answer.questionId);
                  return (
                    <div key={answerIndex} className="answer-item">
                      <p className="question">{question.question}</p>
                      {question.type === 'file' ? (
                        <div className="file-response">
                          <p className="answer">File: {answer.answer.fileName}</p>
                          <p className="file-size">Size: {(answer.answer.fileSize / 1024).toFixed(2)} KB</p>
                        </div>
                      ) : (
                        <p className="answer">{answer.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-responses">
          <p>No responses have been submitted yet.</p>
        </div>
      )}
    </div>
  );
};

export default SurveyResponses; 