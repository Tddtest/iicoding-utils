import fs from 'fs';

/**
 * 判断目标文件是否存在
 * @param path 目标文件路径
 */
export var isExist = function isExist(path) {
  return fs.existsSync(path);
};

/**
 * 判断目标类型
 * @param path 目标文件路径
 */
export var getTargetType = function getTargetType(path) {
  var stat = fs.statSync(path);
  if (stat.isDirectory()) {
    return 'dir';
  }
  if (stat.isFile()) {
    return 'file';
  }
  return 'unknown';
};

/**
 * 判断目标类型
 * @param path 目标文件路径
 */
export var determineTargetType = function determineTargetType(path) {
  if (isExist(path)) {
    return getTargetType(path);
  }
  return null;
};