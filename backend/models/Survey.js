const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'date', 'tel', 'email', 'radio', 'textarea', 'select', 'file']
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  required: {
    type: Boolean,
    default: false
  }
});

const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [questionSchema],
  responses: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    answers: [responseSchema],
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey; 