const { login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
const { createTask, deleteTask, editTask, getAllTasks, getTask } = require('./taskControllers');
const { getTag, getAllTags, editTag, deleteTag, createTag } = require('./tagControllers');
module.exports = { getTag, getAllTags, editTag, deleteTag, createTag, createTask, deleteTask, getAllTasks, getTask, editTask, login, logout, register, verifyEmail, forgotPassword, resetPassword, }