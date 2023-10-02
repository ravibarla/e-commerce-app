//manage route and path to product controller

//1. import express
import express from "express";
import { CartItemController } from "./cartItems.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
//2. initialise express router
const cartRouter = express.Router();

//all the path to  controller
//localhost/api/carts
const cartItemController = new CartItemController();
cartRouter.delete("/:id", jwtAuth, (req, res) => {
  cartItemController.delete(req, res);
});
cartRouter.post("/add", jwtAuth, (req, res) => {
  cartItemController.add(req, res);
});
cartRouter.get("/", jwtAuth, (req, res) => {
  cartItemController.get(req, res);
});

export default cartRouter;
