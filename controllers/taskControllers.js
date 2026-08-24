const { BadRequest } = require('@root/errors');
const { StatusCodes } = require('http-status-codes');
const { Task } = require('@root/models');
const createTask = async (req, res) => {
    const { dueDate, title, description, priority, tags } = req.body;
    if (!dueDate || !title || !priority) throw new BadRequest('Please complete required fields');

    const { id: userId } = req.user;
    const task = { dueDate, title, description, priority, tags, userId };
    const mongoTask = await Task.create(task);
    res.status(StatusCodes.OK).json(mongoTask);
}
const deleteTask = async (req, res) => {
    const { taskId } = req.body;
    const { id: userId } = req.user;
    const taskToDelete = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!taskToDelete) return res.status(StatusCodes.OK).json({ message: "Task already deleted" });
    res.status(StatusCodes.OK).json(taskToDelete);
}

module.exports = { createTask, deleteTask }