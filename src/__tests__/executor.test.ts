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
      ['2 * 3 + 10 / 2', '11'], // (2 * 3) + (10 / 2) = 6 + 5 = 11
      ['(2 + 3) * (4 - 1)', '15'], // (2 + 3) * (4 - 1) = 5 * 3 = 15
      ['2 * (3 + 4)', '14'], // 2 * (3 + 4) = 2 * 7 = 14
      ['(10 + 2) / (3 + 1)', '3'], // (10 + 2) / (3 + 1) = 12 / 4 = 3
    ],
    EdgeCases: [
      ['1000000 * 1000000', '1000000000000'],
      ['-5 * -3', '15'],
      ['2 + (-3)', '-1'],
      ['1 + 2 + 3 + 4 + 5', '15'],
    ],
    ErrorCases: [
      ['10 / 0', 'Division by zero'],
      ['2 + ', 'Unexpected token type: eof'],
      ['* 2', 'Unexpected token type: operator'],
      ['2 2', 'Unexpected token type: number'],
      ['2 + + 2', 'Unexpected token type: operator'],
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
