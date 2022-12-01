import fs from 'fs';
import { EOL } from 'os';

// input is an array of objects with 'index', 'values' and 'sum' properties
// return the index of the largest sum of the numbers in the array
const getIndexOfMaxCalories = (elves) => {
    // sort the elves array by the 'sum' property
    const sortedElves = elves.sort((a, b) => b.sum - a.sum);
    const top3sum = sortedElves.slice(0, 3).reduce((acc, val) => acc + val.sum, 0);
    console.log('top3sum', top3sum);

    // get the first element of the sorted array
    return sortedElves[0].index;
};

// get the sum of the numbers of the values array given the arrays and index
const getSum = (arrays, index) => {
    return arrays[index].values.reduce((acc, val) => acc + val, 0);
};

// parse 1.txt into a 2 dimensional array of numbers
const raw = fs.readFileSync('./1.txt', 'utf8');

// split the file into an array of lines
const lines = raw.split(EOL);

const elves = [];
let currentElfNumber = 1;
let currentElfValues = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // if line is empty, move to next elf
    if (line.trim() === '') {
        elves.push(JSON.parse(JSON.stringify({
            index: currentElfNumber,
            values: currentElfValues,
            sum: currentElfValues.reduce((acc, val) => acc + val, 0)
        })));

        currentElfNumber++;
        currentElfValues = [];
        continue;
    }

    // if the line is not empty, add the parsed integer to the current elf's values
    currentElfValues.push(parseInt(line, 10));
}

const maxCalories = getIndexOfMaxCalories(elves);
console.log(maxCalories);