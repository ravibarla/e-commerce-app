//1.import express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
//2. create server
const server = express();

server.use(bodyParser.json());
//for all request related to product, redirect to product routes
server.use("/api/products", productRouter);

//3. default request handler
server.get("/", (req, res) => {
  res.send("welcome to express");
});

//4. create port
const PORT = 3200;
server.listen(PORT, () => console.log("app running in port ", PORT));
