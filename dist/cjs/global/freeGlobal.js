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

// src/global/freeGlobal.ts
var freeGlobal_exports = {};
__export(freeGlobal_exports, {
  default: () => freeGlobal_default,
  freeGlobal: () => freeGlobal
});
module.exports = __toCommonJS(freeGlobal_exports);
var freeGlobal = typeof global !== void 0 && typeof global !== null && typeof global === "object" && global.Object === Object && global;
var freeGlobal_default = freeGlobal;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  freeGlobal
});
