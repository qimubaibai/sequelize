// 通过 axios 和 cheerio 将豆瓣图书中的封面链接, 书名, 出版时间 和作者抓取到数据库中
const axios = require("axios").default;
// 在使用 commonjs 引入的时候, get 等方法被封装到了 default 中
const cheerio = require("cheerio");
const Book = require("../models/Book");

// 1. 方法一, 根据网页链接, 通过 axios 请求拿到页面的 html 结构,
//           再使用 cheerio 解析 html 的结构来像 jquery 一样选中需要的标签和文本信息
async function getBookHtml() {
  const resp = await axios.get("https://book.douban.com/latest");
  //   console.log(resp);
  return resp.data;
}

// 2. 方法二, 通过使用 cheerio.load 方法对 html 结构进行解析
async function getBookLinks() {
  const html = await getBookHtml();
  const $ = cheerio.load(html);
  // 得到所有的li 标签下的 a 标签, 包含详情页的链接
  const lis = $("#content .grid-16-8 li .media__img a");
  const links = lis
    .map((index, ele) => {
      // jquery 中的 map() 包含一个回调函数,
      // $(selector).map(callback(index,domElement)), 可以返回只包含某个特定属性的新的 jquery 对象
      return ele.attribs["href"];
      // 得到的是每个节点的 $ 对象
    })
    .get();
  // jquery 中有 .get(index) 方法, 可以得到第n 个匹配的元素, 比如get(0), 如果不传参得到的就是一个真实的数组
  return links;
  //得到了所有的书籍详情页链接
}

// 3. 方法三, 通过传入一个详情页链接得到该本书籍的信息, 书名, 作者, 出版时间, 封面图片
async function getDetailInfo(detailUrl) {
  const resp = await axios.get(detailUrl);
  const $ = cheerio.load(resp.data);
  const name = $("#wrapper h1 span").text(); // 书名
  const author = $("#info span.pl")
    .filter((index, ele) => {
      return $(ele).text().includes("作者"); // 使用字符串的 .includes("文本") 方法
    })
    .next("a")
    .text(); // 作者
  const publicDate = $("#info span.pl")
    .filter((index, ele) => {
      return $(ele).text().includes("出版年"); // 使用字符串的 .includes("文本") 方法
    })[0] // 变成 Dom 元素, 拿到兄弟节点的值
    .nextSibling.nodeValue.trim(); // 出版时间
  const imageUrl = $("#content a.nbg").attr("href");
  return {
    name,
    author,
    publicDate,
    imageUrl,
  };
}

// getDetailInfo("https://book.douban.com/subject/35640914/").then((detail) => {
//   console.log(detail);
// });

// 4. 方法四, 将使用方法二得到的详情页链接, 分别传给方法三, 将方法三得到的结果对象组成数组, 批量添加到数据库 book 表
async function fetchAll() {
  const links = await getBookLinks(); // 链接的数组
  const booksInfo = links.map((ele) => {
    return getDetailInfo(ele);
  }); // 得到书籍信息对象的数组
  return Promise.all(booksInfo); // 使用 promise.all 等待全部的 promise 拿到 resolve 结果
}

// 5. 将请求到的数据添加到数据库 book 表中
async function saveToDB() {
  const result = await fetchAll();
  //   console.log(result);
  Book.bulkCreate(result);
}

saveToDB();
