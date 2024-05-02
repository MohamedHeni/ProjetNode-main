const mongoose=require("mongoose")
const Schema=mongoose.Schema
const SalleSchema=new Schema({
nom:{
    type:String,
    required:true
},
disponibilté:{
    type:Boolean,
    required:true,
    default:true
},
capacité:{
    type:Number
},
equipement:{
    type:String
},
description:{
    type:String
},
reservation:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Reservation"
}]

})
module.exports = mongoose.model('Salle',SalleSchema) 