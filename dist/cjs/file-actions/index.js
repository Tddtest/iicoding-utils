var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node/file-actions/index.ts
var file_actions_exports = {};
module.exports = __toCommonJS(file_actions_exports);
__reExport(file_actions_exports, require("./judge"), module.exports);
__reExport(file_actions_exports, require("./move"), module.exports);
__reExport(file_actions_exports, require("./crud"), module.exports);
__reExport(file_actions_exports, require("./copy"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./judge"),
  ...require("./move"),
  ...require("./crud"),
  ...require("./copy")
});
