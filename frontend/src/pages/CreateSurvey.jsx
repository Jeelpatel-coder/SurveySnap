import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../assets/create-survey.css';

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    questions: [
      {
        question: '',
        type: 'radio',
        options: [''],
        required: false
      }
    ]
  });

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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/surveys', survey, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Survey created successfully!');
      navigate('/your-surveys');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating survey');
    }
  };

  return (
    <div className="create-survey-container">
      <h2>Create New Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Survey Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={survey.title}
            onChange={handleSurveyChange}
            placeholder="Enter a descriptive title for your survey"
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
            placeholder="Provide a brief description of your survey's purpose"
            required
          />
        </div>

        <div className="questions-section">
          <h3>Survey Questions</h3>
          {survey.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-container">
              <div className="form-group">
                <label>Question {questionIndex + 1}</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  placeholder="Enter your question"
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
                  <option value="file">Upload Documents</option>
                </select>
              </div>

              {(question.type === 'radio' || question.type === 'select') && (
                <div className="options-section">
                  <label>Answer Options</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-input">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        required
                      />
                      <button
                        type="button"
                        className="remove-option-btn"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                      >
                        <span>✕</span> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-option-btn"
                    onClick={() => addOption(questionIndex)}
                  >
                    <span>+</span> Add Option
                  </button>
                </div>
              )}

              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id={`required-${questionIndex}`}
                  checked={question.required}
                  onChange={(e) => handleQuestionChange(questionIndex, 'required', e.target.checked)}
                />
                <label style={{color: "black"}} htmlFor={`required-${questionIndex}`}>Required Question</label>
              </div>

              <button
                type="button"
                className="remove-question-btn"
                onClick={() => removeQuestion(questionIndex)}
              >
                <span>✕</span> Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-question-btn"
            onClick={addQuestion}
          >
            <span>+</span> Add New Question
          </button>
        </div>

        <button type="submit" className="submit-btn">
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey; 