import { readFileSync } from 'node:fs';
import { Executor, Lexer, Parser } from '../calculator';

const STDIN_FILES = {
  10: 'std_input_10.txt',
  1000: 'std_input_1000.txt',
  1000000: 'std_input_1000000.txt',
};

const BASE_PATH = 'src/profiling/input/';

const calc = (expression: string): string => {
  const lexer = new Lexer(expression);
  const tokens = lexer.tokenize();
  const tree = new Parser(tokens).parse();
  const executor = new Executor();

  return executor.execute(tree);
};

// Choose input size for profiling
const FILE = STDIN_FILES['1000000'];

const input = readFileSync(`${BASE_PATH}/${FILE}`, 'utf-8');
const processedInput = input
  .replace(/[\n\s\t\r]/g, ',')
  .replace(/,{2,}/g, ',')
  .replace(/,$/, '');

const expression = `std(${processedInput})`;

setTimeout(() => {
  console.log(`--- ${FILE} ---`);
  console.log(calc(expression));
}, 5000);
