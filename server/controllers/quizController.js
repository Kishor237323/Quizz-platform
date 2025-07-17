const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const { validationResult } = require('express-validator');

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private
const createQuiz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, category, difficulty, description, questions, timeLimit, pointsPerQuestion } = req.body;

    const quiz = await Quiz.create({
      title,
      category,
      difficulty,
      description,
      questions,
      timeLimit: timeLimit || 0,
      pointsPerQuestion: pointsPerQuestion || 10,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: quiz
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during quiz creation'
    });
  }
};

// @desc    Get all quizzes (with filters)
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
  try {
    const { category, difficulty, limit = 10, page = 1 } = req.query;
    
    // Build filter object
    const filter = { isPublic: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter)
      .populate('createdBy', 'name')
      .select('-questions.correctAnswer') // Don't send correct answers
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Quiz.countDocuments(filter);

    res.json({
      success: true,
      data: quizzes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quizzes'
    });
  }
};

// @desc    Get quiz by ID (without correct answers)
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name')
      .select('-questions.correctAnswer'); // Don't send correct answers

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quiz'
    });
  }
};

// @desc    Start a quiz attempt
// @route   POST /api/quizzes/:id/start
// @access  Private
const startQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Check if user already has an in-progress attempt
    const existingAttempt = await QuizAttempt.findOne({
      user: req.user.id,
      quiz: req.params.id,
      status: 'in_progress'
    });

    if (existingAttempt) {
      return res.json({
        success: true,
        message: 'Resuming existing attempt',
        data: {
          attemptId: existingAttempt._id,
          quiz: {
            ...quiz.toObject(),
            questions: quiz.questions.map(q => ({
              ...q.toObject(),
              correctAnswer: undefined // Don't send correct answer
            }))
          },
          timeStarted: existingAttempt.timeStarted
        }
      });
    }

    // Create new attempt
    const attempt = await QuizAttempt.create({
      user: req.user.id,
      quiz: req.params.id,
      totalQuestions: quiz.questions.length,
      timeStarted: new Date()
    });

    res.json({
      success: true,
      message: 'Quiz started successfully',
      data: {
        attemptId: attempt._id,
        quiz: {
          ...quiz.toObject(),
          questions: quiz.questions.map(q => ({
            ...q.toObject(),
            correctAnswer: undefined // Don't send correct answer
          }))
        },
        timeStarted: attempt.timeStarted
      }
    });
  } catch (error) {
    console.error('Start quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while starting quiz'
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;

    const attempt = await QuizAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    if (attempt.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this attempt'
      });
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Process answers and check correctness
    const processedAnswers = answers.map(answer => {
      const question = quiz.questions[answer.questionIndex];
      const isCorrect = question && answer.selectedAnswer === question.correctAnswer;
      
      return {
        questionIndex: answer.questionIndex,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        timeSpent: answer.timeSpent || 0
      };
    });

    // Calculate total time spent
    const totalTimeSpent = processedAnswers.reduce((total, answer) => total + answer.timeSpent, 0);

    // Update attempt
    attempt.answers = processedAnswers;
    attempt.timeCompleted = new Date();
    attempt.totalTimeSpent = totalTimeSpent;
    attempt.status = 'completed';
    await attempt.save();

    // Get results with correct answers for review
    const results = {
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      correctAnswers: attempt.correctAnswers,
      percentage: attempt.percentage,
      totalTimeSpent,
      questions: quiz.questions.map((question, index) => ({
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: processedAnswers.find(a => a.questionIndex === index)?.selectedAnswer,
        isCorrect: processedAnswers.find(a => a.questionIndex === index)?.isCorrect,
        explanation: question.explanation
      }))
    };

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: results
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting quiz'
    });
  }
};

// @desc    Get user's quiz attempts
// @route   GET /api/quizzes/attempts
// @access  Private
const getUserAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user.id })
      .populate('quiz', 'title category difficulty')
      .sort({ timeStarted: -1 })
      .limit(20);

    res.json({
      success: true,
      data: attempts
    });
  } catch (error) {
    console.error('Get user attempts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching attempts'
    });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  startQuiz,
  submitQuiz,
  getUserAttempts
}; 