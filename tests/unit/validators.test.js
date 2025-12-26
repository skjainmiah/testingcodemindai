const { validateBMIInput } = require('../../src/utils/validators');

describe('validateBMIInput', () => {
  test('validates correct metric input', () => {
    const result = validateBMIInput(70, 1.75, 'metric');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('validates correct imperial input', () => {
    const result = validateBMIInput(154, 69, 'imperial');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('fails when weight is missing', () => {
    const result = validateBMIInput(null, 1.75, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Weight is required');
  });

  test('fails when height is missing', () => {
    const result = validateBMIInput(70, null, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Height is required');
  });

  test('fails when weight is not a number', () => {
    const result = validateBMIInput('abc', 1.75, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Weight must be a number');
  });

  test('fails when height is not a number', () => {
    const result = validateBMIInput(70, 'abc', 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Height must be a number');
  });

  test('fails when weight is negative', () => {
    const result = validateBMIInput(-70, 1.75, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Weight must be greater than 0');
  });

  test('fails when height is negative', () => {
    const result = validateBMIInput(70, -1.75, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Height must be greater than 0');
  });

  test('fails when unit is invalid', () => {
    const result = validateBMIInput(70, 1.75, 'invalid');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Unit must be either "metric" or "imperial"');
  });

  test('fails when metric weight is out of range', () => {
    const result = validateBMIInput(600, 1.75, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Weight must be between 10 and 500 kg');
  });

  test('fails when metric height is out of range', () => {
    const result = validateBMIInput(70, 4, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Height must be between 0.5 and 3 meters');
  });

  test('collects multiple errors', () => {
    const result = validateBMIInput(-5, 'abc', 'invalid');
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});