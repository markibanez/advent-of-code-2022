import fs from 'fs';
import { EOL } from 'os';

const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./sample.txt', 'utf8');
// const input = fs.readFileSync('./sample2.txt', 'utf8');

// input is a list of moves the head of the rope makes
// X Y (x is the direction U D L R and Y is the number of grid spaces to move in that direction)
const moves = input.split(EOL).map((line) => line.split(' '));

// we need to keep track of the coordinates the tail has been to at least once
// start at 0,0
// head and tail must always be touching (diagonally adjacent and even overlapping both count as touching)

const coordinatesTailHasVisited = new Set();
coordinatesTailHasVisited.add('0,0');
const head = [0, 0];
const tail = [0, 0];

moves.forEach((move) => {
    const [direction, distance] = move;

    for (let i = 0; i < distance; i++) {
        // move the head
        switch (direction) {
            case 'U':
                head[1]++;
                break;

            case 'D':
                head[1]--;
                break;

            case 'L':
                head[0]--;
                break;

            case 'R':
                head[0]++;
                break;
        }

        // If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough
        if (head[0] === tail[0] + 2 && head[1] === tail[1]) {
            tail[0]++;
        }

        if (head[0] === tail[0] + 2 && head[1] !== tail[1]) {
            tail[0]++;
            tail[1] = head[1];
        }

        if (head[0] === tail[0] - 2 && head[1] === tail[1]) {
            tail[0]--;
        }

        if (head[0] === tail[0] - 2 && head[1] !== tail[1]) {
            tail[0]--;
            tail[1] = head[1];
        }

        if (head[0] === tail[0] && head[1] === tail[1] + 2) {
            tail[1]++;
        }

        if (head[0] !== tail[0] && head[1] === tail[1] + 2) {
            tail[0] = head[0];
            tail[1]++;
        }

        if (head[0] === tail[0] && head[1] === tail[1] - 2) {
            tail[1]--;
        }

        if (head[0] !== tail[0] && head[1] === tail[1] - 2) {
            tail[0] = head[0];
            tail[1]--;
        }

        // console.log(direction, head, tail)
        coordinatesTailHasVisited.add(`${tail[0]},${tail[1]}`);
    };

});

console.log(coordinatesTailHasVisited.size);

// longer fucking rope
const k1 = [0, 0];
const k2 = [0, 0];
const k3 = [0, 0];
const k4 = [0, 0];
const k5 = [0, 0];
const k6 = [0, 0];
const k7 = [0, 0];
const k8 = [0, 0];
const k9 = [0, 0];

const coordinatesK9HasVisited = new Set();
coordinatesK9HasVisited.add('0,0');

moves.forEach((move) => {
    const [direction, distance] = move;

    for (let i = 0; i < distance; i++) {
        // move k1 (head)
        switch (direction) {
            case 'U':
                k1[1]++;
                break;

            case 'D':
                k1[1]--;
                break;

            case 'L':
                k1[0]--;
                break;

            case 'R':
                k1[0]++;
                break;
        }

        // move other knots
        moveKnots(k1, k2);
        moveKnots(k2, k3);
        moveKnots(k3, k4);
        moveKnots(k4, k5);
        moveKnots(k5, k6);
        moveKnots(k6, k7);
        moveKnots(k7, k8);
        moveKnots(k8, k9);

        console.log(direction, distance, k9)
        coordinatesK9HasVisited.add(`${k9[0]},${k9[1]}`);
    }
});

function moveKnots(knot1, knot2) {
    if (knot1[0] === knot2[0] + 2 && knot1[1] === knot2[1]) {
        knot2[0]++;
    }

    if (knot1[0] === knot2[0] + 2 && knot1[1] !== knot2[1]) {
        knot2[0]++;
        knot2[1] = knot1[1];
    }

    if (knot1[0] === knot2[0] - 2 && knot1[1] === knot2[1]) {
        knot2[0]--;
    }

    if (knot1[0] === knot2[0] - 2 && knot1[1] !== knot2[1]) {
        knot2[0]--;
        knot2[1] = knot1[1];
    }

    if (knot1[0] === knot2[0] && knot1[1] === knot2[1] + 2) {
        knot2[1]++;
    }

    if (knot1[0] !== knot2[0] && knot1[1] === knot2[1] + 2) {
        knot2[0] = knot1[0];
        knot2[1]++;
    }

    if (knot1[0] === knot2[0] && knot1[1] === knot2[1] - 2) {
        knot2[1]--;
    }

    if (knot1[0] !== knot2[0] && knot1[1] === knot2[1] - 2) {
        knot2[0] = knot1[0];
        knot2[1]--;
    }
}

console.log(coordinatesK9HasVisited.size);