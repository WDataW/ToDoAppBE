const { login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
const { createTask, deleteTask, editTask } = require('./taskControllers');
module.exports = { createTask, deleteTask, editTask, login, logout, register, verifyEmail, forgotPassword, resetPassword, }