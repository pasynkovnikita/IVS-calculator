export enum E_TOKEN_TYPE {
  E_NUMBER = 'number',
  E_OPERATOR = 'operator',
  E_LEFT_PARENTHESIS = 'leftParenthesis',
  E_RIGHT_PARENTHESIS = 'rightParenthesis',
  E_COMMA = 'comma',
  E_EOF = 'eof',
}

export enum E_OPERATOR {
  E_PLUS = '+',
  E_MINUS = '-',
  E_MULTIPLY = '*',
  E_DIVIDE = '/',
  E_MODULO = '%',
  E_UNARY_MINUS = 'unary-',
  E_ROOT = 'root',
  E_SQRT = 'sqrt',
  E_FACTORIAL = '!',
  E_POWER = '^',
  E_ABS = 'abs',
}

export type TToken =
  | {
      type: E_TOKEN_TYPE;
      value?: number | string;
    }
  | {
      type: E_TOKEN_TYPE.E_OPERATOR;
      value: E_OPERATOR;
    };

export const isOperatorToken = (
  token: any
): token is Extract<TToken, { type: E_TOKEN_TYPE.E_OPERATOR }> =>
  token.type === E_TOKEN_TYPE.E_OPERATOR;

export type TOperatorNode = {
  type: E_TOKEN_TYPE.E_OPERATOR;
  value: E_OPERATOR;
} & (
  | {
      left: TNode;
      right: TNode;
    }
  | {
      left: undefined;
      right: TNode;
    }
);

export type TDefaultNode = {
  type: E_TOKEN_TYPE;
  value?: string;
};

export type TNode = TDefaultNode | TOperatorNode;

export const isOperatorNode = (node: TNode): node is TOperatorNode =>
  node.type === E_TOKEN_TYPE.E_OPERATOR;

export const isUnaryOperatorNode = (
  node: TNode
): node is Extract<TOperatorNode, { left: undefined }> =>
  isOperatorNode(node) && !node.left;

export const isBinaryOperatorNode = (
  node: TNode
): node is Extract<TOperatorNode, { left: TNode }> =>
  isOperatorNode(node) && !!node.left;
