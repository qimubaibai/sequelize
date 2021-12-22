// 同步所有的数据库表格
// require("./models/sync");

//直接调用 init 初始化请求(包含各层的初始化操作)
require("./init");

const Student = require("./models/Student");
// 加入模拟数据
// require("./mock/mockStudent");  // 已经加入就没用了
// require("./mock/mockClass");   // 已经加入就没用了
// 书籍信息使用去网站抓取

// 验证spiderBook 的方法
// require("./spider/spiderBook"); // 添加数据到 book 表中

// 验证添加用户的功能
const adminServ = require("./services/adminService");
// adminServ
//   .addAdmin({
//     loginId: "admin",
//     loginPwd: "123123",
//   })
//   .then((resp) => {
//     console.log("添加用户成功");
//     console.log(resp);
//   });

// 验证删除用户的功能;
// adminServ.deleteAdmin(10).then((resp) => {
//   console.log("删除用户成功");
//   console.log(resp);
// });

// 验证更新用户的功能;
// adminServ
//   .updateAdmin(9, {
//     loginId: "newAdmin",
//     loginPwd: "123456",
//   })
//   .then((resp) => {
//     console.log("更新用户成功");
//     console.log(resp);
//   });

// 验证用户登录的功能
adminServ.login("admin", "123124").then((resp) => {
  console.log("验证登录信息", resp);
});

// 验证书籍的搜索功能
const bookServ = require("./services/bookService");
bookServ.searchBook("张").then((resp) => {
  console.log("验证搜索信息", resp);
});

// 验证添加用户或者学生的时候数据验证功能
const studentServ = require("./services/studentService");
// studentServ
//   .addStudent({
//     name: "abc",
//     birthday: "2020-03-24",
//     sex: true,
//     mobile: "12345678910",
//     ClassId: 2,
//   })
//   .then(() => {
//     console.log("添加成功");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// 验证学生的查询功能 ,得到所有学生的信息
studentServ.getStudent().then((resp) => {
  console.log(resp.rows[0].age);
  // console.log(resp);
});
