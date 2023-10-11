import mongoose from "mongoose";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/application.error.js";
import { ObjectId } from "mongodb";
import { productscehma } from "./product.schema.js";
import { reviewSchema } from "./reviews.schema.js";
import { categorySchema } from "./category.schema.js";
const ProductModel = mongoose.model("Products", productscehma);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);
export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    console.log(newProduct);
    newProduct.cat = newProduct.cat.split(",");
    try {
      //1. adding the product

      console.log(newProduct);
      const newProduct = new ProductModel(newProduct);
      const savedProduct = await newProduct.save();

      //2. update the category
      CategoryModel.updateMany(
        {
          _id: {
            $in: productData.cat,
          },
        },
        {
          $push: { products: new ObjectId(savedProduct._id) },
        }
      );
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
      //1. find product
      const productToUpdate = await ProductModel.findById(productId);
      if (!productToUpdate) {
        throw new Error("product not found");
      }
      //2. find fiexisting review
      const existingReview = await ReviewModel.findOne({
        product: new ObjectId(productId),
        user: new ObjectId(userId),
      });
      if (existingReview) {
        existingReview.rating = rating;
        await existingReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productId),
          user: new ObjectId(userId),
          rating: rating,
        });
        newReview.save();
      }
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
