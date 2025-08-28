import {app} from "./app"
import connect from "./utils/db";
require("dotenv").config();
import {v2 as cloudinary }from "cloudinary"

//cloudinary config

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is connected to the ${process.env.PORT}`);
    connect();
})

//create server