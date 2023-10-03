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
  //product should have minimum price and specefic category
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      categories = JSON.parse(categories.replace(/'/g, '"'));
      console.log("categories :", categories);
      if (categories) {
        filterExpression = {
          $or: [{ cat: { $in: categories } }, filterExpression],
        };
        // filterExpression.category = category;
      }
      return await collection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: 3 } })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with the database", 500);
    }
  }
  async rateProduct(userId, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      // if exist then remove the existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $pull: {
            ratings: {
              userId: new ObjectId(userId),
            },
          },
        }
      );
      // or add a new entry

      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: {
            ratings: { userId: new ObjectId(userId), rating },
          },
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with the database", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            //1. stage 1 get average product price per category
            $group: { _id: "$cat", averagePrice: { $avg: "$price" } },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with the database", 500);
    }
  }
}
