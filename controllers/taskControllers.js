const { BadRequest } = require('@root/errors');
const { StatusCodes } = require('http-status-codes');
const { Task } = require('@root/models');
const createTask = async (req, res) => {
    const { dueDate, title, description, priority, tags } = req.body;
    if (!dueDate || !title || !priority) throw new BadRequest('Please complete required fields');

    const { id: userId } = req.user;
    // console.log(req.user);
    const task = { dueDate, title, description, priority, tags, userId };
    const mongoTask = await Task.create(task);
    res.status(StatusCodes.OK).json(mongoTask);
}

module.exports = { createTask }