const validateBMIInput = (weight, height, unit) => {
  const errors = [];

  // Check if values exist
  if (!weight && weight !== 0) {
    errors.push('Weight is required');
  }
  if (!height && height !== 0) {
    errors.push('Height is required');
  }

  // Check if values are numbers
  if (weight && isNaN(weight)) {
    errors.push('Weight must be a number');
  }
  if (height && isNaN(height)) {
    errors.push('Height must be a number');
  }

  // Check if values are positive
  if (weight && weight <= 0) {
    errors.push('Weight must be greater than 0');
  }
  if (height && height <= 0) {
    errors.push('Height must be greater than 0');
  }

  // Validate unit
  if (unit && !['metric', 'imperial'].includes(unit)) {
    errors.push('Unit must be either "metric" or "imperial"');
  }

  // Validate reasonable ranges
  if (unit === 'metric') {
    if (weight && (weight < 10 || weight > 500)) {
      errors.push('Weight must be between 10 and 500 kg');
    }
    if (height && (height < 0.5 || height > 3)) {
      errors.push('Height must be between 0.5 and 3 meters');
    }
  } else if (unit === 'imperial') {
    if (weight && (weight < 20 || weight > 1000)) {
      errors.push('Weight must be between 20 and 1000 lbs');
    }
    if (height && (height < 20 || height > 120)) {
      errors.push('Height must be between 20 and 120 inches');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateBMIInput
};