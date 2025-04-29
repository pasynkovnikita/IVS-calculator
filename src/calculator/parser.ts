import {
  E_OPERATOR,
  E_TOKEN_TYPE,
  isOperatorToken,
  TNode,
  TToken,
} from './types';

export class Parser {
  private position = 0;

  private tokens: Array<TToken> = [];

  constructor(tokens: Array<TToken>) {
    this.tokens = tokens;
    this.position = 0;
  }

  public parse(): TNode {
    const expression = this.parseExpression();
    this.eat(E_TOKEN_TYPE.E_EOF);
    return expression;
  }

  private getCurrentToken(): TToken {
    return this.tokens[this.position];
  }

  private eat(type: E_TOKEN_TYPE): TToken {
    const token = this.getCurrentToken();
    if (token.type !== type) {
      throw new Error(`Expected ${type}, got ${token.type}`);
    }
    this.position++;
    return token;
  }

  private parseExpression(): TNode {
    let left = this.parseTerm();

    while (
      this.getCurrentToken().type === E_TOKEN_TYPE.E_OPERATOR &&
      (this.getCurrentToken().value === '+' ||
        this.getCurrentToken().value === '-')
    ) {
      const operatorToken = this.eat(E_TOKEN_TYPE.E_OPERATOR);
      const operator =
        operatorToken.value === '+' ? E_OPERATOR.E_PLUS : E_OPERATOR.E_MINUS;
      const right = this.parseTerm();
      left = {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: operator,
        left,
        right,
      };
    }

    return left;
  }

  private parsePower(): TNode {
    let left = this.parseFunction();

    // Apply factorial operators to the left operand
    left = this.checkPostfixOperator(left);

    while (
      isOperatorToken(this.getCurrentToken()) &&
      (this.getCurrentToken().value === '^' ||
        this.getCurrentToken().value === 'root' ||
        this.getCurrentToken().value === 'std')
    ) {
      const operatorToken = this.eat(E_TOKEN_TYPE.E_OPERATOR);
      const operator =
        operatorToken.value === '^'
          ? E_OPERATOR.E_POWER
          : operatorToken.value === 'std'
            ? E_OPERATOR.E_STD
            : E_OPERATOR.E_ROOT;
      const right = this.parseFunction();
      // Apply factorial operators to the right operand
      const rightWithFactorial = this.checkPostfixOperator(right);
      left = {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: operator,
        left,
        right: rightWithFactorial,
      };
    }

    return left;
  }

  private checkPostfixOperator(node: TNode): TNode {
    const token = this.getCurrentToken();
    if (
      token.type === E_TOKEN_TYPE.E_OPERATOR &&
      token.value === E_OPERATOR.E_FACTORIAL
    ) {
      this.eat(E_TOKEN_TYPE.E_OPERATOR);
      const factorialNode = {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: E_OPERATOR.E_FACTORIAL,
        right: node,
      };
      // Recursively check for more factorial operators
      return this.checkPostfixOperator(factorialNode);
    }
    return node;
  }

  private parseTerm(): TNode {
    let left = this.parsePower();

    while (
      isOperatorToken(this.getCurrentToken()) &&
      (this.getCurrentToken().value === '*' ||
        this.getCurrentToken().value === '/')
    ) {
      const operatorToken = this.eat(E_TOKEN_TYPE.E_OPERATOR);
      const operator =
        operatorToken.value === '*'
          ? E_OPERATOR.E_MULTIPLY
          : E_OPERATOR.E_DIVIDE;
      const right = this.parsePower();
      left = {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: operator,
        left,
        right,
      };
    }

    return left;
  }

