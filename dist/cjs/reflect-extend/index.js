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

// src/reflect-extend/index.ts
var reflect_extend_exports = {};
__export(reflect_extend_exports, {
  extendMethodByChain: () => extendMethodByChain
});
module.exports = __toCommonJS(reflect_extend_exports);
Reflect.appendChain = function(oChain, oProto) {
  if (arguments.length < 2) {
    throw new TypeError(`${this.name} Not enough arguments`);
  }
  if (typeof oProto === "number" || typeof oProto === "boolean") {
    throw new TypeError("second argument to Object.appendChain must be an object or a string");
  }
  let oNewProto = oProto;
  let oReturn;
  let o2nd;
  let oLast;
  oReturn = o2nd = oLast = oChain instanceof Object ? oChain : new oChain.constructor(oChain);
  for (let o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
    o2nd = o1st;
  }
  if (oProto.constructor === String) {
    oNewProto = Function.prototype;
    oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
    this.setPrototypeOf(oReturn, oLast);
  }
  this.setPrototypeOf(o2nd, oNewProto);
  return oReturn;
};
var extendMethodByChain = (oChain, oProto) => {
  Reflect.appendChain(oChain, oProto);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extendMethodByChain
});
