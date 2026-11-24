// Driver: reads every case from /input/cases.json, answers each with run()
// from solve.js, and writes /output/answers.json. MAKEFUN_INPUT_DIR and
// MAKEFUN_OUTPUT_DIR override /input and /output for local runs. The output
// directory itself is never removed or recreated (the grader mounts it);
// only the answers file is written inside it.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as {
  id: string;
  input: unknown;
}[];
const answers: unknown[] = new Array(cases.length);
for (let i = 0; i < cases.length; i++) answers[i] = run(cases[i].input);
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answers));
