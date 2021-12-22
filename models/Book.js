// 创建一个模型对象 book 用来存放所有的书籍

const sequelize = require("./db"); // 引入数据库的实例对象
const { DataTypes } = require("sequelize"); // 数据类型的集合

const Book = sequelize.define(
  "Book", // 第一项表的名称, 如果没有tableName 默认就是 Admin + "s"
  {
    // 属性
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    // 爬虫到的时间不是标准的时间格式, 可能是字符串格式的方便存取
    publicDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
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

module.exports = Book;
