const { resendVerificationEmail, showMe, login, register, verifyEmail, forgotPassword, resetPassword, logout } = require('./authControllers');
const { createTask, deleteTask, editTask, getAllTasks, getTask } = require('./taskControllers');
const { initTags, getTag, getAllTags, editTag, deleteTag, createTag } = require('./tagControllers');
const { getAllSettings, initSettings, editSettings } = require('./settingsControllers');
const { removePFP, uploadPFP, getPFP } = require('./pfpControllers');
const { updateFullname } = require('./userControllers');
module.exports = { updateFullname, resendVerificationEmail, initTags, getPFP, removePFP, uploadPFP, showMe, getAllSettings, initSettings, editSettings, getTag, getAllTags, editTag, deleteTag, createTag, createTask, deleteTask, getAllTasks, getTask, editTask, login, logout, register, verifyEmail, forgotPassword, resetPassword }