const Laptop = require('../models/Laptop');
const Log = require('../models/Log');
const Alert = require('../models/Alert');

exports.getDashboardStats = async (req, res) => {  // FIXED: re → res
    try {
        // Get total registered laptops
        const registeredLaptops = await Laptop.countDocuments();  // FIXED: typo

        // Get laptops currently inside
        const currentlyInside = await Laptop.countDocuments({ status: 'IN' });  // FIXED: laptop → Laptop

        // Get active today (unique laptops in logs from today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayLogs = await Log.distinct('serialNumber', {
            timestamp: { $gte: today }
        });

        const activeToday = todayLogs.length;

        // Get active alerts
        const activeAlerts = await Alert.countDocuments({ status: 'ACTIVE' });

        // Get recent logs for activity feed
        const recentLogs = await Log.find()
            .sort({ timestamp: -1 })
            .limit(10);

        res.json({
            registeredLaptops,  // Now matches the variable name
            currentlyInside,
            activeToday,
            activeAlerts,
            recentActivity: recentLogs
        });

    } catch (error) {
        console.error('Dashboard error:', error);  // Added for debugging
        res.status(500).json({ message: error.message });
    }
};