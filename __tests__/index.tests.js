import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const options = [
  ['file1.json', 'file2.json', 'StylishTestResult', 'stylish'],
  ['file1.yaml', 'file2.yml', 'StylishTestResult', 'stylish'],
  ['file1.json', 'file2.json', 'PlainTestResult', 'plain'],
  ['file1.yaml', 'file2.yml', 'PlainTestResult', 'plain'],
  ['file1.json', 'file2.json', 'jsonTestResult', 'json'],
  ['file1.yaml', 'file2.yml', 'jsonTestResult', 'json'],
];

test.each(options)('testing different file options', (file1, file2, resultFile, format) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(actual).toBe(readFile(resultFile));
});

test('testing default option', () => {
  const expected = readFile('StylishTestResult');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});
