var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node/launcher/index.ts
var launcher_exports = {};
__export(launcher_exports, {
  runAsync: () => runAsync,
  runShellExec: () => runShellExec,
  runSync: () => runSync
});
module.exports = __toCommonJS(launcher_exports);
var import_child_process = __toESM(require("child_process"));
var import_util = __toESM(require("util"));
var runAsync = async (command) => {
  const exec = import_util.default.promisify(import_child_process.default.exec);
  return exec(command, { cwd: process.cwd(), encoding: "utf8" });
};
var runSync = (command) => {
  return import_child_process.default.execSync(command, { cwd: process.cwd(), encoding: "utf8" });
};
var runShellExec = (command, cb) => {
  return import_child_process.default.exec(command, cb);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runAsync,
  runShellExec,
  runSync
});
