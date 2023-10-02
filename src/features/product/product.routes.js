//manage route and path to product controller

//1. import express
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileUpload.middleware.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
//2. initialise express router
const productRouter = express.Router();

//all the path to  controller
//localhost/api/products
const productController = new ProductController();
productRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});

productRouter.post("/rate", jwtAuth, (req, res) => {
  productController.rateProduct(req, res);
});
productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

// localhost:3200/api/products/filter?minPrice=10&maxPrice=10&&category

export default productRouter;
