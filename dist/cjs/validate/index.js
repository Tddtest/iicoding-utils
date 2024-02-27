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

// src/validate/index.ts
var validate_exports = {};
__export(validate_exports, {
  isIllegalEmail: () => isIllegalEmail,
  isIllegalPhone: () => isIllegalPhone,
  isIllegalUrl: () => isIllegalUrl,
  isImage: () => isImage,
  isInInterval: () => isInInterval,
  isLegalEmail: () => isLegalEmail,
  isLegalPhone: () => isLegalPhone,
  isLegalUrl: () => isLegalUrl
});
module.exports = __toCommonJS(validate_exports);
var import_regular_expression = require("../regular-expression");
var import_type_detection = require("../type-detection");
var isLegalEmail = (email) => import_regular_expression.emailPattern.test(email);
var isIllegalEmail = (email) => !import_regular_expression.emailPattern.test(email);
var isLegalPhone = (phone) => import_regular_expression.phonePattern.test(phone);
var isIllegalPhone = (phone) => !import_regular_expression.phonePattern.test(phone);
var isLegalUrl = (url) => import_regular_expression.urlPattern.test(url);
var isIllegalUrl = (url) => !import_regular_expression.urlPattern.test(url);
var isInInterval = (source, interval) => {
  if (!Array.isArray(interval))
    return false;
  const [first, last] = interval;
  if (!(0, import_type_detection.isNumber)(source) || !(0, import_type_detection.isNumber)(first) || !(0, import_type_detection.isNumber)(last))
    return false;
  if (isNaN(+source))
    return false;
  return +source >= first || +source <= last;
};
var isImage = (src) => {
  return /\w.(png|bmp|jpg|jpeg|svg|webp|gif)$/i.test(src);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isIllegalEmail,
  isIllegalPhone,
  isIllegalUrl,
  isImage,
  isInInterval,
  isLegalEmail,
  isLegalPhone,
  isLegalUrl
});
