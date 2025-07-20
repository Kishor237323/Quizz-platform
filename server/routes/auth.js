const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const admin = require('../firebaseAdmin');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust path if needed

const router = express.Router();



// Validation middleware
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);


router.post('/google', async (req, res) => {
  console.log("Google auth route hit");
  const { idToken } = req.body;
  try {
    // 1. Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { name, email, uid } = decodedToken;

    // 2. Find or create user in your DB
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: uid, // or a random string, since Google users don't use local passwords
        provider: 'google',
      });
    }

    // 3. Create your own JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // 4. Respond with user info and JWT
    res.json({
      user: {
        name: user.name,
        email: user.email,
        // ...other user fields
      },
      token,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});
module.exports = router; 
