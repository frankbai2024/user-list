//npm init
//npm install express cors
//npm i nodemon -D
//npx nodemon server.js

const express = require("express");
const router = require("./router");
const cors = require("cors");

//create a web server
const app = express();
app.use(express.json()); //在调用之前解析JSON里的body数据
//一定要在路由配置之前解决跨域问题
app.use(cors());
app.use(router);

const PORT = 8080;

app.listen(PORT, function () {
  console.log("server is running on http://localhost:8080");
});
