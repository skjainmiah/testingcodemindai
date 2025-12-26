const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');

// Calculate BMI
router.post('/calculate', bmiController.calculateBMI);

// Get BMI categories
router.get('/categories', bmiController.getCategories);

module.exports = router;