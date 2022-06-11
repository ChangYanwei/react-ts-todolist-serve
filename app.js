const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  //设置预检请求的有效期
  res.header("Access-Control-Max-Age", 1728000);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});
app.use(router);

app.listen(9105, function () {
  console.log("服务器启动成功： http://localhost:9105");
});
