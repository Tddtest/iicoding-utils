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

// src/browser/console/index.ts
var console_exports = {};
__export(console_exports, {
  consoleExtend: () => consoleExtend
});
module.exports = __toCommonJS(console_exports);
var import__ = require("..");
var Console = class {
  constructor() {
    this.console = typeof window ? { log: (...args) => {
    } } : window.console;
    this.textColorValue = "#fff";
    this.textColorOnce = false;
    this.style = "";
    this.baseStyle = "display:inline-black;margin: 0 10px;padding: 3px 6px;font-weight:bold;font-size: 14px;";
    this.baseRadiusStyle = "border-radius: 4px;";
    this.textGradientStyle = "background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;";
    this.color = (color, type = "text") => {
      this.setColorValue(color);
      this.colorType = type;
      const timer = setTimeout(() => {
        this.clearColorValue();
        clearTimeout(timer);
      }, 16);
      return this;
    };
    this.textColor = (color, once = true) => {
      this.textColorValue = color;
      this.textColorOnce = once;
      return this;
    };
    this.log = (...args) => {
      this.logForColor(...args);
      if (this.textColorOnce) {
        this.textColorValue = "#fff";
      }
      return this;
    };
    this.red = (...args) => this.logColor("#ff4d4f", ...args);
    this.blue = (...args) => this.logColor("#0000FF", ...args);
    this.green = (...args) => this.logColor("#008000", ...args);
    this.yellow = (...args) => this.logColor("#FFFF00", ...args);
    this.cyan = (...args) => this.logColor("#00ffff", ...args);
    this.gray = (...args) => this.logColor("#808080", ...args);
    this.logForColor = (...args) => {
      if (!this.colorValue) {
        return this.console.log(...args);
      }
      this.executeLog(...args);
    };
    this.executeLog = (...args) => {
      switch (this.colorType) {
        case "textGradient": {
          this.renderTextGradient();
          break;
        }
        case "bg": {
          this.setBgStyle();
          break;
        }
        case "bgGradient": {
          this.renderBgGradient();
          break;
        }
        default: {
          this.setTextStyle();
          break;
        }
      }
      this.renderLog(...args);
    };
    this.setTextStyle = () => {
      if (this.colorValue) {
        this.style = `${this.baseStyle};color:${this.colorValue[0]}`;
      }
    };
    this.setBgStyle = () => {
      if (this.colorValue) {
        this.style = `${this.baseStyle}${this.baseRadiusStyle};background:${this.colorValue[0]}`;
      }
    };
    this.renderTextGradient = () => {
      if (this.colorValue) {
        const colorValueLength = this.colorValue.length;
        if (colorValueLength === 1) {
          return this.setBgStyle();
        }
        const linearGradientBg = this.generateGradient();
        this.style = `${this.baseStyle};color: #fff;${linearGradientBg};${this.textGradientStyle}`;
      }
    };
    this.renderBgGradient = () => {
      if (this.colorValue) {
        const colorValueLength = this.colorValue.length;
        if (colorValueLength === 1) {
          return this.setBgStyle();
        }
        const linearGradientBg = this.generateGradient();
        this.style = `${this.baseStyle};${this.baseRadiusStyle};${linearGradientBg};color: ${this.textColorValue};`;
      }
    };
    this.wrapperConsole = () => {
      const wrapperKeys = ["warn", "error", "clear"];
      wrapperKeys.forEach((key) => {
        if (this.console.hasOwnProperty(key)) {
          this[key] = (...args) => {
            this.console[key].apply(null, args);
            return this;
          };
        }
      });
    };
    this.logColor = (color, ...args) => {
      this.color(color);
      this.log(...args);
      return this;
    };
    this.renderLog = (...args) => {
      let logStr = "";
      const logArr = [logStr];
      const objDefaultStyle = `
      display: inline-block;
      width: 1px;
      margin: 0 4px;
      `;
      args.forEach((item) => {
        if (!(0, import__.isObject)(item)) {
          logStr += "%c %s ";
          logArr.push(this.style, item);
        } else {
          logStr += "%c %O ";
          logArr.push(objDefaultStyle, item);
        }
      });
      logArr[0] = logStr;
      this.console.log(...logArr);
    };
    this.setColorValue = (color) => {
      if ((0, import__.isString)(color)) {
        this.colorValue = [color];
      }
      if (Array.isArray(color)) {
        this.colorValue = color;
      }
    };
    this.clearColorValue = () => {
      this.colorValue = void 0;
    };
    this.generateGradient = () => {
      let linearGradientBg = "";
      if (this.colorValue) {
        linearGradientBg = "background: linear-gradient(to right,";
        const colorValueLength = this.colorValue.length;
        this.colorValue.forEach((color, idx) => {
          if (idx === 0) {
            linearGradientBg += ` ${color} 30%,`;
            return;
          }
          if (idx === colorValueLength - 1) {
            linearGradientBg += ` ${color} 100%)`;
            return;
          }
          linearGradientBg += ` ${color},`;
        });
      }
      return linearGradientBg;
    };
    this.wrapperConsole();
  }
};
var consoleInstance = new Console();
var consoleExtend = () => {
  if (!console)
    return;
  (0, import__.extendMethodByChain)(console, {
    log: consoleInstance.log,
    red: consoleInstance.red,
    blue: consoleInstance.blue,
    cyan: consoleInstance.cyan,
    gray: consoleInstance.gray,
    green: consoleInstance.green,
    yellow: consoleInstance.yellow
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  consoleExtend
});
