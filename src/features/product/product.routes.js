//manage route and path to product controller

//1. import express
import express from "express";
import ProductController from "./product.controller";
//2. initialise express router
const router = express.Router();

//all the path to  controller
//localhost/api/products
const productController = new ProductController();
router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);

export default router;
