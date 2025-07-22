import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import NewHome from "./pages/NewHome";
import Auth from "./components/Auth";
import Quiz from "./components/Quiz";
import CreateQuiz from "./pages/CreateQuiz";
import SelectQuiz from "./pages/SelectQuiz";
import Contact from './pages/Contact';
import About from './pages/About';
import SidebarDemo from './pages/SidebarDemo';
import SidebarDemoSimple from './pages/SidebarDemoSimple';
import CleanApp from './components/CleanApp';
import DarkModeDemo from './pages/DarkModeDemo';
import Settings from './pages/Settings';
import ResponsiveSidebarDemo from './pages/ResponsiveSidebarDemo';
import NewSidebarDemo from './pages/NewSidebarDemo';
import JoinQuiz from './pages/JoinQuiz';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<NewHome />} />
            <Route path="/old-home" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/select-quiz" element={<SelectQuiz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/sidebar-demo" element={<SidebarDemo />} />
            <Route path="/sidebar-demo-simple" element={<SidebarDemoSimple />} />
            <Route path="/clean-sidebar" element={<CleanApp />} />
            <Route path="/dark-mode-demo" element={<DarkModeDemo />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/responsive-sidebar" element={<ResponsiveSidebarDemo />} />
            <Route path="/new-sidebar-demo" element={<NewSidebarDemo />} />
            <Route path="/join" element={<JoinQuiz />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}