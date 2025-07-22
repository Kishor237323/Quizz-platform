import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [quizCode, setQuizCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuizCode("");
    try {
      // For demo, you can replace questions with real questions if needed
      const questions = [];
      const res = await fetch("/api/quizzes/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, difficulty, questions })
      });
      const data = await res.json();
      if (res.ok && data.code) {
        setQuizCode(data.code);
        setSessionId(data.sessionId);
      } else {
        setError(data.error || "Failed to create quiz session.");
      }
    } catch (err) {
      setError("Failed to create quiz session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'rgb(192,132,252,1)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'rgb(192,132,252,1)' }}>Select a Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2 text-slate-900">Category</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-slate-900">Difficulty</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        {quizCode && (
          <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-xl text-center">
            <div className="text-lg font-semibold text-blue-700 mb-2">Quiz Code</div>
            <div className="text-3xl font-bold text-blue-900 mb-2">{quizCode}</div>
            <div className="text-gray-700">Share this code with participants to join your quiz!</div>
          </div>
        )}
      </div>
    </div>
  );
} 