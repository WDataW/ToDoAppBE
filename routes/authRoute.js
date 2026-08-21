const { login, register, verifyEmail } = require('@root/controllers');
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register)
router.get('/verify-email', verifyEmail)
module.exports = router;