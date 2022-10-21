import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileExt = ['.json', '.yaml',  '.yml'];
const stylishResult = readFile('StylishTestResult');
const plainResult = readFile('PlainTestResult');
const jsonResult = readFile('jsonTestResult');

test.each(fileExt)('testing different file options', (extension) => {
  const fileBefore = getFixturePath(`fileBefore${extension}`);
  const fileAfter = getFixturePath(`fileAfter${extension}`);
  const actual1 = genDiff(fileBefore, fileAfter, 'stylish');
  expect(actual1).toEqual(stylishResult);
  const actual2 = genDiff(fileBefore, fileAfter, 'plain');
  expect(actual2).toEqual(plainResult);
  const actual3 = genDiff(fileBefore, fileAfter, 'json');
  expect(actual3).toEqual(jsonResult);
  const actual4 = genDiff(fileBefore, fileAfter);
  expect(actual4).toEqual(stylishResult);
});
