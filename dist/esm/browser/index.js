function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// 获取 cookie
import { isNumber } from "..";
export var getCookie = function getCookie(cookieKey) {
  var cookie = {};
  if (document) {
    var cookieStr = document.cookie;
    if (cookieStr) {
      var cookieMap = cookieStr.split('; ');
      for (var i = 0; i < cookieMap.length; i++) {
        var current = cookieMap[i];
        var _current$split = current.split('='),
          _current$split2 = _slicedToArray(_current$split, 2),
          key = _current$split2[0],
          value = _current$split2[1];
        try {
          key = decodeURIComponent(key);
          value = decodeURIComponent(value);
        } catch (error) {
          console.log('value decodeURIComponent error value=' + value);
        }
        if (value) {
          cookie[key] = value;
        }
      }
    }
  }
  if (cookieKey) {
    return cookie[cookieKey];
  }
  return cookie;
};

// 设置 cookie
export var setCookie = function setCookie(key, value, expires) {
  var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  if (isNumber(expires)) {
    var expiresDate = new Date(); //获取时间
    expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 60 * 1000 * expires); //保存的天数

    cookie += ";path=/;expires=" + expiresDate.toUTCString();
  }
  document.cookie = cookie;
};

// 删除 cookie

export var deleteCookie = function deleteCookie(key) {
  setCookie(key, '', -1);
};

// 获取浏览器 类型
export function getBrowserType() {
  // 取得浏览器的userAgent字符串
  var userAgent = window.navigator.userAgent; // window可以省略

  var isOpera = userAgent.indexOf('Opera') > -1;

  // 判断是否Opera浏览器
  if (isOpera) {
    return 'Opera';
  }

  // 判断是否IE浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE';
  }

  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    return 'Safari';
  }

  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  }

  // 判断是否Chrome浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  return '';
}
export var isSafari = function isSafari() {
  return getBrowserType() === 'Safari';
};
export var isChrome = function isChrome() {
  return getBrowserType() === 'Chrome';
};
export var isFirefox = function isFirefox() {
  return getBrowserType() === 'Firefox';
};
export var isOpera = function isOpera() {
  return getBrowserType() === 'Opera';
};
export var isIE = function isIE() {
  return getBrowserType() === 'IE';
};