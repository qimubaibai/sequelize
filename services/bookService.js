// 先请求对应的对象模型
const Book = require("../models/Book");
// 引入操作运算符, where 子句有很多运算符,可以从 Op 中以 Symbols 的形式使用
const { Op } = require("sequelize");

// 给对象模型上添加方法并导出

// 1. 添加管理员
// 传入要添加的书籍信息
// build() + save() 或者 create()
exports.addBook = async function (bookObj) {
  // 使用对象模型的 create 方法添加一条语句并返回结果
  const ins = await Book.create(bookObj);
  return ins.toJSON();
};

// 2. 删除一个管理员账户
// 传入要删除的 id
exports.deleteBook = async function (bookId) {
  const result = await Book.destroy({
    where: {
      id: bookId,
    },
  });
  return result;
};

// 3. 更新一个管理员账户
// 传入要更新的 id 和修改后的内容
exports.updateBook = async function (bookId, bookObj) {
  const result = await Book.update(bookObj, {
    where: {
      id: bookId,
    },
  });
  return result;
};

// 4. 查询关键字, 可以同时匹配书名或者作者
exports.searchBook = async function (keywords) {
  const result = await Book.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${keywords}%` } },
        { author: { [Op.like]: `%${keywords}%` } },
      ],
    },
  });
  // console.log(result);
  return JSON.parse(JSON.stringify(result));
};
