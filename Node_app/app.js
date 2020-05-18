// 引入模块
const http = require("http");
const fs = require("fs");

//读取文件
fs.readFile("index.html", (err, data) => {
  if (err) throw err;
  //创建服务器
  const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader = ("Content-type", "text/plain");
    res.writeHead(200, { "Content-type": "text/html" });
    res.write(data);
    res.end();
  });

  //定义端口号
  const port = 5000;

  //监听端口号
  server.listen(port, () => console.log(`服务器已经在${port}号运行...`));
});
