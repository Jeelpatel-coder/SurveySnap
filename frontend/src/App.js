import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import SharedLayout from './layouts/SharedLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateSurvey from './pages/CreateSurvey';
import SurveySubmission from './components/SurveySubmission';
import SurveyResults from './pages/SurveyResults';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/create-survey" element={<PrivateRoute><CreateSurvey /></PrivateRoute>} />
            <Route path="/survey/:id/results" element={<PrivateRoute><SurveyResults /></PrivateRoute>} />
            <Route path="/survey/:id/submit" element={<SurveySubmission />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Routes without Navbar and Footer (shared surveys) */}
          <Route element={<SharedLayout />}>
            <Route path="/survey/:id/share" element={<SurveySubmission />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App; 