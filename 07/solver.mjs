import fs from 'fs';
import { EOL } from 'os';

const input = fs.readFileSync('./input.txt', 'utf8');
// const input = fs.readFileSync('./sample.txt', 'utf8');

const mfs = [];
const ffs = [];

const lines = input.split(EOL);

let cd = null;
for (let i = 0; i < lines.length; ) {
    const line = lines[i];

    // if line starts with $, it's a command
    if (line.startsWith('$')) {
        const command = line.replace('$ ', '').trim();
        if (command === 'cd /') {
            let rootDirectory = mfs.find((f) => f.name === '/' && f.type === 'directory');
            if (!rootDirectory) {
                rootDirectory = {
                    name: '/',
                    type: 'directory',
                    children: [],
                    childrenNames: [],
                };
                mfs.push(rootDirectory);
                ffs.push(rootDirectory);
            }
            cd = rootDirectory;
            i++;
            continue;
        }

        if (command === 'cd ..') {
            if (cd.name === '/') {
                i++;
                continue;
            }

            // get parent directory
            const parentDirectory = ffs.find((f) => f.name === cd.parent && f.type === 'directory');
            cd = parentDirectory;

            i++;
            continue;
        }

        if (command.startsWith('cd ')) {
            const directoryName = command.replace('cd ', '').trim();
            const directory = cd.children.find((f) => f.name === directoryName && f.type === 'directory');
            if (directory) {
                cd = directory;
            }
            i++;
            continue;
        }

        if (command === 'ls') {
            // look ahead in the lines and get non-command lines
            const files = [];
            for (let j = i + 1; j < lines.length; j++) {
                const nextLine = lines[j];
                if (nextLine.startsWith('$')) {
                    break;
                }
                files.push(nextLine);
            }

            // add files to the current directory
            for (let j = 0; j < files.length; j++) {
                const file = files[j];
                // if file starts with 'dir' it's a directory
                if (file.startsWith('dir')) {
                    const directoryName = file.replace('dir ', '').trim();
                    const directory = {
                        name: directoryName,
                        type: 'directory',
                        children: [],
                        childrenNames: [],
                        parent: cd.name,
                    };
                    cd.children.push(directory);
                    cd.childrenNames.push(directoryName);
                    ffs.push(directory);
                } else {
                    // file size space file name
                    const [size, fileName] = file.split(' ');
                    const fileRecord = {
                        name: fileName,
                        type: 'file',
                        size: parseInt(size),
                        parent: cd.name,
                    };
                    cd.children.push(fileRecord);
                    cd.childrenNames.push(fileName);
                    ffs.push(fileRecord);
                }
            }

            // increment i to skip the files
            i += files.length + 1;
        }
    }
}

// traverse through mfs recursively and calculate the total size of each directory
function calculateDirectorySize(directory) {
    let totalSize = 0;
    for (let i = 0; i < directory.children.length; i++) {
        const child = directory.children[i];
        if (child.type === 'file') {
            totalSize += child.size;
        } else {
            totalSize += calculateDirectorySize(child);
        }
    }

    if (!directory.size) {
        directory.size = totalSize;
    }
    return totalSize;
}

// calculate the total size of each directory
ffs.forEach((f) => {
    if (f.type === 'directory') {
        calculateDirectorySize(f);
    }
});

// find directories with size <= 100000
const directories = ffs.filter((f) => f.type === 'directory' && f.size <= 100000);
// directories.forEach((d) => console.log(d.name, d.size, d.children.map((f) => f.type === 'directory' ? f.name : '').join(', ')));


// sum the sizes of the directories
const totalSize = directories.reduce((acc, curr) => acc + curr.size, 0);
console.log(totalSize);


// find and log directory mpq
const mpq = ffs.find((f) => f.name === 'mpq' && f.type === 'directory');
console.log(mpq);