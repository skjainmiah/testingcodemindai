class BMICalculator {
  static calculate(weight, height, unit = 'metric') {
    let bmi;

    if (unit === 'metric') {
      // BMI = weight (kg) / height² (m²)
      bmi = weight / (height * height);
    } else if (unit === 'imperial') {
      // BMI = (weight (lbs) / height² (inches²)) × 703
      bmi = (weight / (height * height)) * 703;
    } else {
      throw new Error('Invalid unit. Use "metric" or "imperial"');
    }

    // Round to 2 decimal places
    bmi = Math.round(bmi * 100) / 100;

    return {
      bmi,
      category: this.getCategory(bmi)
    };
  }

  static getCategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  static getCategories() {
    return [
      { name: 'Underweight', range: 'BMI < 18.5' },
      { name: 'Normal weight', range: 'BMI 18.5-24.9' },
      { name: 'Overweight', range: 'BMI 25-29.9' },
      { name: 'Obese', range: 'BMI ≥ 30' }
    ];
  }
}

module.exports = BMICalculator;