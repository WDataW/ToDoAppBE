const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
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
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});