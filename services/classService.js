// 先请求对应的对象模型
const Class = require("../models/Class");

// 给对象模型上添加方法并导出

// 1. 添加管理员
// 传入要添加的班级信息
// build() + save() 或者 create()
exports.addClass = async function (classObj) {
  // 使用对象模型的 create 方法添加一条语句并返回结果
  const ins = await Class.create(classObj);
  return ins.toJSON();
};

// 2. 删除一个管理员账户
// 传入要删除的 id
exports.deleteClass = async function (classId) {
  const result = await Class.destroy({
    where: {
      id: classId,
    },
  });
  return result;
};

// 3. 更新一个管理员账户
// 传入要更新的 id 和修改后的内容
exports.updateClass = async function (classId, classObj) {
  const result = await Class.update(classObj, {
    where: {
      id: classId,
    },
  });
  return result;
};
