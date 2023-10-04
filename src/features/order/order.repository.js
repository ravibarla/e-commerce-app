import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }
  async placeOrder(userId) {
    //1. get the cart  and calculate total amount
    await this.getTotalAmount(userId);
    //2. create an order record
    //3. reduce the stock
    //4. clear the cart items
  }
  async getTotalAmount(userId) {
    const db = getDB();
    const items = await db
      .collection("cartItems")
      .aggregate([
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
      ])
      .toArray();
    const finalTotalAmount = items.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );
    console.log("finalTotalAmount :", finalTotalAmount);
    return items;
  }
}
