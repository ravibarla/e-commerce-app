//1.import express
import express from "express";

//2. create server
const server = express();

//create random get
server.get("/", (req, res) => {
  res.send("welcome to express");
});

//create port
const PORT = 3200;
server.listen(PORT, () => console.log("app running in port ", PORT));
