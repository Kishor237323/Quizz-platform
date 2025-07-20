const express = require('express');
const { body } = require('express-validator');
const { 
  createQuiz, 
  getQuizzes, 
  getQuizById, 
  startQuiz, 
  submitQuiz, 
  getUserAttempts 
} = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation middleware for creating quiz
const createQuizValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('category')
    .isIn(['General Knowledge', 'Science', 'History', 'Sports', 'Geography', 'Literature'])
    .withMessage('Invalid category'),
  body('difficulty')
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Invalid difficulty'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('questions')
    .isArray({ min: 1, max: 50 })
    .withMessage('Quiz must have between 1 and 50 questions'),
  body('questions.*.question')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Question text must be between 5 and 500 characters'),
  body('questions.*.options')
    .isArray({ min: 2, max: 6 })
    .withMessage('Each question must have between 2 and 6 options'),
  body('questions.*.options.*')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Option text must be between 1 and 200 characters'),
  body('questions.*.correctAnswer')
    .isInt({ min: 0 })
    .withMessage('Correct answer must be a valid option index'),
  body('timeLimit')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time limit must be a non-negative integer'),
  body('pointsPerQuestion')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Points per question must be at least 1')
];

// Validation middleware for submitting quiz
const submitQuizValidation = [
  body('attemptId')
    .isMongoId()
    .withMessage('Invalid attempt ID'),
  body('answers')
    .isArray()
    .withMessage('Answers must be an array'),
  body('answers.*.questionIndex')
    .isInt({ min: 0 })
    .withMessage('Question index must be a non-negative integer'),
  body('answers.*.selectedAnswer')
    .isInt({ min: 0 })
    .withMessage('Selected answer must be a valid option index'),
  body('answers.*.timeSpent')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time spent must be a non-negative integer')
];

// Routes
router.get('/', getQuizzes); // Public - get all quizzes
router.get('/attempts', protect, getUserAttempts); // Private - get user attempts
router.get('/:id', getQuizById); // Public - get specific quiz

// Protected routes (require authentication)

router.post('/', protect, createQuizValidation, createQuiz);
router.post('/:id/start', protect, startQuiz);
router.post('/:attemptId/submit', protect, submitQuizValidation, submitQuiz);

module.exports = router; 


