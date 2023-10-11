import mongoose from "mongoose";
import { Schema } from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name can't be greater then 25 character"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\../, "not a valid email"],
  },
  password: {
    type: String,
      // validate: {
      //   validator: function (value) {
      //     return /^[A-Za-z\d]{2,8}$/.test(value);
      //   },
      //   message: "password should be 2-8 character and have a special ",
      // },
  },
  type: { type: String, enum: ["Customer", "Seller"] },
});
