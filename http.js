const http = require("http");
const fs = require("fs");

const HOME_Page = fs.readFileSync("index.html");
const ABOUT_Page = fs.readFileSync("about.html");
const PAGE404 = fs.readFileSync("404.html");

const hostname = "127.0.0.1";
const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    return res.end(HOME_Page);
  } else if (url === "/about") {
    return res.end(ABOUT_Page);
  } else {
    res.end(PAGE404);
  }
});

server.listen(PORT, hostname, () => {
  console.log(`SERVER IS RUNING  http://${hostname}:${PORT}`);
});
