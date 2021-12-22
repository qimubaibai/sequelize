// 配置 log 的记录方式和路径等信息
const log4js = require("log4js"); // 用来创建并添加 log 配置
const path = require("path"); // 用来处理路径

log4js.configure({
  // 配置出口和分类
  appenders: {
    sql: {
      //添加 sql 日志出口
      type: "dateFile", // 保存的备份文件名后缀是包含日期
      filename: path.resolve(__dirname, "logs", "sql", "logging.log"), // 生成路径为当前路径/ logs/ sql
      maxLogSize: 1024 * 1024, // 单位是字节
      keepFileExt: true, //保留原始的文件后缀 .log
      daysToKeep: 1, // 保留时长
      layout: {
        // 自定义显示模板
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss}] %p %c %m%n", //配置输出的 log 内容显示样式
      },
    },
    default: {
      type: "stdout", // 类型为控制台输出, 不生成文件
    },
  },
  categories: {
    // 类型: 配置出口和等级
    sql: {
      appenders: ["sql"], // 可以有多个出口, 所以写成数组的形式
      level: "all",
    },
    default: {
      appenders: ["default"],
      level: "all",
    },
  },
});

process.on("exit", () => {
  log4js.shutdown(); // 当进程结束的时候, 对 log 进行截断
});

const sqlLogger = log4js.getLogger("sql"); // 拿到 logger 对象
const defaultLogger = log4js.getLogger(); // 默认就是 default

// 将 logger 导出, 在db.js 连接数据库的时候进行配置 logging:(msg)=>{ logger.debug(msg)}
exports.sqlLogger = sqlLogger;
exports.logger = defaultLogger;
