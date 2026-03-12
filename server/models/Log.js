const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    adminNo: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['IN', 'OUT'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', logSchema);