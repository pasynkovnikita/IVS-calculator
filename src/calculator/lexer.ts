import { E_OPERATOR, E_TOKEN_TYPE, TToken } from './types';

const isNumber = (char: string): boolean => {
  return !!char.match(/[0-9]+/);
};

export class Lexer {
  private tokens: Array<TToken> = [];

  private position = 0;

  private static readonly WORD_OPERATORS = ['sqrt', 'root', 'abs'];

  private static readonly OPERATOR_MAPPING: Record<string, E_OPERATOR> = {
    '+': E_OPERATOR.E_PLUS,
    '-': E_OPERATOR.E_MINUS,
    '*': E_OPERATOR.E_MULTIPLY,
    '/': E_OPERATOR.E_DIVIDE,
    '^': E_OPERATOR.E_POWER,
    '!': E_OPERATOR.E_FACTORIAL,
    sqrt: E_OPERATOR.E_SQRT,
    root: E_OPERATOR.E_ROOT,
    abs: E_OPERATOR.E_ABS,
  };

  private static readonly TOKEN_MAPPING: Record<string, E_TOKEN_TYPE> = {
    '(': E_TOKEN_TYPE.E_LEFT_PARENTHESIS,
    ')': E_TOKEN_TYPE.E_RIGHT_PARENTHESIS,
    ',': E_TOKEN_TYPE.E_COMMA,
  };

  constructor(private input: string) {
    this.tokens = [];
    this.position = 0;
  }

  public tokenize(): Array<TToken> {
    let token: TToken;

    do {
      token = this.nextToken();
      this.tokens.push(token);
    } while (token.type !== E_TOKEN_TYPE.E_EOF);

    return this.tokens;
  }

  private tryReadWordOperator(): string | null {
    for (const op of Lexer.WORD_OPERATORS) {
      const endPos = this.position + op.length;
      if (endPos <= this.input.length) {
        const word = this.input.slice(this.position, endPos);
        // Check if the word matches the operator and is followed by a non-alphabetic character or end of string
        if (
          word === op &&
          (endPos === this.input.length || !/[a-zA-Z]/.test(this.input[endPos]))
        ) {
          return op;
        }
      }
    }
    return null;
  }

  private nextToken(): TToken {
    // Skip whitespace
    while (
      this.position < this.input.length &&
      /\s/.test(this.input[this.position])
    ) {
      this.position++;
    }

    let token: TToken = {
      type: E_TOKEN_TYPE.E_EOF,
      value: '',
    };

    if (this.position >= this.input.length) {
      return token;
    }

    // Try to read word operator first
    const wordOp = this.tryReadWordOperator();
    if (wordOp) {
      this.position += wordOp.length;
      return {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: Lexer.OPERATOR_MAPPING[wordOp],
      };
    }

    const char = this.input[this.position];

    if (isNumber(char) || char === '.') {
      let numberStr = char;
      let currentPos = this.position + 1;
      while (
        currentPos < this.input.length &&
        (isNumber(this.input[currentPos]) || this.input[currentPos] === '.')
      ) {
        if (this.input[currentPos] === '.' && numberStr.includes('.')) {
          throw new Error(`Invalid number: ${numberStr}.`);
        }

        numberStr += this.input[currentPos];
        currentPos++;
      }
      this.position = currentPos - 1;
      token = {
        type: E_TOKEN_TYPE.E_NUMBER,
        value: numberStr,
      };
    } else {
      token = this.evalToken(char);
    }

    this.position++;

    return token;
  }

  private evalToken(char: string): TToken {
    if (Lexer.OPERATOR_MAPPING[char]) {
      return {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: Lexer.OPERATOR_MAPPING[char],
      };
    } else if (Lexer.TOKEN_MAPPING[char]) {
      return {
        type: Lexer.TOKEN_MAPPING[char],
        value: char,
      };
    } else {
      throw new Error(`Invalid character: ${char}`);
    }
  }
}
