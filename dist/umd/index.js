(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.icdUtils = {}));
})(this, (function (exports) { 'use strict';

    var LocalstorageDispatchEvent = (function () {
        function LocalstorageDispatchEvent() {
            if (!global || !global.localStorage || !global.sessionStorage) {
                console.error('当前环境不支持本地存储方案');
            }
        }
        LocalstorageDispatchEvent.prototype.set = function (key, value, trigger) {
            if (this.setItem) {
                try {
                    var newValue = typeof value === 'object' ? JSON.stringify(value) : value;
                    this.setItem(key, newValue);
                    LocalstorageDispatchEvent.dispatchEvent('set', trigger, { itemKey: key, itemValue: newValue });
                }
                catch (error) {
                }
            }
        };
        LocalstorageDispatchEvent.prototype.setMore = function (storageObject, trigger) {
            var _this = this;
            Object.keys(storageObject).forEach(function (key) {
                _this.set(key, storageObject[key], trigger);
            });
        };
        LocalstorageDispatchEvent.prototype.get = function (key) {
            var _a;
            return ((_a = this.getItem) === null || _a === void 0 ? void 0 : _a.call(this, key)) || null;
        };
        LocalstorageDispatchEvent.prototype.get2Json = function (key) {
            if (this.getItem) {
                var data = this.getItem(key);
                if (data) {
                    try {
                        return JSON.parse(data);
                    }
                    catch (error) {
                    }
                }
            }
            return null;
        };
        LocalstorageDispatchEvent.prototype.remove = function (key, trigger) {
            if (this.removeItem) {
                try {
                    this.removeItem(key);
                    LocalstorageDispatchEvent.dispatchEvent('remove', trigger);
                }
                catch (error) {
                }
            }
        };
        LocalstorageDispatchEvent.prototype.removeMore = function (removeKeys, trigger) {
            var _this = this;
            if (Array.isArray(removeKeys)) {
                removeKeys.forEach(function (key) {
                    _this.remove(key);
                });
                LocalstorageDispatchEvent.dispatchEvent('remove', trigger);
            }
        };
        LocalstorageDispatchEvent.prototype.clearAll = function (trigger) {
            if (this.clear) {
                try {
                    this.clear();
                    LocalstorageDispatchEvent.dispatchEvent('clear', trigger);
                }
                catch (error) {
                }
            }
        };
        LocalstorageDispatchEvent.dispatchEvent = function (key, trigger, subject) {
            if (trigger && window) {
                var triggerEvent = new Event('storeChange');
                triggerEvent.triggerAction = key;
                if (subject) {
                    var itemKey = subject.itemKey, itemValue = subject.itemValue;
                    triggerEvent.newKey = itemKey;
                    triggerEvent.newValue = itemValue;
                }
                window.dispatchEvent(triggerEvent);
            }
        };
        return LocalstorageDispatchEvent;
    }());
    var storage = new LocalstorageDispatchEvent();
    var extendStorageMethod = function (storageType) {
        if (storageType === void 0) { storageType = 'all'; }
        if (window) {
            switch (storageType) {
                case 'sessionStorage': {
                    extendMethodByChain(window.sessionStorage, storage);
                    break;
                }
                case 'localStorage': {
                    extendMethodByChain(window.localStorage, storage);
                    break;
                }
                default: {
                    extendMethodByChain(window.sessionStorage, storage);
                    extendMethodByChain(window.localStorage, storage);
                }
            }
        }
    };

    Reflect.appendChain = function (oChain, oProto) {
        if (arguments.length < 2) {
            throw new TypeError("".concat(this.name, " Not enough arguments"));
        }
        if (typeof oProto === 'number' || typeof oProto === 'boolean') {
            throw new TypeError('second argument to Object.appendChain must be an object or a string');
        }
        var oNewProto = oProto;
        var oReturn;
        var o2nd;
        var oLast;
        oReturn = o2nd = oLast = oChain instanceof Object ? oChain : new oChain.constructor(oChain);
        for (var o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
            o2nd = o1st;
        }
        if (oProto.constructor === String) {
            oNewProto = Function.prototype;
            oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
            this.setPrototypeOf(oReturn, oLast);
        }
        this.setPrototypeOf(o2nd, oNewProto);
        return oReturn;
    };
    var extendMethodByChain = function (oChain, oProto) {
        Reflect.appendChain(oChain, oProto);
    };

    var capitalize = function (str) {
        if (str == null || typeof str !== 'string') {
            return '';
        }
        var str2LowerCase = str.toLowerCase();
        return "".concat(str2LowerCase.substring(0, 1).toUpperCase()).concat(str2LowerCase.substring(1));
    };

    var getComplex = function (source) {
        var _a;
        var typeObject = (_a = {},
            _a['[object Object]'] = 'object',
            _a['[object Function]'] = 'function',
            _a['[object Error]'] = 'error',
            _a['[object Date]'] = 'date',
            _a['[object RegExp]'] = 'regExp',
            _a['[object Array]'] = 'array',
            _a['[object Blob]'] = 'blob',
            _a['[object Promise]'] = 'promise',
            _a['[object ArrayBuffer]'] = 'buffer',
            _a);
        return typeObject[Object.prototype.toString.call(source)];
    };
    var getType = function (source) {
        if (source == null) {
            return source + '';
        }
        var typeDetectionResult = typeof source;
        if (typeDetectionResult === 'object') {
            return getComplex(source);
        }
        return typeDetectionResult;
    };
    var isNumber = function (num) { return typeof num === 'number'; };
    var isString = function (str) { return typeof str === 'string'; };
    var isSymbol = function (sym) { return typeof sym === 'symbol'; };
    var isBigInteger = function (num) { return typeof num === 'bigint'; };
    var isBoolean = function (bool) { return typeof bool === 'boolean'; };
    var isObject = function (obj) { return getComplex(obj) === 'object'; };
    var isBlob = function (blob) { return getComplex(blob) === 'blob'; };
    var isDate = function (date) { return getComplex(date) === 'date'; };
    var isArrayBuffer = function (buffer) { return getComplex(buffer) === 'buffer'; };
    var isHTMLElement = function (element) { return element instanceof HTMLElement; };
    var isPlainObject = function (obj) {
        if (!isObject(obj))
            return false;
        var proto = Object.getPrototypeOf(obj);
        if (!proto)
            return true;
        var Ctor = 'constructor' in obj && obj.constructor;
        return Ctor === Object;
    };
    var isFunction = function (func) { return getType(func) === 'function'; };
    var isPromise = function (source) {
        if (!isObject(source))
            return false;
        return getComplex(source) === 'promise' && isFunction(source['then']) && isFunction(source['catch']);
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var composeAsync = function (middleware) {
        var middlewareLen = middleware.length;
        if (middlewareLen === 0) {
            return function (arg) { return arg; };
        }
        if (middlewareLen === 1) {
            return middleware[0];
        }
        var dispatch = function (idx) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (idx === middlewareLen)
                return;
            var crtMiddleware = middleware[idx];
            crtMiddleware.apply(void 0, __spreadArray([function () {
                    var nextPrams = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        nextPrams[_i] = arguments[_i];
                    }
                    dispatch.apply(void 0, __spreadArray([++idx], nextPrams, false));
                }], params, false));
        };
        return function (params) { return dispatch(0, params); };
    };

    function toggleSelection() {
        var selection = document.getSelection();
        if (!selection.rangeCount) {
            return function () { };
        }
        var active = document.activeElement;
        var ranges = [];
        for (var i = 0; i < selection.rangeCount; i++) {
            ranges.push(selection.getRangeAt(i));
        }
        switch (active.tagName.toUpperCase()) {
            case 'INPUT':
            case 'TEXTAREA':
                active.blur();
                break;
            default:
                active = null;
                break;
        }
        selection.removeAllRanges();
        return function () {
            selection.type === 'Caret' &&
                selection.removeAllRanges();
            if (!selection.rangeCount) {
                ranges.forEach(function (range) {
                    selection.addRange(range);
                });
            }
            active &&
                active.focus();
        };
    }

    var clipboardToIE11Formatting = {
        "text/plain": "Text",
        "text/html": "Url",
        "default": "Text"
    };
    var defaultMessage = "Copy to clipboard: #{key}, Enter";
    function format(message) {
        var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
        return message.replace(/#{\s*key\s*}/g, copyKey);
    }
    function copy(text, options) {
        var debug, message, reselectPrevious, range, selection, mark, success = false;
        if (!options) {
            options = {};
        }
        debug = options.debug || false;
        try {
            reselectPrevious = toggleSelection();
            range = document.createRange();
            selection = document.getSelection();
            mark = document.createElement("span");
            mark.textContent = text;
            mark.ariaHidden = "true";
            mark.style.all = "unset";
            mark.style.position = "fixed";
            mark.style.top = '0';
            mark.style.clip = "rect(0, 0, 0, 0)";
            mark.style.whiteSpace = "pre";
            mark.style.webkitUserSelect = "text";
            mark.style.MozUserSelect = "text";
            mark.style.msUserSelect = "text";
            mark.style.userSelect = "text";
            mark.addEventListener("copy", function (e) {
                e.stopPropagation();
                if (options.format) {
                    e.preventDefault();
                    if (typeof e.clipboardData === "undefined") {
                        debug && console.warn("unable to use e.clipboardData");
                        debug && console.warn("trying IE specific stuff");
                        window.clipboardData.clearData();
                        var format_1 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
                        window.clipboardData.setData(format_1, text);
                    }
                    else {
                        e.clipboardData.clearData();
                        e.clipboardData.setData(options.format, text);
                    }
                }
                if (options.onCopy) {
                    e.preventDefault();
                    options.onCopy(e.clipboardData);
                }
            });
            document.body.appendChild(mark);
            range.selectNodeContents(mark);
            selection.addRange(range);
            var successful = document.execCommand("copy");
            if (!successful) {
                throw new Error("copy command was unsuccessful");
            }
            success = true;
        }
        catch (err) {
            debug && console.error("unable to copy using execCommand: ", err);
            debug && console.warn("trying IE specific stuff");
            try {
                window.clipboardData.setData(options.format || "text", text);
                options.onCopy && options.onCopy(window.clipboardData);
                success = true;
            }
            catch (err) {
                debug && console.error("unable to copy using clipboardData: ", err);
                debug && console.error("falling back to prompt");
                message = format("message" in options ? options.message : defaultMessage);
                window.prompt(message, text);
            }
        }
        finally {
            if (selection) {
                if (typeof selection.removeRange == "function") {
                    selection.removeRange(range);
                }
                else {
                    selection.removeAllRanges();
                }
            }
            if (mark) {
                document.body.removeChild(mark);
            }
            reselectPrevious();
        }
        return success;
    }

    var freeGlobal = typeof global !== undefined && typeof global !== null && typeof global === 'object' && global.Object === Object && global;

    var freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self;
    var root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

    function debounce(func, wait, options) {
        var lastArgs;
        var lastThis;
        var maxWait;
        var result;
        var timerId;
        var maxing = false;
        var trailing = true;
        var useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';
        if (typeof func !== 'function') {
            throw new TypeError('Expected a function');
        }
        wait = +wait || 0;
        if (isObject(options)) {
            !!options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
            var args = lastArgs;
            var thisArg = lastThis;
            lastArgs = lastThis = undefined;
            result = func.apply(thisArg, args);
            return result;
        }
        function cancelTimer(id) {
            if (useRAF) {
                root.cancelAnimationFrame(id);
                return;
            }
            clearTimeout(id);
        }
        function trailingEdge(time) {
            timerId = undefined;
            if (trailing && lastArgs) {
                return invokeFunc();
            }
            lastArgs = lastThis = undefined;
            return result;
        }
        function cancel() {
            if (timerId !== undefined) {
                cancelTimer(timerId);
            }
            lastArgs = lastThis = timerId = undefined;
        }
        function flush() {
            return timerId === undefined ? result : trailingEdge();
        }
        function pending() {
            return timerId !== undefined;
        }
        function debounced() {
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        debounced.pending = pending;
        return debounced;
    }

    var sleep = function (time) {
        return new Promise(function (resolve) {
            var timer = setTimeout(function () {
                clearTimeout === null || clearTimeout === void 0 ? void 0 : clearTimeout(timer);
                resolve(true);
            }, time);
        });
    };
    var phoneDesensitization = function (phone) {
        if (!isNumber(phone) && !isString(phone))
            return '';
        phone = '' + phone;
        return phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
    };
    var credentialDesensitization = function (credential) {
        if (!isNumber(credential) && !isString(credential))
            return '';
        var len = credential.length;
        var regExp, replaceExp;
        if (len < 5) {
            regExp = /^(\w{1})/;
            replaceExp = "*";
        }
        else if (len < 9) {
            regExp = /^(\w{4})/;
            replaceExp = "****";
        }
        else if (len < 15) {
            regExp = /^(\w{2})\w*(\w{2})$/;
            replaceExp = "$1****$2";
        }
        else {
            regExp = /^(\w{6})\w*(\w{4})$/;
            replaceExp = "$1****$2";
        }
        return credential.replace(regExp, replaceExp);
    };
    var IdCardGender = function (idCard, placeholder) {
        if (!isNumber(idCard) && !isString(idCard))
            return placeholder;
        var len = idCard.length;
        var genderNum = '';
        if (len === 15)
            genderNum = idCard.slice(-1);
        if (len === 18)
            genderNum = idCard.slice(-2, -1);
        if (genderNum === '')
            return placeholder;
        return parseInt(genderNum) % 2 === 1 ? '0' : '1';
    };
    var toFormData = function (target) {
        var fd = new FormData();
        if (!FormData)
            return fd;
        Object.keys(target).forEach(function (key) {
            var value = target[key];
            if (isObject(value) && !isBlob(target)) {
                value = JSON.stringify(value);
            }
            else {
                value = value.toString();
            }
            fd.append(key, value);
        });
        return fd;
    };

    var spacePatten = /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$%^&*()_+-=?:{},.\\/;<>[\]·！￥……（——）：；"'“”‘’、，|《。》？【】]*$/;
    var isSingleNumOrLetter = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])');
    var phonePattern = /^1[3456789]\d{9}$/;
    var emailPattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    var urlPattern = /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;
    var urlPatternExtend = function (options) {
        var _a = options.httpPrefix, httpPrefix = _a === void 0 ? 'https|http|ftp|rtsp|mms' : _a, _b = options.mateLocalhost, mateLocalhost = _b === void 0 ? true : _b;
        return "^((".concat(httpPrefix, ")://)?")
            + '(([0-9]{1,3}\\.){3}[0-9]{1,3}'
            + '|'
            + mateLocalhost ? '' : '(localhost)|'
            + '([\\w_!~*\'()-]+\\.)*'
            + '[\\w./-]+\\.'
            + '[a-zA-Z]{1,6})'
            + '(:[0-9]{1,5})?'
            + '((/?)|'
            + '(/[\\w_!~*\'()\\.;?:@&=+$ ,%#-]+)+/?)$';
    };

    var isLegalEmail = function (email) { return emailPattern.test(email); };
    var isIllegalEmail = function (email) { return !emailPattern.test(email); };
    var isLegalPhone = function (phone) { return phonePattern.test(phone); };
    var isIllegalPhone = function (phone) { return !phonePattern.test(phone); };
    var isLegalUrl = function (url) { return urlPattern.test(url); };
    var isIllegalUrl = function (url) { return !urlPattern.test(url); };
    var isInInterval = function (source, interval) {
        if (!Array.isArray(interval))
            return false;
        var first = interval[0], last = interval[1];
        if (!isNumber(source) || !isNumber(first) || !isNumber(last))
            return false;
        if (isNaN(+source))
            return false;
        return +source >= first || +source <= last;
    };
    var isImage = function (src) {
        return /\w.(png|bmp|jpg|jpeg|svg|webp|gif)$/i.test(src);
    };

    var getCookie = function (cookieKey) {
        var cookie = {};
        if (document) {
            var cookieStr = document.cookie;
            if (cookieStr) {
                var cookieMap = cookieStr.split('; ');
                for (var i = 0; i < cookieMap.length; i++) {
                    var current = cookieMap[i];
                    var _a = current.split('='), key = _a[0], value = _a[1];
                    try {
                        key = decodeURIComponent(key);
                        value = decodeURIComponent(value);
                    }
                    catch (error) {
                        console.log('value decodeURIComponent error value=' + value);
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
    var setCookie = function (key, value, expires) {
        var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        if (isNumber(expires)) {
            var expiresDate = new Date();
            expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 60 * 1000 * expires);
            cookie += ";path=/;expires=" + expiresDate.toUTCString();
        }
        document.cookie = cookie;
    };
    var deleteCookie = function (key) {
        setCookie(key, '', -1);
    };
    function getBrowserType() {
        var userAgent = window.navigator.userAgent;
        var isOpera = userAgent.indexOf('Opera') > -1;
        if (isOpera) {
            return 'Opera';
        }
        if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
            return 'IE';
        }
        if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
            return 'Safari';
        }
        if (userAgent.indexOf('Firefox') > -1) {
            return 'Firefox';
        }
        if (userAgent.indexOf('Chrome') > -1) {
            return 'Chrome';
        }
        return '';
    }
    var isSafari = function () { return getBrowserType() === 'Safari'; };
    var isChrome = function () { return getBrowserType() === 'Chrome'; };
    var isFirefox = function () { return getBrowserType() === 'Firefox'; };
    var isOpera = function () { return getBrowserType() === 'Opera'; };
    var isIE = function () { return getBrowserType() === 'IE'; };

    var log = function (style) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var logStr = '';
        var logArr = [logStr];
        var objStyle = "\n      display: inline-block;\n      width: 1px;\n      margin: 0 4px;\n      ";
        args.forEach(function (item) {
            if (!isObject(item)) {
                logStr += '%c %s ';
                logArr.push(style, item);
            }
            else {
                logStr += '%c %O ';
                logArr.push(objStyle, item);
            }
        });
        logArr[0] = logStr;
        console.log.apply(console, logArr);
    };
    var baseStyle = 'display:inline-black;margin: 0 10px;border-radius: 4px;padding: 3px 6px;font-weight:bold;font-size: 14px;';
    var colorful = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "\n      color: #fff;\n      background: linear-gradient(to right, #ff4361 30%, #fe7deb, #ce6dff 100%);\n      ");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var blue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #4096ff;background:#fff");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var blueBg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #fff;background:#4096ff");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var yellow = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #FAAD14;background:#fff");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var yellowBg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #fff;background:#FAAD14");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var red = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #ff4d4f;background:#fff");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var redBg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #fff;background:#ff4d4f");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var green = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: green;background:#fff");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var greenBg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var style = "".concat(baseStyle, "color: #fff;background:green");
        log.apply(void 0, __spreadArray([style], args, false));
    };
    var consoleExtend = function () {
        if (!console)
            return;
        extendMethodByChain(console, {
            colorful: colorful,
            red: red,
            blue: blue,
            green: green,
            yellow: yellow,
            redBg: redBg,
            blueBg: blueBg,
            greenBg: greenBg,
            yellowBg: yellowBg,
        });
    };

    var getRandomColor = function (color) {
        if ((color === null || color === void 0 ? void 0 : color.length) >= 6) {
            if (color.startsWith('#'))
                return color;
            return "#".concat(color);
        }
        var hex = Math.floor(Math.random() * 16777216).toString(16);
        while (hex.length < 6) {
            hex = '0' + hex;
        }
        return '#' + hex;
    };
    function color2rgb(hex, opacity, onlyValue) {
        var rgb = [];
        if (/^\#[0-9A-F]{3}$/i.test(hex)) {
            var sixHex_1 = '#';
            hex.replace(/[0-9A-F]/gi, function (kw) {
                sixHex_1 += kw + kw;
                return kw;
            });
            hex = sixHex_1;
        }
        if (/^#[0-9A-F]{6}$/i.test(hex)) {
            hex.replace(/[0-9A-F]{2}/gi, function (kw) {
                rgb.push(eval("0x".concat(kw)));
                return kw;
            });
        }
        else {
            rgb.push(0, 0, 0);
        }
        if (opacity) {
            rgb.push(opacity);
        }
        return onlyValue ? rgb : "".concat(opacity ? 'rgba' : 'rgb', "(").concat(rgb.join(','), ")");
    }
    var hexadecimal2color = function (hexStr) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
        if (reg.test(hexStr.toString())) {
            return hexStr;
        }
        else {
            var temp = [];
            var strHex = "#";
            var commonCondition_1 = function (str) {
                var x = str.toString().trim();
                if (x.startsWith('.')) {
                    x = x.slice(1);
                }
                return (isString(x) || isNumber(x)) && !isNaN(+x);
            };
            var dataProcessing = function (source) {
                return source.filter(function (x) { return commonCondition_1(x); }).map(function (item) {
                    var x = item.trim();
                    if (x.startsWith('0') || x.startsWith('.')) {
                        return "0.".concat(x.split('.').at(-1));
                    }
                    if (+x > 255) {
                        return '255';
                    }
                    return parseInt(x, 10) + '';
                });
            };
            if (isString(hexStr)) {
                temp = dataProcessing(hexStr.replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, "").split(','));
            }
            if (Array.isArray(hexStr)) {
                if (hexStr.length === 1 && isString(hexStr[0])) {
                    return hexadecimal2color(hexStr[0]);
                }
                temp = dataProcessing(hexStr);
            }
            if (temp.length > 2) {
                temp = temp.slice(0, 3);
                for (var i = 0; i < temp.length; i++) {
                    if (i !== 3) {
                        if (temp[i] === "0") {
                            strHex += "00";
                        }
                        else {
                            var newItem = Number(temp[i]).toString(16);
                            if (newItem.length < 2) {
                                newItem = "0" + newItem;
                            }
                            strHex += newItem;
                        }
                    }
                    else {
                        strHex += temp[i] === "0" ? "" : Number(temp[i]) * 100;
                    }
                }
                strHex = strHex.toUpperCase();
            }
            return strHex;
        }
    };
    var rgb2hsl = function (rgb) {
        var r = rgb[0], g = rgb[1], b = rgb[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var d = max - min;
        var l = (max + min) / 2;
        var s = d === 0 ? 0 : l > 0.5 ? d / (2 - 2 * l) : d / (2 * l);
        var h = 0;
        if (d !== 0) {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        var H = Math.ceil(h * 360);
        var S = Math.ceil(s * 100);
        var L = Math.ceil(l * 100);
        return {
            str: " ".concat(H, " ").concat(S, "% ").concat(L, "%"),
            hsl: {
                h: H,
                s: S,
                l: L,
            },
        };
    };
    var changeRgba = function (rgbaColor, newOpacity) {
        var matches = rgbaColor.match(/(\d+)/g);
        if (matches) {
            var colorArray = matches.map(Number);
            if (colorArray) {
                colorArray[3] = newOpacity;
                return 'rgba(' + colorArray.join(', ') + ')';
            }
        }
        return rgbaColor;
    };

    var getBase64File = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (ev) {
                var _a;
                resolve((_a = ev.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    };
    var getImgFile = function (file) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = file;
            img.onload = function () { return resolve(img); };
            img.onerror = function (err) { return reject(err); };
        });
    };
    var generateCanvas2D = function (width, height) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        canvas.ctx = ctx;
        return canvas;
    };
    var downloadAtLinkByHref = function (href, filename) {
        var aDom = document.createElement('a');
        aDom.href = href;
        aDom.download = filename;
        document.body.appendChild(aDom);
        aDom.click();
        document.body.removeChild(aDom);
        window.URL.revokeObjectURL(href);
    };
    var downloadFile = function (filename, file, fileType) {
        if (fileType === void 0) { fileType = 'image/png'; }
        if (!window || !Blob) {
            throw '此方法不支持当前运行环境';
        }
        try {
            var blob = isBlob(file) ? file : new File([file], filename, { type: fileType });
            var href = window.URL.createObjectURL(blob);
            downloadAtLinkByHref(href, filename);
        }
        catch (error) {
            console.log(error, '下载出错');
        }
    };
    var getSize = function (size) {
        if (size.changeWidth) {
            size.width = size.changeWidth;
        }
        if (size.changeHeight) {
            size.height = size.changeHeight;
        }
        if (size.scale && size.scale < 1 && size.scale > 0) {
            size.width *= size.scale;
            size.height *= size.scale;
        }
        var originWidth = size.width;
        var originHeight = size.height;
        var maxWidth = 1400;
        var maxHeight = 1400;
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                size.width = maxWidth;
                size.height = Math.round(maxWidth * (originHeight / originWidth));
            }
            else {
                size.width = Math.round(maxHeight * (originWidth / originHeight));
                size.height = maxHeight;
            }
        }
        return { width: size.width, height: size.height };
    };
    var getImgCanvasCtx = function (base64File, options) { return __awaiter(void 0, void 0, void 0, function () {
        var img, _a, width, height, canvas;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, getImgFile(base64File)];
                case 1:
                    img = _b.sent();
                    _a = getSize(__assign({ width: img.width, height: img.height, scale: 1 }, options)), width = _a.width, height = _a.height;
                    canvas = generateCanvas2D(width, height);
                    canvas.ctx.drawImage(img, 0, 0, img.width, img.height);
                    return [2, canvas];
            }
        });
    }); };
    var canvas2file = function (canvasCtx, type, quality) {
        if (type === void 0) { type = 'image/jpeg'; }
        if (quality === void 0) { quality = 0.5; }
        return new Promise(function (resolve) {
            canvasCtx.toBlob(function (blob) { return resolve(blob); }, type, quality);
        });
    };
    var compressionFile = function (file, type, options) {
        if (type === void 0) { type = 'image/jpeg'; }
        if (options === void 0) { options = { quality: 0.5 }; }
        return __awaiter(void 0, void 0, void 0, function () {
            var quality, changeWidth, changeHeight, _a, compressionSize, other, base64File, canvasCtx, blob;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        quality = options.quality, changeWidth = options.width, changeHeight = options.height, _a = options.compressionSize, compressionSize = _a === void 0 ? 300 : _a, other = __rest(options, ["quality", "width", "height", "compressionSize"]);
                        if (Math.round(file.size / 1024) <= compressionSize) {
                            return [2, file];
                        }
                        return [4, getBase64File(file)];
                    case 1:
                        base64File = _b.sent();
                        return [4, getImgCanvasCtx(base64File, __assign({ changeWidth: changeWidth, changeHeight: changeHeight }, other))];
                    case 2:
                        canvasCtx = _b.sent();
                        return [4, canvas2file(canvasCtx, type, quality)];
                    case 3:
                        blob = _b.sent();
                        if (blob == undefined) {
                            return [2, null];
                        }
                        return [2, new File([blob], file.name, { type: type })];
                }
            });
        });
    };
    var blob2file = function (blob, filename) {
        if (!isBlob(blob) || !isString(blob) || !isArrayBuffer(blob))
            return null;
        return new File([blob], filename, {
            type: 'application/json',
            lastModified: Date.now()
        });
    };
    var base642file = function (base, filename) {
        var arr = base.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var suffix = mime.split('/')[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], "".concat(filename, ".").concat(suffix), { type: mime });
    };

    exports.IdCardGender = IdCardGender;
    exports.base642file = base642file;
    exports.blob2file = blob2file;
    exports.canvas2file = canvas2file;
    exports.capitalize = capitalize;
    exports.changeRgba = changeRgba;
    exports.color2rgb = color2rgb;
    exports.composeAsync = composeAsync;
    exports.compressionFile = compressionFile;
    exports.consoleExtend = consoleExtend;
    exports.copy = copy;
    exports.credentialDesensitization = credentialDesensitization;
    exports.debounce = debounce;
    exports.deleteCookie = deleteCookie;
    exports.downloadAtLinkByHref = downloadAtLinkByHref;
    exports.downloadFile = downloadFile;
    exports.emailPattern = emailPattern;
    exports.extendMethodByChain = extendMethodByChain;
    exports.extendStorageMethod = extendStorageMethod;
    exports.generateCanvas2D = generateCanvas2D;
    exports.getBase64File = getBase64File;
    exports.getBrowserType = getBrowserType;
    exports.getComplex = getComplex;
    exports.getCookie = getCookie;
    exports.getImgCanvasCtx = getImgCanvasCtx;
    exports.getImgFile = getImgFile;
    exports.getRandomColor = getRandomColor;
    exports.getType = getType;
    exports.hexadecimal2color = hexadecimal2color;
    exports.isArrayBuffer = isArrayBuffer;
    exports.isBigInteger = isBigInteger;
    exports.isBlob = isBlob;
    exports.isBoolean = isBoolean;
    exports.isChrome = isChrome;
    exports.isDate = isDate;
    exports.isFirefox = isFirefox;
    exports.isFunction = isFunction;
    exports.isHTMLElement = isHTMLElement;
    exports.isIE = isIE;
    exports.isIllegalEmail = isIllegalEmail;
    exports.isIllegalPhone = isIllegalPhone;
    exports.isIllegalUrl = isIllegalUrl;
    exports.isImage = isImage;
    exports.isInInterval = isInInterval;
    exports.isLegalEmail = isLegalEmail;
    exports.isLegalPhone = isLegalPhone;
    exports.isLegalUrl = isLegalUrl;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isOpera = isOpera;
    exports.isPlainObject = isPlainObject;
    exports.isPromise = isPromise;
    exports.isSafari = isSafari;
    exports.isSingleNumOrLetter = isSingleNumOrLetter;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.phoneDesensitization = phoneDesensitization;
    exports.phonePattern = phonePattern;
    exports.rgb2hsl = rgb2hsl;
    exports.setCookie = setCookie;
    exports.sleep = sleep;
    exports.spacePatten = spacePatten;
    exports.toFormData = toFormData;
    exports.urlPattern = urlPattern;
    exports.urlPatternExtend = urlPatternExtend;

}));
