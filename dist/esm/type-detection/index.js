function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export var getComplex = function getComplex(source) {
  var typeObject = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, '[object Object]', 'object'), '[object Function]', 'function'), '[object Error]', 'error'), '[object Date]', 'date'), '[object RegExp]', 'regExp'), '[object Array]', 'array'), '[object Blob]', 'blob'), '[object Promise]', 'promise'), '[object ArrayBuffer]', 'buffer');
  return typeObject[Object.prototype.toString.call(source)];
};
export var getType = function getType(source) {
  // null 和 undefined
  if (source == null) {
    return source + '';
  }
  var typeDetectionResult = _typeof(source);
  if (typeDetectionResult === 'object') {
    return getComplex(source);
  }
  return typeDetectionResult;
};
export var isNumber = function isNumber(num) {
  return typeof num === 'number';
};
export var isString = function isString(str) {
  return typeof str === 'string';
};
export var isSymbol = function isSymbol(sym) {
  return _typeof(sym) === 'symbol';
};
export var isBigInteger = function isBigInteger(num) {
  return typeof num === 'bigint';
};
export var isBoolean = function isBoolean(bool) {
  return typeof bool === 'boolean';
};
export var isObject = function isObject(obj) {
  return getComplex(obj) === 'object';
};
export var isBlob = function isBlob(blob) {
  return getComplex(blob) === 'blob';
};
export var isDate = function isDate(date) {
  return getComplex(date) === 'date';
};
export var isArrayBuffer = function isArrayBuffer(buffer) {
  return getComplex(buffer) === 'buffer';
};
export var isHTMLElement = function isHTMLElement(element) {
  return element instanceof HTMLElement;
};
export var isPlainObject = function isPlainObject(obj) {
  if (!isObject(obj)) return false;
  var proto = Object.getPrototypeOf(obj);
  if (!proto) return true;
  var Ctor = 'constructor' in obj && obj.constructor;
  return Ctor === Object;
};
export var isFunction = function isFunction(func) {
  return getType(func) === 'function';
};
export var isPromise = function isPromise(source) {
  if (!isObject(source)) return false;
  return getComplex(source) === 'promise' && isFunction(source['then']) && isFunction(source['catch']);
};