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

server.listen(port)
console.log("server is running in 3200 port")