import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getQuizzes } from '../services/api';

const QuizList = ({ selectedCategory, selectedDifficulty }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, [selectedCategory, selectedDifficulty]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
      
      const response = await getQuizzes(params.toString());
      setQuizzes(response.data || []);
    } catch (err) {
      setError('Failed to load quizzes. Please try again.');
      console.error('Error fetching quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'General Knowledge': return '🧠';
      case 'Science': return '🔬';
      case 'History': return '📚';
      case 'Sports': return '⚽';
      case 'Geography': return '🌍';
      case 'Literature': return '📖';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchQuizzes}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 mb-4">
          {selectedCategory || selectedDifficulty 
            ? `No quizzes found for ${selectedCategory || ''} ${selectedDifficulty || ''}`
            : 'No quizzes available at the moment.'
          }
        </div>
        <button
          onClick={() => {
            setQuizzes([]);
            fetchQuizzes();
          }}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          View All Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Available Quizzes ({quizzes.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(quiz.category)}</span>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600">{quiz.category}</p>
                  </div>
                </div>
              </div>

              {quiz.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {quiz.description}
                </p>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
                <div className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>By {quiz.createdBy?.name || 'Anonymous'}</span>
                {quiz.timeLimit > 0 && (
                  <span>{quiz.timeLimit} min</span>
                )}
              </div>

              <button
                onClick={() => handleStartQuiz(quiz._id)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList; 