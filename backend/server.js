require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

const app = express();

// CORS Setup for Netlify Frontend
app.use(cors({
  origin: 'https://surveysnap.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors()); // Preflight support

// Body parser
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SurveySnap API' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
