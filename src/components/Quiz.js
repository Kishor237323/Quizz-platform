// Quiz.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitQuiz } from '../services/api';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  // Move handleSubmitQuiz here so it is defined before useEffect and JSX usage
  const handleSubmitQuiz = async () => {
    try {
      // Ensure attemptId is available; this part needs to be handled if it's not set from startQuiz endpoint
      if (!attemptId) {
          setError("Cannot submit quiz without an attempt ID. Quiz might not have started correctly.");
          return;
      }
      const answersArray = Object.values(answers);
      
      // Make sure submitQuiz service call matches the backend route /api/quizzes/:attemptId/submit
      const response = await submitQuiz(id, { // This 'id' here is the quiz ID, not attempt ID.
                                            // The submitQuiz service should use attemptId
        attemptId, // Pass the correct attemptId
        answers: answersArray
      });

      setResults(response.data);
      setShowResults(true);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    }
  };

  useEffect(() => {
    console.log("Quiz useEffect: id =", id, "user =", user);
    if (!user) {
      navigate('/login');
      return;
    }
    loadQuiz();
  }, [id, user, navigate]); // Added navigate to dependency array for best practice

  useEffect(() => {
    if (quiz && quiz.timeLimit > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz, handleSubmitQuiz]); // Added handleSubmitQuiz to dependency array for best practice

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading quiz session with id:", id);
      
      // --- CHANGE THIS LINE ---
      // Fetch quiz session details from the new endpoint that uses ID
      const quizResponse = await fetch(`/api/quizzes/session/id/${id}`); 
      // --- END CHANGE ---

      console.log("quizResponse:", quizResponse);
      if (!quizResponse.ok) {
          const errorData = await quizResponse.json();
          throw new Error(errorData.error || 'Quiz not found');
      }
      const quizData = await quizResponse.json();
      console.log("quizData:", quizData);
      setQuiz(quizData); // This assumes quizData directly contains the session object
      // Optionally, handle time limit and attempt logic here if needed
    } catch (err) {
      setError(err.message || 'Failed to load quiz. Please try again.'); // Use err.message for more specific errors
      console.error('Error loading quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: {
        questionIndex: currentQuestion,
        selectedAnswer: answerIndex,
        timeSpent
      }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / quiz?.questions.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={loadQuiz}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h1>
              <div className="text-6xl mb-4">🎉</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold">{results.score}</div>
                <div className="text-sm opacity-90">Total Score</div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold">{results.correctAnswers}/{results.totalQuestions}</div>
                <div className="text-sm opacity-90">Correct Answers</div>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold">{Math.round(results.percentage)}%</div>
                <div className="text-sm opacity-90">Accuracy</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Question Review</h2>
              {results.questions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      question.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">{question.question}</p>
                      <div className="space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              optIndex === question.correctAnswer
                                ? 'bg-green-100 border border-green-300'
                                : optIndex === question.userAnswer && !question.isCorrect
                                ? 'bg-red-100 border border-red-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            <span className="font-medium mr-2">
                              {optIndex === question.correctAnswer ? '✅' : 
                               optIndex === question.userAnswer && !question.isCorrect ? '❌' : ''}
                            </span>
                            {option}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate(`/quiz/${id}`)}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ensure quiz and its questions are loaded before accessing properties
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center text-gray-600">
                No quiz data found or questions available.
            </div>
        </div>
    );
  }
  
  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{quiz.title}</h1> {/* Assuming quiz object has a title, adjust if not */}
              <p className="text-sm text-gray-600">{quiz.category} • {quiz.difficulty}</p>
            </div>
            <div className="flex items-center gap-4">
              {quiz.timeLimit > 0 && (
                <div className="text-right">
                  <div className="text-sm text-gray-600">Time Left</div>
                  <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              )}
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-bold text-gray-800">
                  {currentQuestion + 1} / {quiz.questions.length}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-semibold">
                {currentQuestion + 1}
              </span>
              <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestion + 1}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{currentQ.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  answers[currentQuestion]?.selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    answers[currentQuestion]?.selectedAnswer === index
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-gray-500 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-3">
              {currentQuestion < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;