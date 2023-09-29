//manage route and path to product controller

//1. import express
import express from "express";
import { CartItemController } from "./cartItems.controller.js";
//2. initialise express router
const cartRouter = express.Router();

//all the path to  controller
//localhost/api/carts
const cartItemController = new CartItemController();
cartRouter.post("/add", cartItemController.add);
cartRouter.get("/", cartItemController.get);

export default cartRouter;
