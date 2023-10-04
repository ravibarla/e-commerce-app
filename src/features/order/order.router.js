//manage route and path to product controller

//1. import express
import express from "express";
import  OrderController  from "./order.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
//2. initialise express router
const orderRouter = express.Router();

//all the path to  controller
//localhost/api/carts
const orderController = new OrderController();
orderRouter.post("/", jwtAuth, (req, res, next) => {
  orderController.placeOrder(req, res, next);
});

export default orderRouter;
