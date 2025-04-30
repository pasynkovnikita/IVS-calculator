import { Executor, Lexer, Parser } from '../calculator';

describe('Executor', () => {
  const cases: Record<string, Array<[string, string]>> = {
    BasicCalculations: [
      ['42', '42'],
      ['2 + 3', '5'],
      ['5 - 3', '2'],
      ['4 * 3', '12'],
      ['10 / 2', '5'],
    ],
    ComplexExpressions: [
      ['2 * 3 + 10 / 2', '11'],
      ['(2 + 3) * (4 - 1)', '15'],
      ['2 * (3 + 4)', '14'],
      ['(10 + 2) / (3 + 1)', '3'],
    ],
    FunctionCalls: [
      ['sqrt(16)', '4'],
      ['abs(-5)', '5'],
      ['root(3, 8)', '2'],
      ['std(2, 2)', '0'],
      ['sqrt(16 + 9)', '5'],
      ['abs(2 - 5)', '3'],
      ['root(3, 27)', '3'],
      ['std(1, 2, 3)', '0.816496580927726'],
      ['std(1, 1, 1, 1)', '0'],
      ['std(10, 20, 30, 40)', '11.180339887498949'],
    ],
    EdgeCases: [
      ['1000000 * 1000000', '1000000000000'],
      ['-5 * -3', '15'],
      ['2 + (-3)', '-1'],
      ['1 + 2 + 3 + 4 + 5', '15'],
      ['std()', 'NaN'],
      ['std(1)', '0'],
    ],
    ErrorCases: [
      ['10 / 0', 'Division by zero'],
      ['sqrt(-1)', 'Square root of negative number'],
      ['root(0, 8)', 'Root degree cannot be zero'],
    ],
  };

  const execute = (input: string): string => {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const node = parser.parse();
    const executor = new Executor();
    return executor.execute(node);
  };

  Object.entries(cases).forEach(([category, testCases]) => {
    describe(category, () => {
      testCases.forEach(([input, expected]) => {
        const description =
          category === 'ErrorCases'
            ? `should throw error for "${input}"`
            : `should evaluate "${input}" to "${expected}"`;

        it(description, () => {
          if (category === 'ErrorCases') {
            expect(() => execute(input)).toThrow(expected);
          } else {
            expect(execute(input)).toBe(expected);
          }
        });
      });
    });
  });
});
