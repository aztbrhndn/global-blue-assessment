const express = require('express');
const router = express.Router();
const { evaluateMathExpression } = require('../utils/mathCalculator');

router.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression) {
      return res.status(400).json({
        error: 'Missing expression',
        message: 'Please provide a mathematical expression to calculate'
      });
    }
    
    if (typeof expression !== 'string') {
      return res.status(400).json({
        error: 'Invalid expression format',
        message: 'Expression must be a string'
      });
    }
    
    const result = evaluateMathExpression(expression);
    
    res.json({
      expression: expression,
      result: result,
      success: true
    });
    
  } catch (error) {
    res.status(400).json({
      error: 'Calculation error',
      message: error.message,
      success: false
    });
  }
});

module.exports = router;