export function setCssVarProperties() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var dom = args[0],
    values = args[1];
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  // 可能没传 dom 数组结构取得第一个值 就不是 dom 而是 values
  if (!values) {
    values = dom;
    dom = document.documentElement;
  }
  Object.keys(values || {}).forEach(function (key) {
    console.log(key, values[key]);
    dom.style.setProperty(key, values[key]);
  });
}