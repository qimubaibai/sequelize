// 配置路由, 使用路由 router.get() 来取代 app.get() 请求路径和中间件

const express = require("express");
const { values } = require("sequelize/dist/lib/operators");
const router = express.Router(); // 创建路由
const adminServ = require("../../services/adminService");
const { asyncHandler, getResult } = require("../getSendResult"); // 引入生成异步中间件的方法
const { encrypt } = require("../../utils/crypt"); // 引入加密的方法

// 1. admin 使用 get 请求传入用户名和密码, 得到用户名是否存在, 调用的是 adminServ 中的 login 方法
// 数据的来源: 请求体 query 中的属性值
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // 使用 asyncHandler 将中间件包装成异步的函数
    const loginId = req.query.loginId || "";
    const loginPwd = req.query.loginPwd || "";
    // console.log(loginId, loginPwd);
    // return await adminServ.login(loginId, loginPwd); // 将异步拿到的结果返回
    const result = await adminServ.login(loginId, loginPwd);
    if (result) {
      let value = result.id;
      // 使用封装的加密方法对 value 进行加密
      value = encrypt(value.toString()); // 要传入一个字符串
      // 1. 常规方法使用 res.header 添加 cookie
      // res.header(
      //   "set-cookie",
      //   `takon=${result.id}; path=/; domain=localhost; max-age=3600`
      // );
      // 2. 在 init.js 中已经添加了 cookie-parser 库, 所以直接使用 res.cookie
      res.cookie("token", value, {
        // 配置 cookie
        path: "/",
        domain: "localhost",
        maxAge: 7 * 24 * 3600 * 1000, //毫秒
      });
    }
    return result;
  })
);

module.exports = router;
// 配置好路由之后就可以使用 postman 添加 params query 进行请求对应的数据
