const BMICalculator = require('../../src/services/bmiCalculator');

describe('BMICalculator', () => {
  describe('calculate', () => {
    test('calculates BMI correctly in metric units', () => {
      const result = BMICalculator.calculate(70, 1.75, 'metric');
      expect(result.bmi).toBe(22.86);
      expect(result.category).toBe('Normal weight');
    });

    test('calculates BMI correctly in imperial units', () => {
      const result = BMICalculator.calculate(154, 69, 'imperial');
      expect(result.bmi).toBe(22.75);
      expect(result.category).toBe('Normal weight');
    });

    test('throws error for invalid unit', () => {
      expect(() => {
        BMICalculator.calculate(70, 1.75, 'invalid');
      }).toThrow('Invalid unit. Use "metric" or "imperial"');
    });

    test('defaults to metric when unit not specified', () => {
      const result = BMICalculator.calculate(70, 1.75);
      expect(result.bmi).toBe(22.86);
    });
  });

  describe('getCategory', () => {
    test('returns Underweight for BMI < 18.5', () => {
      expect(BMICalculator.getCategory(17)).toBe('Underweight');
      expect(BMICalculator.getCategory(18.4)).toBe('Underweight');
    });

    test('returns Normal weight for BMI 18.5-24.9', () => {
      expect(BMICalculator.getCategory(18.5)).toBe('Normal weight');
      expect(BMICalculator.getCategory(22)).toBe('Normal weight');
      expect(BMICalculator.getCategory(24.9)).toBe('Normal weight');
    });

    test('returns Overweight for BMI 25-29.9', () => {
      expect(BMICalculator.getCategory(25)).toBe('Overweight');
      expect(BMICalculator.getCategory(27)).toBe('Overweight');
      expect(BMICalculator.getCategory(29.9)).toBe('Overweight');
    });

    test('returns Obese for BMI >= 30', () => {
      expect(BMICalculator.getCategory(30)).toBe('Obese');
      expect(BMICalculator.getCategory(35)).toBe('Obese');
      expect(BMICalculator.getCategory(40)).toBe('Obese');
    });
  });

  describe('getCategories', () => {
    test('returns all BMI categories', () => {
      const categories = BMICalculator.getCategories();
      expect(categories).toHaveLength(4);
      expect(categories[0].name).toBe('Underweight');
      expect(categories[3].name).toBe('Obese');
    });
  });
});