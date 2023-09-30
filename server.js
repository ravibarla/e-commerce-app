//1.import express
import express from "express";
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import bodyParser from "body-parser";

// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartItem.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import cors from "cors";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
//2. create server
const server = express();

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use(bodyParser.json());
server.use(express.json());

//CORS policy configuration
var corsOptions = {
  origin: "http://127.0.0.1:5500",
};
server.use(cors(corsOptions));
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); //"http://127.0.0.1:5500"
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");

//return ok for preflight request
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

//for all request related to product, redirect to product routes
// server.use("/api/products", basicAuthorizer, productRouter);
// server.use("/api/products", jwtAuth, productRouter);
server.use(loggerMiddleware);
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);

server.use("/api/cartItems", jwtAuth, cartRouter);
//middleware to handle 404
server.use((req, res) => {
  return res
    .status(404)
    .send(
      "API not found. please checkout our documentation for more information at localhost:3200/api-docs"
    );
});

//3. default request handler
server.get("/", (req, res) => {
  res.send("welcome to express");
});

//4. create port
const PORT = 3200;
server.listen(PORT, () => console.log("app running in port ", PORT));
