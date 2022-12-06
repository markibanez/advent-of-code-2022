import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./sample.txt', 'utf8');
console.log(input.length);

let notStartOfPacketMarkers = 0;
// iterate 4 characters at a time moving by one each time
for (let i = 0; i < input.length - 3; i++) {
    // slice the string into 4 characters
    const slice = input.slice(i, i + 4);

    // check if slice has any same characters
    const hasSameCharacters = slice.split('').some((char, index, arr) => {
        return arr.indexOf(char) !== index;
    });

    if (hasSameCharacters) {
        notStartOfPacketMarkers++;
    } else {
        break;
    }
}

console.log(notStartOfPacketMarkers + 4);

let notStartOfMessageMarkers = 0;
// iterate 14 characters at a time moving by one each time
for (let i = 0; i < input.length - 13; i++) {
    // slice the string into 14 characters
    const slice = input.slice(i, i + 14);

    // check if slice has any same characters
    const hasSameCharacters = slice.split('').some((char, index, arr) => {
        return arr.indexOf(char) !== index;
    });

    if (hasSameCharacters) {
        notStartOfMessageMarkers++;
    } else {
        break;
    }
}

console.log(notStartOfMessageMarkers + 14);