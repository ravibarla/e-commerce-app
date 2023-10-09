//manage route and path to product controller

//1. import express
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
//2. initialise express router
const userRouter = express.Router();

//all the path to  controller
//localhost/api/products
const userController = new UserController();
userRouter.put("/resetPassword", jwtAuth, (req, res, next) => {
  userController.resetPassword(req, res, next);
});
userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});

userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
// localhost:3200/api/products/filter?minPrice=10&maxPrice=10&&category

export default userRouter;
