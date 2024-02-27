var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/type-detection/index.ts
var type_detection_exports = {};
__export(type_detection_exports, {
  getComplex: () => getComplex,
  getType: () => getType,
  isArrayBuffer: () => isArrayBuffer,
  isBigInteger: () => isBigInteger,
  isBlob: () => isBlob,
  isBoolean: () => isBoolean,
  isDate: () => isDate,
  isFunction: () => isFunction,
  isHTMLElement: () => isHTMLElement,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  isPromise: () => isPromise,
  isString: () => isString,
  isSymbol: () => isSymbol
});
module.exports = __toCommonJS(type_detection_exports);
var getComplex = (source) => {
  const typeObject = {
    ["[object Object]"]: "object",
    ["[object Function]"]: "function",
    ["[object Error]"]: "error",
    ["[object Date]"]: "date",
    ["[object RegExp]"]: "regExp",
    ["[object Array]"]: "array",
    ["[object Blob]"]: "blob",
    ["[object Promise]"]: "promise",
    ["[object ArrayBuffer]"]: "buffer"
  };
  return typeObject[Object.prototype.toString.call(source)];
};
var getType = (source) => {
  if (source == null) {
    return source + "";
  }
  const typeDetectionResult = typeof source;
  if (typeDetectionResult === "object") {
    return getComplex(source);
  }
  return typeDetectionResult;
};
var isNumber = (num) => typeof num === "number";
var isString = (str) => typeof str === "string";
var isSymbol = (sym) => typeof sym === "symbol";
var isBigInteger = (num) => typeof num === "bigint";
var isBoolean = (bool) => typeof bool === "boolean";
var isObject = (obj) => getComplex(obj) === "object";
var isBlob = (blob) => getComplex(blob) === "blob";
var isDate = (date) => getComplex(date) === "date";
var isArrayBuffer = (buffer) => getComplex(buffer) === "buffer";
var isHTMLElement = (element) => element instanceof HTMLElement;
var isPlainObject = (obj) => {
  if (!isObject(obj))
    return false;
  const proto = Object.getPrototypeOf(obj);
  if (!proto)
    return true;
  const Ctor = "constructor" in obj && obj.constructor;
  return Ctor === Object;
};
var isFunction = (func) => getType(func) === "function";
var isPromise = (source) => {
  if (!isObject(source))
    return false;
  return getComplex(source) === "promise" && isFunction(source["then"]) && isFunction(source["catch"]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getComplex,
  getType,
  isArrayBuffer,
  isBigInteger,
  isBlob,
  isBoolean,
  isDate,
  isFunction,
  isHTMLElement,
  isNumber,
  isObject,
  isPlainObject,
  isPromise,
  isString,
  isSymbol
});
