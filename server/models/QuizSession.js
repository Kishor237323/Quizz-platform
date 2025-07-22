const mongoose = require('mongoose');

const quizSessionSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true }, // 4-digit code
  category: String,
  difficulty: String,
  questions: [Object],
  createdAt: { type: Date, default: Date.now },
  participants: [{ name: String }]
});

module.exports = mongoose.model('QuizSession', quizSessionSchema); 