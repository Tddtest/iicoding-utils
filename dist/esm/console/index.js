function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { extendMethodByChain, isObject, isString } from "..";
var Console = /*#__PURE__*/_createClass(function Console() {
  var _this = this;
  _classCallCheck(this, Console);
  _defineProperty(this, "console", typeof window === 'undefined' ? {
    log: function log() {}
  } : window.console);
  _defineProperty(this, "colorValue", void 0);
  _defineProperty(this, "colorType", void 0);
  _defineProperty(this, "textColorValue", '#fff');
  _defineProperty(this, "textColorOnce", false);
  _defineProperty(this, "style", '');
  _defineProperty(this, "baseStyle", 'display:inline-black;margin: 0 10px;padding: 3px 6px;font-weight:bold;font-size: 14px;');
  _defineProperty(this, "baseRadiusStyle", 'border-radius: 4px;');
  _defineProperty(this, "textGradientStyle", 'background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;');
  _defineProperty(this, "color", function (color) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text';
    _this.setColorValue(color);
    _this.colorType = type;
    var timer = setTimeout(function () {
      _this.clearColorValue();
      clearTimeout(timer);
    }, 16);
    return _this;
  });
  _defineProperty(this, "textColor", function (color) {
    var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    _this.textColorValue = color;
    _this.textColorOnce = once;
    return _this;
  });
  _defineProperty(this, "log", function () {
    _this.logForColor.apply(_this, arguments);
    if (_this.textColorOnce) {
      _this.textColorValue = '#fff';
    }
    return _this;
  });
  _defineProperty(this, "red", function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _this.logColor.apply(_this, ['#ff4d4f'].concat(args));
  });
  _defineProperty(this, "blue", function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return _this.logColor.apply(_this, ['#0000FF'].concat(args));
  });
  _defineProperty(this, "green", function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return _this.logColor.apply(_this, ['#008000'].concat(args));
  });
  _defineProperty(this, "yellow", function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return _this.logColor.apply(_this, ['#FFFF00'].concat(args));
  });
  _defineProperty(this, "cyan", function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return _this.logColor.apply(_this, ['#00ffff'].concat(args));
  });
  _defineProperty(this, "gray", function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return _this.logColor.apply(_this, ['#808080'].concat(args));
  });
  _defineProperty(this, "logForColor", function () {
    if (!_this.colorValue) {
      var _this$console;
      return (_this$console = _this.console).log.apply(_this$console, arguments);
    }
    _this.executeLog.apply(_this, arguments);
  });
  _defineProperty(this, "executeLog", function () {
    switch (_this.colorType) {
      case 'textGradient':
        {
          _this.renderTextGradient();
          break;
        }
      case 'bg':
        {
          _this.setBgStyle();
          break;
        }
      case 'bgGradient':
        {
          _this.renderBgGradient();
          break;
        }
      default:
        {
          _this.setTextStyle();
          break;
        }
    }
    _this.renderLog.apply(_this, arguments);
  });
  _defineProperty(this, "setTextStyle", function () {
    if (_this.colorValue) {
      _this.style = "".concat(_this.baseStyle, ";color:").concat(_this.colorValue[0]);
    }
  });
  _defineProperty(this, "setBgStyle", function () {
    if (_this.colorValue) {
      _this.style = "".concat(_this.baseStyle).concat(_this.baseRadiusStyle, ";background:").concat(_this.colorValue[0]);
    }
  });
  _defineProperty(this, "renderTextGradient", function () {
    if (_this.colorValue) {
      var colorValueLength = _this.colorValue.length;
      if (colorValueLength === 1) {
        return _this.setBgStyle();
      }
      var linearGradientBg = _this.generateGradient();
      _this.style = "".concat(_this.baseStyle, ";color: #fff;").concat(linearGradientBg, ";").concat(_this.textGradientStyle);
    }
  });
  _defineProperty(this, "renderBgGradient", function () {
    if (_this.colorValue) {
      var colorValueLength = _this.colorValue.length;
      if (colorValueLength === 1) {
        return _this.setBgStyle();
      }
      var linearGradientBg = _this.generateGradient();
      _this.style = "".concat(_this.baseStyle, ";").concat(_this.baseRadiusStyle, ";").concat(linearGradientBg, ";color: ").concat(_this.textColorValue, ";");
    }
  });
  _defineProperty(this, "wrapperConsole", function () {
    var wrapperKeys = ['warn', 'error', 'clear'];
    wrapperKeys.forEach(function (key) {
      if (_this.console.hasOwnProperty(key)) {
        // @ts-ignore
        _this[key] = function () {
          for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }
          // @ts-ignore
          _this.console[key].apply(null, args);
          return _this;
        };
      }
    });
  });
  _defineProperty(this, "logColor", function (color) {
    _this.color(color);
    for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
      args[_key8 - 1] = arguments[_key8];
    }
    _this.log.apply(_this, args);
    return _this;
  });
  _defineProperty(this, "renderLog", function () {
    var _this$console2;
    var logStr = '';
    var logArr = [logStr];
    var objDefaultStyle = "\n      display: inline-block;\n      width: 1px;\n      margin: 0 4px;\n      ";
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    args.forEach(function (item) {
      if (!isObject(item)) {
        logStr += '%c %s ';
        logArr.push(_this.style, item);
      } else {
        logStr += '%c %O ';
        logArr.push(objDefaultStyle, item);
      }
    });
    logArr[0] = logStr;
    (_this$console2 = _this.console).log.apply(_this$console2, logArr);
  });
  _defineProperty(this, "setColorValue", function (color) {
    if (isString(color)) {
      _this.colorValue = [color];
    }
    if (Array.isArray(color)) {
      _this.colorValue = color;
    }
  });
  _defineProperty(this, "clearColorValue", function () {
    _this.colorValue = undefined;
  });
  _defineProperty(this, "generateGradient", function () {
    var linearGradientBg = '';
    if (_this.colorValue) {
      linearGradientBg = 'background: linear-gradient(to right,';
      var colorValueLength = _this.colorValue.length;
      _this.colorValue.forEach(function (color, idx) {
        if (idx === 0) {
          linearGradientBg += " ".concat(color, " 30%,");
          return;
        }
        if (idx === colorValueLength - 1) {
          linearGradientBg += " ".concat(color, " 100%)");
          return;
        }
        linearGradientBg += " ".concat(color, ",");
      });
    }
    return linearGradientBg;
  });
  this.wrapperConsole();
});
export var icdInstance = new Console();
export var consoleExtend = function consoleExtend() {
  if (!console) return;
  extendMethodByChain(console, {
    log: icdInstance.log,
    red: icdInstance.red,
    blue: icdInstance.blue,
    cyan: icdInstance.cyan,
    gray: icdInstance.gray,
    green: icdInstance.green,
    color: icdInstance.color,
    yellow: icdInstance.yellow,
    textColor: icdInstance.textColor
  });
};