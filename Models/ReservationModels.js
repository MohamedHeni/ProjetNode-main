const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({
    date_debut: {type:String},
    date_fin: {type:String}, 
    heure_debut: {type:String},
    heure_fin: {type:String},
   archive:{
    type:Boolean,
    default:false
   },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model('Reservation',ReservationSchema)
