import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
//extended means object inside object means complex object handling
app.use(express.static('public'))
app.use(cookieParser())

app.get('/',()=>{
    console.log("server started successfully")
})


export {app};