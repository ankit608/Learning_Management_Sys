import express, { Request, Response, NextFunction }  from "express"
export const app = express();
import cors from "cors"
require('dotenv').config()
import {ErrorHandlerMiddleware} from "./middleware/error";
import UserRouter from "./Routes/user.route";

import cookieParser from "cookie-parser";

console.log(process.env.ORIGIN)

app.use(cors({
   origin: process.env.ORIGIN,
   credentials:true
}))
app.use(cookieParser())
app.use(express.json({limit:"50mb"}))




// testing route

app.get("/test",(req: Request, res: Response, next: NextFunction)=>{
   res.status(200).json({
      success:true,
      message:"API is working"
   });

});
// routes
app.use("/api/v1",UserRouter)

app.all("*",(req:Request, res:Response, next: NextFunction)=>{
 const err = new Error(`Route ${req.originalUrl} not found`) as any;

 err.statusCode = 404

 next(err)
  
})

app.use(ErrorHandlerMiddleware)