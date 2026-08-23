const { login, logout, register, verifyEmail, resetPassword, forgotPassword } = require('@root/controllers');
const authenticator = require('../middleware/authentication');
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/logout', authenticator, logout);
router.post('/forgot-password', authenticator, forgotPassword);
module.exports = router;