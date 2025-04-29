import { Lexer, Parser, Executor } from './src/calculator';
import { readFileSync } from 'node:fs';

const STDIN_FILENO = 0;

const input = readFileSync(STDIN_FILENO, 'utf-8');

const processedInput: string = input
  .replace(/[\n\s\t\r]/g, ',')
  .replace(/,{2,}/g, ',')
  .replace(/,$/, '');

const calc = (expression: string): string => {
  const lexer = new Lexer(expression);
  const tokens = lexer.tokenize();
  const tree = new Parser(tokens).parse();
  const executor = new Executor();

  return executor.execute(tree);
};

// eslint-disable-next-line
const expression: string = `std(${processedInput})`;

console.log(calc(expression));
