import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/create-survey.css';

const EditSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    questions: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching survey');
      setLoading(false);
    }
  };

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurvey(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options.map((opt, j) => 
            j === optionIndex ? value : opt
          )
        } : q
      )
    }));
  };

  const addQuestion = () => {
    setSurvey(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          type: 'radio',
          options: [''],
          required: false
        }
      ]
    }));
  };

  const removeQuestion = (index) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const addOption = (questionIndex) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: [...q.options, '']
        } : q
      )
    }));
  };

  const removeOption = (questionIndex, optionIndex) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options.filter((_, j) => j !== optionIndex)
        } : q
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/api/surveys/${id}`, survey, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Survey updated successfully!');
      navigate('/your-surveys');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating survey');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading survey...</div>;
  }

  return (
    <div className="create-survey-container">
      <h2>Edit Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Survey Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={survey.title}
            onChange={handleSurveyChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={survey.description}
            onChange={handleSurveyChange}
            required
          />
        </div>

        <div className="questions-section">
          <h3>Questions</h3>
          {survey.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-container">
              <div className="form-group">
                <label>Question {questionIndex + 1}</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Question Type</label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
                >
                  <option value="text">Short Answer</option>
                  <option value="date">Date</option>
                  <option value="tel">Phone Number</option>
                  <option value="email">Email</option>
                  <option value="radio">Multiple Choice</option>
                  <option value="textarea">Long Answer</option>
                  <option value="select">Drop Down</option>
                </select>
              </div>

              {(question.type === 'radio' || question.type === 'select') && (
                <div className="options-section">
                  <label>Options</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-input">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="remove-option-btn"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-option-btn"
                    onClick={() => addOption(questionIndex)}
                  >
                    Add Option
                  </button>
                </div>
              )}

              <div className="checkbox-label">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => handleQuestionChange(questionIndex, 'required', e.target.checked)}
                />
                <span style={{color: "black"}}>Required</span>
              </div>

              <button
                type="button"
                className="remove-question-btn"
                onClick={() => removeQuestion(questionIndex)}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-question-btn"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditSurvey; 