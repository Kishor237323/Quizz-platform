import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/create-quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      {/* Top Banner */}
      <div className="bg-purple-950 text-center py-2 text-sm text-white">
        <span>Quizizz is now </span>
        <span className="font-bold text-pink-400">Quizizz</span>
        <span> - Some pages are being migrated to the </span>
        <span className="text-pink-400 font-semibold">new site.</span>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Left Side */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-purple-600">
                  Quizizz
                </div>
                <div className="ml-2 text-sm text-gray-500">
                  formerly Quizizz
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">School & District</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Plans</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Use Cases</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">For Business</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Library</a>
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Free online{" "}
            <span className="relative inline-block">
              quiz maker
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-2 bg-yellow-400 rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Make a quiz with different question types to engage students in a classroom,
            train employees at work, or play trivia with friends.
          </p>

          <button
            onClick={handleCreateQuiz}
            className="inline-flex items-center px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Create a quiz
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="mt-12 flex items-center justify-center space-x-2 text-white">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8 15.414 3.293 10.707a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-lg">Used by 50+ people around the world</span>
          </div>
        </div>
      </main>

      {/* Language Selector */}
      <div className="absolute bottom-6 left-6">
        <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <span>English</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
