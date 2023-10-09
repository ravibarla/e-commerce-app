import { ObjectId } from "mongodb";
import { getDB, getClient } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../error-handler/application.error.js";
export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }
  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();

      session.startTransaction();
      //1. get the cart  and calculate total amount
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      //2. create an order record
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      db.collection(this.collection).insertOne(newOrder, { session });

      //3. reduce the stock
      for (let item of items) {
        await db.collection("products").updateOne(
          {
            _id: item.productId,
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          { session }
        );
      }
      throw new Error("something went wrong in placing order");

      //4. clear the cart items}
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });
      session.commitTransaction();
      session.endSession();
      return;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw new ApplicationError(
        "something went wrong with the database ",
        500
      );
    }
  }
  async getTotalAmount(userId, session) {
    const db = getDB();
    const items = await db
      .collection("cartItems")
      .aggregate(
        [
          //1. get the cart items for the user
          {
            $match: {
              userId: new ObjectId(userId),
            },
          },
          //2. get the products from product collection
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          //3. unwind the productinfo
          {
            $unwind: "$productInfo",
          },
          //4. calculate totalAmount for each cart items
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    const finalTotalAmount = items.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );
    console.log("finalTotalAmount :", finalTotalAmount);
    return items;
  }
}
