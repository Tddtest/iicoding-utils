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

// src/browser/store/localstorage-dispatch-event.ts
var localstorage_dispatch_event_exports = {};
__export(localstorage_dispatch_event_exports, {
  default: () => localstorage_dispatch_event_default,
  extendStorageMethod: () => extendStorageMethod
});
module.exports = __toCommonJS(localstorage_dispatch_event_exports);
var import__ = require("..");
var import_global = __toESM(require("../global"));
var LocalstorageDispatchEvent = class {
  constructor() {
    if (!import_global.default || !import_global.default.localStorage || !import_global.default.sessionStorage) {
    }
  }
  // trigger: 是否触发更新
  set(key, value, trigger) {
    if (this.setItem) {
      try {
        const newValue = typeof value === "object" ? JSON.stringify(value) : value;
        this.setItem(key, newValue);
        LocalstorageDispatchEvent.dispatchEvent("set", trigger, { itemKey: key, itemValue: newValue });
      } catch (error) {
      }
    }
  }
  // 设置多个
  setMore(storageObject, trigger) {
    Object.keys(storageObject).forEach((key) => {
      this.set(key, storageObject[key], trigger);
    });
  }
  get(key) {
    var _a;
    return ((_a = this.getItem) == null ? void 0 : _a.call(this, key)) || null;
  }
  get2Json(key) {
    if (this.getItem) {
      const data = this.getItem(key);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
        }
      }
    }
    return null;
  }
  remove(key, trigger) {
    if (this.removeItem) {
      try {
        this.removeItem(key);
        LocalstorageDispatchEvent.dispatchEvent("remove", trigger);
      } catch (error) {
      }
    }
  }
  // 删除多个
  removeMore(removeKeys, trigger) {
    if (Array.isArray(removeKeys)) {
      removeKeys.forEach((key) => {
        this.remove(key);
      });
      LocalstorageDispatchEvent.dispatchEvent("remove", trigger);
    }
  }
  clearAll(trigger) {
    if (this.clear) {
      try {
        this.clear();
        LocalstorageDispatchEvent.dispatchEvent("clear", trigger);
      } catch (error) {
      }
    }
  }
  static dispatchEvent(key, trigger, subject) {
    if (trigger && window) {
      const triggerEvent = new Event("storeChange");
      triggerEvent.triggerAction = key;
      if (subject) {
        const { itemKey, itemValue } = subject;
        triggerEvent.newKey = itemKey;
        triggerEvent.newValue = itemValue;
      }
      window.dispatchEvent(triggerEvent);
    }
  }
};
var storage = new LocalstorageDispatchEvent();
var extendStorageMethod = (storageType = "all") => {
  if (window) {
    switch (storageType) {
      case "sessionStorage": {
        (0, import__.extendMethodByChain)(window.sessionStorage, storage);
        break;
      }
      case "localStorage": {
        (0, import__.extendMethodByChain)(window.localStorage, storage);
        break;
      }
      default: {
        (0, import__.extendMethodByChain)(window.sessionStorage, storage);
        (0, import__.extendMethodByChain)(window.localStorage, storage);
      }
    }
  }
};
var localstorage_dispatch_event_default = extendStorageMethod;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extendStorageMethod
});
