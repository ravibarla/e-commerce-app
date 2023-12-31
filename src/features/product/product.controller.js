import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res, next) {
    const products = ProductModel.GetAll();
    // console.log("products :", products);
    res.status(200).send(products);
    next();
  }

  addProduct(req, res) {
    const { name, desc, price, cat, sizes } = req.body;
    const newProduct = {
      name,
      desc,
      price: parseFloat(price),
      imageUrl: req.file.filename,
      cat,
      sizes: sizes.split(","),
    };
    const recordCreated = ProductModel.add(newProduct);
    res.status(201).send(recordCreated);
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
