import { ApplicationError } from "../../error-handler/application.error.js";
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
  async rateProduct(req, res) {
    try {
      const userId = req.userId;
      const productId = req.body.productId;
      const rating = req.body.rating;
      await this.productRepository.rateProduct(userId, productId, rating);

      res.status(200).send("rating successfully done");
    } catch (err) {
      console.log("passing error to middleware");
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
      const product = await this.productRepository.get(id);
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

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      // const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(
        minPrice,

        categories
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(200).send("something went wrong ");
    }
  }
}
