const mongoose = require('mongoose');
const { dateOfInvocation } = require('../utils/date');
const validator = require('validator');
const tagSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        immutable: true
    },
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: validator.isHexColor,
            message: 'Please provide a valid hex color'
        }
    },
    isHome: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: dateOfInvocation,
        immutable: true
    }
});
const tagModel = mongoose.model('Tag', tagSchema);
module.exports = tagModel;