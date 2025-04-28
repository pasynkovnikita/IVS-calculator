import { E_TOKEN_TYPE, Lexer, TToken } from '../calculator';

describe('Lexer', () => {
  const cases: Record<string, Array<[string, Array<TToken> | string]>> = {
    Numbers: [
      [
        '10',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '10' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '5',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '5' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '123',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '123' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '12.34',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '12.34' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '00123',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '00123' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
    ],
    Operators: [
      [
        '2+3',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '+' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '5-3',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '5' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '-' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '4*2',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '4' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '*' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '8/2',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '8' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '/' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
    ],
    Parentheses: [
      [
        '(2+3)',
        [
          { type: E_TOKEN_TYPE.E_LEFT_PARENTHESIS, value: '(' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '+' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
          { type: E_TOKEN_TYPE.E_RIGHT_PARENTHESIS, value: ')' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '((2+3)*4)',
        [
          { type: E_TOKEN_TYPE.E_LEFT_PARENTHESIS, value: '(' },
          { type: E_TOKEN_TYPE.E_LEFT_PARENTHESIS, value: '(' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '+' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
          { type: E_TOKEN_TYPE.E_RIGHT_PARENTHESIS, value: ')' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '*' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '4' },
          { type: E_TOKEN_TYPE.E_RIGHT_PARENTHESIS, value: ')' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
    ],
    Whitespace: [
      [
        '2 + 3',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '+' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
      [
        '  2  +  3  ',
        [
          { type: E_TOKEN_TYPE.E_NUMBER, value: '2' },
          { type: E_TOKEN_TYPE.E_OPERATOR, value: '+' },
          { type: E_TOKEN_TYPE.E_NUMBER, value: '3' },
          { type: E_TOKEN_TYPE.E_EOF, value: '' },
        ],
      ],
    ],
    ErrorCases: [
      ['2 @ 3', 'Invalid character: @'],
      ['2.3.4', 'Invalid number: 2.3.'],
    ],
  };

  const tokenize = (input: string) => {
    const lexer = new Lexer(input);

    return lexer.tokenize();
  };

  Object.entries(cases).forEach(([name, subCases]) => {
    describe(name, () => {
      subCases.forEach(([input, expected]) => {
        if (name === 'ErrorCases') {
          it(`should throw error for ${input}`, () => {
            expect(() => tokenize(input)).toThrow(expected as string);
          });
        } else {
          it(`should tokenize ${input}`, () => {
            expect(tokenize(input)).toEqual(expected);
          });
        }
      });
    });
  });
});
