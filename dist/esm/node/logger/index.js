var _excluded = ["chalkColor", "text"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import ora from 'ora';
import chalk from 'chalk';
import { isObject } from "../..";
var Logger = /*#__PURE__*/function () {
  function Logger() {
    var _this = this;
    _classCallCheck(this, Logger);
    _defineProperty(this, "ora", void 0);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "start", function (options) {
      var _options$chalkColor = options.chalkColor,
        chalkColor = _options$chalkColor === void 0 ? 'blue' : _options$chalkColor,
        _options$text = options.text,
        text = _options$text === void 0 ? 'starting......' : _options$text,
        opt = _objectWithoutProperties(options, _excluded);
      _this.options = _objectSpread({
        text: chalk.bold[chalkColor](text),
        chalkColor: chalkColor
      }, opt);
      _this.ora = ora(_this.options).start();
    });
    _defineProperty(this, "fail", function (options) {
      var text = options;
      if (isObject(options)) {
        _this.options = _objectSpread(_objectSpread({}, _this.options), {}, {
          chalkColor: 'red'
        }, options);
        text = _this.options.text;
      }
      var chalkColor = _this.options.chalkColor;
      if (!_this.ora) {
        _this.start(_objectSpread(_objectSpread({}, _this.options), {}, {
          text: ' '
        }));
      }
      _this.ora.color = chalkColor;
      _this.ora.fail(chalk.bold[chalkColor](text));
      _this.ora.stop();
    });
    _defineProperty(this, "stop", function () {
      var _this$ora;
      (_this$ora = _this.ora) === null || _this$ora === void 0 || _this$ora.stop();
    });
  }
  _createClass(Logger, [{
    key: "succeed",
    value: function succeed(options) {
      var text = options;
      if (isObject(options)) {
        this.options = _objectSpread(_objectSpread({}, this.options), options);
        text = this.options.text;
      }
      var chalkColor = this.options.chalkColor;
      if (!this.ora) {
        this.start(_objectSpread(_objectSpread({}, this.options), {}, {
          text: ' '
        }));
      }
      this.ora.color = chalkColor;
      this.ora.succeed(chalk.bold[chalkColor](text));
      this.ora.stop();
    }
  }]);
  return Logger;
}();
export var logger = new Logger();
export default Logger;