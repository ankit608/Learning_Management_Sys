import {app} from "./app"
import connect from "./utils/db";
require("dotenv").config();

app.listen(process.env.PORT,()=>{
    console.log(`Server is connected to the ${process.env.PORT}`);
    connect();
})

//create server