// 处理错误的中间件, 返回一个中间件函数
const { getErr } = require("./getSendResult");

module.exports = (err, req, res, next) => {
  if (err) {
    // 如果 err 存在的话, 就返回一个错误对象
    // const errObj = {
    //   code: 500,
    //   msg: err instanceof Error ? err.message : err, // 判断 err 的原型是不是 Error
    // };
    const errObj = err instanceof Error ? err.message : err; // 因为有 getErr 封装错误对象的方法所以只需要传入 message 即可
    // 将错误对象返回给客户端
    // res.status(500).send(errObj);
    res.status(500).send(getErr(errObj)); // 此时 errObj 就是错误消息
  } else {
    next();
  }
};
