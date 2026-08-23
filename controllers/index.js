const { login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
module.exports = { login, logout, register, verifyEmail, forgotPassword, resetPassword }