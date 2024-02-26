import { mkdirp, readFile, readFileSync, writeFile, writeFileSync } from 'fs-extra';
export var createFileOrDirectory = function createFileOrDirectory(path) {
  return mkdirp(path);
};
export var updateFile = function updateFile(filePath, content) {
  return writeFile(filePath, content, 'utf-8');
};
export var updateFileSync = function updateFileSync(filePath, content) {
  return writeFileSync(filePath, content);
};
export var getFile = function getFile(filePath) {
  return readFile(filePath, 'utf-8');
};
export var getFileSync = function getFileSync(filePath) {
  return readFileSync(filePath, 'utf-8');
};