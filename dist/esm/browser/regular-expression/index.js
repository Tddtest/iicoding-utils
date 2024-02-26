// 包含空格的正则
export var spacePatten = /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$%^&*()_+-=?:{},.\\/;<>[\]·！￥……（——）：；"'“”‘’、，|《。》？【】]*$/;

// 是否为纯数字 或者 纯字母
export var isSingleNumOrLetter = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])');

// 手机号
export var phonePattern = /^1[3456789]\d{9}$/;

// 邮箱
export var emailPattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

// url
export var urlPattern = /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;
export var urlPatternExtend = function urlPatternExtend(options) {
  var _options$httpPrefix = options.httpPrefix,
    httpPrefix = _options$httpPrefix === void 0 ? 'https|http|ftp|rtsp|mms' : _options$httpPrefix,
    _options$mateLocalhos = options.mateLocalhost,
    mateLocalhost = _options$mateLocalhos === void 0 ? true : _options$mateLocalhos;

  // 请求参数结尾- 英文或数字和[]内的各种字符
  return "^((".concat(httpPrefix, ")://)?") // (https或http或ftp):// 可有可无
  + '(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
  + '|' // 允许IP和DOMAIN（域名）
  + mateLocalhost ? '' : '(localhost)|' // 匹配localhost
  + '([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
  + '[\\w./-]+\\.' // 一级域名 -英文或数字 加上.
  + '[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文
  + '(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
  + '((/?)|' // url无参数结尾 - 斜杆或这没有
  + '(/[\\w_!~*\'()\\.;?:@&=+$ ,%#-]+)+/?)$';
};