//manage route and path to product controller

//1. import express
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileUpload.middleware.js";
<<<<<<< HEAD
=======
import jwtAuth from "../../middlewares/jwt.middleware.js";
>>>>>>> 097a3dab6613f52de9d82cff2c0806c816872ea9
//2. initialise express router
const productRouter = express.Router();

//all the path to  controller
//localhost/api/products
const productController = new ProductController();
<<<<<<< HEAD
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/", productController.getAllProducts);
productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/:id", productController.getOneProduct);
=======
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
>>>>>>> 097a3dab6613f52de9d82cff2c0806c816872ea9

// localhost:3200/api/products/filter?minPrice=10&maxPrice=10&&category

export default productRouter;
