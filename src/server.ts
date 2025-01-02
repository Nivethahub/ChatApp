import express from "express";
import apigateway from "./APIGateway/apigateway";
import db from "./Connection/database";
import * as dotenv from "dotenv"
db()
dotenv.config()
const app = express();
app.use(apigateway)
const port = process.env.PORT||""
app.listen(port,()=>{
console.log(`Server is Running on ${port}`);
})
