//manage route and path to product controller

//1. import express
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileUpload.middleware.js";
//2. initialise express router
const productRouter = express.Router();

//all the path to  controller
//localhost/api/products
const productController = new ProductController();
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/", productController.getAllProducts);
productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/:id", productController.getOneProduct);

// localhost:3200/api/products/filter?minPrice=10&maxPrice=10&&category

export default productRouter;
