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

// src/browserasf/string/index.ts
var string_exports = {};
__export(string_exports, {
  capitalize: () => capitalize
});
module.exports = __toCommonJS(string_exports);
var capitalize = (str) => {
  if (str == null || typeof str !== "string") {
    return "";
  }
  const str2LowerCase = str.toLowerCase();
  return `${str2LowerCase.substring(0, 1).toUpperCase()}${str2LowerCase.substring(1)}`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  capitalize
});
