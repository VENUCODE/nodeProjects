const http = require("http");
const fs = require("fs");
const url = require("url");

const replacePlaceholder = (temp, product) => {
  let output = temp.replace(/{%NAME%}/g, product.product_name);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%CATEGORY%}/g, product.category);
  output = output.replace(/{%DISCOUNT%}/g, product.discount);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  return output;
};
const product = fs.readFileSync(`${__dirname}/demo/product.html`, "utf-8");
const products = fs.readFileSync(`${__dirname}/demo/products.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/products.json`, "utf-8");
const dataObj = JSON.parse(data);

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
      const allProducts = dataObj
        .map((item) => replacePlaceholder(product, item))
        .join("");

      const output = products.replace("{%PRODUCTS%}", allProducts);
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.end(output);
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
