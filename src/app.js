const express = require('express');
const bmiRoutes = require('./routes/bmi');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to BMI Calculator API',
    version: process.env.APP_VERSION || '1.0.0',
    endpoints: {
      calculate: 'POST /api/bmi/calculate',
      categories: 'GET /api/bmi/categories'
    }
  });
});

app.use('/api/bmi', bmiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

module.exports = app;