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
        _a['Object object'] = 'object',
        _a['Object Function'] = 'function',
        _a['Object Error'] = 'error',
        _a['Object Date'] = 'date',
        _a['Object RegExp'] = 'regExp',
        _a['Object Array'] = 'array',
        _a);
    return typeObject[Object.prototype.toString.call(source)];
};
var isNumber = function (num) { return typeof num === 'number'; };
var isString = function (str) { return typeof str === 'string'; };
var isSymbol = function (sym) { return typeof sym === 'symbol'; };
var isBigInteger = function (num) { return typeof num === 'bigint'; };
var isBoolean = function (bool) { return typeof bool === 'boolean'; };
var isObject = function (obj) { return getComplex(obj) === 'object'; };
var isPlainObject = function (obj) {
    if (!isObject(obj))
        return false;
    var proto = Object.getPrototypeOf(obj);
    if (!proto)
        return true;
    var Ctor = 'constructor' in obj && obj.constructor;
    return Ctor === Object;
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

var sleep = function (time) {
    return new Promise(function (resolve) {
        var timer = setTimeout(function () {
            clearTimeout === null || clearTimeout === void 0 ? void 0 : clearTimeout(timer);
            resolve(true);
        }, time);
    });
};

export { capitalize, composeAsync, extendMethodByChain, extendStorageMethod, getComplex, getType, isBigInteger, isBoolean, isNumber, isObject, isPlainObject, isString, isSymbol, sleep };
