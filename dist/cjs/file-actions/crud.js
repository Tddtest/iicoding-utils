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

// src/node/file-actions/crud.ts
var crud_exports = {};
__export(crud_exports, {
  createFileOrDirectory: () => createFileOrDirectory,
  getFile: () => getFile,
  getFileSync: () => getFileSync,
  updateFile: () => updateFile,
  updateFileSync: () => updateFileSync
});
module.exports = __toCommonJS(crud_exports);
var import_fs_extra = require("fs-extra");
var createFileOrDirectory = (path) => {
  return (0, import_fs_extra.mkdirp)(path);
};
var updateFile = (filePath, content) => {
  return (0, import_fs_extra.writeFile)(filePath, content, "utf-8");
};
var updateFileSync = (filePath, content) => (0, import_fs_extra.writeFileSync)(filePath, content);
var getFile = (filePath) => {
  return (0, import_fs_extra.readFile)(filePath, "utf-8");
};
var getFileSync = (filePath) => {
  return (0, import_fs_extra.readFileSync)(filePath, "utf-8");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFileOrDirectory,
  getFile,
  getFileSync,
  updateFile,
  updateFileSync
});
