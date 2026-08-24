const { authenticator } = require('@root/middleware');
const { deleteTask, createTask, editTask, getTask, getAllTasks } = require('@root/controllers');

const router = require('express').Router();

router.get('/', authenticator, getAllTasks)
router.put('/create-task', authenticator, createTask)
router.get('/:taskId', authenticator, getTask)
router.patch('/edit-task/:taskId', authenticator, editTask)
router.delete('/delete-task/:taskId', authenticator, deleteTask)
module.exports = router;