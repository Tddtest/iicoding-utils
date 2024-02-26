import { moveSync } from 'fs-extra';
import { determineTargetType } from "./judge";

/**
 * 移动文件
 * @param src  原位置
 * @param dest 目标位置
 */
export var moveFile = function moveFile(src, dest) {
  moveSync(src, dest);
};

/**
 * 移动文件夹
 * @param src  原位置
 * @param dest 目标位置
 */
export var moveDirectory = function moveDirectory(src, dest) {
  moveSync(src, dest);
};

/**
 * 移动文件系统中的目标
 * @param src  原位置
 * @param dest 目标位置
 */
export var moveFileOrDirectory = function moveFileOrDirectory(src, dest) {
  var targetType = determineTargetType(src);
  // 如果是文件
  if (targetType === 'file') {
    moveFile(src, dest);
  }
  // 如果是文件夹
  if (targetType === 'dir') {
    moveDirectory(src, dest);
  }
};