const Survey = require('../models/Survey');

const createSurvey = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    
    // Validate questions
    const validatedQuestions = questions.map(question => {
      if (question.type === 'file') {
        return {
          ...question,
          options: [] // File type questions don't need options
        };
      }
      return question;
    });
    
    const survey = new Survey({
      title,
      description,
      questions: validatedQuestions,
      creator: req.user._id
    });

    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(400).json({ error: error.message });
  }
};

const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ creator: req.user._id });
    res.json(surveys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    res.json(survey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const submitSurvey = async (req, res) => {
  try {
    const { answers } = req.body;
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // Process answers and handle file uploads
    const processedAnswers = await Promise.all(answers.map(async (answer) => {
      const question = survey.questions.find(q => q._id.toString() === answer.questionId);
      
      if (question.type === 'file' && answer.answer) {
        // For file type questions, we expect an object with fileName, fileSize, and fileType
        return {
          questionId: answer.questionId,
          answer: {
            fileName: answer.answer.fileName,
            fileSize: answer.answer.fileSize,
            fileType: answer.answer.fileType,
            uploadedAt: new Date()
          }
        };
      }
      
      return {
        questionId: answer.questionId,
        answer: answer.answer
      };
    }));

    // Create response object with user ID
    const response = {
      user: req.user._id,
      answers: processedAnswers
    };

    survey.responses.push(response);
    await survey.save();
    res.json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(400).json({ error: error.message });
  }
};

const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    
    // Check if the user is the creator of the survey
    if (survey.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this survey' });
    }
    
    await Survey.findByIdAndDelete(req.params.id);
    res.json({ message: 'Survey deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSurvey = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const surveyId = req.params.id;

    // Find the survey and check if it exists
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // Check if the user is the creator of the survey
    if (survey.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this survey' });
    }

    // Update the survey
    survey.title = title;
    survey.description = description;
    survey.questions = questions;

    await survey.save();
    res.json(survey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSurvey,
  getSurveys,
  getSurveyById,
  submitSurvey,
  deleteSurvey,
  updateSurvey
}; 