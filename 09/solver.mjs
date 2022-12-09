import fs from 'fs';
import { EOL } from 'os';

const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./sample.txt', 'utf8');
// const input = fs.readFileSync('./sample2.txt', 'utf8');

const moveTail = ([head, ...tail]) => {
    if (!tail.length) return [head];
    const [next, ...rest] = tail;
    const delta = head[0].map((c, i) => c - next[0][i]);
    return delta.some((d) => Math.abs(d) > 1)
        ? [head, ...moveTail([[next[0].map((c, i) => c + Math.sign(delta[i])), ...next], ...rest])]
        : [head, ...tail];
};

export const part1 = (input, knots = 2) =>
    input
        .split('\n')
        .map((line) => line.split(' '))
        .reduce(
            (result, [d, steps]) => [
                ...result,
                ...Array(Number(steps)).fill(
                    {
                        U: [0, -1],
                        D: [0, 1],
                        L: [-1, 0],
                        R: [1, 0],
                    }[d]
                ),
            ],
            []
        )
        .reduce(
            ([head, ...tail], dir) => moveTail([[dir.map((c, i) => head[0][i] + c), ...head], ...tail]),
            Array.from({ length: knots }, () => [[0, 0]])
        )
        .at(-1)
        .map((trail) => trail.join(','))
        .filter((v, i, a) => a.indexOf(v) === i).length;

export const part2 = (input) => part1(input, 10);

console.log(part1(input));
console.log(part2(input));