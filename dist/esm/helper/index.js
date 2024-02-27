import { isNumber, isObject, isString, isBlob } from "../index";

// copy
export * from "./copy";
export * from "./debounce";

// sleep
export var sleep = function sleep(time) {
  return new Promise(function (resolve) {
    var timer = setTimeout(function () {
      var _clearTimeout;
      (_clearTimeout = clearTimeout) === null || _clearTimeout === void 0 || _clearTimeout(timer);
      resolve(true);
    }, time);
  });
};

// 手机号脱敏
export var phoneDesensitization = function phoneDesensitization(phone) {
  if (!isNumber(phone) && !isString(phone)) return '';

  // 可能存在是 number 的情况
  phone = '' + phone;
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
};

/**
 * 证件号脱敏
 * @param { string } credential 证件号码
 */
export var credentialDesensitization = function credentialDesensitization(credential) {
  if (!isNumber(credential) && !isString(credential)) return '';
  var len = credential.length;
  var regExp, replaceExp;
  if (len < 5) {
    regExp = /^(\w{1})/;
    replaceExp = "*";
  } else if (len < 9) {
    regExp = /^(\w{4})/;
    replaceExp = "****";
  } else if (len < 15) {
    regExp = /^(\w{2})\w*(\w{2})$/;
    replaceExp = "$1****$2";
  } else {
    regExp = /^(\w{6})\w*(\w{4})$/;
    replaceExp = "$1****$2";
  }
  return credential.replace(regExp, replaceExp);
};

/**
 * 根据身份证号码获取性别信息
 * @param idCard 身份证搞号码
 * @param placeholder 未识别出时 默认返回的占位符
 * @return '0' ---> 男
 * @return '1' ---> 女
 */
export var IdCardGender = function IdCardGender(idCard, placeholder) {
  if (!isNumber(idCard) && !isString(idCard)) return placeholder;
  var len = idCard.length;
  var genderNum = '';
  if (len === 15) genderNum = idCard.slice(-1);
  if (len === 18) genderNum = idCard.slice(-2, -1);
  if (genderNum === '') return placeholder;
  return parseInt(genderNum) % 2 === 1 ? '0' : '1';
};

// 将数据格式转换为 FormData 类型
export var toFormData = function toFormData(target) {
  var fd = new FormData();
  if (!FormData) return fd;
  Object.keys(target).forEach(function (key) {
    var value = target[key];
    if (isObject(value) && !isBlob(target)) {
      value = JSON.stringify(value);
    } else {
      value = value.toString();
    }
    fd.append(key, value);
  });
  return fd;
};