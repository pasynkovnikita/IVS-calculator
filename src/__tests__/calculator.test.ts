type TCalculator = {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
  factorial(n: number): number;
  power(base: number, exponent: number): number;
  sqrt(n: number): number;
  root(degree: number, n: number): number;
  evaluate(expression: string): number;
};

describe('Calculator Operations', () => {
  let calculator: TCalculator;

  beforeEach(() => {
    // Mock calculator implementation - all methods will return undefined
    calculator = {
      add: jest.fn(),
      subtract: jest.fn(),
      multiply: jest.fn(),
      divide: jest.fn(),
      factorial: jest.fn(),
      power: jest.fn(),
      sqrt: jest.fn(),
      root: jest.fn(),
      evaluate: jest.fn(),
    };
  });
  describe('Addition', () => {
    test('adds two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('adds a positive and a negative number correctly', () => {
      expect(calculator.add(2, -3)).toBe(-1);
    });

    test('adds two negative numbers correctly', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    test('adds decimal numbers correctly', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('handles large numbers correctly', () => {
      expect(calculator.add(Number.MAX_SAFE_INTEGER, 1)).toBe(
        Number.MAX_SAFE_INTEGER + 1
      );
    });

    test('handles very small decimal numbers', () => {
      expect(calculator.add(0.0000001, 0.0000002)).toBeCloseTo(0.0000003);
    });

    test('handles adding zero', () => {
      expect(calculator.add(5, 0)).toBe(5);
      expect(calculator.add(0, 5)).toBe(5);
      expect(calculator.add(0, 0)).toBe(0);
    });

    test('handles Infinity', () => {
      expect(calculator.add(Infinity, 5)).toBe(Infinity);
      expect(calculator.add(5, Infinity)).toBe(Infinity);
      expect(calculator.add(Infinity, Infinity)).toBe(Infinity);
    });

    test('handles NaN inputs', () => {
      expect(calculator.add(NaN, 5)).toBe(NaN);
      expect(calculator.add(5, NaN)).toBe(NaN);
      expect(calculator.add(NaN, NaN)).toBe(NaN);
    });
  });

  describe('Subtraction', () => {
    test('subtracts two positive numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('subtracts a negative number correctly', () => {
      expect(calculator.subtract(5, -3)).toBe(8);
    });

    test('subtracts to get a negative result', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    test('subtracts decimal numbers correctly', () => {
      expect(calculator.subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });

    test('handles large number differences', () => {
      expect(
        calculator.subtract(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ).toBe(0);
      expect(calculator.subtract(Number.MAX_SAFE_INTEGER, 1)).toBe(
        Number.MAX_SAFE_INTEGER - 1
      );
    });

    test('handles very small decimal differences', () => {
      expect(calculator.subtract(0.0000003, 0.0000001)).toBeCloseTo(0.0000002);
    });

    test('handles subtracting zero', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
      expect(calculator.subtract(0, 5)).toBe(-5);
      expect(calculator.subtract(0, 0)).toBe(0);
    });

    test('handles Infinity', () => {
      expect(calculator.subtract(Infinity, 5)).toBe(Infinity);
      expect(calculator.subtract(5, Infinity)).toBe(-Infinity);
      expect(calculator.subtract(Infinity, Infinity)).toBe(NaN);
      expect(calculator.subtract(-Infinity, -Infinity)).toBe(NaN);
    });

    test('handles NaN inputs', () => {
      expect(calculator.subtract(NaN, 5)).toBe(NaN);
      expect(calculator.subtract(5, NaN)).toBe(NaN);
      expect(calculator.subtract(NaN, NaN)).toBe(NaN);
    });

    test('handles subtracting the same number', () => {
      expect(calculator.subtract(5, 5)).toBe(0);
      expect(calculator.subtract(-5, -5)).toBe(0);
      expect(calculator.subtract(0.1, 0.1)).toBe(0);
    });
  });

  describe('Multiplication', () => {
    test('multiplies two positive numbers correctly', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    test('multiplies a positive and a negative number correctly', () => {
      expect(calculator.multiply(2, -3)).toBe(-6);
    });

    test('multiplies two negative numbers correctly', () => {
      expect(calculator.multiply(-2, -3)).toBe(6);
    });

    test('multiplies decimal numbers correctly', () => {
      expect(calculator.multiply(0.1, 0.2)).toBeCloseTo(0.02);
    });

    test('handles multiplication by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
      expect(calculator.multiply(0, 5)).toBe(0);
      expect(calculator.multiply(0, 0)).toBe(0);
      expect(calculator.multiply(-5, 0)).toBe(0);
    });

    test('handles large number multiplication', () => {
      expect(calculator.multiply(Number.MAX_SAFE_INTEGER, 1)).toBe(
        Number.MAX_SAFE_INTEGER
      );
      expect(calculator.multiply(Number.MAX_SAFE_INTEGER, 2)).toBe(
        Number.MAX_SAFE_INTEGER * 2
      );
    });

    test('handles very small decimal multiplication', () => {
      expect(calculator.multiply(0.0001, 0.0001)).toBeCloseTo(0.00000001);
    });

    test('handles Infinity', () => {
      expect(calculator.multiply(Infinity, 5)).toBe(Infinity);
      expect(calculator.multiply(5, Infinity)).toBe(Infinity);
      expect(calculator.multiply(Infinity, Infinity)).toBe(Infinity);
      expect(calculator.multiply(-5, Infinity)).toBe(-Infinity);
      expect(calculator.multiply(Infinity, -5)).toBe(-Infinity);
      expect(calculator.multiply(Infinity, 0)).toBe(NaN);
    });

    test('handles NaN inputs', () => {
      expect(calculator.multiply(NaN, 5)).toBe(NaN);
      expect(calculator.multiply(5, NaN)).toBe(NaN);
      expect(calculator.multiply(NaN, NaN)).toBe(NaN);
    });

    test('handles identity multiplication', () => {
      expect(calculator.multiply(5, 1)).toBe(5);
      expect(calculator.multiply(1, 5)).toBe(5);
      expect(calculator.multiply(-5, 1)).toBe(-5);
    });

    test('handles fractional multiplication precision', () => {
      expect(calculator.multiply(1 / 3, 3)).toBeCloseTo(1);
      expect(calculator.multiply(0.1, 0.1)).toBeCloseTo(0.01);
    });
  });

  describe('Division', () => {
    test('divides two positive numbers correctly', () => {
      expect(calculator.divide(6, 2)).toBe(3);
    });

    test('divides a positive by a negative number correctly', () => {
      expect(calculator.divide(6, -2)).toBe(-3);
    });

    test('divides to get a decimal result', () => {
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    test('handles division by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow(
        'Division by zero is not allowed'
      );
      expect(() => calculator.divide(0, 0)).toThrow(
        'Division by zero is not allowed'
      );
      expect(() => calculator.divide(-5, 0)).toThrow(
        'Division by zero is not allowed'
      );
    });

    test('divides decimal numbers correctly', () => {
      expect(calculator.divide(0.6, 0.2)).toBeCloseTo(3);
    });

    test('handles dividing zero', () => {
      expect(calculator.divide(0, 5)).toBe(0);
      expect(calculator.divide(0, -5)).toBe(0);
    });

    test('handles recurring decimals', () => {
      expect(calculator.divide(1, 3)).toBeCloseTo(0.3333333333);
      expect(calculator.divide(2, 3)).toBeCloseTo(0.6666666667);
    });

    test('handles very small numbers', () => {
      expect(calculator.divide(0.0000001, 10)).toBeCloseTo(0.00000001);
      expect(calculator.divide(1, 10000000)).toBeCloseTo(0.0000001);
    });

    test('handles large number division', () => {
      expect(calculator.divide(Number.MAX_SAFE_INTEGER, 1)).toBe(
        Number.MAX_SAFE_INTEGER
      );
      expect(
        calculator.divide(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ).toBe(1);
    });

    test('handles Infinity', () => {
      expect(calculator.divide(Infinity, 2)).toBe(Infinity);
      expect(calculator.divide(Infinity, -2)).toBe(-Infinity);
      expect(calculator.divide(5, Infinity)).toBe(0);
      expect(calculator.divide(-5, Infinity)).toBe(0);
      expect(calculator.divide(Infinity, Infinity)).toBe(NaN);
    });

    test('handles NaN inputs', () => {
      expect(calculator.divide(NaN, 5)).toBe(NaN);
      expect(calculator.divide(5, NaN)).toBe(NaN);
      expect(calculator.divide(NaN, NaN)).toBe(NaN);
    });

    test('handles identity division', () => {
      expect(calculator.divide(5, 1)).toBe(5);
      expect(calculator.divide(-5, 1)).toBe(-5);
      expect(calculator.divide(0, 1)).toBe(0);
    });

    test('handles precision for small decimal results', () => {
      expect(calculator.divide(1, 1000)).toBeCloseTo(0.001);
      expect(calculator.divide(1, 100000)).toBeCloseTo(0.00001);
    });
  });

  describe('Factorial', () => {
    test('calculates factorial of positive integers correctly', () => {
      expect(calculator.factorial(0)).toBe(1);
      expect(calculator.factorial(1)).toBe(1);
      expect(calculator.factorial(2)).toBe(2);
      expect(calculator.factorial(3)).toBe(6);
      expect(calculator.factorial(4)).toBe(24);
      expect(calculator.factorial(5)).toBe(120);
    });

    test('handles larger factorials', () => {
      expect(calculator.factorial(10)).toBe(3628800);
      expect(calculator.factorial(12)).toBe(479001600);
    });

    test('throws error for negative numbers', () => {
      expect(() => calculator.factorial(-1)).toThrow(
        'Factorial is only defined for non-negative integers'
      );
      expect(() => calculator.factorial(-5)).toThrow(
        'Factorial is only defined for non-negative integers'
      );
    });

    test('throws error for non-integer numbers', () => {
      expect(() => calculator.factorial(3.5)).toThrow(
        'Factorial is only defined for non-negative integers'
      );
      expect(() => calculator.factorial(2.1)).toThrow(
        'Factorial is only defined for non-negative integers'
      );
    });

    test('handles NaN input', () => {
      expect(calculator.factorial(NaN)).toBe(NaN);
    });
  });

  describe('Power', () => {
    test('calculates power with positive exponents correctly', () => {
      expect(calculator.power(2, 3)).toBe(8);
      expect(calculator.power(3, 2)).toBe(9);
      expect(calculator.power(5, 0)).toBe(1);
      expect(calculator.power(10, 1)).toBe(10);
    });

    test('calculates power with negative base', () => {
      expect(calculator.power(-2, 2)).toBe(4);
      expect(calculator.power(-2, 3)).toBe(-8);
      expect(calculator.power(-3, 2)).toBe(9);
    });

    test('throws error for negative exponents', () => {
      expect(() => calculator.power(2, -1)).toThrow(
        'Exponent must be a non-negative integer'
      );
      expect(() => calculator.power(3, -2)).toThrow(
        'Exponent must be a non-negative integer'
      );
    });

    test('throws error for non-integer exponents', () => {
      expect(() => calculator.power(2, 2.5)).toThrow(
        'Exponent must be a non-negative integer'
      );
      expect(() => calculator.power(3, 1.1)).toThrow(
        'Exponent must be a non-negative integer'
      );
    });

    test('handles zero base', () => {
      expect(calculator.power(0, 0)).toBe(1);
      expect(calculator.power(0, 1)).toBe(0);
      expect(calculator.power(0, 2)).toBe(0);
    });

    test('handles NaN inputs', () => {
      expect(calculator.power(NaN, 2)).toBe(NaN);
      expect(calculator.power(2, NaN)).toBe(NaN);
    });
  });

  describe('Root Operations', () => {
    test('calculates square root correctly', () => {
      expect(calculator.sqrt(0)).toBe(0);
      expect(calculator.sqrt(1)).toBe(1);
      expect(calculator.sqrt(4)).toBe(2);
      expect(calculator.sqrt(9)).toBe(3);
      expect(calculator.sqrt(16)).toBe(4);
    });

    test('calculates decimal square roots correctly', () => {
      expect(calculator.sqrt(2)).toBeCloseTo(1.4142135624);
      expect(calculator.sqrt(3)).toBeCloseTo(1.7320508076);
      expect(calculator.sqrt(0.25)).toBe(0.5);
    });

    test('throws error for negative numbers in square root', () => {
      expect(() => calculator.sqrt(-1)).toThrow(
        'Cannot calculate square root of a negative number'
      );
      expect(() => calculator.sqrt(-4)).toThrow(
        'Cannot calculate square root of a negative number'
      );
    });

    test('calculates nth root correctly', () => {
      expect(calculator.root(2, 4)).toBe(2);
      expect(calculator.root(3, 8)).toBe(2);
      expect(calculator.root(3, 27)).toBe(3);
      expect(calculator.root(4, 16)).toBe(2);
    });

    test('calculates decimal nth roots correctly', () => {
      expect(calculator.root(2, 2)).toBeCloseTo(1.4142135624);
      expect(calculator.root(3, 2)).toBeCloseTo(1.2599210499);
    });

    test('throws error for invalid root degree', () => {
      expect(() => calculator.root(0, 8)).toThrow(
        'Root degree must be positive'
      );
      expect(() => calculator.root(-1, 8)).toThrow(
        'Root degree must be positive'
      );
    });

    test('throws error for even root of negative number', () => {
      expect(() => calculator.root(2, -4)).toThrow(
        'Even root of negative number is not allowed'
      );
      expect(() => calculator.root(4, -16)).toThrow(
        'Even root of negative number is not allowed'
      );
    });

    test('handles odd root of negative number', () => {
      expect(calculator.root(3, -8)).toBe(-2);
      expect(calculator.root(3, -27)).toBe(-3);
    });
  });

  describe('Complex Expressions', () => {
    test('evaluates complex expressions correctly', () => {
      expect(calculator.evaluate('2 + 3 * 4')).toBe(14);
      expect(calculator.evaluate('(2 + 3) * 4')).toBe(20);
      expect(calculator.evaluate('2 * 3 + 4 * 5')).toBe(26);
    });

    test('handles multiple operations with proper precedence', () => {
      expect(calculator.evaluate('2 + 3 * 4 - 5')).toBe(9);
      expect(calculator.evaluate('10 / 2 * 3 + 4')).toBe(19);
      expect(calculator.evaluate('2 ^ 3 * 4 + 5')).toBe(37);
    });

    test('evaluates expressions with functions and operators', () => {
      expect(calculator.evaluate('2 * √9 + 1')).toBe(7);
      expect(calculator.evaluate('3! + 4')).toBe(10);
      expect(calculator.evaluate('root(2, 16) + 3')).toBe(7);
    });

    test('handles nested parentheses', () => {
      expect(calculator.evaluate('((2 + 3) * (4 + 5))')).toBe(45);
      expect(calculator.evaluate('(2 + (3 * 4))')).toBe(14);
    });

    test('handles complex expressions with all operations', () => {
      expect(calculator.evaluate('2 * (3 + 4!) - √16')).toBe(30);
      expect(calculator.evaluate('root(2, 16) ^ 2 + 3!')).toBe(10);
    });

    test('throws error for invalid expressions', () => {
      expect(() => calculator.evaluate('2 +')).toThrow();
      expect(() => calculator.evaluate('* 2')).toThrow();
      expect(() => calculator.evaluate('2 * (3 + 4')).toThrow();
    });
  });
});
