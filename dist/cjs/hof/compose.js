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

// src/hof/compose.ts
var compose_exports = {};
__export(compose_exports, {
  composeAsync: () => composeAsync
});
module.exports = __toCommonJS(compose_exports);
var composeAsync = (middleware) => {
  const middlewareLen = middleware.length;
  if (middlewareLen === 0) {
    return (arg) => arg;
  }
  if (middlewareLen === 1) {
    return middleware[0];
  }
  const dispatch = (idx, ...params) => {
    if (idx === middlewareLen)
      return;
    const crtMiddleware = middleware[idx];
    crtMiddleware((...nextPrams) => {
      dispatch(++idx, ...nextPrams);
    }, ...params);
  };
  return (params) => dispatch(0, params);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  composeAsync
});
