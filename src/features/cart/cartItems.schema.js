import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export const cartItemsscehma = new mongoose.Schema({
  productId: {
    // type:ObjectId
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  userId: {
    // type:ObjectId
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  quantity: Number,
});
