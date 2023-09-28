<<<<<<< HEAD
//1. import express
import express from "express"

//2. create server
const server=express()

//3. default request handler
server.get("/",(req,res)=>{
res.send("welcome to e-commerce app")
})

//4. specify the port
const port=3200

server.listen(port,()=>console.log("server is running in 3200 port"))
=======
//1.import express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
//2. create server
const server = express();

server.use(bodyParser.json());
//for all request related to product, redirect to product routes
server.use("/api/products", productRouter);

//3. default request handler
server.get("/", (req, res) => {
  res.send("welcome to express");
});

//4. create port
const PORT = 3200;
server.listen(PORT, () => console.log("app running in port ", PORT));
>>>>>>> 08dad8ae65ca9f1f1637132156a83e5a1aaa6891
