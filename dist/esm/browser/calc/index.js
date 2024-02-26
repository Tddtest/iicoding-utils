// 基于 decimal.js 封装。
// 若后续有时间，可以学习一下 decimal.js 库的实现
import Decimal from "decimal.js";
import { isNumber } from "..";

// 相加
export var add = function add() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var effectiveArgs = args.map(function (arg) {
    return +arg;
  }).filter(function (arg) {
    return isNumber(arg) && !isNaN(arg);
  });
  return effectiveArgs.reduce(function (previousValue, currentValue) {
    return Decimal.add(previousValue, currentValue).toNumber();
  }, 0);
};

// 相减