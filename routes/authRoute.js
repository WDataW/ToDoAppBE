const { login, register } = require('@root/controllers');
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register)
module.exports = router;