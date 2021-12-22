// 单独设定一个 init 文件, 用来数据的初始化, 已经服务层中 validate.js 验证添加扩展 datetime 的初始化
require("./services/init");
require("./models/sync");
require("./routers/init"); // api 的初始化
