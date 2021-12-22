// 创建一个模型对象 class  用来存放班级的信息

const sequelize = require("./db"); // 引入数据库的实例对象
const { DataTypes } = require("sequelize"); // 数据类型的集合
// const Student = require("./Student");

const Class = sequelize.define(
  "Class", // 第一项表的名称, 如果没有tableName 默认就是 Admin + "s"
  {
    // 属性
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OpenDate: {
      type: DataTypes.DATE,
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

// Class.hasMany(Student);

module.exports = Class;
