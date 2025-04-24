import { KeyboardEvent } from 'react';

export enum ButtonType {
  NUMERIC = 'NUMERIC',
  BASIC_OPERATION = 'BASIC_OPERATION',
  SCIENTIFIC = 'SCIENTIFIC',
  CONTROL = 'CONTROL'
}

export enum OperationType {
  // Basic operations
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
  
  // Scientific operations
  SQUARE_ROOT = '√',
  POWER = '^',
  FACTORIAL = '!',
  STANDARD_DEVIATION = 'σ',
  
  // Control operations
  CLEAR = 'AC',
  DELETE = 'del',
  EQUALS = '=',
  DECIMAL = '.',
  
  // Parentheses
  LEFT_PARENTHESIS = '(',
  RIGHT_PARENTHESIS = ')'
}

export type CalculatorButton = {
  value: string;
  type: ButtonType;
  operation?: OperationType;
  display: string;
};

export type KeyMapping = {
  key: string;
  button: CalculatorButton;
};

export const CALCULATOR_BUTTONS: CalculatorButton[] = [
  // Numeric buttons
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
    value: num.toString(),
    type: ButtonType.NUMERIC,
    display: num.toString()
  })),
  
  // Basic operations
  {
    value: OperationType.ADD,
    type: ButtonType.BASIC_OPERATION,
    operation: OperationType.ADD,
    display: '+'
  },
  {
    value: OperationType.SUBTRACT,
    type: ButtonType.BASIC_OPERATION,
    operation: OperationType.SUBTRACT,
    display: '-'
  },
  {
    value: OperationType.MULTIPLY,
    type: ButtonType.BASIC_OPERATION,
    operation: OperationType.MULTIPLY,
    display: '×'
  },
  {
    value: OperationType.DIVIDE,
    type: ButtonType.BASIC_OPERATION,
    operation: OperationType.DIVIDE,
    display: '÷'
  },
  
  // Scientific operations
  {
    value: OperationType.SQUARE_ROOT,
    type: ButtonType.SCIENTIFIC,
    operation: OperationType.SQUARE_ROOT,
    display: '√'
  },
  {
    value: OperationType.POWER,
    type: ButtonType.SCIENTIFIC,
    operation: OperationType.POWER,
    display: '^'
  },
  {
    value: OperationType.FACTORIAL,
    type: ButtonType.SCIENTIFIC,
    operation: OperationType.FACTORIAL,
    display: '!'
  },
  {
    value: OperationType.STANDARD_DEVIATION,
    type: ButtonType.SCIENTIFIC,
    operation: OperationType.STANDARD_DEVIATION,
    display: 'σ'
  },
  
  // Control operations
  {
    value: OperationType.CLEAR,
    type: ButtonType.CONTROL,
    operation: OperationType.CLEAR,
    display: 'AC'
  },
  {
    value: OperationType.DELETE,
    type: ButtonType.CONTROL,
    operation: OperationType.DELETE,
    display: 'del'
  },
  {
    value: OperationType.DECIMAL,
    type: ButtonType.CONTROL,
    operation: OperationType.DECIMAL,
    display: '.'
  },
  {
    value: OperationType.LEFT_PARENTHESIS,
    type: ButtonType.CONTROL,
    operation: OperationType.LEFT_PARENTHESIS,
    display: '('
  },
  {
    value: OperationType.RIGHT_PARENTHESIS,
    type: ButtonType.CONTROL,
    operation: OperationType.RIGHT_PARENTHESIS,
    display: ')'
  }
];

export const KEY_MAPPINGS: KeyMapping[] = [
  // Numeric keys
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
    key: num.toString(),
    button: CALCULATOR_BUTTONS.find(btn => btn.value === num.toString())!
  })),
  
  // Operation keys
  { key: '+', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.ADD)! },
  { key: '-', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.SUBTRACT)! },
  { key: '*', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.MULTIPLY)! },
  { key: '/', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.DIVIDE)! },
  
  // Control keys
  { key: 'Enter', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.EQUALS)! },
  { key: 'Backspace', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.DELETE)! },
  { key: 'Delete', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.CLEAR)! },
  { key: '.', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.DECIMAL)! },
  { key: '(', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.LEFT_PARENTHESIS)! },
  { key: ')', button: CALCULATOR_BUTTONS.find(btn => btn.operation === OperationType.RIGHT_PARENTHESIS)! }
];