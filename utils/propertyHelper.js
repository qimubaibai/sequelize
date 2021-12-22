// 对拿到的数据对象进行处理, 只保留需要的属性
exports.pick = function (obj, ...props) {
  // 判断如果传入的 obj 如果不是对象的话就直接
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) {
      // 如果传入参数中包含 key 的话就将 key 对应的属性名和属性值赋值给 newObj
      newObj[key] = obj[key];
    }
  }
  return newObj; // 只返回一项 name 是因为 return 的位置错了
};
