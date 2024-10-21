// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: Action.Multiply });
    expect(result).toBe(10);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 2, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(125);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: 'action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const resultAdd = simpleCalculator({ a: 'a', b: 'b', action: Action.Add });
    const resultMultiply = simpleCalculator({
      a: 'a',
      b: 5,
      action: Action.Multiply,
    });
    const resultDivide = simpleCalculator({
      a: 8,
      b: '2',
      action: Action.Divide,
    });
    expect(resultAdd).toBeNull();
    expect(resultMultiply).toBeNull();
    expect(resultDivide).toBeNull();
  });
});
