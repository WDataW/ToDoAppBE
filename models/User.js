const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { hashPassword } = require('@root/utils');
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide a fullname']
    },
    email: {
        type: String,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        validate: validator.isStrongPassword
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: true
    }
});
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const hashedPassword = await hashPassword(this.password);
        this.password = hashedPassword;
    }
});


const userModel = mongoose.model('User', userSchema);
module.exports = userModel