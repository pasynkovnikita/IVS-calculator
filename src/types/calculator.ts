export enum E_BUTTON_TYPE {
  NUMERIC = 'NUMERIC',
  BASIC_OPERATION = 'BASIC_OPERATION',
  SCIENTIFIC = 'SCIENTIFIC',
  CONTROL = 'CONTROL',
}

export enum E_OPERATION {
  ADD = '+',
  SUBTRACT = '-',
  DIVIDE = '÷',
  MULTIPLY = '×',

  SQUARE_ROOT = '√',
  POWER = '^',
  FACTORIAL = '!',
  STANDARD_DEVIATION = 'σ',

  CLEAR = 'AC',
  DELETE = 'del',
  EQUALS = '=',
  DECIMAL = '.',
  SPACE = ' ',
  ENTER = 'Enter',

  LEFT_PARENTHESIS = '(',
  RIGHT_PARENTHESIS = ')',
}

export type TCalculatorButton = {
  value: string;
  type: E_BUTTON_TYPE;
  operation?: E_OPERATION;
  display: string;
};

export type TKeyMapping = {
  key: string;
  button: TCalculatorButton;
};

export const CALCULATOR_BUTTONS: Array<TCalculatorButton> = [
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => ({
    value: num.toString(),
    type: E_BUTTON_TYPE.NUMERIC,
    display: num.toString(),
  })),

  {
    value: E_OPERATION.ADD,
    type: E_BUTTON_TYPE.BASIC_OPERATION,
    operation: E_OPERATION.ADD,
    display: '+',
  },
  {
    value: E_OPERATION.SUBTRACT,
    type: E_BUTTON_TYPE.BASIC_OPERATION,
    operation: E_OPERATION.SUBTRACT,
    display: '-',
  },
  {
    value: E_OPERATION.MULTIPLY,
    type: E_BUTTON_TYPE.BASIC_OPERATION,
    operation: E_OPERATION.MULTIPLY,
    display: '×',
  },
  {
    value: E_OPERATION.DIVIDE,
    type: E_BUTTON_TYPE.BASIC_OPERATION,
    operation: E_OPERATION.DIVIDE,
    display: '÷',
  },

  {
    value: E_OPERATION.SQUARE_ROOT,
    type: E_BUTTON_TYPE.SCIENTIFIC,
    operation: E_OPERATION.SQUARE_ROOT,
    display: '√',
  },
  {
    value: E_OPERATION.POWER,
    type: E_BUTTON_TYPE.SCIENTIFIC,
    operation: E_OPERATION.POWER,
    display: '^',
  },
  {
    value: E_OPERATION.FACTORIAL,
    type: E_BUTTON_TYPE.SCIENTIFIC,
    operation: E_OPERATION.FACTORIAL,
    display: '!',
  },
  {
    value: E_OPERATION.STANDARD_DEVIATION,
    type: E_BUTTON_TYPE.SCIENTIFIC,
    operation: E_OPERATION.STANDARD_DEVIATION,
    display: 'σ',
  },

  {
    value: E_OPERATION.CLEAR,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.CLEAR,
    display: 'AC',
  },
  {
    value: E_OPERATION.DELETE,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.DELETE,
    display: 'del',
  },
  {
    value: E_OPERATION.DECIMAL,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.DECIMAL,
    display: '.',
  },
  {
    value: E_OPERATION.LEFT_PARENTHESIS,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.LEFT_PARENTHESIS,
    display: '(',
  },
  {
    value: E_OPERATION.RIGHT_PARENTHESIS,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.RIGHT_PARENTHESIS,
    display: ')',
  },
  {
    value: E_OPERATION.EQUALS,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.EQUALS,
    display: '=',
  },
  {
    value: E_OPERATION.SPACE,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.SPACE,
    display: 'Space',
  },
  {
    value: E_OPERATION.EQUALS,
    type: E_BUTTON_TYPE.CONTROL,
    operation: E_OPERATION.EQUALS,
    display: 'Enter',
  },
];

export type TCalculatorLayout = {
  basic: Array<E_OPERATION | string>;
  extended: Array<E_OPERATION>;
  scientific: Array<E_OPERATION>;
};

export const CALCULATOR_LAYOUT: TCalculatorLayout = {
  basic: [
    E_OPERATION.LEFT_PARENTHESIS,
    E_OPERATION.RIGHT_PARENTHESIS,
    E_OPERATION.DELETE,
    '7',
    '8',
    '9',
    '4',
    '5',
    '6',
    '1',
    '2',
    '3',
    E_OPERATION.CLEAR,
    '0',
    E_OPERATION.DECIMAL,
  ],
  extended: [
    E_OPERATION.DIVIDE,
    E_OPERATION.MULTIPLY,
    E_OPERATION.SUBTRACT,
    E_OPERATION.ADD,
  ],
  scientific: [
    E_OPERATION.SQUARE_ROOT,
    E_OPERATION.POWER,
    E_OPERATION.FACTORIAL,
    E_OPERATION.STANDARD_DEVIATION,
  ],
};

export const KEY_MAPPINGS: Array<TKeyMapping> = Object.values(
  CALCULATOR_BUTTONS
).map((button) => {
  return {
    key: button.value,
    button: button,
  };
});
