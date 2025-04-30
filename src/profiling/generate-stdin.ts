import { writeFileSync } from 'node:fs';

const COUNTS = [10, 1000, 1000000];

const BASE_PATH = 'src/profiling/input/';

for (const count of COUNTS) {
  const numbers = Array.from({ length: count }, () =>
    Math.floor(Math.random() * 10)
  );
  const content = numbers.join(', ');

  writeFileSync(`${BASE_PATH}/std_input_${count}.txt`, content);
}
