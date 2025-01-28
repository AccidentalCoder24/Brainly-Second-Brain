import mongoose,{Schema,model, mongo} from "mongoose";

mongoose.connect("mongodb+srv://chirag24:Mpf6IAfoTj1j3QZl@cluster0.owmoe.mongodb.net/Brainly-Your-Second-Brain") ;

const UserSchema = new Schema({
    username : {type:String, unique:true} ,
    password : {type:String}
})

export const UserModel = model("Users",UserSchema) ;

const ContentSchema = new Schema({
    title : {type:String},
    link : {type:String} ,
    tags : [{type:mongoose.Types.ObjectId, ref :"Tag"}],
    userId : [{
        type:mongoose.Types.ObjectId ,
        ref : "Users" ,
        required : true 
    }]
})

export const ContentModel = model("Content",ContentSchema) ;

const LinkSchema = new Schema({
    hash : String ,
    userId : {type:mongoose.Types.ObjectId , required : true , unique:true,ref:"Users"}
})

export const LinkModel = model("Links",LinkSchema) ;