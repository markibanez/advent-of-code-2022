import fs from 'fs';
import { EOL } from 'os';

const lines = fs.readFileSync('./input.txt', 'utf8').split(EOL);

const stacks = [
    ['G', 'J', 'W', 'R', 'F', 'T', 'Z'].reverse(),
    ['M', 'W', 'G'].reverse(),
    ['G', 'H', 'N', 'J'].reverse(),
    ['W', 'N', 'C', 'R', 'J'].reverse(),
    ['M', 'V', 'Q', 'G', 'B', 'S', 'F', 'W'].reverse(),
    ['C', 'W', 'V', 'D', 'T', 'R', 'S'].reverse(),
    ['V', 'G', 'Z', 'D', 'C', 'N', 'B', 'H'].reverse(),
    ['C', 'G', 'M', 'N', 'J', 'S'].reverse(),
    ['L', 'D', 'J', 'C', 'W', 'N', 'P', 'G'].reverse(),
];

const stacks2 = [
    ['G', 'J', 'W', 'R', 'F', 'T', 'Z'].reverse(),
    ['M', 'W', 'G'].reverse(),
    ['G', 'H', 'N', 'J'].reverse(),
    ['W', 'N', 'C', 'R', 'J'].reverse(),
    ['M', 'V', 'Q', 'G', 'B', 'S', 'F', 'W'].reverse(),
    ['C', 'W', 'V', 'D', 'T', 'R', 'S'].reverse(),
    ['V', 'G', 'Z', 'D', 'C', 'N', 'B', 'H'].reverse(),
    ['C', 'G', 'M', 'N', 'J', 'S'].reverse(),
    ['L', 'D', 'J', 'C', 'W', 'N', 'P', 'G'].reverse(),
];

const moves = [];
for (let i = 10; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(' ');
    const move = {
        qty: parseInt(parts[1]),
        from: parseInt(parts[3]),
        to: parseInt(parts[5]),
    }
    moves.push(move);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// move crates from one stack to another one by one
async function moveCrate(from, to, qty) {
    const fromStack = stacks[from - 1];
    const toStack = stacks[to - 1];

    for (let i = 0; i < qty; i++) {
        if (fromStack.length === 0) {
            break;
        }

        const crate = fromStack.pop();
        if (crate) toStack.push(crate);
        else break;

        // console.clear();
        // console.log(`Moving ${crate} from ${from} to ${to}`)
        // console.log(stacks.map(stack => stack.join('')).join(EOL));
        // await sleep(1000);
    }
}

// move crates from one stack to another all at once
async function moveCrates2(from, to, qty) {
    const fromStack = stacks2[from - 1];
    const toStack = stacks2[to - 1];

    const crates = fromStack.splice(fromStack.length - qty, qty);
    toStack.push(...crates);
}

// iterate through all moves
for (const move of moves) {
    console.log(`Moving ${move.qty} crates from ${move.from} to ${move.to}`)
    await moveCrate(move.from, move.to, move.qty);
    await moveCrates2(move.from, move.to, move.qty);
}

// get the top crate of all stacks
const topCrates = stacks.map(stack => stack[stack.length - 1]);
console.log('one-byone', topCrates.join(''));

const topCrates2 = stacks2.map(stack => stack[stack.length - 1]);
console.log('all-at-once', topCrates2.join(''));