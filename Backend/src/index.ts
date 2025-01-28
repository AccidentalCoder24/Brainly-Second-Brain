import express from "express" ;
import mongoose from "mongoose";
import jwt from "jsonwebtoken" ;
// import cors from "cors" ;
import { UserModel,ContentModel } from "./db";
import { JWT_SECRET } from "./config";
import {userMiddleware} from "./middleware" ;

const app = express() ;
app.use(express.json()) ;
// app.use(cors()) ;

app.post("/api/v1/signup",async (req,res)=>{
    const username = req.body.username ; //I will add zod later
    const password = req.body.password ;

    try {
        await UserModel.create({username,password}) ;
        res.json({message : "Congratulations, You are signed up"})
    } catch(e) {
        res.status(409).json({message : "Username already exists"})
    }
})

app.post("/api/v1/signin", async (req,res)=>{
    const username = req.body.username ;
    const password = req.body.password ;

    const existinguser = await UserModel.findOne({username,password}) ;

    if (existinguser){
       const token = jwt.sign({id : existinguser._id},JWT_SECRET) ;
       res.json({token}) ;
    }  else {
        res.status(403).json({message : "Wrong username or password"}) ;
    }
})

app.post("/api/v1/content",userMiddleware,async (req,res)=>{
    const {title,type,link} = req.body ;

    await ContentModel.create({
        //@ts-ignore
        title,type,link, userId:req.userId , tags:[]
    })

    res.json({message:"Content Added"}) ;
})

app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId = req.userId ;

    const content = await ContentModel.find({userId:userId}).populate("userId","username") ;

    res.json(content) ;
})

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const contentId = req.body.contentId ;
    //@ts-ignore
    await ContentModel.deleteMany(contentId,{userId : req.userId}) ;

    res.json({message : "Successfully deleted"}) ;
})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.post("/api/v1/brain/:shareLink",(req,res)=>{

})

app.listen(3000) ;
