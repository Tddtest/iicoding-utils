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

// src/browser/date/index.ts
var date_exports = {};
__export(date_exports, {
  getRemainder: () => getRemainder
});
module.exports = __toCommonJS(date_exports);
var getRemainder = (target) => {
  if (!isNaN(+target)) {
    target = +target;
  }
  const result = {
    errMsg: null,
    targetTime: null,
    isExpiration: null,
    timeToExpiration: null
  };
  const targetDate = new Date(target);
  const nowDate = /* @__PURE__ */ new Date();
  const errMsg = targetDate.toUTCString();
  if (errMsg === "Invalid Date") {
    return result;
  }
  const targetTime = targetDate.getTime();
  const nowTime = nowDate.getTime();
  const difference = targetTime - nowTime;
  const isExpiration = difference < 0;
  const timeToExpiration = isExpiration ? null : (difference / (60 * 60 * 24 * 1e3)).toFixed(1);
  result.isExpiration = isExpiration;
  result.isExpiration = isExpiration;
  result.timeToExpiration = timeToExpiration;
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRemainder
});
