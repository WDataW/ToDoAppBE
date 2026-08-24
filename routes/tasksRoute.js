const { authenticator } = require('@root/middleware');
const { deleteTask, createTask, editTask } = require('@root/controllers');

const router = require('express').Router();

router.put('/create-task', authenticator, createTask)
router.patch('/edit-task/:taskId', authenticator, editTask)
router.delete('/delete-task/:taskId', authenticator, deleteTask)
module.exports = router;