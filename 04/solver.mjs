import fs from 'fs';
import { EOL } from 'os';

const input = fs.readFileSync('./input.txt', 'utf8').split(EOL);

const sections = input.map((line) => {
    const parts = line.split(',');
    return {
        a: {
            from: parseInt(parts[0].split('-')[0]),
            to: parseInt(parts[0].split('-')[1]),
        },
        b: {
            from: parseInt(parts[1].split('-')[0]),
            to: parseInt(parts[1].split('-')[1]),
        }
    }
});

// check if range a fits in range b or vice versa
const fitsAnd = (a, b) => {
    return (a.from >= b.from && a.from <= b.to) && (a.to >= b.from && a.to <= b.to);
}

const fitsOr = (a, b) => {
    return (a.from >= b.from && a.from <= b.to) || (a.to >= b.from && a.to <= b.to);
}

let overlaps = 0;
for (let i = 0; i < sections.length; i++) {
    if (fitsAnd(sections[i].a, sections[i].b) || fitsAnd(sections[i].b, sections[i].a)) {
        overlaps++;
    }
}

console.log('part1', overlaps);

overlaps = 0;
for (let i = 0; i < sections.length; i++) {
    if (fitsOr(sections[i].a, sections[i].b) || fitsOr(sections[i].b, sections[i].a)) {
        overlaps++;
    }
}

console.log('part2', overlaps);