const { login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
const { createTask, deleteTask, editTask, getAllTasks, getTask } = require('./taskControllers');
module.exports = { createTask, deleteTask, getAllTasks, getTask, editTask, login, logout, register, verifyEmail, forgotPassword, resetPassword, }