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
        _a['Object Blob'] = 'blob',
        _a['Object Promise'] = 'promise',
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
var color2hexadecimal = function (hex, onlyValue) {
    if (onlyValue === void 0) { onlyValue = false; }
    var rgb = [];
    if (/^\#[0-9A-F]{3}$/i.test(hex)) {
        var sixHex_1 = '#';
        hex.replace(/[0-9A-F]/ig, function (kw) {
            sixHex_1 += kw + kw;
            return kw;
        });
        hex = sixHex_1;
    }
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
        hex.replace(/[0-9A-F]{2}/ig, function (kw) {
            rgb.push(eval("0x".concat(kw)));
            return kw;
        });
    }
    else if (/^#[0-9A-F]{8}$/i.test(hex)) {
        var opacity = hex.slice(7);
        hex = hex.slice(0, 7);
        hex.replace(/[0-9A-F]{2}/ig, function (kw) {
            rgb.push(eval("0x".concat(kw)));
            return kw;
        });
        if (!isNaN(+opacity)) {
            rgb.push(".".concat(opacity));
        }
    }
    else {
        rgb.push(0, 0, 0);
    }
    return onlyValue ? rgb : "rgb(".concat(rgb.join(','), ")");
};
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
    return source < first || source > last;
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

export { IdCardGender, capitalize, color2hexadecimal, composeAsync, credentialDesensitization, deleteCookie, emailPattern, extendMethodByChain, extendStorageMethod, getComplex, getCookie, getRandomColor, getType, hexadecimal2color, isBigInteger, isBlob, isBoolean, isDate, isFunction, isIllegalEmail, isIllegalPhone, isIllegalUrl, isInInterval, isLegalEmail, isLegalPhone, isLegalUrl, isNumber, isObject, isPlainObject, isPromise, isSingleNumOrLetter, isString, isSymbol, phoneDesensitization, phonePattern, setCookie, sleep, spacePatten, toFormData, urlPattern, urlPatternExtend };
