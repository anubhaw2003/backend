//  require('dotenv').config({path: './env'});
import dotenv from 'dotenv'
 import connectDB from "./db/db.js";

 dotenv.config({
    path:'./env'
 });
 // this can be directly done in package.json script section
 

 connectDB();












//1. Method 1
//  import express from "express"
//  const app = express();

// ( async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error Detected : ",error)
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App Listening on port -> http://localhost:${process.env.PORT}`)
//         })
        
//     } catch (error) {
//         console.error("Error : ",error);
//         throw error
        
//     }
// })()