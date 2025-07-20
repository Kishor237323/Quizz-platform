import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900 px-4 py-12">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-4xl font-bold text-pink-400 mb-4 flex items-center gap-2">
          <span role="img" aria-label="user">👤</span> About Me
        </h2>
        <p className="text-lg text-white mb-6">
          Hi there! I’m <span className="font-semibold text-pink-300">Prabhu Kishor</span>, the solo developer behind <span className="font-semibold text-pink-300">QUIZZ</span>.
        </p>
        <p className="text-gray-200 mb-6">
          This website is a personal project that I’ve built from the ground up — combining my passion for web development with a commitment to creating meaningful, user-friendly digital experiences.
        </p>
        <h3 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
          <span role="img" aria-label="idea">💡</span> Why I Built This
        </h3>
        <p className="text-gray-200 mb-6">
          I created this website to sharpen my skills, explore full-stack development, and bring a simple idea to life. Every page, feature, and detail was carefully crafted to provide value, usability, and a clean experience.
        </p>
        <h3 className="text-2xl font-bold text-blue-300 mb-2 flex items-center gap-2">
          <span role="img" aria-label="tools">🔧</span> How I Built It
        </h3>
        <ul className="list-disc list-inside text-gray-200 mb-6">
          <li>Frontend: <span className="text-white">React.js, HTML5, CSS3, JavaScript</span></li>
          <li>Backend: <span className="text-white">Node.js with Express.js</span></li>
          <li>Database: <span className="text-white">MongoDB</span></li>
        </ul>
        <p className="text-gray-200 mb-6">
          From designing the interface to setting up the server and database, I handled every part of the development process myself.
        </p>
        <h3 className="text-2xl font-bold text-green-300 mb-2 flex items-center gap-2">
          <span role="img" aria-label="rocket">🚀</span> What’s Ahead
        </h3>
        <p className="text-gray-200 mb-6">
          This is just the beginning. I’m continuously working on improvements, new features, and learning along the way. Your feedback and support mean a lot!
        </p>
        <p className="text-pink-200 text-lg font-semibold mt-8">Thank you for stopping by and being part of this journey.</p>
        <p className="text-right text-pink-400 font-bold mt-2">– Prabhu Kishor</p>
      </div>
    </div>
  );
} 