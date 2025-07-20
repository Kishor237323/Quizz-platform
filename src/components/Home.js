import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const categories = ["General Knowledge", "Science", "History", "Sports", "Geography", "Literature"];
const difficulties = ["Easy", "Medium", "Hard"];

const languages = [
  { code: "en", label: "English", region: "Worldwide" },
  { code: "es", label: "Spanish", region: "Spain, Latin America, USA" },
  { code: "fr", label: "French", region: "France, Canada, Africa" },
  { code: "de", label: "German", region: "Germany, Austria, Switzerland" },
  { code: "pt", label: "Portuguese", region: "Portugal, Brazil" },
  { code: "zh-CN", label: "Chinese (Simplified)", region: "Mainland China" },
  { code: "zh-TW", label: "Chinese (Traditional)", region: "Taiwan, Hong Kong" },
  { code: "ru", label: "Russian", region: "Russia, Central Asia" },
  { code: "ar", label: "Arabic", region: "Middle East, North Africa" },
  { code: "hi", label: "Hindi", region: "India" },
  { code: "bn", label: "Bengali", region: "Bangladesh, India" },
  { code: "ur", label: "Urdu", region: "Pakistan, India" },
  { code: "ta", label: "Tamil", region: "India, Sri Lanka, Singapore" },
  { code: "te", label: "Telugu", region: "India (Andhra Pradesh, Telangana)" },
  { code: "ja", label: "Japanese", region: "Japan" },
  { code: "ko", label: "Korean", region: "South Korea" },
  { code: "it", label: "Italian", region: "Italy, Switzerland" },
  { code: "nl", label: "Dutch", region: "Netherlands, Belgium" },
  { code: "tr", label: "Turkish", region: "Turkey" },
  { code: "fa", label: "Persian (Farsi)", region: "Iran, Afghanistan (Dari)" },
  { code: "pl", label: "Polish", region: "Poland" },
  { code: "th", label: "Thai", region: "Thailand" },
  { code: "ms", label: "Malay", region: "Malaysia" },
  { code: "id", label: "Indonesian", region: "Indonesia" },
  { code: "vi", label: "Vietnamese", region: "Vietnam" },
  { code: "sw", label: "Swahili", region: "East Africa" },
];

export default function Home() {
  const [category, setCategory] = useState(categories[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const { user, logout, isAuthenticated } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

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
      
      <header className="bg-purple-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-pink-400">IntelQuiz</h1>
          

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

      {/* Quotations Section for Scrollable Page */}
      <section className="py-20 bg-purple-900 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-pink-400 mb-8">Quiz Inspiration</h3>
          <div className="space-y-8">
            <blockquote className="text-xl text-white italic">
              “The beautiful thing about learning is that nobody can take it away from you.”<br />
              <span className="block mt-2 text-pink-300">– B.B. King</span>
            </blockquote>
            <blockquote className="text-xl text-white italic">
              “Knowledge is power. Information is liberating.”<br />
              <span className="block mt-2 text-pink-300">– Kofi Annan</span>
            </blockquote>
            <blockquote className="text-xl text-white italic">
              “The mind is not a vessel to be filled, but a fire to be kindled.”<br />
              <span className="block mt-2 text-pink-300">– Plutarch</span>
            </blockquote>
            <blockquote className="text-xl text-white italic">
              “Learning never exhausts the mind.”<br />
              <span className="block mt-2 text-pink-300">– Leonardo da Vinci</span>
            </blockquote>
            <blockquote className="text-xl text-white italic">
              “Live as if you were to die tomorrow. Learn as if you were to live forever.”<br />
              <span className="block mt-2 text-pink-300">– Mahatma Gandhi</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Language Selector */}
      <div className="absolute bottom-4 left-4 z-50">
        <div className="relative">
          <button
            className="bg-gray-800 text-white px-3 py-2 rounded flex items-center space-x-2 hover:bg-gray-700 transition"
            onClick={() => setShowLangDropdown((prev) => !prev)}
          >
            <span>{selectedLanguage.label} ({selectedLanguage.code})</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showLangDropdown && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedLanguage.code === lang.code ? 'bg-gray-200 font-bold' : ''}`}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setShowLangDropdown(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{lang.label} <span className="text-xs text-gray-500">({lang.code})</span></span>
                    <span className="text-xs text-gray-400">{lang.region}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 