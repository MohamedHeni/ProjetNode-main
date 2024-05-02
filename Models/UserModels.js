const mongoose=require("mongoose")
const  Schema = mongoose.Schema; 
const UserSchema=new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String,required:true},
    Numerotelephone: { type: String, required: true },
    role:{
        type:String,
        enum:["admin","user"]
    },
    confirmed:{
        type:Boolean,
        default:false
    },
codegenerated:{
    type:Number
    

},
resetCode:{
    type:String


},
})

module.exports=mongoose.model('User',UserSchema)