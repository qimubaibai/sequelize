// 编写一个对称加密的工具, 返回两个方法, 加密和解密

// 使用自带的 crypto 库
const crypto = require("crypto");

// 创建一个16 位的私钥
const secret = Buffer.from("abq4z47ii8ktu1do");
// 使用 Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8) 生成

// 创建一个随机向量, 如果这么设置重启服务器 npm start 后 token 就会失效, 需要重新登录
const iv = Buffer.from(
  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
);

exports.encrypt = function (str) {
  // 机密的方法
  const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
  let result = cry.update(str, "utf-8", "hex"); // 机密前和机密后的编码格式, 将 utf-8 变成 16 进制
  result += cry.final("hex");
  return result;
};

exports.decrypt = function (str) {
  const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
  let result = decry.update(str, "hex", "utf-8");
  result += decry.final("utf-8");
  return result;
};
