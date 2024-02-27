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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  extendStorageMethod: () => import_localstorage_dispatch_event.default
});
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("./type"), module.exports);
__reExport(src_exports, require("./store/localstorage-dispatch-event"), module.exports);
__reExport(src_exports, require("./store/type"), module.exports);
var import_localstorage_dispatch_event = __toESM(require("./store/localstorage-dispatch-event"));
__reExport(src_exports, require("./reflect-extend"), module.exports);
__reExport(src_exports, require("./string"), module.exports);
__reExport(src_exports, require("./type-detection"), module.exports);
__reExport(src_exports, require("./hof/compose"), module.exports);
__reExport(src_exports, require("./helper"), module.exports);
__reExport(src_exports, require("./regular-expression"), module.exports);
__reExport(src_exports, require("./validate"), module.exports);
__reExport(src_exports, require("./browser"), module.exports);
__reExport(src_exports, require("./console"), module.exports);
__reExport(src_exports, require("./color"), module.exports);
__reExport(src_exports, require("./file"), module.exports);
__reExport(src_exports, require("./calc"), module.exports);
__reExport(src_exports, require("./dom"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extendStorageMethod,
  ...require("./type"),
  ...require("./store/localstorage-dispatch-event"),
  ...require("./store/type"),
  ...require("./reflect-extend"),
  ...require("./string"),
  ...require("./type-detection"),
  ...require("./hof/compose"),
  ...require("./helper"),
  ...require("./regular-expression"),
  ...require("./validate"),
  ...require("./browser"),
  ...require("./console"),
  ...require("./color"),
  ...require("./file"),
  ...require("./calc"),
  ...require("./dom")
});
