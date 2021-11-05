const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { login, signup, me } = require('../controllers/userControllers');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(protect, me);

module.exports = router;