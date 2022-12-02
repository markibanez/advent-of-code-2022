import fs from 'fs';
import { EOL } from 'os';

// get the score given elf's move and my move
// Elf's move: A = Rock, B = Paper, C = Scissors
// My move: X = Rock, Y = Paper, Z = Scissors
// If I win I get 6 points, 0 points if I lose, 3 point if it's a draw
// +1 if X, +2 if Y, +3 if Z
const getScore = (elfMove, myMove) => {
    let score = 0;
    switch (myMove) {
        case 'X':
            score += 1;
            break;
        case 'Y':
            score += 2;
            break;
        case 'Z':
            score += 3;
            break;
    }

    switch (elfMove) {
        case 'A':
            if (myMove === 'X') {
                score += 3;
            } else if (myMove === 'Y') {
                score += 6;
            }
            break;
        case 'B':
            if (myMove === 'Y') {
                score += 3;
            } else if (myMove === 'Z') {
                score += 6;
            }
            break;
        case 'C':
            if (myMove === 'Z') {
                score += 3;
            } else if (myMove === 'X') {
                score += 6;
            }
            break;
    }

    return score;
};

// get the score given elf's move and wanted result
// Elf's move: A = Rock, B = Paper, C = Scissors
// Wanted result: X = I lose, Y = Draw, Z = I win
// If I win I get 6 points, 0 points if I lose, 3 point if it's a draw
// +1 if X, +2 if Y, +3 if Z
const getScore2 = (elfMove, wantedResult) => {
    let score = 0;
    switch (wantedResult) {
        case 'X':
            break;
        case 'Y':
            score += 3;
            break;
        case 'Z':
            score += 6;
            break;
    }

    // get move given wanted result
    let myMove = '';
    switch (wantedResult) {
        case 'X':
            if (elfMove === 'A') {
                myMove = 'C';
            } else if (elfMove === 'B') {
                myMove = 'A';
            } else if (elfMove === 'C') {
                myMove = 'B';
            }
            break;
        case 'Y':
            myMove = elfMove;
            break;
        case 'Z':
            if (elfMove === 'A') {
                myMove = 'B';
            } else if (elfMove === 'B') {
                myMove = 'C';
            } else if (elfMove === 'C') {
                myMove = 'A';
            }
            break;
    }

    switch (myMove) {
        case 'A':
            score += 1;
            break;
        case 'B':
            score += 2;
            break;
        case 'C':
            score += 3;
            break;
    }

    return score;
};

// read input.txt file
const raw = fs.readFileSync('./input.txt', 'utf8');
const strategy = raw.split(EOL).map((line) => {
    const parsed = line.trim().split(' ');
    return {
        elfMove: parsed[0],
        myMove: parsed[1],
    };
});

const totalScore = strategy.reduce((acc, val) => acc + getScore(val.elfMove, val.myMove), 0);
console.log(totalScore);

const totalScore2 = strategy.reduce((acc, val) => acc + getScore2(val.elfMove, val.myMove), 0);
console.log(totalScore2);