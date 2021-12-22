// 通过 sequelize 连接一个数据库, 然后在里面开始设计表
// 可以使用 try 进行测试
const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");

const sequelize = new Sequelize("myschooldb", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
  // logging:null, 可以将自己配置的 logger 填充到这里
  logging: (msg) => {
    sqlLogger.debug(msg);
  },
});

module.exports = sequelize;
