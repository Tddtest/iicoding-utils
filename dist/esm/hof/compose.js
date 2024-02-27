export var composeAsync = function composeAsync(middleware) {
  var middlewareLen = middleware.length;
  if (middlewareLen === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (middlewareLen === 1) {
    return middleware[0];
  }
  var dispatch = function dispatch(idx) {
    if (idx === middlewareLen) return;
    var crtMiddleware = middleware[idx];
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    crtMiddleware.apply(void 0, [function () {
      for (var _len2 = arguments.length, nextPrams = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextPrams[_key2] = arguments[_key2];
      }
      dispatch.apply(void 0, [++idx].concat(nextPrams));
    }].concat(params));
  };
  return function (params) {
    return dispatch(0, params);
  };
};