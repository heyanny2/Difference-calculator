import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const options = [
  ['file1.json', 'file2.json', 'StylishTestResult.txt', 'stylish'],
  ['file1.yaml', 'file2.yml', 'StylishTestResult.txt', 'stylish'],
  ['file1.json', 'file2.json', 'PlainTestResult.txt', 'plain'],
  ['file1.yaml', 'file2.yml', 'PlainTestResult.txt', 'plain'],
  ['file1.json', 'file2.json', 'jsonTestResult.txt', 'json'],
  ['file1.yaml', 'file2.yml', 'jsonTestResult.txt', 'json'],
];

test.each(options)('testing different file options', (file1, file2, resultFile, format) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(actual).toBe(readFile(resultFile));
});

test('testing default option', () => {
  const expected = readFile('StylishTestResult.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});
