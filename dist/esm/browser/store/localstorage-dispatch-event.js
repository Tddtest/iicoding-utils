function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { extendMethodByChain } from '..';
import root from "../global";
var LocalstorageDispatchEvent = /*#__PURE__*/function () {
  function LocalstorageDispatchEvent() {
    _classCallCheck(this, LocalstorageDispatchEvent);
    _defineProperty(this, "getItem", void 0);
    _defineProperty(this, "setItem", void 0);
    _defineProperty(this, "removeItem", void 0);
    _defineProperty(this, "clear", void 0);
    if (!root || !root.localStorage || !root.sessionStorage) {
      // throw new Error('当前环境不支持本地存储方案');
      // console.error('当前环境不支持本地存储方案');
    }
  }

  // trigger: 是否触发更新
  _createClass(LocalstorageDispatchEvent, [{
    key: "set",
    value: function set(key, value, trigger) {
      if (this.setItem) {
        try {
          var newValue = _typeof(value) === 'object' ? JSON.stringify(value) : value;
          this.setItem(key, newValue);
          LocalstorageDispatchEvent.dispatchEvent('set', trigger, {
            itemKey: key,
            itemValue: newValue
          });
        } catch (error) {
          //
        }
      }
    }
    // 设置多个
  }, {
    key: "setMore",
    value: function setMore(storageObject, trigger) {
      var _this = this;
      Object.keys(storageObject).forEach(function (key) {
        _this.set(key, storageObject[key], trigger);
      });
    }
  }, {
    key: "get",
    value: function get(key) {
      var _this$getItem;
      return ((_this$getItem = this.getItem) === null || _this$getItem === void 0 ? void 0 : _this$getItem.call(this, key)) || null;
    }
  }, {
    key: "get2Json",
    value: function get2Json(key) {
      if (this.getItem) {
        var data = this.getItem(key);
        if (data) {
          try {
            return JSON.parse(data);
          } catch (error) {
            //
          }
        }
      }
      return null;
    }
  }, {
    key: "remove",
    value: function remove(key, trigger) {
      if (this.removeItem) {
        try {
          this.removeItem(key);
          LocalstorageDispatchEvent.dispatchEvent('remove', trigger);
        } catch (error) {
          //
        }
      }
    }

    // 删除多个
  }, {
    key: "removeMore",
    value: function removeMore(removeKeys, trigger) {
      var _this2 = this;
      if (Array.isArray(removeKeys)) {
        removeKeys.forEach(function (key) {
          _this2.remove(key);
        });
        LocalstorageDispatchEvent.dispatchEvent('remove', trigger);
      }
    }
  }, {
    key: "clearAll",
    value: function clearAll(trigger) {
      if (this.clear) {
        try {
          this.clear();
          LocalstorageDispatchEvent.dispatchEvent('clear', trigger);
        } catch (error) {
          // do...
        }
      }
    }
  }], [{
    key: "dispatchEvent",
    value: function dispatchEvent(key, trigger, subject) {
      if (trigger && window) {
        var triggerEvent = new Event('storeChange');
        triggerEvent.triggerAction = key;
        if (subject) {
          var itemKey = subject.itemKey,
            itemValue = subject.itemValue;
          triggerEvent.newKey = itemKey;
          triggerEvent.newValue = itemValue;
        }
        window.dispatchEvent(triggerEvent);
      }
    }
  }]);
  return LocalstorageDispatchEvent;
}();
var storage = new LocalstorageDispatchEvent();
export var extendStorageMethod = function extendStorageMethod() {
  var storageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  if (window) {
    switch (storageType) {
      case 'sessionStorage':
        {
          extendMethodByChain(window.sessionStorage, storage);
          break;
        }
      case 'localStorage':
        {
          extendMethodByChain(window.localStorage, storage);
          break;
        }
      default:
        {
          extendMethodByChain(window.sessionStorage, storage);
          extendMethodByChain(window.localStorage, storage);
        }
    }
  }
};
export default extendStorageMethod;