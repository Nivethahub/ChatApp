// import express from "express";
// import apigateway from "./APIGateway/apigateway";
// import db from "./Connection/database";
// import * as dotenv from "dotenv"
// db()
// dotenv.config()
// const app = express();
// app.use(apigateway)
// const port = process.env.PORT||""
// app.listen(port,()=>{
// console.log(`Server is Running on ${port}`);
// })
import express from "express";
import apigateway from "./APIGateway/apigateway";
import db from "./Connection/database";
import * as dotenv from "dotenv"
import cors from 'cors'
dotenv.config()
const app = express();
app.use(cors())
// app.use(function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     // res.setHeader('Access-Control-Allow-Credentials', true);
//   });
app.use(express.json())
db()
app.use(apigateway)
app.get('/',(req,res)=>{
    console.log("this is server");
    res.send("This is a backend server")
})
const port = process.env.PORT||""
app.listen(port,()=>{
console.log(`Server is Running on ${port}`);
})
