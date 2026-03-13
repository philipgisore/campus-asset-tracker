const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const laptopRoutes = require('./routes/laptopRoutes');
const gateRoutes = require('./routes/gateRoutes');
const logRoutes = require('./routes/logRoutes');
const alertRoutes = require('./routes/alertRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint for string formatting (keep this for debugging)
app.post('/api/test-template', (req, res) => {
    try {
        const { serialNumber, gate } = req.body;
        
        const result = {
            usingBackticks: `Unregistered laptop with serial ${serialNumber} attempted to pass ${gate}`,
            usingQuotes: 'Unregistered laptop with serial ${serialNumber} attempted to pass ${gate}',
            usingConcatenation: 'Unregistered laptop with serial ' + serialNumber + ' attempted to pass ' + gate
        };
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-asset-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/laptops', laptopRoutes);
app.use('/api/gate', gateRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Campus Asset Tracker API is running' });
});

// Start server with graceful shutdown
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📍 Test endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/`);
    console.log(`   POST http://localhost:${PORT}/api/test-template`);
    console.log(`   POST http://localhost:${PORT}/api/laptops`);
    console.log(`   GET  http://localhost:${PORT}/api/dashboard`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}, closing server gracefully...`);
    server.close(() => {
        console.log('✅ Server closed');
        // Close database connection
        mongoose.connection.close(false, () => {
            console.log('✅ MongoDB connection closed');
            process.exit(0);
        });
    });
    
    // Force close after 10 seconds if it doesn't close gracefully
    setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

// Handle various shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGUSR2', () => { // For nodemon restarts
    console.log('\n🔄 Received SIGUSR2 (nodemon restart)');
    server.close(() => {
        console.log('✅ Server closed for restart');
        mongoose.connection.close(false, () => {
            console.log('✅ MongoDB connection closed');
            process.kill(process.pid, 'SIGUSR2');
        });
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error);
    gracefulShutdown('unhandledRejection');
});