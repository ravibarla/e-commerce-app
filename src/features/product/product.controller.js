import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(200).send("something went wrong ");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, desc, price, cat, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        cat,
        sizes.split(",")
      );

      const recordCreated = await this.productRepository.add(newProduct);
      res.status(201).send(recordCreated);
    } catch (err) {
      console.log(err);
      res.status(200).send("something went wrong ");
    }
  }
  rateProduct(req, res, next) {
    try {
      const userId = req.query.userId;
      const productId = req.query.productId;
      const rating = req.query.rating;

      ProductModel.rateProduct(userId, productId, rating);
      return res.status(200).send("rating successfully done");
    } catch (err) {
      console.log("passing error to middleware");
      next(err);
    }

    // const userId = req.query.userId;
    // const productId = req.query.productId;
    // const rating = req.querys.rating;
    // // try {
    // ProductModel.rateProduct(userId, productId, rating);
    // // }
    // // catch (err) {
    // // return res.status(400).send(err.message);
    // // }
    // return res.status(200).send("rating successfully done");
    // // const error = ProductModel.rateProduct(userId, productId, rating);
    // // if (error) {
    // //   return res.status(400).send(err);
    // // } else {
    // //   return res.status(200).send("rating successfully done");
    // // }
  }
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product =await this.productRepository.get(id);
      if (!product) {
        return res.status(404).send("product not foound");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      res.status(200).send("something went wrong ");
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
