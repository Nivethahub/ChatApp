import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config()
const db=async():Promise<void>=>{
try {
    const mongoUrl = process.env.MONGO_URI||""
    await mongoose.connect(mongoUrl)
    console.log("Connected to Database");
    
} catch (error:any) {
    console.log("Database not connected:",error.message);
    
}
}
export default db