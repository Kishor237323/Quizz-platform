import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function JoinQuiz() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const code = new URLSearchParams(useLocation().search).get('code') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/quizzes/session/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name })
    });
    const data = await res.json();
    if (res.ok) {
      navigate(`/quiz/${data.sessionId}`);
    } else {
      setError(data.error || 'Invalid code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">Join Quiz</h2>
        <div className="text-center text-lg mb-4">Quiz Code: <b>{code}</b></div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-200"
        >
          Join
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
} 