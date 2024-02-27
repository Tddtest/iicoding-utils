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

// src/browser/index.ts
var browser_exports = {};
__export(browser_exports, {
  deleteCookie: () => deleteCookie,
  getBrowserType: () => getBrowserType,
  getCookie: () => getCookie,
  isChrome: () => isChrome,
  isFirefox: () => isFirefox,
  isIE: () => isIE,
  isOpera: () => isOpera,
  isSafari: () => isSafari,
  setCookie: () => setCookie
});
module.exports = __toCommonJS(browser_exports);
var import__ = require("..");
var getCookie = (cookieKey) => {
  const cookie = {};
  if (document) {
    const cookieStr = document.cookie;
    if (cookieStr) {
      const cookieMap = cookieStr.split("; ");
      for (let i = 0; i < cookieMap.length; i++) {
        const current = cookieMap[i];
        let [key, value] = current.split("=");
        try {
          key = decodeURIComponent(key);
          value = decodeURIComponent(value);
        } catch (error) {
          console.log("value decodeURIComponent error value=" + value);
        }
        if (value) {
          cookie[key] = value;
        }
      }
    }
  }
  if (cookieKey) {
    return cookie[cookieKey];
  }
  return cookie;
};
var setCookie = (key, value, expires) => {
  let cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
  if ((0, import__.isNumber)(expires)) {
    let expiresDate = /* @__PURE__ */ new Date();
    expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 60 * 1e3 * expires);
    cookie += ";path=/;expires=" + expiresDate.toUTCString();
  }
  document.cookie = cookie;
};
var deleteCookie = (key) => {
  setCookie(key, "", -1);
};
function getBrowserType() {
  const { userAgent } = window.navigator;
  const isOpera2 = userAgent.indexOf("Opera") > -1;
  if (isOpera2) {
    return "Opera";
  }
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera2) {
    return "IE";
  }
  if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    return "Safari";
  }
  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  }
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  return "";
}
var isSafari = () => getBrowserType() === "Safari";
var isChrome = () => getBrowserType() === "Chrome";
var isFirefox = () => getBrowserType() === "Firefox";
var isOpera = () => getBrowserType() === "Opera";
var isIE = () => getBrowserType() === "IE";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteCookie,
  getBrowserType,
  getCookie,
  isChrome,
  isFirefox,
  isIE,
  isOpera,
  isSafari,
  setCookie
});
