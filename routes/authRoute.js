const { login, register, verifyEmail, resetPassword, forgotPassword } = require('@root/controllers');
const authenticator = require('../middleware/authentication');
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register)
router.get('/verify-email', verifyEmail)
router.post('/forgot-password', authenticator, forgotPassword);
router.post('/reset-password', resetPassword);
module.exports = router;