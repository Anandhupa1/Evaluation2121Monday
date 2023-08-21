const { UserModel } = require("../models/user.model");

const userRouter = require("express").Router();



userRouter.get("/",async(req,res)=>{
    try {
        let filter ={}
        let data = await UserModel.find();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
//search
userRouter.get("/:name",async(req,res)=>{
    try {
        
        let data = await UserModel.find({name:req.params.name});
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

userRouter.patch("/:id",async(req,res)=>{
    try {
        let user = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})
userRouter.delete("/:id",async(req,res)=>{
    try {let userExists=await UserModel.findById(req.params.id)
        if(!userExists){
            res.status(409).json({message:"no user found with given id"})
        }
        else{
            let out = await UserModel.findByIdAndDelete(req.params.id);
            res.send({message:"deleted successfully",data:out})
        }
       
        
    } catch (error) {
        console.log(error)
    }
})














module.exports ={userRouter};