// 创建一个模型对象 admin 用来存储用户名和密码

const sequelize = require("./db"); // 引入数据库的实例对象
const { DataTypes } = require("sequelize"); // 数据类型的集合

const Admin = sequelize.define(
  "Admin", // 第一项表的名称, 如果没有tableName 默认就是 Admin + "s"
  {
    // 属性
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 其他配置
    createdAt: true,
    updatedAt: "updateTimestamp",
    paranoid: true, //偏执表, 不会删除数据本身, 只会添加一行 deleteAt
    //   tableName:"直接设置表名"
  }
);

module.exports = Admin;
