import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/application.error.js";
export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }
  async add(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //find the documente
      //either insert
      //or update
      // await collection.updateOne(
      //   {
      //     productId: new ObjectId(productId),
      //     userId: new ObjectId(userId),
      //   },
      //   {
      //     $inc: {
      //       quantity: quantity,
      //     },
      //   },
      //   {
      //     upsert: true,
      //   }
      // );
      await collection.updateOne(
        {  productId: new ObjectId(productId),userId: new ObjectId(userId),},{$inc:{quantity:quantity}},{upsert:true}
      )
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async get(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const res = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();
      console.log("res :", res);
      return res;
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
  async delete(userId, cartItemId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });
      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
}
