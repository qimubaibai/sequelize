// 给 validate 添加 datetime 扩展,就可以对时间格式进行控制
const { validate } = require("validate.js");
const moment = require("moment");

validate.extend(validate.validators.datetime, {
  /**
   *
   * @param {*} value 输入的时间字符串
   * @param {*} options 验证配置
   * @returns
   */
  parse: function (value, options) {
    return +moment.utc(value); // 变成时间戳, 也可以限定格式
  },
  format: function (value, options) {
    let format = options.dateOnly ? "YY-MM-DD" : "YY-MM-DD hh:mm:ss";
    return +moment.utc(value).format(format); // 将输入的值变成指定的格式
  },
});
