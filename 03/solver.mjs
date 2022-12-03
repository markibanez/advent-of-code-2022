import fs from 'fs';
import { EOL } from 'os';

const input = fs.readFileSync('./input.txt', 'utf8').split(EOL);
const rucksacks = input.map((line) => {
    // divide the line into two equal parts
    const half = line.length / 2;
    const compartment1 = line.slice(0, half);
    const compartment2 = line.slice(half);

    // get the character that is in both compartments (case sensitive)
    const inBoth = compartment1.split('').filter((char) => compartment2.includes(char))[0];

    // get case of inBoth
    const isUpper = inBoth === inBoth.toUpperCase();

    // calculate priority of inBoth
    // a - z: 1 - 26
    // A - Z: 27 - 52
    const priority = isUpper ? inBoth.charCodeAt(0) - 38 : inBoth.charCodeAt(0) - 96;

    return {
        compartment1,
        compartment2,
        inBoth,
        priority
    }
});

const prioritySum = rucksacks.reduce((sum, rucksack) => sum + rucksack.priority, 0);
console.log(prioritySum);

// group the rucksacks by 3
const groups = [];
for (let i = 0; i < input.length; i += 3) {
    const group = input.slice(i, i + 3);

    const rucksack1 = input[i];
    const rucksack2 = input[i + 1];
    const rucksack3 = input[i + 2];

    // get the character that is common in rucksack1, rucksack2 and rucksack3
    const inAll = rucksack1.split('').filter((char) => rucksack2.includes(char) && rucksack3.includes(char))[0];

    // get case of inAll
    const isUpper = inAll === inAll.toUpperCase();

    // calculate priority of inAll
    // a - z: 1 - 26
    // A - Z: 27 - 52
    const priority = isUpper ? inAll.charCodeAt(0) - 38 : inAll.charCodeAt(0) - 96;

    groups.push({
        group,
        inAll,
        priority
    });
}

const prioritySum2 = groups.reduce((sum, group) => sum + group.priority, 0);
console.log(prioritySum2);