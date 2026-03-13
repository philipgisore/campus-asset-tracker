const Laptop = require('../models/Laptop');
const Log = require('../models/Log');
const Alert = require('../models/Alert');

exports.scanLaptop = async (req, res) => {
    try {
        const { serialNumber, gate } = req.body;

        // Find the laptop by serial number
        const laptop = await Laptop.findOne({ serialNumber });

        // If laptop not found, create an alert
        if(!laptop) {
            const alert = new Alert({
                type: 'UNREGISTERED_DEVICE',
                message: `Unregistered laptop with serial ${serialNumber} attempted to pass ${gate}`,
                serialNumber,
                gate,
                status: 'ACTIVE'
            });
            await alert.save();

            return res.status(404).json({ 
                message: 'Laptop not registered',
                alert: alert
            });
        }

        // Toggle status (IN -> OUT or OUT -> IN)
        const newStatus = laptop.status === 'IN' ? 'OUT' : 'IN';

        // Update laptop status
        laptop.status = newStatus;
        await laptop.save();

        // Create log entry for this scan
        const log = new Log({
            studentName: laptop.studentName,
            adminNo: laptop.adminNo,
            serialNumber: laptop.serialNumber,
            status: newStatus,
            gate: gate
        });
        await log.save();

        res.json({
            message: `Laptop scanned successfully - status: ${newStatus}`,
            laptop: {
                studentName: laptop.studentName,
                status: newStatus
            },
            log: log
        });

    } catch (error) {
        console.error('Scan error:', error);
        res.status(500).json({ message: error.message });
    }
};