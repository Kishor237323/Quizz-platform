import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
import { updatePageLanguage } from "../utils/languageSelector";
import Layout from "../components/Layout";

const categories = ["General Knowledge", "Science", "History", "Sports", "Geography", "Literature"];
const difficulties = ["Easy", "Medium", "Hard"];

export default function Home() {
  const [category, setCategory] = useState(categories[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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



  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="min-h-screen bg-purple-900 dark:bg-gray-900 transition-colors duration-300">
        
        <header className="bg-purple-800 dark:bg-gray-800 text-white px-6 py-4 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                sidebarOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                sidebarOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
          
          <h1 className="text-2xl font-bold text-pink-400" data-key="header.title">QUIZZ</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-pink-300" data-key="header.categories">Categories</a>
          <a href="#" className="hover:text-pink-300" data-key="header.leaderboard">Leaderboard</a>
          
        </nav>
        <div className="flex space-x-3 items-center">
          {isAuthenticated ? (
            <>      
              <span className="text-gray-300 text-sm" data-key="header.welcome" data-params={JSON.stringify({name: user?.name})}>Welcome, {user?.name}!</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-800 transition"
                data-key="header.logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-purple-800 transition" data-key="header.login">Login</a>
              <a href="/login" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition" data-key="header.signup">Sign up</a>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span data-key="main.title">Free online</span>{" "}
            <span className="text-yellow-400 underline decoration-yellow-400 decoration-4 underline-offset-4" data-key="main.titleHighlight">
              quiz maker
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto" data-key="main.subtitle">
            Make a quiz with different question types to engage students in a classroom, train employees at work, or play trivia with friends.
          </p>

          {/* Quiz Selection Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto">
           
            
            <button
              className="w-full py-3 bg-white text-purple-800 font-bold text-lg rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
              onClick={handleStartQuiz}
            >
              {isAuthenticated ? t("main.createQuiz") : t("main.loginToStart")}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center text-white">
           
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



      {/* Professional Footer */}
      <footer className="w-full bg-gray-900 text-gray-200 mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-lg font-bold mb-3" data-key="footer.aboutUs">About Us</h4>
            <Link to="/about" className="text-pink-400 hover:text-pink-300 transition" aria-label="Read more about us" data-key="footer.readMore">Read more →</Link>
          </div>
          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-bold mb-3" data-key="footer.contactUs">Contact Us</h4>
            <ul className="mb-3 text-gray-400">
              <li><span data-key="footer.email">Email:</span> <a href="mailto:kishorcheduri2@gmail.com" className="text-pink-400 hover:text-pink-300 transition" aria-label="Email support">kishorcheduri2@gmail.com</a></li>
              <li><span data-key="footer.phone">Phone:</span> <a href="tel:+916360919963" className="text-pink-400 hover:text-pink-300 transition" aria-label="Call support">+91 6360919963</a></li>
              <li><a href="/contact" className="text-pink-400 hover:text-pink-300 transition" aria-label="Contact form" data-key="footer.contactForm">Contact Form →</a></li>
            </ul>
            <div className="flex space-x-4 mt-2">
              
              <a href="https://x.com/cheduri_ki47761?s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-pink-400 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.239-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.419A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0024 4.557z"/></svg></a>
              <a href="https://www.instagram.com/kishornaidu00?utm_source=qr&igsh=MXNzY3JuZ2gwb21vdw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.277-.353-2.45-1.32-3.417-.967-.967-2.14-1.261-3.417-1.32C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z"/></svg></a>
              <a href="https://www.linkedin.com/in/c-h-prabhu-kishor-84390b242/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-pink-400 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v5.597z"/></svg></a>
            </div>
          </div>
          {/* Credits */}
          <div>
            <h4 className="text-lg font-bold mb-3" data-key="footer.credits">Credits</h4>
            <ul className="mb-3 text-gray-400">
              <li><span data-key="footer.developedBy">Developed by</span> <span className="text-pink-400">C H PRABHU KISHOR</span></li>
              
              <li><span data-key="footer.poweredBy">Powered by</span> <a href="https://react.dev/" className="text-pink-400 hover:text-pink-300 transition" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://tailwindcss.com/" className="text-pink-400 hover:text-pink-300 transition" target="_blank" rel="noopener noreferrer">TailwindCSS</a></li>
             
            </ul>
            <div className="text-xs text-gray-500" data-key="footer.copyright" data-params={JSON.stringify({year: new Date().getFullYear()})}>&copy; {new Date().getFullYear()} QUIZZ. All rights reserved.</div>
          </div>
        </div>
      </footer>
      </div>
    </Layout>
  );
} 