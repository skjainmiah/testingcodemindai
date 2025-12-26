const request = require('supertest');
const app = require('../../src/app');

describe('BMI API Endpoints', () => {
  describe('GET /', () => {
    test('returns welcome message and API info', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome to BMI Calculator API');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('POST /api/bmi/calculate', () => {
    test('calculates BMI with valid metric input', async () => {
      const response = await request(app)
        .post('/api/bmi/calculate')
        .send({
          weight: 70,
          height: 1.75,
          unit: 'metric'
        });

      expect(response.status).toBe(200);
      expect(response.body.bmi).toBe(22.86);
      expect(response.body.category).toBe('Normal weight');
      expect(response.body.message).toContain('Your BMI is 22.86');
    });

    test('calculates BMI with valid imperial input', async () => {
      const response = await request(app)
        .post('/api/bmi/calculate')
        .send({
          weight: 154,
          height: 69,
          unit: 'imperial'
        });

      expect(response.status).toBe(200);
      expect(response.body.bmi).toBe(22.75);
      expect(response.body.category).toBe('Normal weight');
    });

    test('returns error for missing weight', async () => {
      const response = await request(app)
        .post('/api/bmi/calculate')
        .send({
          height: 1.75,
          unit: 'metric'
        });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toContain('Weight is required');
    });

    test('returns error for invalid input', async () => {
      const response = await request(app)
        .post('/api/bmi/calculate')
        .send({
          weight: 'abc',
          height: 1.75,
          unit: 'metric'
        });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toContain('Weight must be a number');
    });
  });

  describe('GET /api/bmi/categories', () => {
    test('returns BMI categories', async () => {
      const response = await request(app).get('/api/bmi/categories');
      
      expect(response.status).toBe(200);
      expect(response.body.categories).toHaveLength(4);
      expect(response.body.categories[0].name).toBe('Underweight');
      expect(response.body.categories[3].name).toBe('Obese');
    });
  });

  describe('404 handling', () => {
    test('returns 404 for non-existent route', async () => {
      const response = await request(app).get('/api/nonexistent');
      
      expect(response.status).toBe(404);
      expect(response.body.error.message).toBe('Route not found');
    });
  });
});