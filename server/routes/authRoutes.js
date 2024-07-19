const express = require('express');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController');
const router = express.Router();
const cors = require('cors');

// Middleware
router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', getProfile);


module.exports = router;
