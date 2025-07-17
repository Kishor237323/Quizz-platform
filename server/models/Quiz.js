const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: [true, 'Question options are required'],
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.length <= 6; // At least 2 options, max 6
      },
      message: 'Question must have between 2 and 6 options'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    validate: {
      validator: function(v) {
        return v >= 0 && v < this.options.length;
      },
      message: 'Correct answer must be a valid option index'
    }
  },
  explanation: {
    type: String,
    default: ''
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Quiz category is required'],
    enum: ['General Knowledge', 'Science', 'History', 'Sports', 'Geography', 'Literature']
  },
  difficulty: {
    type: String,
    required: [true, 'Quiz difficulty is required'],
    enum: ['Easy', 'Medium', 'Hard']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  questions: {
    type: [questionSchema],
    required: [true, 'Quiz must have at least one question'],
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 50; // At least 1 question, max 50
      },
      message: 'Quiz must have between 1 and 50 questions'
    }
  },
  timeLimit: {
    type: Number, // Time limit in minutes (0 = no limit)
    default: 0,
    min: [0, 'Time limit cannot be negative']
  },
  pointsPerQuestion: {
    type: Number,
    default: 10,
    min: [1, 'Points per question must be at least 1']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Quiz creator is required']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
quizSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Quiz', quizSchema); 