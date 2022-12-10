import fs from 'fs';
import { EOL } from 'os';

// const input = fs.readFileSync('./sample.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

const instructions = input.split(EOL);

// cpu sends 2 signals
// addx V - takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
// noop - takes one cycle to complete. It does nothing.

let cycle = 0;
let x = 1;
const cycles = [];
while (instructions.length) {
    const instruction = instructions.shift();

    if (instruction === 'noop') {
        cycle++;
        cycles.push({
            cycle,
            x,
            signalStrength: cycle * x,
        })
    } else {
        const [_, value] = instruction.split(' ');
        cycle++;
        cycles.push({
            cycle,
            x,
            signalStrength: cycle * x,
        })
        cycle++;
        cycles.push({
            cycle,
            x,
            signalStrength: cycle * x,
        })
        x += Number(value);
    }
}

// get cycles 20, 60, 100, 140, 180, and 220 and sum their signal strengths
const cycle20 = cycles.find(c => c.cycle === 20);
const cycle60 = cycles.find(c => c.cycle === 60);
const cycle100 = cycles.find(c => c.cycle === 100);
const cycle140 = cycles.find(c => c.cycle === 140);
const cycle180 = cycles.find(c => c.cycle === 180);
const cycle220 = cycles.find(c => c.cycle === 220);

console.log('Part 1 answer:', cycle20.signalStrength + cycle60.signalStrength + cycle100.signalStrength + cycle140.signalStrength + cycle180.signalStrength + cycle220.signalStrength);

// the X register controls the horizontal position of a sprite.
// the sprite is 3 pixels wide, and the X register sets the horizontal position of the middle of that sprite.
// the pixels on the CRT: 40 wide and 6 high

const grid = Array.from({ length: 6 }, () => Array.from({ length: 40 }, () => '.'));

// iterate over the cycles
cycles.forEach(c => {
    const pixelPosition = c.cycle - 1;
    const row = Math.floor(pixelPosition / 40);
    const column = pixelPosition % 40;
    grid[row][column] = '.';

    const spriteColumns = [c.x - 1, c.x, c.x + 1];
    if (spriteColumns.includes(column)) {
        grid[row][column] = '#';
    }
});

// render grid image
console.log('part 2 rendered image');
console.log(grid.map(row => row.join('')).join(EOL));