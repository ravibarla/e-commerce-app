import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/application.error.js";
import { ObjectId } from "mongodb";
export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      //1. get the db
      const db = getDB();
      //2. get the collections
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "something went wrong with the database ",
        500
      );
    }
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "something went wrong with the database ",
        500
      );
    }
  }
  async get(id) {
    try {
      const productId = new ObjectId(id);
      const db = getDB();
      const collection = db.collection(this.collection);
      const product = await collection.find({ _id: productId }).toArray();
      return product[0];
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "something went wrong with the database ",
        500
      );
    }
  }
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return await collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with the database");
    }
    // const result = products.filter((product) => {
    //   return (
    //     (!minPrice || product.price >= minPrice) &&
    //     (!maxPrice || product.price <= maxPrice) &&
    //     (!category || product.cat == category)
    //   );
    // });
    // return result;
  }
}
