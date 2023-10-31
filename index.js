const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer(function (req, res) {
  const pathName = req.url;
  switch (pathName) {
    case "/overview":
      res.end("The overview page");
      break;
    case "/":
      res.end("The overview page");
      break;
    case "/product":
      res.end("The product page");
      break;
    default:
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-header": "custom-header",
      });
      res.end("<h1>404</h1>");
  }
});
server.listen(8000, "localhost", () =>
  console.log("server is running at\n localhost:8000")
);
