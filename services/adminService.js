// 先请求对应的对象模型
const Admin = require("../models/Admin");
const md5 = require("md5");
// 给对象模型上添加方法并导出

// 1. 添加管理员
// 传入要添加的管理员信息
// build() + save() 或者 create()
exports.addAdmin = async function (adminObj) {
  // 如果想要保证数据的唯一性, 需要先验证用户是否已经存在, 以及请求的数据格式是否满足要求
  // ...

  // 将密码使用 md5 机密
  if (adminObj.adminPwd) {
    adminObj.adminPwd = md5(adminObj.adminPwd);
  }

  // 使用对象模型的 create 方法添加一条语句并返回结果
  const ins = await Admin.create(adminObj); // 增加一条数据
  return ins.toJSON();
};

// 2. 删除一个管理员账户
// 传入要删除的 id
exports.deleteAdmin = async function (adminId) {
  const result = await Admin.destroy({
    where: {
      id: adminId,
    },
  });
  return result;
};

// 3. 更新一个管理员账户
// 传入要更新的 id 和修改后的内容
exports.updateAdmin = async function (adminId, adminObj) {
  // 使用 md5 对密码进行加密
  if (adminObj.adminPwd) {
    adminObj.adminPwd = md5(adminObj.adminPwd);
  }
  const result = await Admin.update(adminObj, {
    where: {
      id: adminId,
    },
  });
  return result;
};
// 4. 登录验证功能
// 传入的时候就将密码进行加密
exports.login = async function (loginId, loginPwd) {
  // loginPwd = md5(adminPwd);
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd,
    },
  });
  // 如果需要区分大小写需要另外判断 result 中的数值
  if (result === null) {
    return null;
  } else {
    return result.toJSON();
  }
  // console.log(result);
};
