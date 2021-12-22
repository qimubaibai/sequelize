// 导出几个方法, 传入返回的结果, 然后按照服务器返回的消息格式进行包装

// 传入错误的信息, 输出错误对象的格式
exports.getErr = function (err = "server internal error", errCode = 500) {
  return {
    code: errCode,
    msg: err,
  };
};

// 传入正确的信息, 输出正确结果的格式
exports.getResult = function (result) {
  return {
    code: 0,
    msg: "",
    datas: result,
  };
};

// 传入异步函数, 即需要包装的中间件, 包装在一个异步函数中
exports.asyncHandler = (handler) => {
  return async (req, res, next) => {
    //使用 try catch 来抓取 promise 中的错误并返回
    try {
      const result = await handler(req, res, next);
      res.send(exports.getResult(result));
    } catch (err) {
      next(err);
    }
  };
};
