var LocalstorageDispatchEvent = (function () {
    function LocalstorageDispatchEvent(type) {
        this.storage = window[type];
    }
    LocalstorageDispatchEvent.prototype.set = function (key, value, trigger) {
        if (this.storage) {
            try {
                var newValue = typeof value === 'object' ? JSON.stringify(value) : value;
                this.storage.setItem(key, newValue);
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
        return ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.getItem(key)) || null;
    };
    LocalstorageDispatchEvent.prototype.get2Json = function (key) {
        var _a;
        if (this.storage) {
            var data = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.getItem(key);
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
        if (this.storage) {
            try {
                this.storage.removeItem(key);
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
    LocalstorageDispatchEvent.prototype.clear = function (trigger) {
        if (this.storage) {
            try {
                this.storage.clear();
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
var _localStorage = new LocalstorageDispatchEvent('localStorage');
var _sessionStorage = new LocalstorageDispatchEvent('sessionStorage');

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

export { LocalstorageDispatchEvent, _localStorage, _sessionStorage, extendMethodByChain };
