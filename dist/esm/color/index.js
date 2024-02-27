function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isNumber, isString } from "..";

// 随机生成一个颜色值
export var getRandomColor = function getRandomColor(color) {
  if ((color === null || color === void 0 ? void 0 : color.length) >= 6) {
    if (color.startsWith('#')) return color;
    return "#".concat(color);
  }
  var hex = Math.floor(Math.random() * 16777216).toString(16);
  // 少于 6 位 凑够6位
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  return '#' + hex; //返回‘#'开头16进制颜色
};
// 十六进制转 rgb / rgba
export function color2rgb(hex, opacity, onlyValue) {
  var rgb = []; // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    // 判断传入是否为#三位十六进制数
    var sixHex = '#';
    hex.replace(/[0-9A-F]/gi, function (kw) {
      sixHex += kw + kw; // 把三位16进制数转化为六位
      return kw;
    });
    hex = sixHex; // 保存回hex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    // 判断传入是否为#六位十六进制数
    hex.replace(/[0-9A-F]{2}/gi, function (kw) {
      // eslint-disable-next-line no-eval
      rgb.push(eval("0x".concat(kw))); // 十六进制转化为十进制并存如数组
      return kw;
    });
  } else {
    rgb.push(0, 0, 0);
  }
  if (opacity) {
    rgb.push(opacity);
  }
  return onlyValue ? rgb : "".concat(opacity ? 'rgba' : 'rgb', "(").concat(rgb.join(','), ")"); // 输出 RGB 或者 RGBA 格式颜色
}

// rgb / rgba 转 十六进制
export var hexadecimal2color = function hexadecimal2color(hexStr) {
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
  if (reg.test(hexStr.toString())) {
    return hexStr;
  } else {
    var temp = [];
    var strHex = "#";
    var commonCondition = function commonCondition(str) {
      var x = str.toString().trim();
      if (x.startsWith('.')) {
        x = x.slice(1);
      }
      return (isString(x) || isNumber(x)) && !isNaN(+x);
    };
    var dataProcessing = function dataProcessing(source) {
      return source.filter(function (x) {
        return commonCondition(x);
      }).map(function (item) {
        var x = item.trim();
        if (x.startsWith('0') || x.startsWith('.')) {
          return "0.".concat(x.split('.').at(-1));
        }
        if (+x > 255) {
          return '255';
        }
        return parseInt(x, 10) + '';
      });
    };
    if (isString(hexStr)) {
      // 分成数组后，过滤 不是 string / number 的项， 且去除前后空格
      temp = dataProcessing(hexStr.replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, "").split(','));
    }
    if (Array.isArray(hexStr)) {
      if (hexStr.length === 1 && isString(hexStr[0])) {
        return hexadecimal2color(hexStr[0]);
      }
      temp = dataProcessing(hexStr);
    }
    if (temp.length > 2) {
      temp = temp.slice(0, 3);
      for (var i = 0; i < temp.length; i++) {
        if (i !== 3) {
          if (temp[i] === "0") {
            strHex += "00";
          } else {
            var newItem = Number(temp[i]).toString(16);
            if (newItem.length < 2) {
              newItem = "0" + newItem;
            }
            strHex += newItem;
          }
        } else {
          strHex += temp[i] === "0" ? "" : Number(temp[i]) * 100;
        }
      }
      strHex = strHex.toUpperCase();
    }
    return strHex;
  }
};

// rgb 转 hsl
/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @return  Array           HSL各值数组
 * @param rgb number[]
 */
export var rgb2hsl = function rgb2hsl(rgb) {
  var _rgb = _slicedToArray(rgb, 3),
    r = _rgb[0],
    g = _rgb[1],
    b = _rgb[2];
  r /= 255; // [0, 1]
  g /= 255; // [0, 1]
  b /= 255; // [0, 1]

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var d = max - min;
  var l = (max + min) / 2;
  var s = d === 0 ? 0 : l > 0.5 ? d / (2 - 2 * l) : d / (2 * l);
  var h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  var H = Math.ceil(h * 360);
  var S = Math.ceil(s * 100);
  var L = Math.ceil(l * 100);
  return {
    str: " ".concat(H, " ").concat(S, "% ").concat(L, "%"),
    hsl: {
      h: H,
      s: S,
      l: L
    }
  };
};

// 修改 rgba 中的 透明度 或者颜色值
export var changeRgba = function changeRgba(rgbaColor, newOpacity) {
  var matches = rgbaColor.match(/(\d+)/g);
  if (matches) {
    // 将字符串转换为数组形式
    var colorArray = matches.map(Number);
    if (colorArray) {
      // 修改透明度值
      colorArray[3] = newOpacity; // newOpacity 表示新的透明度值，0-1之间

      // 重新构建 RGBA 颜色值字符串
      return 'rgba(' + colorArray.join(', ') + ')';
    }
  }
  return rgbaColor;
};