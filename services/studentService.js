// 先请求对应的对象模型
const Student = require("../models/Student");
const validate = require("validate.js");
const Class = require("../models/Class");
const moment = require("moment");
const { pick } = require("../utils/propertyHelper");
const { Op } = require("sequelize");

// 给对象模型上添加方法并导出

// 1. 添加管理员
// 传入要添加的学生信息
// build() + save() 或者 create()
// 添加学生的时候对传入的对象使用 validate.js 进行数据验证
exports.addStudent = async function (studentObj) {
  // 对传入的 obj 进行筛选, 避免传入 deleteAt 等不需要的参数, 污染数据库
  studentObj = pick(studentObj, "name", "birthday", "sex", "mobile", "ClassId");
  // console.log("pick 后的对象", studentObj);
  // 给里面的属性添加一个配置条件, 判断 ClassID 是否存在
  validate.validators.classExist = async function (value) {
    const result = await Class.findByPk(value);
    if (result) {
      return;
    }
    return "Class is not exist";
  };
  // 先进行一个数据验证
  const rules = {
    name: {
      // presence: true, // 不能为空(但是可以填空字符串或者空对象)
      presence: {
        allowEmpty: false, // 可以识别为空的字符串 "" {} [] " " 四种空值
      },
      type: "string", // 限定变量类型
      length: {
        // 限定字符串的长度
        minimum: 1,
        maximum: 10,
      },
    },
    birthday: {
      //对日期要使用 validate 扩展 datetime 方法定义接收的格式, 可以配置 datetime 属性
      presence: {
        allowEmpty: false, // 可以识别为空的字符串 "" {} [] " " 四种空值
      },
      datetime: {
        // 里面的内容就是传入 datetime 方法的 options
        dateOnly: true, // 只显示日期
        ealiest: +moment.utc().subtract(100, "y"), // 当前的年份减去 100
        latest: +moment.utc().subtract(5, "y"),
      },
    },
    sex: {
      type: "boolean",
      presence: true, // 必填
    },
    mobile: {
      presence: true,
      format: /1\d{10}/, // 匹配正则格式
    },
    ClassId: {
      // type:"integer", // 数字整型, 也可以使用 numericality 属性配置
      numericality: {
        onlyInteger: true, // 只能是整型
        strict: false, // 非严格模式, 数字字符串也可以
      },
      presence: true,
      //添加自定义属性条件
      classExist: true,
    },
  };

  // 使用对象模型的 create 方法给数据库中添加一条语句并返回结果
  const ins = await Student.create(studentObj);
  return ins.toJSON();
};

// 2. 删除一个学生信息
// 传入要删除的 id
exports.deleteStudent = async function (studentId) {
  const result = await Student.destroy({
    where: {
      id: studentId,
    },
  });
  return result;
};

// 3. 更新一个学生信息
// 传入要更新的 id 和修改后的内容
exports.updateStudent = async function (studentId, studentObj) {
  const result = await Student.update(studentObj, {
    where: {
      id: studentId,
    },
  });
  return result;
};

// 4. 得到学生的数据
exports.getStudent = async function (
  page = 1,
  limit = 10,
  sex = -1,
  name = ""
) {
  const where = {};
  if (sex !== -1) {
    // 如果不是 -1 就将条件添加到 where 中
    where.sex = sex;
  }
  if (name) {
    // 如果传入的 name 存在的话
    where.name = {
      [Op.like]: `%${name}%`, // 选择包含 name 关键字的学生信息
    };
  }
  // 传入 limit 和 page 可以实现分页
  const result = await Student.findAndCountAll({
    attributes: ["id", "name", "birthday", "sex", "ClassId", "age"], // 可以自定义输出内容, 包含虚拟字段
    where, // 配置 page 和 limit 对应的数据
    include: [Class], // 关联另一张 Class 表
    offset: (page - 1) * limit,
    limit: +limit,
  });
  return JSON.parse(JSON.stringify(result));
};
