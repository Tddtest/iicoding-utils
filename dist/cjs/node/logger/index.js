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

// src/node/logger/index.ts
var logger_exports = {};
__export(logger_exports, {
  default: () => logger_default,
  logger: () => logger
});
module.exports = __toCommonJS(logger_exports);
var import_ora = __toESM(require("ora"));
var import_chalk = __toESM(require("chalk"));
var import__ = require("../..");
var Logger = class {
  constructor() {
    this.start = (options) => {
      const { chalkColor = "blue", text = "starting......", ...opt } = options;
      this.options = {
        text: import_chalk.default.bold[chalkColor](text),
        chalkColor,
        ...opt
      };
      this.ora = (0, import_ora.default)(this.options).start();
    };
    this.fail = (options) => {
      let text = options;
      if ((0, import__.isObject)(options)) {
        this.options = {
          ...this.options,
          chalkColor: "red",
          ...options
        };
        text = this.options.text;
      }
      const { chalkColor } = this.options;
      if (!this.ora) {
        this.start({ ...this.options, text: " " });
      }
      this.ora.color = chalkColor;
      this.ora.fail(import_chalk.default.bold[chalkColor](text));
      this.ora.stop();
    };
    this.stop = () => {
      var _a;
      (_a = this.ora) == null ? void 0 : _a.stop();
    };
  }
  succeed(options) {
    let text = options;
    if ((0, import__.isObject)(options)) {
      this.options = {
        ...this.options,
        ...options
      };
      text = this.options.text;
    }
    const { chalkColor } = this.options;
    if (!this.ora) {
      this.start({ ...this.options, text: " " });
    }
    this.ora.color = chalkColor;
    this.ora.succeed(import_chalk.default.bold[chalkColor](text));
    this.ora.stop();
  }
};
var logger = new Logger();
var logger_default = Logger;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logger
});
