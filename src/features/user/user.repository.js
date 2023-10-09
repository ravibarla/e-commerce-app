import mongoose, { Schema } from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/application.error.js";
//creating model from schemas
const UserModel = mongoose.model("Users", userSchema);

export default class UserRepository {
  async resetPassword(userId, hashedPassword) {
    try {
      let user = await UserModel.findById(userId);
      user.password = hashedPassword;
      user.save();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }
  async signUp(userData) {
    try {
      //create instance of model
      const newUser = new UserModel(userData);
      await newUser.save();
      return newUser;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        next(err);
      }
    }
  }
  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }
}
