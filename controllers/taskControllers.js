const { BadRequest, NotFound } = require('@root/errors');
const { StatusCodes } = require('http-status-codes');
const { Task } = require('@root/models');
const checkUpdates = require('@root/utils/checkUpdates');

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
    const possibleUpdates = { dueDate, title, description, priority, tags } = req.body;
    const { taskId } = req.params;
    const { id: userId } = req.user;
    const updates = checkUpdates(possibleUpdates);
    const editedTask = await Task.findOneAndUpdate({ _id: taskId, userId }, updates, { returnDocument: 'after', runValidators: true, context: 'query' });
    if (!editedTask) throw new BadRequest('Task is inexistent');
    res.status(StatusCodes.OK).json(editedTask);
}

const getTask = async (req, res) => {
    const { taskId: _id } = req.params;
    const { id: userId } = req.user;
    const task = await Task.findOne({ _id, userId });
    if (!task) throw new NotFound('Task not found');

    res.status(StatusCodes.OK).json(task);
}
const getAllTasks = async (req, res) => {
    const { id: userId } = req.user;
    const tasks = await Task.find({ userId });

    res.status(StatusCodes.OK).json(tasks);
}


module.exports = { createTask, deleteTask, editTask, getTask, getAllTasks }