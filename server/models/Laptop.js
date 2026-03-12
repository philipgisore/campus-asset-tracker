const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    adminNo: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['IN', 'OUT'],
        default: 'IN' //Assume registered laptops start inside campus
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Laptop', laptopSchema);