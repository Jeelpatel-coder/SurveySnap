import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaShare, FaTrash, FaChartBar, FaPaperPlane } from 'react-icons/fa';

const SurveyActions = ({ surveyId, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Survey Actions</h2>
      <div className="space-y-4">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to={`/edit-survey/${surveyId}`}
            className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaEdit className="mr-2" />
            Edit Survey
          </Link>
          
          <Link
            to={`/survey/${surveyId}/share`}
            className="flex items-center justify-center p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <FaShare className="mr-2" />
            Share Survey
          </Link>
          
          <button
            onClick={() => onDelete(surveyId)}
            className="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash className="mr-2" />
            Delete Survey
          </button>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to={`/survey/${surveyId}/submit`}
            className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaPaperPlane className="mr-2" />
            Submit Responses
          </Link>
          
          <Link
            to={`/survey/${surveyId}/results`}
            className="flex items-center justify-center p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <FaChartBar className="mr-2" />
            View Responses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyActions; 