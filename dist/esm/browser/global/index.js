function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* global globalThis, self */
import freeGlobal from "./freeGlobal";

/** Detect free variable `globalThis` */
var freeGlobalThis = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis !== null && globalThis.Object === Object && globalThis;

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();
export default root;