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

// src/regular-expression/index.ts
var regular_expression_exports = {};
__export(regular_expression_exports, {
  emailPattern: () => emailPattern,
  isSingleNumOrLetter: () => isSingleNumOrLetter,
  phonePattern: () => phonePattern,
  spacePatten: () => spacePatten,
  urlPattern: () => urlPattern,
  urlPatternExtend: () => urlPatternExtend
});
module.exports = __toCommonJS(regular_expression_exports);
var spacePatten = /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$%^&*()_+-=?:{},.\\/;<>[\]·！￥……（——）：；"'“”‘’、，|《。》？【】]*$/;
var isSingleNumOrLetter = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])");
var phonePattern = /^1[3456789]\d{9}$/;
var emailPattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
var urlPattern = /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;
var urlPatternExtend = (options) => {
  const {
    httpPrefix = "https|http|ftp|rtsp|mms",
    mateLocalhost = true
  } = options;
  return `^((${httpPrefix})://)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|` + mateLocalhost ? "" : "(localhost)|([\\w_!~*'()-]+\\.)*[\\w./-]+\\.[a-zA-Z]{1,6})(:[0-9]{1,5})?((/?)|(/[\\w_!~*'()\\.;?:@&=+$ ,%#-]+)+/?)$";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  emailPattern,
  isSingleNumOrLetter,
  phonePattern,
  spacePatten,
  urlPattern,
  urlPatternExtend
});
