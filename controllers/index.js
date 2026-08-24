const { login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
const { createTask } = require('./taskControllers');
module.exports = { createTask, login, logout, register, verifyEmail, forgotPassword, resetPassword, }