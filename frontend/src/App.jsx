import React from 'react';
// import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/MainLayout';
import SharedLayout from './components/SharedLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreateSurvey from './pages/CreateSurvey';
import YourSurveys from './pages/YourSurveys';
import SurveyRespond from './pages/SurveyRespond';
import SurveyResponse from './pages/SurveyResponse';
import SurveyResponses from './pages/SurveyResponses';
import SurveyAnalytics from './pages/SurveyAnalytics';
import EditSurvey from './pages/EditSurvey';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import SupportCenter from './pages/SupportCenter';
import ThankYou from './pages/ThankYou';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Shared Layout Routes (No Navbar/Footer) */}
        <Route element={<SharedLayout />}>
          <Route path="/survey/:id/respond" element={<SurveyRespond />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>

        {/* Main Layout Routes (With Navbar/Footer) */}
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/support" element={<SupportCenter />} />

          {/* Protected Routes */}
          <Route
            path="/create-survey"
            element={
              <PrivateRoute>
                <CreateSurvey />
              </PrivateRoute>
            }
          />
          <Route
            path="/your-surveys"
            element={
              <PrivateRoute>
                <YourSurveys />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/survey/:id/responses"
            element={
              <PrivateRoute>
                <SurveyResponses />
              </PrivateRoute>
            }
          />
          <Route
            path="/survey/:id/edit"
            element={
              <PrivateRoute>
                <EditSurvey />
              </PrivateRoute>
            }
          />
          <Route
            path="/survey/:id/submit"
            element={
              <PrivateRoute>
                <SurveyRespond />
              </PrivateRoute>
            }
          />
          <Route
            path="/survey/:id/analytics"
            element={
              <PrivateRoute>
                <SurveyAnalytics />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;