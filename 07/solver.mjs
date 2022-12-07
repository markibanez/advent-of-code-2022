import fs from 'fs';
import { EOL } from 'os';

const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./sample.txt', 'utf8');

const rootDirectory = { name: '/', children: [], localSize: 0, size: 0 };
const ffs = [rootDirectory];

const lines = input.split(EOL);

let cd;
// process console output lines
lines.forEach((line) => {
    // change directory pattern is '$ cd <directory>'
    // directory === '/' means change to root directory
    // directory === '..' means change to parent directory
    // directory === 'directory' means change to child directory

    if (line.startsWith('$ cd ')) {
        const directory = line.slice(5);
        if (directory === '/') {
            cd = rootDirectory;
        } else if (directory === '..') {
            cd = cd.parent;
        } else {
            const child = cd.children.find((child) => child.name === directory);
            if (child) {
                cd = child;
            }
        }
    }

    // if line equals '$ ls' skip it
    if (line === '$ ls') {
        return;
    }

    // if line starts with an integer, it is a file
    // add file to current directory
    if (line.match(/^\d/)) {
        const [size, name] = line.split(' ');
        cd.localSize += Number(size);
        cd.children.push({ name, size: Number(size), parent: cd });
    }

    // if line starts with 'dir' it is a directory
    // add directory to current directory
    if (line.match(/^dir/)) {
        const [_, name] = line.split(' ');
        const newDir = { name, children: [], parent: cd, localSize: 0, size: 0 };
        cd.children.push(newDir);
        ffs.push(newDir);
    }
});

// recursively calculate the size of each directory including descendants
// directory size is the sum of the local size and the size of all descendants
function calculateSize(directory) {
    directory.children.forEach((child) => {
        if (child.children) {
            calculateSize(child);
        }
    });
    directory.size += directory.children.reduce((sum, child) => sum + child.size, 0);
}

// calculate the size of each directory including descendants
calculateSize(rootDirectory);

// recursively print the directory and file structure
function printDirectory(directory, indent = 0) {
    const { name, children, localSize } = directory;
    console.log(' '.repeat(indent) + name + (directory.localSize ? ` (dir size: ${directory.size})` : ''));
    children.forEach((child) => {
        if (child.children) {
            printDirectory(child, indent + 2);
        } else {
            console.log(' '.repeat(indent + 2) + child.name + (child.size ? ` (file size: ${child.size})` : ''));
        }
    });
}

// print the directory and file structure
printDirectory(rootDirectory);

// get all directories with size not exceeding 100000
const smallDirectories = ffs.filter((directory) => directory.size <= 100000 && Boolean(directory.children));
console.log(smallDirectories.map((directory) => directory.name));

// sum the size of all directories in smallDirectories
const smallDirectoriesSize = smallDirectories.reduce((sum, directory) => sum + directory.size, 0);
console.log(smallDirectoriesSize);

// total disk space is 70000000
// get available disk space by subtracting the size of root directory from total disk space
const availableDiskSpace = 70000000 - rootDirectory.size;
console.log(`availableDiskSpace: ${availableDiskSpace}`);
// required disk space is 30000000
// get minimum disk space to be freed by subtracting available disk space from required disk space
const minimumDiskSpaceToBeFreed = 30000000 - availableDiskSpace;
console.log(`minimumDiskSpaceToBeFreed: ${minimumDiskSpaceToBeFreed}`);


// get all directories with size exceeding minimumDiskSpaceToBeFreed
const largeDirectories = ffs.filter((directory) => directory.size > minimumDiskSpaceToBeFreed && Boolean(directory.children));

// sort directories by size
largeDirectories.sort((a, b) => b.size - a.size);

console.log(largeDirectories.map((directory) => `${directory.name} (size: ${directory.size})`))