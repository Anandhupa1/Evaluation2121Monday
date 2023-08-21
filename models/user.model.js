const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String},
    specialization:{type:String},
    experience:{type:Number},
    location:{type:String},
    date: {type: Date, default: Date.now},
    slots:{type:Number},
    fee:{type:Number},
})
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password,10);
    
    }
     next();
 });

const UserModel = mongoose.model('user',userSchema)
module.exports = {UserModel}