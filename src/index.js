import fs from 'fs';
import path from 'path';

const readFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(readFilePath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (file1, file2) => {
  
};

export default genDiff;