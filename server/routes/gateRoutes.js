const express = require('express');
const router = express.Router();
const gateController = require('../controllers/gateController');

// POST /api/gate/scan - Scan laptop at gate
router.post('/scan', gateController.scanLaptop);

module.exports = router;