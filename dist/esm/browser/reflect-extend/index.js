// @ts-ignore
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

  // @ts-ignore
  oReturn = o2nd = oLast = oChain instanceof Object ? oChain : new oChain.constructor(oChain);
  for (var o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
    o2nd = o1st;
  }
  if (oProto.constructor === String) {
    oNewProto = Function.prototype;
    // eslint-disable-next-line no-new-func,prefer-spread,prefer-rest-params
    oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
    this.setPrototypeOf(oReturn, oLast);
  }
  this.setPrototypeOf(o2nd, oNewProto);
  return oReturn;
};
export var extendMethodByChain = function extendMethodByChain(oChain, oProto) {
  // @ts-ignore
  Reflect.appendChain(oChain, oProto);
};