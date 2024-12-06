const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// routers
router.post('/login', authController.login);
router.post('/send-password-reset', authController.sendPasswordReset);
router.post('/confirm-password-reset', authController.confirmPasswordReset);

module.exports = router;