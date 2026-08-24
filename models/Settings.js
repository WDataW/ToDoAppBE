const mongoose = require('mongoose');
const validator = require('validator');
const settingsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        immutable: true
    },
    notifications: {
        all: {
            type: Boolean,
            default: true,
            required: true,
        },
        reminders: {
            type: Boolean,
            default: true,
            required: true,
        },
        alerts: {
            type: Boolean,
            default: true,
            required: true,
        },
        announcements: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    language: {
        type: String,
        enum: ['en', 'ar'],
    },
    theme: {
        base: {
            type: String,
            enum: ['light', 'dark'],
        },
        accentColor: {
            type: String,
            validate: {
                validator: validator.isHexColor,
                message: 'Please provide a valid hex color'
            }
        },
        secondaryColor: {
            type: String,
            validate: {
                validator: validator.isHexColor,
                message: 'Please provide a valid hex color'
            }
        }
    }
});
const settingsModel = mongoose.model('Settings', settingsSchema);
module.exports = settingsModel;