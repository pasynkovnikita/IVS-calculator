export enum E_TOKEN_TYPE {
  E_NUMBER = 'number',
  E_OPERATOR = 'operator',
  E_LEFT_PARENTHESIS = 'leftParenthesis',
  E_RIGHT_PARENTHESIS = 'rightParenthesis',
  E_EOF = 'eof',
}

export enum E_OPERATOR {
  E_PLUS = '+',
  E_MINUS = '-',
  E_MULTIPLY = '*',
  E_DIVIDE = '/',
  E_MODULO = '%',
}

export type TToken =
  | {
      type: E_TOKEN_TYPE;
      value: number | string;
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
};

export type TDefaultNode = {
  type: E_TOKEN_TYPE;
  value?: string;
};

export type TNode = {
  left?: TNode;
  right?: TNode;
} & (TDefaultNode | TOperatorNode);

export const isOperatorNode = (
  node: TNode
): node is Extract<TNode, { type: E_TOKEN_TYPE.E_OPERATOR }> =>
  node.type === E_TOKEN_TYPE.E_OPERATOR;
