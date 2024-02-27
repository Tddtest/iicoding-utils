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

// src/color/index.ts
var color_exports = {};
__export(color_exports, {
  changeRgba: () => changeRgba,
  color2rgb: () => color2rgb,
  getRandomColor: () => getRandomColor,
  hexadecimal2color: () => hexadecimal2color,
  rgb2hsl: () => rgb2hsl
});
module.exports = __toCommonJS(color_exports);
var import__ = require("..");
var getRandomColor = (color) => {
  if ((color == null ? void 0 : color.length) >= 6) {
    if (color.startsWith("#"))
      return color;
    return `#${color}`;
  }
  let hex2 = Math.floor(Math.random() * 16777216).toString(16);
  while (hex2.length < 6) {
    hex2 = "0" + hex2;
  }
  return "#" + hex2;
};
function color2rgb(hex, opacity, onlyValue) {
  const rgb = [];
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    let sixHex = "#";
    hex.replace(/[0-9A-F]/gi, (kw2) => {
      sixHex += kw2 + kw2;
      return kw2;
    });
    hex = sixHex;
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/gi, (kw) => {
      rgb.push(eval(`0x${kw}`));
      return kw;
    });
  } else {
    rgb.push(0, 0, 0);
  }
  if (opacity) {
    rgb.push(opacity);
  }
  return onlyValue ? rgb : `${opacity ? "rgba" : "rgb"}(${rgb.join(",")})`;
}
var hexadecimal2color = (hexStr) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
  if (reg.test(hexStr.toString())) {
    return hexStr;
  } else {
    let temp = [];
    let strHex = "#";
    const commonCondition = (str) => {
      let x = str.toString().trim();
      if (x.startsWith(".")) {
        x = x.slice(1);
      }
      return ((0, import__.isString)(x) || (0, import__.isNumber)(x)) && !isNaN(+x);
    };
    const dataProcessing = (source) => {
      return source.filter((x) => commonCondition(x)).map((item) => {
        let x = item.trim();
        if (x.startsWith("0") || x.startsWith(".")) {
          return `0.${x.split(".").at(-1)}`;
        }
        if (+x > 255) {
          return "255";
        }
        return parseInt(x, 10) + "";
      });
    };
    if ((0, import__.isString)(hexStr)) {
      temp = dataProcessing(hexStr.replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, "").split(","));
    }
    if (Array.isArray(hexStr)) {
      if (hexStr.length === 1 && (0, import__.isString)(hexStr[0])) {
        return hexadecimal2color(hexStr[0]);
      }
      temp = dataProcessing(hexStr);
    }
    if (temp.length > 2) {
      temp = temp.slice(0, 3);
      for (let i = 0; i < temp.length; i++) {
        if (i !== 3) {
          if (temp[i] === "0") {
            strHex += "00";
          } else {
            let newItem = Number(temp[i]).toString(16);
            if (newItem.length < 2) {
              newItem = "0" + newItem;
            }
            strHex += newItem;
          }
        } else {
          strHex += temp[i] === "0" ? "" : Number(temp[i]) * 100;
        }
      }
      strHex = strHex.toUpperCase();
    }
    return strHex;
  }
};
var rgb2hsl = (rgb2) => {
  let [r, g, b] = rgb2;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : l > 0.5 ? d / (2 - 2 * l) : d / (2 * l);
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  const H = Math.ceil(h * 360);
  const S = Math.ceil(s * 100);
  const L = Math.ceil(l * 100);
  return {
    str: ` ${H} ${S}% ${L}%`,
    hsl: {
      h: H,
      s: S,
      l: L
    }
  };
};
var changeRgba = (rgbaColor, newOpacity) => {
  const matches = rgbaColor.match(/(\d+)/g);
  if (matches) {
    const colorArray = matches.map(Number);
    if (colorArray) {
      colorArray[3] = newOpacity;
      return "rgba(" + colorArray.join(", ") + ")";
    }
  }
  return rgbaColor;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  changeRgba,
  color2rgb,
  getRandomColor,
  hexadecimal2color,
  rgb2hsl
});
