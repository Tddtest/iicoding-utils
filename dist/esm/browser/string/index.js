/**
 * 首字母大写
 * @param str 待转换的字符串
 */
export var capitalize = function capitalize(str) {
  if (str == null || typeof str !== 'string') {
    return '';
  }
  var str2LowerCase = str.toLowerCase();
  return "".concat(str2LowerCase.substring(0, 1).toUpperCase()).concat(str2LowerCase.substring(1));
};