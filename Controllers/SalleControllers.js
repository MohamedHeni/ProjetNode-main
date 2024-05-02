const ReservationModels = require("../Models/ReservationModels")
const Salle = require("../Models/SalleModels")

exports.AddSalle=async(req,res)=>{
    try {
      
        const existesalle=await Salle.findOne({nom:req.body.nom})
        if(existesalle){
            res.status(401).json("sale d'eja existe")
        }else{
            const new_salle=new Salle(req.body)
            await new_salle.save()
            res.status(201).json('ajoute avec succes')
        }
    } catch (error) {
      
        res.status(400).json("Erreur de serveur",error)
        
    }
}

exports.getSalle=async(req,res)=>{
    try{
        
        const listeSalle = await Salle.find().populate({
            path: 'reservation',
            match: { archive: false }   })
        res.status(200).json(listeSalle)
        
    }catch(error){

        res.status(300).json(error)
    }
}

exports.updateSalle=async(req,res)=>{
    try {
        const updatesalle={
            nom:req.body.nom,
            disponibilté: req.body.disponibilté,
            capacité: req.body.capacité,
            equipement: req.body.equipement,
            description: req.body.description
        }

    const resultat=await Salle.findByIdAndUpdate({_id:req.params.id},{...updatesalle},{new:true})
    res.status(200).json({respone:resultat,message:"salle modifier avec succes "})

    } catch (error) {

        res.status(300).json(error)
    }
}

exports.deleteSalle=async(req,res)=>{
    try {
        let id =req.params.id
        const salleexiste=await Salle.findById(id)
        let reserationexiste = await ReservationModels.findById(salleexiste.reservation)
        await ReservationModels.deleteMany({
            _id: {
              $gte: reserationexiste
            }
          })
        await Salle.findByIdAndDelete({_id:id})
        res.status(200).json("salle suprimer avec succes ")

    } catch (error) {
        
        res.status(300).json(error)
    }
}

exports.getidSalle=async(req,res)=>{
    try {
        let id =req.params.id
        const salleOne =await Salle.findById({_id:id}).populate({
            path: 'reservation',
            match: { archive: false } 
        })
        res.status(200).json({respone:salleOne,message:"one salle avec succes"})

    } catch (error) {
        
        res.status(300).json(error)
    }
}