import { ApplicationError } from "../../error-handler/application.error.js";
import { UserModel } from "../user/user.model.js";
export default class ProductModel {
<<<<<<< HEAD
  constructor(id, name, desc, price, imageUrl, cat, sizes) {
    (this.id = id),
=======
  constructor(name, desc, price, imageUrl, cat, sizes, id) {
    (this._id = id),
>>>>>>> 097a3dab6613f52de9d82cff2c0806c816872ea9
      (this.name = name),
      (this.desc = desc),
      (this.price = price),
      (this.imageUrl = imageUrl),
      (this.cat = cat),
      (this.sizes = sizes);
  }
  static add(product) {
<<<<<<< HEAD
    product.id = product.length + 1;
=======
    product.id = products.length + 1;
>>>>>>> 097a3dab6613f52de9d82cff2c0806c816872ea9
    products.push(product);
    return product;
  }

  static get(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }
  static GetAll() {
    return products;
  }
  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.cat == category)
      );
    });
    return result;
  }
<<<<<<< HEAD
=======
  static rateProduct(userId, productId, rating) {
    //1. validate user id

    const user = UserModel.getAllUsers().find((user) => user.id == userId);
    if (!user) {
      throw new ApplicationError("user not found", 404);
    }
    //2. validate product id
    const product = products.find((product) => product.id == productId);
    if (!product) {
      throw new ApplicationError("product not found", 400);
    }
    //3. validate ratings
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userId, rating });
    } else {
      //check if user rating is already available
      const existingRatingIndex = product.ratings.findIndex(
        (rating) => rating.userId == userId
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userId,
          rating,
        };
      } else {
        //if no existing rating then add new rating
        product.ratings = [];
        product.ratings.push({ userId, rating });
      }
    }
  }
>>>>>>> 097a3dab6613f52de9d82cff2c0806c816872ea9
}

let products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Cateogory1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Cateogory2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Cateogory3",
    ["M", "XL", "S"]
  ),
];
