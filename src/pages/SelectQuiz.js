import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../services/api";

const categories = [
  "General Knowledge",
  "Science",
  "History",
  "Sports",
  "Geography",
  "Literature"
];
const difficulties = ["Easy", "Medium", "Hard"];

export default function SelectQuiz() {
  const [category, setCategory] = useState(categories[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const params = `category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}`;
      const response = await getQuizzes(params);
      const quizzes = response.data || [];
      if (quizzes.length > 0) {
        // Navigate to the first matching quiz
        navigate(`/quiz/${quizzes[0]._id}`);
      } else {
        setError("No quiz found for the selected category and difficulty.");
      }
    } catch (err) {
      setError("Failed to fetch quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Select a Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Category</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Difficulty</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
            >
              {difficulties.map(diff => (
                <option key={diff}>{diff}</option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-600 text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
} 