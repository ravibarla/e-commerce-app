import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {
  async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        on_model: "Products",
      });
      await newLike.save();
    } catch (err) {
      console.log(err);
      console.log("something went wrong with database");
    }
  }
  async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeableId: new ObjectId(categoryId),
        on_model: "Category",
      });
      await newLike.save();
    } catch (err) {
      console.log(err);
      console.log("something went wrong with database");
    }
  }
  async getLikes(type, id) {
    // return await LikeModel.find({ likeable: new ObjectId(id) });
    return await LikeModel.find({ likeable: new ObjectId(id), on_model: type })
      .populate("user")
      .populate({ path: "likeable", model: type });
  }
}
