// 创建一个模型对象 student 用来存储学生的信息

const sequelize = require("./db"); // 引入数据库的实例对象
const { DataTypes } = require("sequelize"); // 数据类型的集合
// const Book = require("./Book");
const moment = require("moment");
const { noExtendLeft } = require("sequelize/dist/lib/operators");

const Student = sequelize.define(
  "Student", // 第一项表的名称, 如果没有tableName 默认就是 Admin + "s"
  {
    // 属性
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        // 让数据库中显示为时间戳的格式, 但是不影响原始数据
        return this.getDataValue("birthday").getTime(); //得到原始数据, 然后变成时间戳
      },
    },
    age: {
      // 验证虚拟字段
      type: DataTypes.VIRTUAL, //设置为虚拟字段, 不在数据表中显示
      get() {
        // 编写一个计算属性作为虚拟字段
        const now = moment.utc();
        const birth = moment.utc(this.birthday); // 将 birthday 变成字符串
        return now.diff(birth, "y"); // 得到两个年份的差值
      },
    },
    mobile: {
      type: DataTypes.STRING(11),
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

// 建立表之间的关系
// Student.hasMany(Book);
// 这样设置的关系是单项的, 需要单独建立一个 relation.js 来设置

module.exports = Student;
