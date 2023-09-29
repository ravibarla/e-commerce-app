//1.import express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import bodyParser from "body-parser";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartItem.routes.js";
//2. create server
const server = express();

server.use(bodyParser.json());
server.use(express.json());
//for all request related to product, redirect to product routes
// server.use("/api/products", basicAuthorizer, productRouter);
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);

//3. default request handler
server.get("/", (req, res) => {
  res.send("welcome to express");
});

//4. create port
const PORT = 3200;
server.listen(PORT, () => console.log("app running in port ", PORT));
