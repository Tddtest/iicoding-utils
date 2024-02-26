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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/browser/helper/index.ts
var helper_exports = {};
__export(helper_exports, {
  IdCardGender: () => IdCardGender,
  credentialDesensitization: () => credentialDesensitization,
  phoneDesensitization: () => phoneDesensitization,
  sleep: () => sleep,
  toFormData: () => toFormData
});
module.exports = __toCommonJS(helper_exports);
var import__ = require("..");
__reExport(helper_exports, require("./copy"), module.exports);
__reExport(helper_exports, require("./debounce"), module.exports);
var sleep = (time) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout == null ? void 0 : clearTimeout(timer);
      resolve(true);
    }, time);
  });
};
var phoneDesensitization = (phone) => {
  if (!(0, import__.isNumber)(phone) && !(0, import__.isString)(phone))
    return "";
  phone = "" + phone;
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
};
var credentialDesensitization = (credential) => {
  if (!(0, import__.isNumber)(credential) && !(0, import__.isString)(credential))
    return "";
  const len = credential.length;
  let regExp, replaceExp;
  if (len < 5) {
    regExp = /^(\w{1})/;
    replaceExp = "*";
  } else if (len < 9) {
    regExp = /^(\w{4})/;
    replaceExp = "****";
  } else if (len < 15) {
    regExp = /^(\w{2})\w*(\w{2})$/;
    replaceExp = "$1****$2";
  } else {
    regExp = /^(\w{6})\w*(\w{4})$/;
    replaceExp = "$1****$2";
  }
  return credential.replace(regExp, replaceExp);
};
var IdCardGender = (idCard, placeholder) => {
  if (!(0, import__.isNumber)(idCard) && !(0, import__.isString)(idCard))
    return placeholder;
  const len = idCard.length;
  let genderNum = "";
  if (len === 15)
    genderNum = idCard.slice(-1);
  if (len === 18)
    genderNum = idCard.slice(-2, -1);
  if (genderNum === "")
    return placeholder;
  return parseInt(genderNum) % 2 === 1 ? "0" : "1";
};
var toFormData = (target) => {
  const fd = new FormData();
  if (!FormData)
    return fd;
  Object.keys(target).forEach((key) => {
    let value = target[key];
    if ((0, import__.isObject)(value) && !(0, import__.isBlob)(target)) {
      value = JSON.stringify(value);
    } else {
      value = value.toString();
    }
    fd.append(key, value);
  });
  return fd;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IdCardGender,
  credentialDesensitization,
  phoneDesensitization,
  sleep,
  toFormData,
  ...require("./copy"),
  ...require("./debounce")
});
