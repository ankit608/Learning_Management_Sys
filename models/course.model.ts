import mongoose,{Document,Model,Schema} from "mongoose";

interface IComment extends Document{
    user:object,
    question:string,
    questionReplies:IComment[]
}

interface IReview extends Document{
    user:Object,
    rating:number,
    comment:string
    commentReplies: IComment[];
}


interface ILink extends Document{
    title:string,
    url:string
}


interface ICourseData extends Document{
    title:string,
    description:string,
    videoURL: string;
    videoThumbnail:object,
    videoSection:string,
    vidoeLength:number,
    videoPlayer:string,
    links:ILink[]
    suggestion:string,
    questions:IComment[]
}


interface ICourse extends Document{
    name:string,
    description?:string,
    price: number,
    estimatedPrice?:number,
    thumbnail:object,
    
    tags: string,
    level:string
    demoUrl:string
    benefits:{title:string}[],
    prerequisites:{title:string}[];
    reviews:IReview[];
    courseData:ICourseData[];
    ratings?:number
    purchased?:number

}


const reviewSchme = new Schema<IReview>({
    user:Object,
    rating:{
        type:Number,
        default:0
    },

    comment:String,


})

const LinkSchema = new Schema<ILink>({
    title:String,
    url:String
})

const commentSchema = new Schema<IComment>({
   
    user:Object,
    question:String,
  questionReplies: [Object]
})

const courseDataSchema = new Schema<ICourseData>({
    videoURL: String,
    title: String,
    videoSection: String,
    description: String,
    vidoeLength:Number,
    videoPlayer:String,
    links:[LinkSchema],
    suggestion:String,
    questions:[commentSchema]



})

const courseSchema = new Schema<ICourse>({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
       type:Number,
       required:true
    },

estimatedPrice:{
    type:Number
},

thumbnail:{
    public_id:{
    
        type:String
    },

    
 url:{
    
    type:String
 }
},

tags:{
    type:String,
    required:true

},

level:{
    type:String,
    required:true
},

demoUrl:{
    type:String,
    required:true
},

benefits:[{title:String}],

prerequisites:[{title:String}],
reviews: [reviewSchme],
courseData:[courseDataSchema],
ratings:{
    type:Number,
    default:0
},

purchased:{
    type:Number,
    default:0

}
})

const CourseModel: Model<ICourse> = mongoose.model("Course",courseSchema)
export default CourseModel 