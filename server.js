//1.import express
import express from "express";
import ProductController from "./src/features/product/product.controller";
import * as ProductRouter from "./src/features/product/product.routes";
//2. create server
const server = express();

//for all request related to product, redirect to product routes
server.use("/api/products", ProductRouter);

//3. default request handler
server.get("/", (req, res) => {
  res.send("welcome to express");
});

//4. create port
const PORT = 3200;
server.listen(PORT, () => console.log("app running in port ", PORT));
