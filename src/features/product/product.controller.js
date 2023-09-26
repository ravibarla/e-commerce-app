import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res, next) {
    const products = ProductModel.GetAll();
    console.log("products :", products);
    res.status(200).send(products);
    next();
  }
  addProduct(req, res) {}
  rateProduct(req, res) {}
  getOneProduct(req, res) {}
}
