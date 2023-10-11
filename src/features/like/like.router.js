//manage route and path to product controller

//1. import express
import express from "express";
import { LikeController } from "./like.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
//2. initialise express router
const likeRouter = express.Router();

//all the path to  controller
//localhost/api/carts
const likeController = new LikeController();
likeRouter.post("/", jwtAuth, (req, res, next) => {
  likeController.likeItem(req, res, next);
});
likeRouter.get("/", jwtAuth, (req, res, next) => {
  likeController.getLikes(req, res, next);
});

export default likeRouter;
