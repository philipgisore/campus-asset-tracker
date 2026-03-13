const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// GET /api/logs - Get all logs
router.get('/', async (req, res)=> {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/logs/today - Get today's logs
router.get('/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const logs = await Log.find({
            timestamp: { $gte: today }
        }).sort({timestamp : -1});

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/logs/:laptopId - Get logs for specific laptop
router.get('/:serialNumber', async (req, res) => {
    try {
        const logs = await Log.find({
            serialNumber: rq.params.serialNumber
        }).sort({ timestamp: -1 });

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;