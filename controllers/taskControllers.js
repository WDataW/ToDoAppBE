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
    const { taskId } = req.params;
    const { id: userId } = req.user;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!deletedTask) return res.status(StatusCodes.OK).json({ message: "Task already deleted" });
    res.status(StatusCodes.OK).json(deletedTask);
}

const editTask = async (req, res) => {
    const { dueDate, title, description, priority, tags } = req.body;
    const { taskId } = req.params;
    const { id: userId } = req.user;
    const updates = detectUpdates({ dueDate, title, description, priority, tags });
    const editedTask = await Task.findOneAndUpdate({ _id: taskId, userId }, updates, { returnDocument: 'after' });
    if (!editedTask) throw new BadRequest('Task is inexistent');
    res.status(StatusCodes.OK).json(editedTask);
}


// helper functions
const detectUpdates = ({ dueDate, title, description, priority, tags }) => {
    const updates = {};
    if (dueDate) updates.dueDate = dueDate;
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (priority) updates.priority = priority;
    if (tags) updates.tags = tags;
    return updates;
}
module.exports = { createTask, deleteTask, editTask }