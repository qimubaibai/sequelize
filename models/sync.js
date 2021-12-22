// 将每一张表的模型对象生成
require("./Admin");
require("./Book");
require("./Class");
require("./Student");

// 建立表连接关系
require("./relation");

// 请求 sequelize 实例 连接一个数据库
const sequelize = require("./db");
sequelize.sync({ alter: true }).then(() => {
  console.log("全部同步完成");
});
