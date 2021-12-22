// 配置添加默认的中间件

const express = require("express");
const app = express(); // 创建 express 应用, 取代 http 模块来处理请求

// 1. 返回静态资源的中间件, 映射 public 中的静态资源
const path = require("path"); // 引入 path 来查找绝对路径
const staticRoot = path.resolve(__dirname, "../public"); // 定义 static 的路径
app.use(express.static(staticRoot)); // 使用 express.static() 中间件

// 6. 发送和接收 cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // 引入 res.cookie("token", value, {配置对象}) 方法来取代 res.header(" setCookie", "配置字符串") 方法添加 cookie 和配置

// 7. 加入处理 token 的中间件
app.use("/", require("./tokenMiddleware")); // 任何请求都要通过 token 中间件

// 2. 解析 post 请求体 application/x-www-form-urlencoded 格式
app.use(
  express.urlencoded({
    extended: true, // 使用 qs 来解析 query 对象
  })
);

// 3. 处理 json 格式的消息体, 解析成对象
app.use(express.json());

// 4. 处理 api 的请求 (使用路由配置 ,导出的是 router)
app.use("/api/student", require("./api/student"));
app.use("/api/admin", require("./api/admin"));
app.use("/api/book", require("./api/book"));
app.use("/api/class", require("./api/class"));

// 5. 处理错误的中间件
app.use("/", require("./errorMiddleware")); // 不写请求路径就匹配所有请求

// 创建监听的端口
const port = 5001;
app.listen(port, () => {
  console.log(`server listen on port${port}`);
});
