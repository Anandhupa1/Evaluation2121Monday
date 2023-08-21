const { AppointmentModel } = require("../models/appointment.model");
const appointmentRouter = require("express").Router();



appointmentRouter.get("/",async(req,res)=>{
    try {
        let filter ={}
        if(req.query.s){filter.specialization=req.query.s}
        let sort=1;
        if(req.query.sort=="desc"){sort=-1}
        let data = await AppointmentModel.find(filter).sort({date:sort});
        res.send(data);
    } catch (error) {
        console.log(error)
    }
})
appointmentRouter.post("/",validateAppointment,async(req,res)=>{
    try {
        let appointmentExists = await AppointmentModel.findOne({name:req.body.name})
        if(appointmentExists){
            res.status(409).json({message:"appointment allready exists"})
        }else{
            let newAppointment = new AppointmentModel(req.body);
            await newAppointment.save();
            res.send(newAppointment)
        }
       
    } catch (error) {
        console.log(error)
    }
})
//search
appointmentRouter.get("/:name",async(req,res)=>{
    try {
        
        let data = await AppointmentModel.find({ name: { $regex: req.params.name} });
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

appointmentRouter.patch("/:id",async(req,res)=>{
    try {
        let user = await AppointmentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})
appointmentRouter.delete("/:id",async(req,res)=>{
    try {let userExists=await AppointmentModel.findById(req.params.id)
        if(!userExists){
            res.status(409).json({message:"no user found with given id"})
        }
        else{
            let out = await AppointmentModel.findByIdAndDelete(req.params.id);
            res.send({message:"deleted successfully",data:out})
        }
       
        
    } catch (error) {
        console.log(error)
    }
})



function validateAppointment(req,res,next){
    if(!req.body.name){res.status(401).json({message:"please provide name of doctor"})}
    else if(!req.body.image){res.status(401).json({message:"please provide image url"})}
    else if(!req.body.specialization){res.status(401).json({message:"please provide specialization"})}
    else if(!req.body.location){res.status(401).json({message:"please provide location"})}
    else if(!req.body.experience){res.status(401).json({message:"please provide experience"})}
    else if(!req.body.date){res.status(401).json({message:"please provide date"})}
    else if(!req.body.fee){res.status(401).json({message:"please provide fees"})}
    else if(!req.body.slots){res.status(401).json({message:"please choose available slots availabe"})}
    else {
        next()
    }
}









module.exports={appointmentRouter}