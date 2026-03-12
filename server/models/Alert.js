const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['UNREGISTERED_DEVICE', 'UNAUTHORIZED_EXIT', 'SUSPICIOUS_ACTIVITY'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    serialNumber: String,
    gate: String,
    status: {
        type: String,
        enum: ['ACTIVE', 'RESOLVED'],
        default: 'ACTIVE'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alert', alertSchema);