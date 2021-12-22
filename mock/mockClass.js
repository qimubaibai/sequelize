const Mock = require("mockjs");
const Class = require("../models/Class");

const result = Mock.mock({
  // 共模拟 16 个班级信息
  "datas|16": [
    {
      // 每个班级对象包含的数据
      "id|+1": 1,
      name: "第 @id 班级",
      OpenDate: "@date",
    },
  ],
}).datas;

Class.bulkCreate(result);
