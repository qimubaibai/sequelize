const express = require("express");
const router = express.Router(); // 创建路由
const studentServ = require("../../services/studentService");
const { asyncHandler } = require("../getSendResult"); // 引入生成异步中间件的方法

router.post(
  // 添加一个学生的请求
  "/",
  asyncHandler(async (req, res, next) => {
    // console.log("body", req.body);
    return await studentServ.addStudent(req.body);
  })
);
// 验证的时候出现了一个错误, postman 中需要设置 post body 的格式为 json, 而不是默认的 text

router.get(
  "/", // 分页查询学生
  asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await studentServ.getStudent(page, limit, sex, name);
  })
);
// router.get() // 根据 id 查询学生信息
// router.put() // 根据 id 修改学生信息

module.exports = router;
