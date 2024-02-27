// 距离目标时间还有多久
export var getRemainder = function getRemainder(target) {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(+target)) {
    target = +target;
  }
  var result = {
    errMsg: null,
    targetTime: null,
    isExpiration: null,
    timeToExpiration: null
  };
  var targetDate = new Date(target);
  var nowDate = new Date();
  var errMsg = targetDate.toUTCString();
  if (errMsg === 'Invalid Date') {
    return result;
  }
  var targetTime = targetDate.getTime();
  var nowTime = nowDate.getTime();
  var difference = targetTime - nowTime;
  var isExpiration = difference < 0;
  var timeToExpiration = isExpiration ? null : (difference / (60 * 60 * 24 * 1000)).toFixed(1);
  result.isExpiration = isExpiration;
  result.isExpiration = isExpiration;
  result.timeToExpiration = timeToExpiration;
  return result;
};