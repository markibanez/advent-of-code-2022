import fs from 'fs';
import { EOL } from 'os';

// input is a list of numbers representing the height of each tree in a grid
// Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest

const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./sample.txt', 'utf8');

// parse the input into a grid of single digit numbers 0 - 9
const grid = input.split(EOL).map((line) => line.split('').map(Number));
console.log(grid);

const visibleTrees = new Set();

const isTreeVisible = (row, col) => {
    // if tree is at the edge of the grid it is visible
    if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1) {
        return true;
    }

    let isVisibleFromTop = true;
    // check if trees above are as tall or taller
    for (let i = row - 1; i >= 0; i--) {
        if (grid[i][col] >= grid[row][col]) {
            isVisibleFromTop = false;
            break;
        }
    }

    let isVisibleFromBottom = true;
    // check if trees below are as tall or taller
    for (let i = row + 1; i < grid.length; i++) {
        if (grid[i][col] >= grid[row][col]) {
            isVisibleFromBottom = false;
            break;
        }
    }

    let isVisibleFromLeft = true;
    // check if trees to the left are as tall or taller
    for (let i = col - 1; i >= 0; i--) {
        if (grid[row][i] >= grid[row][col]) {
            isVisibleFromLeft = false;
            break;
        }
    }

    let isVisibleFromRight = true;
    // check if trees to the right are as tall or taller
    for (let i = col + 1; i < grid[0].length; i++) {
        if (grid[row][i] >= grid[row][col]) {
            isVisibleFromRight = false;
            break;
        }
    }

    return isVisibleFromTop || isVisibleFromBottom || isVisibleFromLeft || isVisibleFromRight;
};

// count the number of trees visible from outside the grid
grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
        if (isTreeVisible(rowIndex, colIndex)) {
            visibleTrees.add(`${rowIndex},${colIndex}`);
        }
    });
});

console.log(visibleTrees.size);

// calculate scenic score for each tree
// stop at the edge or the first tree that is taller or equal to the current tree
// Scenic score is the product of the viewing distance in each of the four directions
const trees = [];
grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
        let aboveDistance = 0;
        // check if trees above are as tall or taller
        for (let i = rowIndex - 1; i >= 0; i--) {
            aboveDistance++;
            if (grid[i][colIndex] >= grid[rowIndex][colIndex]) {
                break;
            }
        }

        let belowDistance = 0;
        // check if trees below are as tall or taller
        for (let i = rowIndex + 1; i < grid.length; i++) {
            belowDistance++;
            if (grid[i][colIndex] >= grid[rowIndex][colIndex]) {
                break;
            }
        }

        let leftDistance = 0;
        // check if trees to the left are as tall or taller
        for (let i = colIndex - 1; i >= 0; i--) {
            leftDistance++;
            if (grid[rowIndex][i] >= grid[rowIndex][colIndex]) {
                break;
            }
        }

        let rightDistance = 0;
        // check if trees to the right are as tall or taller
        for (let i = colIndex + 1; i < grid[0].length; i++) {
            rightDistance++;
            if (grid[rowIndex][i] >= grid[rowIndex][colIndex]) {
                break;
            }
        }

        const score = aboveDistance * belowDistance * leftDistance * rightDistance;

        trees.push({
            row: rowIndex,
            col: colIndex,
            height: grid[rowIndex][colIndex],
            aboveDistance,
            belowDistance,
            leftDistance,
            rightDistance,
            score,
        });
    });
});

// sort trees by score
trees.sort((a, b) => b.score - a.score);

console.log(trees[0]);