  private isUnaryOperator(): E_OPERATOR | null {
    const token = this.getCurrentToken();
    if (token.type !== E_TOKEN_TYPE.E_OPERATOR) {
      return null;
    }

    // Check if the operator is unary
    const unaryOperators = [E_OPERATOR.E_UNARY_MINUS];

    // Special case for factorial - it's a postfix operator, not a prefix operator
    if (token.value === E_OPERATOR.E_FACTORIAL) {
      // Factorial should not be at the beginning of an expression or after another operator
      if (this.position === 0) {
        throw new Error(`Unexpected token type: ${token.type}`);
      }

      // Get the previous token
      const prevToken = this.tokens[this.position - 1];

      // Factorial should not follow an operator or left parenthesis
      if (
        prevToken.type === E_TOKEN_TYPE.E_OPERATOR ||
        prevToken.type === E_TOKEN_TYPE.E_LEFT_PARENTHESIS
      ) {
        throw new Error(`Unexpected token type: ${token.type}`);
      }
      return null;
    }

    // Special case for minus - can be both unary and binary
    if (token.value === E_OPERATOR.E_MINUS) {
      // Check if this is the first token
      if (this.position === 0) {
        return E_OPERATOR.E_UNARY_MINUS;
      }

      // Get the previous token
      const prevToken = this.tokens[this.position - 1];

      // Unary minus if it follows an operator or left parenthesis
      if (
        prevToken.type === E_TOKEN_TYPE.E_OPERATOR ||
        prevToken.type === E_TOKEN_TYPE.E_LEFT_PARENTHESIS
      ) {
        return E_OPERATOR.E_UNARY_MINUS;
      }
      return null;
    }

    // For other operators, check if they're in the unary list
    return unaryOperators.includes(token.value as E_OPERATOR)
      ? (token.value as E_OPERATOR)
      : null;
  }

  private parseFunctionArgs(): Array<TNode> {
    const args: Array<TNode> = [];
    this.eat(E_TOKEN_TYPE.E_LEFT_PARENTHESIS);

    // Handle empty argument list
    if (this.getCurrentToken().type === E_TOKEN_TYPE.E_RIGHT_PARENTHESIS) {
      this.eat(E_TOKEN_TYPE.E_RIGHT_PARENTHESIS);
      return args;
    }

    // Parse first argument
    args.push(this.parseExpression());

    // Parse remaining arguments
    while (this.getCurrentToken().type === E_TOKEN_TYPE.E_COMMA) {
      this.eat(E_TOKEN_TYPE.E_COMMA);
      args.push(this.parseExpression());
    }

    this.eat(E_TOKEN_TYPE.E_RIGHT_PARENTHESIS);
    return args;
  }

  private parseFunction(): TNode {
    const token = this.getCurrentToken();

    if (token.type !== E_TOKEN_TYPE.E_OPERATOR) {
      return this.parseFactor();
    }

    // Handle functions with arguments
    if (
      token.value === E_OPERATOR.E_ROOT ||
      token.value === E_OPERATOR.E_STD ||
      token.value === 'sqrt' ||
      token.value === 'abs'
    ) {
      const operator =
        token.value === 'sqrt'
          ? E_OPERATOR.E_SQRT
          : token.value === 'abs'
            ? E_OPERATOR.E_ABS
            : token.value;

      this.eat(E_TOKEN_TYPE.E_OPERATOR);
      const args = this.parseFunctionArgs();

      return {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: operator,
        args: args,
      };
    }

    return this.parseFactor();
  }

  private parseFactor(): TNode {
    const token = this.getCurrentToken();

    if (token.type === E_TOKEN_TYPE.E_RIGHT_PARENTHESIS) {
      throw new Error(`Unexpected token type: ${token.type}`);
    }

    const unaryOp = this.isUnaryOperator();
    if (unaryOp !== null) {
      this.eat(E_TOKEN_TYPE.E_OPERATOR);
      const right = this.parseFactor();
      return {
        type: E_TOKEN_TYPE.E_OPERATOR,
        value: unaryOp,
        right,
      };
    }

    if (token.type === E_TOKEN_TYPE.E_LEFT_PARENTHESIS) {
      this.eat(E_TOKEN_TYPE.E_LEFT_PARENTHESIS);
      const node = this.parseExpression();

      const currentToken = this.getCurrentToken();
      if (currentToken.type === E_TOKEN_TYPE.E_EOF) {
        throw new Error(`Unexpected token type: ${currentToken.type}`);
      }
      if (currentToken.type !== E_TOKEN_TYPE.E_RIGHT_PARENTHESIS) {
        throw new Error(`Unexpected token type: ${currentToken.type}`);
      }
      this.eat(E_TOKEN_TYPE.E_RIGHT_PARENTHESIS);

      // Check for factorial operators after the parenthesized expression
      return this.checkPostfixOperator(node);
    }

    if (token.type === E_TOKEN_TYPE.E_NUMBER) {
      this.eat(E_TOKEN_TYPE.E_NUMBER);
      const value = token.value
        ? typeof token.value === 'number'
          ? token.value
          : parseFloat(token.value)
        : 0;
      return {
        type: E_TOKEN_TYPE.E_NUMBER,
        value: JSON.stringify(value),
      };
    }

    throw new Error(`Unexpected token type: ${token.type}`);
  }
}
