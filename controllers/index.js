const { login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
const { createTask, deleteTask } = require('./taskControllers');
module.exports = { createTask, deleteTask, login, logout, register, verifyEmail, forgotPassword, resetPassword, }