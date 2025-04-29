import {
  E_OPERATOR,
  TNode,
  E_TOKEN_TYPE,
  isOperatorNode,
  isUnaryOperatorNode,
  isBinaryOperatorNode,
  isFunctionNode,
} from './types';

export class Executor {
  private static readonly OPERATIONS_MAP: Record<
    E_OPERATOR,
    (a: Array<number>) => number
  > = {
    [E_OPERATOR.E_PLUS]: ([a, b]) => a + b,
    [E_OPERATOR.E_MINUS]: ([a, b]) => a - b,
    [E_OPERATOR.E_MULTIPLY]: ([a, b]) => a * b,
    [E_OPERATOR.E_DIVIDE]: ([a, b]) => {
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    },
    [E_OPERATOR.E_MODULO]: ([a, b]) => a % b,
    [E_OPERATOR.E_UNARY_MINUS]: ([a]) => -a,
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
    [E_OPERATOR.E_SQRT]: ([a]) => {
      if (a < 0) {
        throw new Error('Square root of negative number');
      }
      return Math.sqrt(a);
    },
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
    [E_OPERATOR.E_POWER]: ([a, b]) => Math.pow(a, b),
    [E_OPERATOR.E_ABS]: ([a]) => Math.abs(a),
    [E_OPERATOR.E_STD]: (numbers) => {
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
