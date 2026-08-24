const { authenticator } = require('@root/middleware');
const { createTask } = require('@root/controllers');

const router = require('express').Router();

router.get('/all', authenticator, async (req, res) => {
    res.status(200).json({ message: 'OK', ...req.user });
});
router.post('/create-task', authenticator, createTask)
module.exports = router;