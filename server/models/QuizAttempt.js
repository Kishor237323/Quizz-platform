const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionIndex: {
    type: Number,
    required: true
  },
  selectedAnswer: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // Time spent in seconds
    default: 0
  }
});

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: [true, 'Quiz is required']
  },
  answers: {
    type: [answerSchema],
    default: []
  },
  score: {
    type: Number,
    default: 0,
    min: [0, 'Score cannot be negative']
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    default: 0,
    min: [0, 'Correct answers cannot be negative']
  },
  percentage: {
    type: Number,
    default: 0,
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  timeStarted: {
    type: Date,
    default: Date.now
  },
  timeCompleted: {
    type: Date
  },
  totalTimeSpent: {
    type: Number, // Total time in seconds
    default: 0
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned'],
    default: 'in_progress'
  }
});

// Calculate score and percentage before saving
quizAttemptSchema.pre('save', function(next) {
  if (this.answers.length > 0) {
    this.correctAnswers = this.answers.filter(answer => answer.isCorrect).length;
    this.score = this.correctAnswers * 10; // Assuming 10 points per correct answer
    this.percentage = (this.correctAnswers / this.totalQuestions) * 100;
  }
  next();
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema); 