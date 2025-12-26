const bmiCalculator = require('../services/bmiCalculator');
const { validateBMIInput } = require('../utils/validators');

const calculateBMI = (req, res) => {
  try {
    const { weight, height, unit = 'metric' } = req.body;
    
    // Validate input
    const validation = validateBMIInput(weight, height, unit);
    if (!validation.isValid) {
      return res.status(400).json({
        error: {
          message: validation.errors.join(', '),
          status: 400
        }
      });
    }

    // Calculate BMI
    const result = bmiCalculator.calculate(weight, height, unit);
    
    res.json({
      bmi: result.bmi,
      category: result.category,
      message: `Your BMI is ${result.bmi}, which is considered ${result.category}`
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Failed to calculate BMI',
        status: 500
      }
    });
  }
};

const getCategories = (req, res) => {
  const categories = bmiCalculator.getCategories();
  res.json({ categories });
};

module.exports = {
  calculateBMI,
  getCategories
};