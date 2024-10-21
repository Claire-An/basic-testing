// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 12, b: 3, action: Action.Add, expected: 15 },
  { a: 30, b: 22, action: Action.Add, expected: 52 },

  { a: 12, b: 2, action: Action.Subtract, expected: 10 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: -3, b: 2, action: Action.Subtract, expected: -5 },

  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 28, b: 7, action: Action.Divide, expected: 4 },
  { a: 444, b: 4, action: Action.Divide, expected: 111 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 34, b: 2, action: Action.Multiply, expected: 68 },

  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 25, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
];

const testCasesInvalid = [
  { a: '1', b: 2, action: Action.Add, expected: 3 },
  { a: 12, b: '3', action: Action.Add, expected: 15 },
  { a: 30, b: 22, action: 'action', expected: 52 },

  { a: '12', b: 2, action: Action.Subtract, expected: 10 },
  { a: 2, b: '2', action: Action.Subtract, expected: 0 },
  { a: -3, b: 2, action: 'action', expected: -5 },

  { a: '12', b: 2, action: Action.Divide, expected: 6 },
  { a: 28, b: '7', action: Action.Divide, expected: 4 },
  { a: 444, b: 4, action: undefined, expected: 111 },

  { a: '1', b: 2, action: Action.Multiply, expected: 2 },
  { a: 8, b: '2', action: Action.Multiply, expected: 16 },
  { a: 34, b: 2, action: undefined, expected: 68 },

  { a: '1', b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 25, b: '0', action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 4, action: '', expected: 81 },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should expected=$expected for action=$action two numbers a=$a, b=$b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a: a, b: b, action: action });
      expect(result).toBe(expected);
    },
  );

  it.each(testCasesInvalid)(
    'should return null for action=$action two arguments a=$a, b=$b',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a: a, b: b, action: action });
      expect(result).toBeNull;
    },
  );
});
