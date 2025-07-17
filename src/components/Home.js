import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const categories = ["General Knowledge", "Science", "History", "Sports", "Geography", "Literature"];
const difficulties = ["Easy", "Medium", "Hard"];

export default function Home() {
  const [category, setCategory] = useState(categories[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const { user, logout, isAuthenticated } = useAuth();

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      alert("Please login to start a quiz!");
      return;
    }
    alert(`Starting ${category} quiz on ${difficulty} mode!`);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-purple-900">
      {/* Top Banner */}
      <div className="bg-purple-800 text-white text-sm py-2 px-4 flex justify-between items-center">
        <span>Quiz Platform is now</span>
        <span className="font-bold text-pink-400">QUIZZ</span>
        <span>Some pages are being migrated to the <span className="text-pink-400">new site.</span></span>
      </div>

      {/* Header Navigation */}
      <header className="bg-purple-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-pink-400">QUIZZ</h1>
          <span className="text-gray-300 text-sm ml-2">formerly Quiz Platform</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-pink-300">Categories</a>
          <a href="#" className="hover:text-pink-300">Leaderboard</a>
          <a href="#" className="hover:text-pink-300">About</a>
        </nav>
        <div className="flex space-x-3 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300 text-sm">Welcome, {user?.name}!</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-800 transition">Login</a>
              <a href="/login" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">Sign up</a>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Free online{" "}
            <span className="text-yellow-400 underline decoration-yellow-400 decoration-4 underline-offset-4">
              quiz maker
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
            Make a quiz with different question types to engage students in a classroom, train employees at work, or play trivia with friends.
          </p>

          {/* Quiz Selection Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto">
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2 text-left">
                🧠 Select Category:
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2 text-left">
                🚦 Select Difficulty:
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map((diff) => (
                  <option key={diff}>{diff}</option>
                ))}
              </select>
            </div>
            
            <button
              className="w-full py-3 bg-white text-purple-800 font-bold text-lg rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
              onClick={handleStartQuiz}
            >
              {isAuthenticated ? "Create a quiz" : "Login to Start Quiz"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center text-white">
            <svg className="w-5 h-5 text-pink-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Used by 50 million+ people around the world</span>
          </div>
        </div>
      </main>

      {/* Language Selector */}
      <div className="absolute bottom-4 left-4">
        <button className="bg-gray-800 text-white px-3 py-2 rounded flex items-center space-x-2 hover:bg-gray-700 transition">
          <span>English</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 