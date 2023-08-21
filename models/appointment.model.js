const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const appointmnetSchema = mongoose.Schema({
    name:{type:String},
    specialization:{type:String},
    experience:{type:Number},
    location:{type:String},
    date:{type:String},
    slots:{type:Number},
    fee:{type:Number},
})


const AppointmentModel = mongoose.model('appointment',appointmnetSchema)
module.exports = {AppointmentModel}