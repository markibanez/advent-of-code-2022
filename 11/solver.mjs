import fs from 'fs';
import { EOL } from 'os';
import { evaluate } from 'mathjs';

// const input = fs.readFileSync('./sample.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

// split the input into monkeys by the empty line
let monkeys = input.split(EOL + EOL).map((m) => {
    const props = m.split(EOL);
    return {
        number: Number(props[0].replace(':', '').split(' ')[1]),
        startingItems: props[1]
            .replace('Starting items: ', '')
            .split(', ')
            .map((i) => Number(i.trim())),
        operation: props[2].replace('Operation: ', '').trim(),
        test: props[3].replace('Test: ', '').trim(),
        ifTrue: props[4].replace('If true: ', '').trim(),
        ifFalse: props[5].replace('If false: ', '').trim(),
        inspections: 0,
    };
});

// run algorithm for 20 rounds
// each round, each monkey inspects an item
for (let round = 0; round < 20; round++) {
    // for each monkey
    for (let monkey of monkeys) {
        while (monkey.startingItems.length > 0) {
            const item = monkey.startingItems.shift();
            monkey.inspections++;
            let itemWorryLevel = evaluate(monkey.operation.replace('new = old', item).replace('old', item));

            // divide itemWorryLevel by 3 and round down to the nearest integer
            itemWorryLevel = Math.floor(itemWorryLevel / 3);

            // test item worry level
            const testResult = itemWorryLevel % Number(monkey.test.split(' ')[2]) === 0;

            let throwToMonkeyNumber = null;
            if (testResult) {
                throwToMonkeyNumber = Number(monkey.ifTrue.split(' ')[3]);
            } else {
                throwToMonkeyNumber = Number(monkey.ifFalse.split(' ')[3]);
            }

            monkeys[throwToMonkeyNumber].startingItems.push(itemWorryLevel);
            console.log(
                'Monkey',
                monkey.number,
                'threw',
                item,
                'to monkey',
                throwToMonkeyNumber,
                'with worry level',
                itemWorryLevel
            );
        }
    }
}

// sort monkeys by inspections descending
monkeys.sort((a, b) => b.inspections - a.inspections);

// get the product of inspections of top two monkeys
const answer = monkeys[0].inspections * monkeys[1].inspections;

console.log(`Part 1 answer: ${answer}`);

// part 2

// split the input into monkeys by the empty line
monkeys = input.split(EOL + EOL).map((m) => {
    const props = m.split(EOL);
    return {
        number: Number(props[0].replace(':', '').split(' ')[1]),
        startingItems: props[1]
            .replace('Starting items: ', '')
            .split(', ')
            .map((i) => Number(i.trim())),
        operation: props[2].replace('Operation: ', '').trim(),
        test: props[3].replace('Test: ', '').trim(),
        ifTrue: props[4].replace('If true: ', '').trim(),
        ifFalse: props[5].replace('If false: ', '').trim(),
        inspections: 0,
    };
});

const superModulo = monkeys.reduce((acc, m) => {
    const testNumber = Number(m.test.split(' ')[2]);
    acc = acc * testNumber;
    return acc;
}, 1);

// run algorithm for 10000 rounds
// each round, each monkey inspects an item
for (let round = 0; round < 10000; round++) {
    // for each monkey
    for (let monkey of monkeys) {
        while (monkey.startingItems.length > 0) {
            const item = monkey.startingItems.shift();
            monkey.inspections++;

            // prevent itemWorryLevel from exceeding max integer value
            let itemWorryLevel = evaluate(monkey.operation.replace('new = old', item).replace('old', item));
            itemWorryLevel = itemWorryLevel % superModulo;

            // test item worry level
            const testResult = itemWorryLevel % monkey.test.split(' ')[2] === 0;

            let throwToMonkeyNumber = null;
            if (testResult) {
                throwToMonkeyNumber = Number(monkey.ifTrue.split(' ')[3]);
            } else {
                throwToMonkeyNumber = Number(monkey.ifFalse.split(' ')[3]);
            }

            monkeys[throwToMonkeyNumber].startingItems.push(itemWorryLevel);
            // console.log('Monkey', monkey.number, 'threw', item, 'to monkey', throwToMonkeyNumber, 'with worry level', itemWorryLevel)
        }
    }
}

// sort monkeys by inspections descending
monkeys.sort((a, b) => b.inspections - a.inspections);

// get the product of inspections of top two monkeys
const answer2 = monkeys[0].inspections * monkeys[1].inspections;

console.log(`Part 2 answer: ${answer2}`);
