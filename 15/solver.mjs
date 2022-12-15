import fs from 'fs';
import { EOL } from 'os';

// const input = fs.readFileSync('./sample.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

const sensors = input.split(EOL).map((line) => {
    const parts = line.split(': ');
    const sensorCoordinates = parts[0]
        .replace('Sensor at x=', '')
        .replace('y=', '')
        .split(', ')
        .map((coordinate) => parseInt(coordinate, 10));

    const closestBeaconCoordinates = parts[1]
        .replace('closest beacon is at x=', '')
        .replace('y=', '')
        .split(', ')
        .map((coordinate) => parseInt(coordinate, 10));

    return {
        location: {
            x: sensorCoordinates[0],
            y: sensorCoordinates[1],
        },
        closestBeacon: {
            x: closestBeaconCoordinates[0],
            y: closestBeaconCoordinates[1],
        },
    };
});

let endpoints = [];
const targetY = 2000000;
// const targetY = 10;

for (const { location, closestBeacon } of sensors) {
    const { x: sx, y: sy } = location;
    const { x: bx, y: by } = closestBeacon;
    console.log(sx, sy, bx, by);
    const dist = Math.abs(sx - bx) + Math.abs(sy - by);
    const leftover = dist - Math.abs(targetY - sy);

    if (leftover >= 0) {
        endpoints.push([sx - leftover, true]);
        endpoints.push([sx + leftover + 1, false]);
    }
}

endpoints.sort((a, b) => a[0] - b[0]);

let ans = -1;
let count = 0;
let last = -1000000;

for (const [x, isStart] of endpoints) {
    if (count > 0) {
        // console.log(last, x, x - last);
        ans += x - last;
    }

    if (isStart) {
        count++;
    } else {
        count--;
    }

    last = x;
}

console.log('part 1', ans);

function check(x, y) {
    for (const { location, closestBeacon } of sensors) {
        const { x: sx, y: sy } = location;
        const { x: bx, y: by } = closestBeacon;
        const dist1 = Math.abs(sx - bx) + Math.abs(sy - by);
        const dist2 = Math.abs(sx - x) + Math.abs(sy - y);

        if (dist2 < dist1) {
            return false;
        }
    }

    return true;
}

let ans2 = -1;
for (const { location, closestBeacon } of sensors) {
    const { x: sx, y: sy } = location;
    const { x: bx, y: by } = closestBeacon;

    const dist = Math.abs(sx - bx) + Math.abs(sy - by);
    for (const xx of [-1, 1]) {
        for (const yy of [-1, 1]) {
            for (let dx = 0; dx <= dist + 1; dx++) {
                const dy = dist + 1 - dx;
                let x = sx + dx * xx;
                let y = sy + dy * yy;
                if (x < 0 || y < 0 || x > 4000000 || y > 4000000) {
                    continue;
                }
                if (check(x, y)) {
                    ans2 = x * 4000000 + y;
                }
            }
        }
    }
}

console.log('part 2', ans2);
