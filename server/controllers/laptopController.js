const Laptop = require('../models/Laptop');
const Log = require('../models/Log');

//Get all laptops
exports.getAllLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find().sort({ registeredAt: -1 });
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get single laptop
exports.getLaptopById = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }
        res.json(laptop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Register new laptop
exports.registerLaptop = async (req, res) => {
    try {
        //check if laptop already exists
        const existingLaptop = await laptop.findOne({
            serialNumber: req.body.serialNumber
        });

        if(existingLaptop) {
            return res.status(400).json({ message: 'laptop already registered' });
        }
        
        //Create new laptop
        const laptop = new Laptop({
            studentName: req.body.studentName,
            adminNo: req.body.adminNo,
            brand: req.body.brand,
            serialNumber: req.body.serialNumber,
            status: 'IN' // New laptops start inside campus
        });

        const newLaptop = await laptop.save();

        //create initial log entry to track registration
        const log = new Log({
            studentName: req.body.studentName,
            adminNo: req.body.admnNo,
            serialNumber: req.body.serialNumber,
            status: 'IN',
            gate: 'Registration'
        });

        await log.save();

        res.status(201).json({newLaptop});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update laptop
exports.updateLaptop = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ message: 'laptop not found' });
        }

        Object.assign(laptop, req.body);
        const updateLaptop = await laptop.save();
        res.json(updateLaptop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete laptop
exports.deleteLaptop = async  (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }

        await laptop.deleteOne();
        res.json({ message: 'Laptop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};