const mongoose = require('mongoose');
const { minute } = require('../utils/time');
const { isFutureDate } = require('../utils/date');
const resetPasswordSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
        required: true
    },
    isRevoked: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 15 * minute),
        required: true,
        validate: {
            validator: isFutureDate,
            message: 'Expiration date must be a future date'
        }
    }
});
const RPModel = mongoose.model("RP", resetPasswordSchema);
module.exports = RPModel;