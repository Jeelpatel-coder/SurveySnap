const express = require('express');
const router = express.Router();
const { createSurvey, getSurveys, getSurveyById, submitSurvey, deleteSurvey, updateSurvey } = require('../controllers/surveyController');
const auth = require('../middleware/auth');

// Public routes
router.get('/:id', getSurveyById);

// Protected routes
router.get('/', auth, getSurveys);  // Protected route to get user's surveys
router.post('/', auth, createSurvey);
router.put('/:id', auth, updateSurvey);
router.delete('/:id', auth, deleteSurvey);
router.post('/:id/submit', auth, submitSurvey);  // Require authentication for submissions

module.exports = router; 