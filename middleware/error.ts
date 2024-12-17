import { NextFunction,Response,Request} from "express";
import ErrorHandler from "../utils/ErrorHandler";

 export const ErrorHandlerMiddleware = (err:any, req:Request , res:Response , next:NextFunction)=>{

    err.statusCode = err.statusCode || 500 ;
    err.message = err.message || 'Internal Server Error' 

    

    if(err.name==="CasteError"){
   
        const message = `Resource not found Invalid: ${err.path}`
        err = new ErrorHandler(message,400) 
    }

    
    if(err.name==="CasteError"){
   
        const message = `Resource not found Invalid: ${err.path}`
        err = new ErrorHandler(message,400) as any
    }

    //wrong jwt Error

    if(err.name === "JsonWebTokenError"){

        const message = 'Json web token is invalid, try again'
        err = new ErrorHandler(message,400) 

    }

    if(err.name==='TokenExpirdError'){

        const message = 'json web token expired'
        err = new ErrorHandler(message,400) 
    }


     res.status(err.statusCode).json({
                success: false,
                Message:err.message
     })
    
   

}