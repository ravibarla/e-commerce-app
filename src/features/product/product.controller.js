import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res, next) {
    const products = ProductModel.GetAll();
    console.log("products :", products);
    res.status(200).send(products);
    next();
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const recordCreated = ProductModel.add(newProduct);
    res.status(201).send(recordCreated);
  }
  rateProduct(req, res) {}
  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      return res.status(404).send("product not foound");
    } else {
      return res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }
}
