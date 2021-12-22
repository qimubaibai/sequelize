const Mock = require("mockjs");
const Student = require("../models/Student");

const result = Mock.mock({
  // 共模拟 500-700 条学生信息
  "datas|500-700": [
    {
      // 每个学生对象包含的数据
      name: "@cname",
      birthday: "@date",
      "sex|1": true,
      mobile: /1\d{10}/,
      "ClassId|1-16": 1,
    },
  ],
}).datas;

Student.bulkCreate(result);
