/**
 * @fileoverview Lexical analyzer for mathematical expressions.
 * This module provides functionality to tokenize mathematical expressions into a sequence of tokens
 * that can be processed by a parser.
 */

import { E_OPERATOR, E_TOKEN_TYPE, TToken } from './types';

/**
 * Checks if a character is a numeric digit.
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a digit (0-9), false otherwise.
 */
const isNumber = (char: string): boolean => {
  return !!char.match(/[0-9]+/);
};

/**
 * A lexical analyzer that converts mathematical expressions into tokens.
 * Supports numbers, basic arithmetic operators, functions (sqrt, root, abs),
 * and parentheses.
 */
export class Lexer {
  /** Array to store the generated tokens during lexical analysis */
  private tokens: Array<TToken> = [];

  /** Current position in the input string during tokenization */
  private position = 0;

  /** List of supported word-based operators (functions) */
  private static readonly WORD_OPERATORS = ['sqrt', 'root', 'abs', 'std'];

  /** Mapping of operator symbols/words to their corresponding enum values */
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
    std: E_OPERATOR.E_STD,
  };

  /** Mapping of special characters to their corresponding token types */
  private static readonly TOKEN_MAPPING: Record<string, E_TOKEN_TYPE> = {
    '(': E_TOKEN_TYPE.E_LEFT_PARENTHESIS,
    ')': E_TOKEN_TYPE.E_RIGHT_PARENTHESIS,
    ',': E_TOKEN_TYPE.E_COMMA,
  };

  /**
   * Creates a new Lexer instance.
   * @param {string} input - The mathematical expression to tokenize.
   */
  constructor(private input: string) {
    this.tokens = [];
    this.position = 0;
  }

  /**
   * Tokenizes the entire input string into an array of tokens.
   * @returns {Array<TToken>} An array of tokens representing the input expression.
   * @throws {Error} If invalid characters or number formats are encountered.
   */
  public tokenize(): Array<TToken> {
    let token: TToken;

    do {
      token = this.nextToken();
      this.tokens.push(token);
    } while (token.type !== E_TOKEN_TYPE.E_EOF);

    return this.tokens;
  }

  /**
   * Attempts to read a word-based operator (function) at the current position.
   * @returns {string|null} The word operator if found, null otherwise.
   * @private
   */
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

  /**
   * Reads and returns the next token from the input string.
   * This method handles:
   * - Skipping whitespace
   * - Reading word operators (functions)
   * - Reading numbers (including decimals)
   * - Reading single-character operators and special characters
   *
   * @returns {TToken} The next token from the input
   * @throws {Error} If an invalid number format is encountered
   * @private
   */
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

  /**
   * Evaluates a single character and converts it to the appropriate token.
   * @param {string} char - The character to evaluate
   * @returns {TToken} The token corresponding to the character
   * @throws {Error} If the character is not a valid operator or special character
   * @private
   */
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
