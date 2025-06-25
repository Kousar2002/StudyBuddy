// require("dotenv").config();
// const mongoose=require("mongoose");
// const connectDB=async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MongoDB connected");
//     }catch(err){
//         console.error(err.message);
//         process.exit(1);
//     }
    
// };
// // connectDB();
// module.exports=connectDB;
// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
