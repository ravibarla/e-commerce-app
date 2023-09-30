//manage route and path to product controller

//1. import express
import express from "express";
import UserController from "./user.controller.js";
//2. initialise express router
const userRouter = express.Router();

//all the path to  controller
//localhost/api/products
const userController = new UserController();
userRouter.post("/signup", userController.signUp);

userRouter.post("/signin", userController.signIn);
// localhost:3200/api/products/filter?minPrice=10&maxPrice=10&&category

export default userRouter;
