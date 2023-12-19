var icdUtils=function(exports){"use strict";var LocalstorageDispatchEvent=function(){function e(){global&&global.localStorage&&global.sessionStorage||console.error("当前环境不支持本地存储方案")}return e.prototype.set=function(t,o,r){if(this.setItem)try{var n="object"==typeof o?JSON.stringify(o):o;this.setItem(t,n),e.dispatchEvent("set",r,{itemKey:t,itemValue:n})}catch(e){}},e.prototype.setMore=function(e,t){var o=this;Object.keys(e).forEach((function(r){o.set(r,e[r],t)}))},e.prototype.get=function(e){var t;return(null===(t=this.getItem)||void 0===t?void 0:t.call(this,e))||null},e.prototype.get2Json=function(e){if(this.getItem){var t=this.getItem(e);if(t)try{return JSON.parse(t)}catch(e){}}return null},e.prototype.remove=function(t,o){if(this.removeItem)try{this.removeItem(t),e.dispatchEvent("remove",o)}catch(e){}},e.prototype.removeMore=function(t,o){var r=this;Array.isArray(t)&&(t.forEach((function(e){r.remove(e)})),e.dispatchEvent("remove",o))},e.prototype.clearAll=function(t){if(this.clear)try{this.clear(),e.dispatchEvent("clear",t)}catch(e){}},e.dispatchEvent=function(e,t,o){if(t&&window){var r=new Event("storeChange");if(r.triggerAction=e,o){var n=o.itemKey,a=o.itemValue;r.newKey=n,r.newValue=a}window.dispatchEvent(r)}},e}(),storage=new LocalstorageDispatchEvent,extendStorageMethod=function(e){if(void 0===e&&(e="all"),window)switch(e){case"sessionStorage":extendMethodByChain(window.sessionStorage,storage);break;case"localStorage":extendMethodByChain(window.localStorage,storage);break;default:extendMethodByChain(window.sessionStorage,storage),extendMethodByChain(window.localStorage,storage)}};Reflect.appendChain=function(e,t){if(arguments.length<2)throw new TypeError("".concat(this.name," Not enough arguments"));if("number"==typeof t||"boolean"==typeof t)throw new TypeError("second argument to Object.appendChain must be an object or a string");var o,r,n,a=t;o=r=n=e instanceof Object?e:new e.constructor(e);for(var i=this.getPrototypeOf(r);i!==Object.prototype&&i!==Function.prototype;i=this.getPrototypeOf(r))r=i;return t.constructor===String&&(a=Function.prototype,o=Function.apply(null,Array.prototype.slice.call(arguments,1)),this.setPrototypeOf(o,n)),this.setPrototypeOf(r,a),o};var extendMethodByChain=function(e,t){Reflect.appendChain(e,t)},capitalize=function(e){if(null==e||"string"!=typeof e)return"";var t=e.toLowerCase();return"".concat(t.substring(0,1).toUpperCase()).concat(t.substring(1))},getComplex=function(e){var t;return((t={})["object Object"]="object",t["object Function"]="function",t["object Error"]="error",t["object Date"]="date",t["object RegExp"]="regExp",t["object Array"]="array",t["object Blob"]="blob",t["object Promise"]="promise",t)[Object.prototype.toString.call(e)]},getType=function(e){if(null==e)return e+"";var t=typeof e;return"object"===t?getComplex(e):t},isNumber=function(e){return"number"==typeof e},isString=function(e){return"string"==typeof e},isSymbol=function(e){return"symbol"==typeof e},isBigInteger=function(e){return"bigint"==typeof e},isBoolean=function(e){return"boolean"==typeof e},isObject=function(e){return"object"===getComplex(e)},isBlob=function(e){return"blob"===getComplex(e)},isDate=function(e){return"date"===getComplex(e)},isPlainObject=function(e){return!!isObject(e)&&(!Object.getPrototypeOf(e)||("constructor"in e&&e.constructor)===Object)},isFunction=function(e){return"function"===getType(e)},isPromise=function(e){return!!isObject(e)&&("promise"===getComplex(e)&&isFunction(e.then)&&isFunction(e.catch))};function __spreadArray(e,t,o){if(o||2===arguments.length)for(var r,n=0,a=t.length;n<a;n++)!r&&n in t||(r||(r=Array.prototype.slice.call(t,0,n)),r[n]=t[n]);return e.concat(r||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;var composeAsync=function(e){var t=e.length;if(0===t)return function(e){return e};if(1===t)return e[0];var o=function(r){for(var n=[],a=1;a<arguments.length;a++)n[a-1]=arguments[a];r!==t&&e[r].apply(void 0,__spreadArray([function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];o.apply(void 0,__spreadArray([++r],e,!1))}],n,!1))};return function(e){return o(0,e)}};function toggleSelection(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,o=[],r=0;r<e.rangeCount;r++)o.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||o.forEach((function(t){e.addRange(t)})),t&&t.focus()}}var clipboardToIE11Formatting={"text/plain":"Text","text/html":"Url",default:"Text"},defaultMessage="Copy to clipboard: #{key}, Enter";function format(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function copy(e,t){var o,r,n,a,i,l,s=!1;t||(t={}),o=t.debug||!1;try{if(n=toggleSelection(),a=document.createRange(),i=document.getSelection(),(l=document.createElement("span")).textContent=e,l.ariaHidden="true",l.style.all="unset",l.style.position="fixed",l.style.top="0",l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",(function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),void 0===r.clipboardData){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var n=clipboardToIE11Formatting[t.format]||clipboardToIE11Formatting.default;window.clipboardData.setData(n,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))})),document.body.appendChild(l),a.selectNodeContents(l),i.addRange(a),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");s=!0}catch(n){o&&console.error("unable to copy using execCommand: ",n),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),s=!0}catch(n){o&&console.error("unable to copy using clipboardData: ",n),o&&console.error("falling back to prompt"),r=format("message"in t?t.message:defaultMessage),window.prompt(r,e)}}finally{i&&("function"==typeof i.removeRange?i.removeRange(a):i.removeAllRanges()),l&&document.body.removeChild(l),n()}return s}var sleep=function(e){return new Promise((function(t){var o=setTimeout((function(){null===clearTimeout||void 0===clearTimeout||clearTimeout(o),t(!0)}),e)}))},phoneDesensitization=function(e){return isNumber(e)||isString(e)?(e=""+e).replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"):""},credentialDesensitization=function(e){if(!isNumber(e)&&!isString(e))return"";var t,o,r=e.length;return r<5?(t=/^(\w{1})/,o="*"):r<9?(t=/^(\w{4})/,o="****"):r<15?(t=/^(\w{2})\w*(\w{2})$/,o="$1****$2"):(t=/^(\w{6})\w*(\w{4})$/,o="$1****$2"),e.replace(t,o)},IdCardGender=function(e,t){if(!isNumber(e)&&!isString(e))return t;var o=e.length,r="";return 15===o&&(r=e.slice(-1)),18===o&&(r=e.slice(-2,-1)),""===r?t:parseInt(r)%2==1?"0":"1"},toFormData=function(e){var t=new FormData;return FormData?(Object.keys(e).forEach((function(o){var r=e[o];r=isObject(r)&&!isBlob(e)?JSON.stringify(r):r.toString(),t.append(o,r)})),t):t},getRandomColor=function(e){if((null==e?void 0:e.length)>=6)return e.startsWith("#")?e:"#".concat(e);for(var t=Math.floor(16777216*Math.random()).toString(16);t.length<6;)t="0"+t;return"#"+t},color2hexadecimal=function(hex,onlyValue){void 0===onlyValue&&(onlyValue=!1);var rgb=[];if(/^\#[0-9A-F]{3}$/i.test(hex)){var sixHex_1="#";hex.replace(/[0-9A-F]/gi,(function(e){return sixHex_1+=e+e,e})),hex=sixHex_1}if(/^#[0-9A-F]{6}$/i.test(hex))hex.replace(/[0-9A-F]{2}/gi,(function(kw){return rgb.push(eval("0x".concat(kw))),kw}));else if(/^#[0-9A-F]{8}$/i.test(hex)){var opacity=hex.slice(7);hex=hex.slice(0,7),hex.replace(/[0-9A-F]{2}/gi,(function(kw){return rgb.push(eval("0x".concat(kw))),kw})),isNaN(+opacity)||rgb.push(".".concat(opacity))}else rgb.push(0,0,0);return onlyValue?rgb:"rgb(".concat(rgb.join(","),")")},hexadecimal2color=function(e){if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/.test(e.toString()))return e;var t=[],o="#",r=function(e){return e.filter((function(e){return function(e){var t=e.toString().trim();return t.startsWith(".")&&(t=t.slice(1)),(isString(t)||isNumber(t))&&!isNaN(+t)}(e)})).map((function(e){var t=e.trim();return t.startsWith("0")||t.startsWith(".")?"0.".concat(t.split(".").at(-1)):+t>255?"255":parseInt(t,10)+""}))};if(isString(e)&&(t=r(e.replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g,"").split(","))),Array.isArray(e)){if(1===e.length&&isString(e[0]))return hexadecimal2color(e[0]);t=r(e)}if(t.length>2){t=t.slice(0,3);for(var n=0;n<t.length;n++)if(3!==n)if("0"===t[n])o+="00";else{var a=Number(t[n]).toString(16);a.length<2&&(a="0"+a),o+=a}else o+="0"===t[n]?"":100*Number(t[n]);o=o.toUpperCase()}return o},spacePatten=/^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$%^&*()_+-=?:{},.\\/;<>[\]·！￥……（——）：；"'“”‘’、，|《。》？【】]*$/,isSingleNumOrLetter=new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])"),phonePattern=/^1[3456789]\d{9}$/,emailPattern=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,urlPattern=/^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/,urlPatternExtend=function(e){var t=e.httpPrefix,o=void 0===t?"https|http|ftp|rtsp|mms":t,r=e.mateLocalhost,n=void 0===r||r;return"^((".concat(o,")://)?")+"(([0-9]{1,3}\\.){3}[0-9]{1,3}|"+n?"":"(localhost)|([\\w_!~*'()-]+\\.)*[\\w./-]+\\.[a-zA-Z]{1,6})(:[0-9]{1,5})?((/?)|(/[\\w_!~*'()\\.;?:@&=+$ ,%#-]+)+/?)$"},isLegalEmail=function(e){return emailPattern.test(e)},isIllegalEmail=function(e){return!emailPattern.test(e)},isLegalPhone=function(e){return phonePattern.test(e)},isIllegalPhone=function(e){return!phonePattern.test(e)},isLegalUrl=function(e){return urlPattern.test(e)},isIllegalUrl=function(e){return!urlPattern.test(e)},isInInterval=function(e,t){if(!Array.isArray(t))return!1;var o=t[0],r=t[1];return!!(isNumber(e)&&isNumber(o)&&isNumber(r))&&(!isNaN(+e)&&(+e>=o||+e<=r))},getCookie=function(e){var t={};if(document){var o=document.cookie;if(o)for(var r=o.split("; "),n=0;n<r.length;n++){var a=r[n].split("="),i=a[0],l=a[1];try{i=decodeURIComponent(i),l=decodeURIComponent(l)}catch(e){console.log("value decodeURIComponent error value="+l)}l&&(t[i]=l)}}return e?t[e]:t},setCookie=function(e,t,o){var r=encodeURIComponent(e)+"="+encodeURIComponent(t);if(isNumber(o)){var n=new Date;n.setTime(n.getTime()+864e5*o),r+=";path=/;expires="+n.toUTCString()}document.cookie=r},deleteCookie=function(e){setCookie(e,"",-1)},log=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];var r="",n=[r];t.forEach((function(t){isObject(t)?(r+="%c %O ",n.push("\n      display: inline-block;\n      width: 1px;\n      margin: 0 4px;\n      ",t)):(r+="%c %s ",n.push(e,t))})),n[0]=r,console.log.apply(console,n)},baseStyle="display:inline-black;margin: 0 10px;border-radius: 4px;padding: 3px 6px;font-weight:bold;font-size: 14px;",colorful=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"\n      color: #fff;\n      background: linear-gradient(to right, #ff4361 30%, #fe7deb, #ce6dff 100%);\n      ");log.apply(void 0,__spreadArray([o],e,!1))},blue=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #4096ff;background:#fff");log.apply(void 0,__spreadArray([o],e,!1))},blueBg=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #fff;background:#4096ff");log.apply(void 0,__spreadArray([o],e,!1))},yellow=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #FAAD14;background:#fff");log.apply(void 0,__spreadArray([o],e,!1))},yellowBg=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #fff;background:#FAAD14");log.apply(void 0,__spreadArray([o],e,!1))},red=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #ff4d4f;background:#fff");log.apply(void 0,__spreadArray([o],e,!1))},redBg=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #fff;background:#ff4d4f");log.apply(void 0,__spreadArray([o],e,!1))},green=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: green;background:#fff");log.apply(void 0,__spreadArray([o],e,!1))},greenBg=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o="".concat(baseStyle,"color: #fff;background:green");log.apply(void 0,__spreadArray([o],e,!1))},consoleExtend=function(){console&&extendMethodByChain(console,{colorful:colorful,red:red,blue:blue,green:green,yellow:yellow,redBg:redBg,blueBg:blueBg,greenBg:greenBg,yellowBg:yellowBg})};return exports.IdCardGender=IdCardGender,exports.capitalize=capitalize,exports.color2hexadecimal=color2hexadecimal,exports.composeAsync=composeAsync,exports.consoleExtend=consoleExtend,exports.copy=copy,exports.credentialDesensitization=credentialDesensitization,exports.deleteCookie=deleteCookie,exports.emailPattern=emailPattern,exports.extendMethodByChain=extendMethodByChain,exports.extendStorageMethod=extendStorageMethod,exports.getComplex=getComplex,exports.getCookie=getCookie,exports.getRandomColor=getRandomColor,exports.getType=getType,exports.hexadecimal2color=hexadecimal2color,exports.isBigInteger=isBigInteger,exports.isBlob=isBlob,exports.isBoolean=isBoolean,exports.isDate=isDate,exports.isFunction=isFunction,exports.isIllegalEmail=isIllegalEmail,exports.isIllegalPhone=isIllegalPhone,exports.isIllegalUrl=isIllegalUrl,exports.isInInterval=isInInterval,exports.isLegalEmail=isLegalEmail,exports.isLegalPhone=isLegalPhone,exports.isLegalUrl=isLegalUrl,exports.isNumber=isNumber,exports.isObject=isObject,exports.isPlainObject=isPlainObject,exports.isPromise=isPromise,exports.isSingleNumOrLetter=isSingleNumOrLetter,exports.isString=isString,exports.isSymbol=isSymbol,exports.phoneDesensitization=phoneDesensitization,exports.phonePattern=phonePattern,exports.setCookie=setCookie,exports.sleep=sleep,exports.spacePatten=spacePatten,exports.toFormData=toFormData,exports.urlPattern=urlPattern,exports.urlPatternExtend=urlPatternExtend,exports}({});
