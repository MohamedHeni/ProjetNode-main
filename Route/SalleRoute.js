const express=require("express")
const router=express.Router()
const SalleControllers=require("../Controllers/SalleControllers")

router.post("/ajouter",SalleControllers.AddSalle)
router.get("/get",SalleControllers.getSalle)
router.put("/modifier/:id",SalleControllers.updateSalle)
router.delete("/supprimer/:id",SalleControllers.deleteSalle)
router.get("/getid/:id",SalleControllers.getidSalle)


module.exports=router