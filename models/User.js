const mongoose = require('mongoose');
const validator = require('validator');
const hashPassword = require('../utils/hashPassword');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide a fullname']
    },
    email: {
        type: String,
        unique: true,
        validate: validator.isEmail,
        immutable: true
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