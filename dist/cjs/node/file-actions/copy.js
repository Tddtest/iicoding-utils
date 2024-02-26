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

// src/node/file-actions/copy.ts
var copy_exports = {};
__export(copy_exports, {
  copyFileOrDirectory: () => copyFileOrDirectory
});
module.exports = __toCommonJS(copy_exports);
var import_fs_extra = require("fs-extra");
var copyFileOrDirectory = async (src, dest) => {
  return (0, import_fs_extra.copy)(src, dest, { overwrite: true });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyFileOrDirectory
});
