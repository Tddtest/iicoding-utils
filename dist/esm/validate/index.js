function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { emailPattern, phonePattern, urlPattern } from "../regular-expression";
import { isNumber } from "../type-detection";

// 是否合法 email
export var isLegalEmail = function isLegalEmail(email) {
  return emailPattern.test(email);
};

// 是否非法 email
export var isIllegalEmail = function isIllegalEmail(email) {
  return !emailPattern.test(email);
};

// 是否合法 phone
export var isLegalPhone = function isLegalPhone(phone) {
  return phonePattern.test(phone);
};

// 是否非法 phone
export var isIllegalPhone = function isIllegalPhone(phone) {
  return !phonePattern.test(phone);
};

// 是否时合法 url
export var isLegalUrl = function isLegalUrl(url) {
  return urlPattern.test(url);
};

// 是否非法 url
export var isIllegalUrl = function isIllegalUrl(url) {
  return !urlPattern.test(url);
};

// 是否在某个数字区间
export var isInInterval = function isInInterval(source, interval) {
  if (!Array.isArray(interval)) return false;
  var _interval = _slicedToArray(interval, 2),
    first = _interval[0],
    last = _interval[1];
  if (!isNumber(source) || !isNumber(first) || !isNumber(last)) return false;
  if (isNaN(+source)) return false;
  return +source >= first || +source <= last;
};

// 是否是图片格式
export var isImage = function isImage(src) {
  return /\w.(png|bmp|jpg|jpeg|svg|webp|gif)$/i.test(src);
};