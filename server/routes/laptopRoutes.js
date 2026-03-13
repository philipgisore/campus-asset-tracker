const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController');

//POST /api/laptops - Register new laptop
router.post('/', laptopController.registerLaptop);

//GET /api/laptops - Get all laptops
router.get('/', laptopController.getAllLaptops);

//GET /api/laptops/:id - Get laptop by ID
router.get('/:id', laptopController.getLaptopById);

//PUT /api/laptops/:id - Update laptop details 
router.put('/:id', laptopController.updateLaptop);

//DELETE /api/laptops/:id - Delete laptop
router.delete('/:id', laptopController.deleteLaptop);

module.exports = router;