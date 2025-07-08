function evaluateMathExpression(expression) {
  try {
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, '');
    
    if (!sanitizedExpression.trim()) {
      throw new Error('Empty expression');
    }

    const tokens = tokenize(sanitizedExpression);
    const result = parseExpression(tokens);
    
    if (tokens.length > 0) {
      throw new Error('Invalid expression');
    }
    
    return result;
  } catch (error) {
    throw new Error(`Invalid math expression: ${error.message}`);
  }
}

function tokenize(expression) {
  const tokens = [];
  let i = 0;
  
  while (i < expression.length) {
    const char = expression[i];
    
    if (char === ' ') {
      i++;
      continue;
    }
    
    if (char === '+' || char === '-' || char === '*' || char === '/' || char === '(' || char === ')') {
      tokens.push(char);
      i++;
    } else if (char >= '0' && char <= '9' || char === '.') {
      let num = '';
      while (i < expression.length && (expression[i] >= '0' && expression[i] <= '9' || expression[i] === '.')) {
        num += expression[i];
        i++;
      }
      tokens.push(parseFloat(num));
    } else {
      throw new Error(`Invalid character: ${char}`);
    }
  }
  
  return tokens;
}

function parseExpression(tokens) {
  let result = parseTerm(tokens);
  
  while (tokens.length > 0 && (tokens[0] === '+' || tokens[0] === '-')) {
    const operator = tokens.shift();
    const right = parseTerm(tokens);
    
    if (operator === '+') {
      result += right;
    } else {
      result -= right;
    }
  }
  
  return result;
}

function parseTerm(tokens) {
  let result = parseFactor(tokens);
  
  while (tokens.length > 0 && (tokens[0] === '*' || tokens[0] === '/')) {
    const operator = tokens.shift();
    const right = parseFactor(tokens);
    
    if (operator === '*') {
      result *= right;
    } else {
      if (right === 0) {
        throw new Error('Division by zero');
      }
      result /= right;
    }
  }
  
  return result;
}

function parseFactor(tokens) {
  if (tokens.length === 0) {
    throw new Error('Unexpected end of expression');
  }
  
  const token = tokens.shift();
  
  if (typeof token === 'number') {
    return token;
  }
  
  if (token === '(') {
    const result = parseExpression(tokens);
    if (tokens.length === 0 || tokens.shift() !== ')') {
      throw new Error('Missing closing parenthesis');
    }
    return result;
  }
  
  if (token === '-') {
    return -parseFactor(tokens);
  }
  
  if (token === '+') {
    return parseFactor(tokens);
  }
  
  throw new Error(`Unexpected token: ${token}`);
}

module.exports = {
  evaluateMathExpression
};