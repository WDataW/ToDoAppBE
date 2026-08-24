const { authenticator } = require('@root/middleware');
const { deleteTask, createTask } = require('@root/controllers');

const router = require('express').Router();

router.get('/all', authenticator, async (req, res) => {
    res.status(200).json({ message: 'OK', ...req.user });
});
router.post('/create-task', authenticator, createTask)
router.delete('/delete-task', authenticator, deleteTask)
module.exports = router;