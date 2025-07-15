const fs = require('fs');
const readline = require('readline');
const path = require('path');

const treeFile = 'input.txt';
const baseDir = 'output'; // Where structure will be created

function createStructureFromTree(filePath) {
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

  let currentPaths = []; // track the hierarchy

  for (let line of lines) {
    const match = line.match(/^(\s*)([├└]── )?(.*)/);
    if (!match) continue;

    const indent = match[1].length;
    const name = match[3].trim();

    if (!name || name.startsWith('#')) continue; // skip empty/comments

    const level = indent / 4; // assumes 4 spaces or 1 tab per indent level
    currentPaths[level] = name;
    const fullPath = path.join(baseDir, ...currentPaths.slice(0, level + 1));

    if (name.includes('.')) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, '');
    } else {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    console.log('Created:', fullPath);
  }
}

createStructureFromTree(treeFile);
