import fs from 'fs';
import { EOL } from 'os';

// const input = fs.readFileSync('./sample.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

const pairs = input.split(EOL + EOL).map((pair) => {
    const [a, b] = pair.split(EOL);
    return {
        a: JSON.parse(a),
        b: JSON.parse(b),
    };
});

const compareValues = (left, right) => {
    if (typeof left == 'number' && typeof right == 'number') {
        if (left > right) return false;
        if (left < right) return true;
        return null;
    } else if (Array.isArray(left) && Array.isArray(right)) {
        for (let i = 0; i < Math.min(left.length, right.length); i++) {
            let result = compareValues(left[i], right[i]);
            if (result != null) return result;
        }

        if (left.length < right.length) return true;
        else if (left.length > right.length) return false;
        return null;
    } else {
        return compareValues(typeof left == 'number' ? [left] : left, typeof right == 'number' ? [right] : right);
    }
};

const part1 = pairs.reduce((acc, pair, index) => {
    const { a, b } = pair;
    if (compareValues(a, b)) acc += index + 1;
    return acc;
}, 0);

console.log(part1);

// part 2
const lines = input
    .split(EOL)
    .filter((element) => element != '')
    .map((line) => JSON.parse(line));
lines.push([[2]], [[6]]);
lines.sort((left, right) => {
    // .sort() uses numbers instead of boolean values
    let result = compareValues(left, right);
    if (result != null) return result ? -1 : 1;
    else return 0;
});

let first = -1,
    second = -1;
for (let i = 0; i < lines.length; i++) {
    if (JSON.stringify(lines[i]) == '[[2]]') first = i + 1;
    if (JSON.stringify(lines[i]) == '[[6]]') second = i + 1;
}

console.log(first * second);
