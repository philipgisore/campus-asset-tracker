const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET /api/alerts - Get all alerts (active first, then resolved)
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ status: 1, timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/alerts/active - Get only active alerts
router.get('/active', async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'ACTIVE' }).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/alerts/resolved - Get only resolved alerts
router.get('/resolved', async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'RESOLVED' }).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/alerts/:id/resolve - Resolve a specific alert
router.post('/:id/resolve', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    alert.status = 'RESOLVED';
    alert.resolvedAt = new Date(); // Add timestamp for when resolved
    await alert.save();
    
    res.json({ 
      message: 'Alert resolved successfully', 
      alert 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/alerts/:id - Delete a specific alert
router.delete('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    await Alert.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: 'Alert deleted permanently',
      deletedAlert: alert 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/alerts/resolved/all - Delete all resolved alerts
router.delete('/resolved/all', async (req, res) => {
  try {
    const result = await Alert.deleteMany({ status: 'RESOLVED' });
    
    res.json({ 
      message: `Cleaned up ${result.deletedCount} resolved alerts`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/alerts/resolved/cleanup-old - Delete resolved alerts older than X days
router.post('/resolved/cleanup-old', async (req, res) => {
  try {
    const { days = 7 } = req.body; // Default to 7 days
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const result = await Alert.deleteMany({
      status: 'RESOLVED',
      resolvedAt: { $lt: cutoffDate }
    });
    
    res.json({ 
      message: `Cleaned up ${result.deletedCount} resolved alerts older than ${days} days`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;