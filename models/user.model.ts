import mongoose, {Document,Model,Schema} from "mongoose";
require('dotenv').config()
import bcrypt from "bcryptjs"
import { timeStamp } from "console";
import { Mode } from "fs";
import exp from "constants";
import jwt from "jsonwebtoken"

const emailRegexPattern : RegExp =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document{

    name:string;
    password: string;
    email:string;
    avatar:{
        public_id: string;
        url:string;
    },

    role:string;
    isVerified:boolean;
    courses: Array<{courseId: string}>;
    comparePassword: (password:string) => Promise<boolean>; 
    SignAccessToken:()=> string;
    SignRefreshToken: ()=> string
}


const userSchema: Schema<IUser> = new mongoose.Schema({
    name:{
        type:String,
         required:[true,"please enter your name"],
    },

    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        validate:{
            validator:function(value:string){
                return emailRegexPattern.test(value);
            },

            message:"please Enter a valid Email"
        },
        unique:true
    },

    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[6,"password must be at least 6 characters"],
        select:false,
    },

    avatar:{
        public_id:String,
        url: String,
    },

    role:{
        type:String,
        default:"user"
    },


    isVerified:{
        
        type:Boolean,
        default:false,

    },

    courses:[
        {
            courseId:String
        }
    ]

   
},{timestamps:true})


// Hashing the password

userSchema.methods.SignAccessToken =  function(){
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN ||'',{expiresIn:"5m"})
}

userSchema.methods.SignRefreshToken =  function(){
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN ||" ",{expiresIn:"3d"})
}
userSchema.pre<IUser>('save',async function(next){

    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
    next()
})


//compare password

userSchema.methods.comparePassword = async function (enteredPassword:string): Promise<boolean>{

    return await bcrypt.compare(enteredPassword,this.password)
}


const userModel: Model<IUser> = mongoose.model("User",userSchema)
export default userModel;