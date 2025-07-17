import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import Quiz from "./components/Quiz";
import CreateQuiz from "./pages/CreateQuiz";
import SelectQuiz from "./pages/SelectQuiz";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/select-quiz" element={<SelectQuiz />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}