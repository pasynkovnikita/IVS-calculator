import { E_OPERATOR, E_TOKEN_TYPE, TNode } from '../calculator/types';

describe('Parser', () => {
  const cases: Record<string, Array<[string, TNode | string]>> = {
    BasicExpressions: [
      [
        '42',
        {
          type: E_TOKEN_TYPE.E_NUMBER,
          value: '42',
        },
      ],
      [
        '2 + 3',
        {
          type: E_TOKEN_TYPE.E_OPERATOR,
          value: E_OPERATOR.E_PLUS,
          left: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          right: { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
        },
      ],
    ],
    OperatorPrecedence: [
      [
        '2 + 3 * 4',
        {
          type: E_TOKEN_TYPE.E_OPERATOR,
          value: E_OPERATOR.E_PLUS,
          left: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          right: {
            type: E_TOKEN_TYPE.E_OPERATOR,
            value: E_OPERATOR.E_MULTIPLY,
            left: { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
            right: { type: E_TOKEN_TYPE.E_NUMBER, value: '4' },
          },
        },
      ],
      [
        '2 + 6 / 2',
        {
          type: E_TOKEN_TYPE.E_OPERATOR,
          value: E_OPERATOR.E_PLUS,
          left: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          right: {
            type: E_TOKEN_TYPE.E_OPERATOR,
            value: E_OPERATOR.E_DIVIDE,
            left: { type: E_TOKEN_TYPE.E_NUMBER, value: '6' },
            right: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          },
        },
      ],
      [
        '8 / 4 * 2',
        {
          type: E_TOKEN_TYPE.E_OPERATOR,
          value: E_OPERATOR.E_MULTIPLY,
          left: {
            type: E_TOKEN_TYPE.E_OPERATOR,
            value: E_OPERATOR.E_DIVIDE,
            left: { type: E_TOKEN_TYPE.E_NUMBER, value: '8' },
            right: { type: E_TOKEN_TYPE.E_NUMBER, value: '4' },
          },
          right: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
        },
      ],
    ],
    ComplexExpressions: [
      [
        '2 * 3 + 4 / 2 - 1',
        {
          type: E_TOKEN_TYPE.E_OPERATOR,
          value: E_OPERATOR.E_MINUS,
          left: {
            type: E_TOKEN_TYPE.E_OPERATOR,
            value: E_OPERATOR.E_PLUS,
            left: {
              type: E_TOKEN_TYPE.E_OPERATOR,
              value: E_OPERATOR.E_MULTIPLY,
              left: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
              right: { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
            },
            right: {
              type: E_TOKEN_TYPE.E_OPERATOR,
              value: E_OPERATOR.E_DIVIDE,
              left: { type: E_TOKEN_TYPE.E_NUMBER, value: '4' },
              right: { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
            },
          },
          right: { type: E_TOKEN_TYPE.E_NUMBER, value: '1' },
        },
      ],
    ],
    ErrorCases: [
      ['+', 'Unexpected token type: operator'],
      ['2 +', 'Unexpected token type: eof'],
      ['2 + * 3', 'Unexpected token type: operator'],
    ],
  };

  const parse = (input: string) => {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
  };

  Object.entries(cases).forEach(([category, testCases]) => {
    describe(category, () => {
      testCases.forEach(([tokens, expected]) => {
        const description =
          typeof expected === 'string'
            ? `should throw error: ${expected}`
            : `should parse: ${JSON.stringify(tokens)}`;

        it(description, () => {
          if (typeof expected === 'string') {
            expect(() => parse(tokens)).toThrow(expected);
          } else {
            expect(parse(tokens)).toEqual(expected);
          }
        });
      });
    });
  });
});
