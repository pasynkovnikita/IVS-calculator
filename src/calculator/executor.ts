import {
  E_OPERATOR,
  TNode,
  E_TOKEN_TYPE,
  isOperatorNode,
  isUnaryOperatorNode,
  isBinaryOperatorNode,
  isFunctionNode,
} from './types';

/**
 * The Executor class is responsible for evaluating mathematical expressions
 * represented as an Abstract Syntax Tree (AST). It supports various mathematical
 * operations including basic arithmetic, power, root, factorial, and absolute value.
 */
export class Executor {
  /**
   * A mapping of operators to their corresponding mathematical functions.
   * This map contains both unary and binary operations.
   * @private
   */
  private static readonly OPERATIONS_MAP: Record<
    E_OPERATOR,
    (a: Array<number>) => number
  > = {
    /**
     * Addition operation
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {number} Sum of the operands
     */
    [E_OPERATOR.E_PLUS]: ([a, b]) => a + b,
    /**
     * Subtraction operation
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {number} Difference of the operands
     */
    [E_OPERATOR.E_MINUS]: ([a, b]) => a - b,
    /**
     * Multiplication operation
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {number} Product of the operands
     */
    [E_OPERATOR.E_MULTIPLY]: ([a, b]) => a * b,
    /**
     * Division operation
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} Quotient of the division
     * @throws {Error} When attempting to divide by zero
     */
    [E_OPERATOR.E_DIVIDE]: ([a, b]) => {
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    },
    /**
     * Modulo operation
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} Remainder of the division
     */
    [E_OPERATOR.E_MODULO]: ([a, b]) => a % b,
    /**
     * Unary minus operation
     * @param {number} a - Number to negate
     * @returns {number} Negated value
     */
    [E_OPERATOR.E_UNARY_MINUS]: ([a]) => -a,
    /**
     * Nth root operation
     * @param {number} base - The number under the root
     * @param {number} n - The degree of the root
     * @returns {number} The nth root of the base
     * @throws {Error} When degree is zero, negative, or when taking root of negative number with non-integer degree
     */
    [E_OPERATOR.E_ROOT]: ([base, n]) => {
      if (n === 0) {
        throw new Error('Root degree cannot be zero');
      }
      if (n < 0) {
        throw new Error('Negative root degree is not supported');
      }
      if (base < 0 && Math.floor(n) !== n) {
        throw new Error('Root of negative number with non-integer degree');
      }
      return Math.pow(base, 1 / n);
    },
    /**
     * Square root operation
     * @param {number} a - The number to find the square root of
     * @returns {number} The square root of the input
     * @throws {Error} When attempting to find square root of a negative number
     */
    [E_OPERATOR.E_SQRT]: ([a]) => {
      if (a < 0) {
        throw new Error('Square root of negative number');
      }
      return Math.sqrt(a);
    },
    /**
     * Factorial operation
     * @param {number} a - The number to calculate factorial of
     * @returns {number} The factorial of the input
     * @throws {Error} When input is negative or non-integer
     */
    [E_OPERATOR.E_FACTORIAL]: ([a]) => {
      if (a < 0) {
        throw new Error('Factorial of negative number');
      }
      if (Math.floor(a) !== a) {
        throw new Error('Factorial of non-integer number');
      }
      let result = 1;
      for (let i = 2; i <= a; i++) {
        result *= i;
      }
      return result;
    },
    /**
     * Power operation
     * @param {number} a - Base
     * @param {number} b - Exponent
     * @returns {number} The base raised to the power of the exponent
     */
    [E_OPERATOR.E_POWER]: ([a, b]) => Math.pow(a, b),
    /**
     * Absolute value operation
     * @param {number} a - Number to find absolute value of
     * @returns {number} The absolute value of the input
     */
    [E_OPERATOR.E_ABS]: ([a]) => Math.abs(a),
    /**
     * Standard deviation operation (currently same as absolute value)
     * @param {number[]} numbers - Number to process
     * @returns {number} The absolute value of the input
     */
    [E_OPERATOR.E_STD]: (numbers: Array<number>) => {
      if (numbers.length === 0) return NaN;

      const mean =
        numbers.reduce((sum, value) => sum + value, 0) / numbers.length;

      const squaredDiffs = numbers.map((value) => {
        const diff = value - mean;
        return diff * diff;
      });

      const variance =
        squaredDiffs.reduce((sum, value) => sum + value, 0) / numbers.length;

      return Math.sqrt(variance);
    },
  };

  /**
   * Executes the mathematical operation represented by the AST node.
   * @param {TNode} node - The AST node to execute
   * @returns {string} The result of the operation as a string
   * @throws {Error} When encountering unknown operator or node type
   */
  public execute(node: TNode): string {
    if (node.type === E_TOKEN_TYPE.E_NUMBER) {
      return `${parseFloat(node?.value ?? '0')}`;
    }

    if (isOperatorNode(node)) {
      const operation = Executor.OPERATIONS_MAP[node.value];
      if (!operation) {
        throw new Error(`Unknown operator: ${node.value}`);
      }

      if (isUnaryOperatorNode(node)) {
        const rightValue = parseFloat(this.execute(node.right));
        return `${operation([rightValue])}`;
      }

      if (isBinaryOperatorNode(node)) {
        const leftValue = parseFloat(this.execute(node.left));
        const rightValue = parseFloat(this.execute(node.right));
        return `${operation([leftValue, rightValue])}`;
      }

      if (isFunctionNode(node)) {
        const argValues = node.args.map((arg) => parseFloat(this.execute(arg)));
        return `${operation(argValues)}`;
      }
    }

    throw new Error(`Unknown node type: ${node.type}`);
  }
}
