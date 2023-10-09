import mongoose from "mongoose";
import { Schema } from "mongoose";

export const productscehma = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  cat: String,
  inStock: Number,
});
