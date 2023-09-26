//manage route and path to product controller

//1. import express
import express from "express";
import ProductController from "./product.controller.js";
//2. initialise express router
const productRouter = express.Router();

//all the path to  controller
//localhost/api/products
const productController = new ProductController();
productRouter.get("/", productController.getAllProducts);
productRouter.post("/", productController.addProduct);

export default productRouter;
