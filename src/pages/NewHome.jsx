import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import NewLayout from "../components/NewLayout";

export default function NewHome() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      alert(t("alert.pleaseLogin"));
      return;
    }
    navigate("/create-quiz");
  };

  const handleLogout = async () => {
    await logout();
  };

  const [joinCode, setJoinCode] = useState("");
  const handleJoin = (e) => {
    e.preventDefault();
    if (joinCode.trim().length === 0) return;
    navigate(`/join?code=${joinCode}`);
  };

  return (
    <NewLayout>
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'rgb(192,132,252,1)' }}>
        
        {/* Enhanced Header */}
        <header className="text-white px-6 py-6 transition-all duration-300 shadow-lg border-b border-white/10" style={{ backgroundColor: 'rgb(192,132,252)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Centered Logo */}
            <div className="flex-1 flex justify-center mb-4 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">
                    IntelQuiz
                </h1>
              </div>
            </div>
            
            {/* Right Side - Join with a Code + Auth Buttons */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              {/* Join with a Code */}
              <form onSubmit={handleJoin} className="flex flex-col md:flex-row items-center">
                <input
                  type="text"
                  placeholder="Enter quiz code"
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm w-[200px] text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="ml-0 md:ml-2 mt-2 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Join
                </button>
              </form>
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <>      
                  <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      Welcome, {user?.name}!
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/25"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="px-6 py-3 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300 font-medium backdrop-blur-sm">
                    Login
                  </a>
                  <a href="/login" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-pink-500/25">
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content - Limited Width Typing Animation */}
        <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4" style={{ backgroundColor: 'rgb(192,132,252)' }}>
          <div className="w-full max-w-xl mx-auto text-center">
            <div className="bg-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
              <h2 
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-bold
                  text-white
                  text-center
                  leading-tight
                  min-h-[4rem]
                  sm:min-h-[5rem]
                  md:min-h-[6rem]
                  flex
                  items-center
                  justify-center
                  animate-fade-in
                  my-8
                  px-4
                "
              >
                <span className="inline-block">
                  <Typewriter
                    words={['Ready-to-Use Quizzes. One Code Away']}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                Learning meets fun with our ready-to-go quizzes. From general knowledge to advanced topics, just enter a code and play!
              </p>

              <div className="animate-fade-in" style={{animationDelay: '1s'}}>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base rounded-xl hover:from-pink-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                  onClick={handleStartQuiz}
                >
                  {isAuthenticated ? t("main.createQuiz") : t("main.loginToStart")}
                  <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Categories Section */}
        <section className="py-20 px-6 bg-purple-900/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Choose a Category
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🧠</div>
                <h4 className="text-white font-semibold text-lg">General Knowledge</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🔬</div>
                <h4 className="text-white font-semibold text-lg">Science</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">📜</div>
                <h4 className="text-white font-semibold text-lg">History</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🏅</div>
                <h4 className="text-white font-semibold text-lg">Sports</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🌍</div>
                <h4 className="text-white font-semibold text-lg">Geography</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">📚</div>
                <h4 className="text-white font-semibold text-lg">Literature</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-gray-200 mt-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-3">About Us</h4>
              <Link to="/about" className="text-pink-400 hover:text-pink-300 transition">
                Read more →
              </Link>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3">Contact Us</h4>
              <ul className="mb-3 text-gray-400">
                <li>Email: <a href="mailto:kishorcheduri2@gmail.com" className="text-pink-400 hover:text-pink-300 transition">kishorcheduri2@gmail.com</a></li>
                <li>Phone: <a href="tel:+916360919963" className="text-pink-400 hover:text-pink-300 transition">+91 6360919963</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3">Credits</h4>
              <p className="text-gray-400">Developed by <span className="text-pink-400">C H PRABHU KISHOR</span></p>
              <p className="text-xs text-gray-500 mt-2">&copy; {new Date().getFullYear()} QUIZZ. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Fade-in animation styles */}
        <style>
          {`
            .animate-fade-in {
              animation: fadeIn 1.2s ease forwards;
              opacity: 0;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(30px);}
              to { opacity: 1; transform: translateY(0);}
            }
          `}
        </style>
      </div>
    </NewLayout>
  );
} 