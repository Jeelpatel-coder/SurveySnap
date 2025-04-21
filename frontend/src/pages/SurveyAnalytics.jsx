import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../assets/survey-analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SurveyAnalytics = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    fetchSurveyData();
  }, [id]);

  const fetchSurveyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://surveysnap.onrender.com/api/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurvey(response.data);
      processAnalyticsData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching survey data');
      setLoading(false);
    }
  };

  const processAnalyticsData = (surveyData) => {
    if (!surveyData.responses || surveyData.responses.length === 0) {
      setAnalyticsData(null);
      return;
    }

    const processedData = {
      totalResponses: surveyData.responses.length,
      questionAnalytics: surveyData.questions.map(question => {
        if (question.type === 'multiple-choice' || question.type === 'radio') {
          const optionCounts = {};
          question.options.forEach(option => {
            optionCounts[option] = 0;
          });

          surveyData.responses.forEach(response => {
            const answer = response.answers.find(a => a.questionId === question._id);
            if (answer && answer.answer) {
              optionCounts[answer.answer] = (optionCounts[answer.answer] || 0) + 1;
            }
          });

          return {
            questionId: question._id,
            questionText: question.question,
            type: question.type,
            data: {
              labels: question.options,
              datasets: [{
                label: 'Responses',
                data: question.options.map(option => optionCounts[option]),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              }],
            },
          };
        }
        return null;
      }).filter(Boolean),
    };

    setAnalyticsData(processedData);
  };

  const downloadPDF = async () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add title
      pdf.setFontSize(20);
      pdf.text(`Analytics for: ${survey.title}`, pageWidth / 2, 20, { align: 'center' });

      // Add summary
      pdf.setFontSize(14);
      pdf.text('Summary', 20, 40);
      pdf.setFontSize(12);
      pdf.text(`Total Responses: ${analyticsData.totalResponses}`, 20, 50);

      let yPosition = 70; // Starting position for questions

      // Process each question
      analyticsData.questionAnalytics.forEach((questionData, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 50) {
          pdf.addPage();
          yPosition = 20;
        }

        // Add question number and text
        pdf.setFontSize(14);
        pdf.text(`Question ${index + 1}:`, 20, yPosition);
        yPosition += 10;

        pdf.setFontSize(12);
        const questionLines = pdf.splitTextToSize(questionData.questionText, pageWidth - 40);
        pdf.text(questionLines, 20, yPosition);
        yPosition += questionLines.length * 7 + 10;

        if (questionData.type === 'multiple-choice' || questionData.type === 'radio') {
          // Create a table for the response data
          const tableData = questionData.data.labels.map((label, i) => [
            label,
            questionData.data.datasets[0].data[i].toString()
          ]);

          // Add table headers
          pdf.setFontSize(12);
          pdf.text('Option', 20, yPosition);
          pdf.text('Responses', pageWidth - 50, yPosition);
          yPosition += 10;

          // Add table rows
          pdf.setFontSize(10);
          tableData.forEach(([option, count]) => {
            if (yPosition > pageHeight - 20) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(option, 20, yPosition);
            pdf.text(count, pageWidth - 50, yPosition);
            yPosition += 10;
          });

          yPosition += 20;
        }
      });

      // Save the PDF
      pdf.save(`${survey.title}_analytics.pdf`);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF');
    }
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (!survey) {
    return <div className="error">Survey not found</div>;
  }

  if (!analyticsData) {
    return (
      <div className="analytics-container">
        <h2>Analytics for: {survey.title}</h2>
        <div className="no-data">No responses available for analysis</div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 style={{color: "lightgray", marginTop: "7vh"}}>Analytics for: {survey.title}</h2>
        <button onClick={downloadPDF} className="download-pdf-btn">
          Download PDF
        </button>
      </div>
      <div ref={pdfRef}>
        <div className="summary-card">
          <h3>Summary</h3>
          <p>Total Responses: {analyticsData.totalResponses}</p>
        </div>

        <div className="charts-container">
          {analyticsData.questionAnalytics.map((questionData, index) => (
            <div key={questionData.questionId} className="chart-card">
              <div className="question-header">
                <div className="question-label">Question {index + 1}</div>
                <div className="question-content">
                  <span className="question-prefix">Question:</span>
                  <p className="question-text">{questionData.questionText}</p>
                </div>
              </div>
              <div className="chart-wrapper">
                {questionData.type === 'multiple-choice' || questionData.type === 'radio' ? (
                  <div className="chart-row">
                    <div className="chart-half">
                      <Bar
                        data={questionData.data}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: false
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'Number of Responses'
                              }
                            },
                            x: {
                              title: {
                                display: true,
                                text: 'Options'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="chart-half">
                      <Pie
                        data={questionData.data}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'right',
                            },
                            title: {
                              display: false
                            },
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyAnalytics; 