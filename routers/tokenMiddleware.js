// 发送 token 是在 router 请求的时候, 可以将请求到的结果中的 id 作为  cookie token 的值
// 中间件用来处理请求中从 cookie 中的 token,  用来解析 token 的中间件
// 在 init.js 中使用 cookie-parser 就可以直接使用 res.cookie() 设置返回 token
const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp"); // 引入生成路径规则的方法
const { decrypt } = require("../utils/crypt"); // 引入解密的方法

const needTokenApi = [
  {
    method: "GET",
    path: "/api/student",
  },
  {
    method: "POST",
    path: "/api/student",
  },
  {
    method: "PUT",
    path: "/api/student/:id",
  },
];

module.exports = (req, res, next) => {
  console.log("开始认证");
  const apis = needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path); // 给每个 api 的路径生成对应的规则
    return api.method === req.method && reg.test(req.path);
  });
  console.log(apis);
  if (apis.length === 0) {
    // 如果请求不在 needTokenApi 中, 就不需要验证直接放行
    next();
    return;
  }
  let token = req.cookies.token;
  if (!token) {
    // 如果 token 不存在的话, 就从 header 中获取
    token = req.headers.authorizaiton;
  }
  // 如果还是没有 token 就使用
  if (!token) {
    // 没有认证
    console.log("认证不通过");
    handleNonToken(req, res, next);
    return;
  }
  // 存在 token, 开始验证token 是否有效
  // 需要使用 decrypt 对加密的 value 进行解密
  const userId = decrypt(token);

  console.log("userid", userId, "认证通过");
  req.userId = userId;
  // 将验证后的 userId 添加到 请求头中
  next();
};

function handleNonToken(req, res, next) {
  res
    .status(403)
    .send(getErr("you dont have any token to access the api", 403));
}
